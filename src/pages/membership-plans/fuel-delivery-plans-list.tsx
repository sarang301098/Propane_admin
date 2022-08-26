import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import { Modal } from "react-bootstrap";

import {
  editMembershipFuelPlansStatusActionThunk,
  getMembershipPlansByIdActionThunk,
} from "../../store/membershipPlan/membershipPlans.actions.async";
import TRootState from "../../store/root.types";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import { BarsLoader } from "../../components/loader/Loader";
// import { getPlanIdAction } from "../../store/membershipPlan/membershipPlans.action";

const FuelDeliveryPlansList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const membershipPlansList = useSelector(
    (state: TRootState) => state.membershipPlans.fuelMembershipPlansList.plans
  );
  const loading = useSelector((state: TRootState) => state.membershipPlans.loading);
  const productList = useSelector((state: TRootState) =>
    state.products.productsData.products.fuelDeliveryProducts.map((prod) => ({
      label: prod.name,
      value: prod.id.toString(),
    }))
  );

  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [planId, setPlanId] = useState<number | null>(null);
  const [planStatus, setPlanStatus] = useState(false);
  const [planName, setPlanName] = useState("");

  const [showAllProduct, setShowAllProduct] = useState(false);
  const [productIds, setProductIds] = useState<string[]>([]);

  // const [deletePlanShow, setDeletePlanShow] = useState(false);

  /**
   * membership plan get by id
   * @param id
   */
  const getByIdData = (id: number) => {
    dispatch(getMembershipPlansByIdActionThunk(id, history, "fuel-delivery"));
  };

  // useEffect(() => {
  //   dispatch(getPlanIdAction(planId));
  // }, [dispatch, planId]);

  useEffect(() => {
    dispatch(getProductsActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead className="nowrap">
            <tr>
              <th>Plan Name</th>
              <th>Price (Monthly)</th>
              <th>Product</th>
              <th>Description</th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : membershipPlansList && membershipPlansList.length > 0 ? (
              membershipPlansList.map((plan) => (
                <tr key={plan.id}>
                  <td>{plan.name}</td>

                  <td>
                    {plan.prices.map((price) => (price.period === 1 ? `$${price.price.toFixed(2)}` : null))}
                  </td>

                  {/* <td className="text-center"> */}
                  {/* <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id={`tooltip01`}>Fuel Products - {plan.productIds.length}</Tooltip>}
                  > */}
                  <td>
                    {plan?.productIds?.length > 0 ? (
                      <span
                        style={{ cursor: "pointer" }}
                        className="badge badge-light"
                        onClick={() => {
                          setShowAllProduct(true);
                          setProductIds(plan.productIds);
                        }}
                      >
                        {plan?.productIds?.length}
                      </span>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  {/* </OverlayTrigger> */}
                  {/* </td> */}

                  <td>
                    <ul className="m-0 p-0">
                      <li className="mb-2">
                        {plan?.prices
                          .filter((price) => price.period === 1)
                          .map((period1) =>
                            period1.details
                              ?.filter((monthDetail) => monthDetail.key === 1)
                              .map((monthKey1) => monthKey1.label)
                          )}
                      </li>

                      <li>
                        {plan.prices
                          .filter((price) => price.period === 1)
                          .map((period1) =>
                            period1.details
                              .filter((monthDetail) => monthDetail.key === 2)
                              .map((monthKey2) => monthKey2.label.replace("{{VALUE}}", monthKey2.value))
                          )}
                      </li>
                    </ul>
                  </td>
                  <td className="table-field-status">
                    <i
                      className={`icon dripicons-${
                        plan.isActive ? "checkmark text-success" : "cross text-danger"
                      } font-size-20`}
                      onClick={() => {
                        setPlanId(plan.id);
                        setPlanStatus(plan.isActive);
                        setPlanName(plan.name);
                        setChangeStatusModal(true);
                      }}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle id="dropdown-basic" className="btn btn-sm btn-icon-only">
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          // onClick={() => setPlanId(plan.id)}
                        ></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => getByIdData(plan.id)}>
                          <i className="fa fa-edit fa-fw text-accent-custom"></i> Edit
                        </Dropdown.Item>
                        {/* TODO: Based on add delete functionality */}
                        {/* <Dropdown.Item href="#" onClick={() => setDeletePlanShow(true)}>
                          <i className="fa fa-trash-alt fa-fw text-accent-custom"></i> Delete
                        </Dropdown.Item> */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal centered scrollable show={showAllProduct} onHide={() => setShowAllProduct(false)}>
        <Modal.Header className="justify-content-center">
          <h3 className="modal-title">Products</h3>
          <button className="close" onClick={() => setShowAllProduct(false)}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ul className="list-group list-group-flush customer-list pb-0">
            {(productList || [])?.map((proId) =>
              (productIds || [])?.includes(proId.value) ? (
                <li key={proId.value} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <span className="customer-name">{proId.label}</span>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        </Modal.Body>
      </Modal>

      <React.Fragment>
        {changeStatusModal && (
          <SweetAlert
            success
            showCancel
            title="Are you sure want to change status?"
            onConfirm={() => setChangeStatusModal(false)}
            onCancel={() => setChangeStatusModal(false)}
            customButtons={
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-dark min-w-100 mr-3"
                  onClick={() => setChangeStatusModal(false)}
                >
                  No
                </button>
                <button
                  type="submit"
                  className="btn btn-danger min-w-100"
                  onClick={() => {
                    dispatch(
                      editMembershipFuelPlansStatusActionThunk({
                        membershipPlan: {
                          id: planId,
                          name: planName,
                          isActive: !planStatus,
                        },
                      })
                    );
                    setChangeStatusModal(false);
                  }}
                >
                  Yes
                </button>
              </React.Fragment>
            }
          ></SweetAlert>
        )}
      </React.Fragment>
    </>
  );
};

export default FuelDeliveryPlansList;

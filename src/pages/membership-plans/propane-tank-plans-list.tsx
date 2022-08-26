import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";

import {
  editMembershipTankPlansStatusActionThunk,
  getMembershipPlansByIdActionThunk,
} from "../../store/membershipPlan/membershipPlans.actions.async";
import TRootState from "../../store/root.types";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { BarsLoader } from "../../components/loader/Loader";
// import { getPlanIdAction } from "../../store/membershipPlan/membershipPlans.action";

const PropaneTankPlansList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const membershipPlansList = useSelector(
    (state: TRootState) => state.membershipPlans.tankMembershipPlansList.plans
  );

  const loading = useSelector((state: TRootState) => state.membershipPlans.loading);
  const productList = useSelector((state: TRootState) =>
    state.products.productsData.products.tankExchangeProducts.map((prod) => ({
      categoryIds: prod.details.map((detail) => detail.category?.id?.toString()),
      label: prod.name,
      value: prod.id.toString(),
    }))
  );
  const categoryList = useSelector((state: TRootState) =>
    state.category.categories.categories.map((prod) => ({ label: prod.name, value: prod.id.toString() }))
  );
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [planId, setPlanId] = useState<number | null>(null);
  const [planStatus, setPlanStatus] = useState(false);
  const [planName, setPlanName] = useState("");

  const [showAllProduct, setShowAllProduct] = useState(false);
  const [productIds, setProductIds] = useState<string[]>([]);

  // const [deletePlanShow, setDeletePlanShow] = useState(false);
  const spareTankProd: { categoryId?: string; label: string; value: string }[] = [];
  const exchangeProd: { categoryId?: string; label: string; value: string }[] = [];

  productList.forEach((prod) => {
    if ((prod?.categoryIds || [])?.includes("1")) {
      spareTankProd.push({
        label: prod.label,
        value: prod.value,
      });
    }
    if ((prod?.categoryIds || [])?.includes("2")) {
      exchangeProd.push({
        label: prod.label,
        value: prod.value,
      });
    }
  });

  /**
   * membership plan get by id
   * @param id
   */
  const getByIdData = (id: number) => {
    dispatch(getMembershipPlansByIdActionThunk(id, history, "tank-exchange"));
  };

  // useEffect(() => {
  //   dispatch(getPlanIdAction(planId));
  // }, [dispatch, planId]);

  useEffect(() => {
    dispatch(getProductsActionThunk());
    dispatch(getCategoryActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Price (Monthly)</th>
              <th>Category</th>
              <th>Product</th>
              <th>Description</th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
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
                  <td>
                    {(categoryList || [])?.map((proId) =>
                      (plan?.categoryIds || [])?.includes(proId.value) ? (
                        <>
                          <span key={proId.value}>{proId.label}</span>
                          <br />
                        </>
                      ) : null
                    )}
                  </td>

                  {/* <td className="text-center"> */}
                  {/* <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>Propane Tank Products - {plan.productIds.length}</Tooltip>
                    }
                    // overlay={
                    //   <Tooltip id={`tooltip01`}>
                    //     Propane Tank Products: Spare Tank -{" "}
                    //     {spareTankProd?.filter((proId) => plan.productIds?.includes(proId.value)).length},
                    //     Exchange -{" "}
                    //     {exchangeProd?.filter((proId) => plan.productIds?.includes(proId.value)).length}
                    //   </Tooltip>
                    // }
                  > */}
                  <td>
                    {plan?.productIds?.length > 0 ? (
                      <span
                        className="badge badge-light"
                        onClick={() => {
                          setShowAllProduct(true);

                          setProductIds(plan.productIds);
                        }}
                        style={{ cursor: "pointer" }}
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
                              .map((monthKey1) => monthKey1.label.replace("{{VALUE}}", monthKey1.value))
                          )}
                      </li>
                      <li className="mb-2">
                        {" "}
                        {plan?.prices
                          .filter((price) => price.period === 1)
                          .map((period1) =>
                            period1.details
                              ?.filter((monthDetail) => monthDetail.key === 2)
                              .map((monthKey2) => monthKey2.label.replace("{{VALUE}}", monthKey2.value))
                          )}
                      </li>
                      <li className="mb-2">
                        {" "}
                        {plan?.prices
                          .filter((price) => price.period === 1)
                          .map((period1) =>
                            period1.details
                              ?.filter((monthDetail) => monthDetail.key === 3)
                              .map((monthKey3) => monthKey3.label.replace("{{VALUE}}", monthKey3.value))
                          )}
                      </li>
                      <li>
                        {" "}
                        {plan?.prices
                          .filter((price) => price.period === 1)
                          .map((period1) =>
                            period1.details
                              ?.filter((monthDetail) => monthDetail.key === 4)
                              .map((monthKey4) => monthKey4.label.replace("{{VALUE}}", monthKey4.value))
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
                <td colSpan={7} style={{ textAlign: "center" }}>
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
            {(spareTankProd || [])?.filter((proId) => (productIds || [])?.includes(proId.value)).length >
            0 ? (
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <h6 className="customer-name">
                    <b>SPARE TANK</b>
                  </h6>
                </div>
              </li>
            ) : null}
            {(spareTankProd || [])?.map((proId) =>
              (productIds || [])?.includes(proId.value) ? (
                <li key={proId.value} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <span className="customer-name">{proId.label}</span>
                  </div>
                </li>
              ) : null
            )}

            {(exchangeProd || [])?.filter((proId) => (productIds || [])?.includes(proId.value)).length > 0 ? (
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <h6 className="customer-name">
                    <b>EXCHANGE</b>
                  </h6>
                </div>
              </li>
            ) : null}
            {exchangeProd?.map((proId) =>
              (productIds || [])?.includes(proId.value) ? (
                <li key={proId.value} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <span className="customer-name">{proId.label}</span>
                  </div>
                </li>
              ) : null
            )}
            {/* {productList.map((proId) =>
              (productIds || [])?.includes(proId.value) ? (
                <li key={proId.value} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <span className="customer-name">{proId.label}</span>
                  </div>
                </li>
              ) : null
            )} */}
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
                      editMembershipTankPlansStatusActionThunk({
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

export default PropaneTankPlansList;

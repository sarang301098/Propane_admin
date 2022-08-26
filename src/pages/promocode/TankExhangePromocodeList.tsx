/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";
import { BarsLoader } from "../../components/loader/Loader";
import {
  deletePromocodeActionThunk,
  updatePromocodeActionThunk,
} from "../../store/promocode/promocode.actions.async";
import TRootState from "../../store/root.types";
import { InitialValue } from "../../store/promocode/promocode.types";

interface Prop {
  getAction: Function;
}

const TankExchangePromocodeList: React.FC<Prop> = ({ getAction, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [sweetAlert, setSweetAlert] = useState(false);
  const [promocodeId, setPromocodeId] = useState<number | string>("");
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [editPromocode, setEditPromocode] = useState<InitialValue | null>(null);
  const loading = useSelector((state: TRootState) => state?.promocode?.loading);
  const { promocodes } = useSelector(
    (state: TRootState) => state?.promocode?.promocodeList
  );
  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };
  const handleCloseChangeStatus = () => {
    setShowChangeStatusAlert(false);
  };

  /**
   * Steps:
   *  1) Disptach delete promocode action thunk passing the promocode id
   */
  const handleDelete = () => {
    dispatch(deletePromocodeActionThunk(promocodeId, getAction));
    hideAlert();
  };

  const handlePromocodeStatus = () => {
    editPromocode &&
      dispatch(
        updatePromocodeActionThunk(editPromocode, promocodeId, () =>
          history.push("/promo-codes/fuel-delivery")
        )
      );
    handleCloseChangeStatus();
  };
  return (
    <div className="tab-pane fadeIn active" id="tab-2">
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th>Product</th>
              <th>Title</th>
              <th>Promocode</th>
              <th>Promocode Validity</th>
              <th className="text-center">Discount</th>
              <th>Created On</th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              promocodes?.length > 0 ? (
                promocodes?.map((promocode) => (
                  <tr key={promocode?.id}>
                    <td>{promocode?.product?.name} </td>
                    <td>{promocode?.title}</td>
                    <td>{promocode?.promocode}</td>
                    <td>
                      {moment(promocode?.startAt).format("DD/MM/YYYY")} to{" "}
                      {moment(promocode?.endAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="text-center">{promocode?.discount}%</td>
                    <td>{moment(promocode?.createdAt).format("DD/MM/YYYY")}</td>
                    <td className="table-field-status">
                      <a
                        href="#"
                        onClick={() => {
                          setEditPromocode({
                            productId: promocode?.product?.id || "",
                            categoryIds: promocode?.categoryIds,
                            customerIds: promocode?.customerIds,
                            discount: promocode?.discount,
                            endAt: promocode?.endAt,
                            isActive: promocode?.isActive ? 0 : 1,
                            promocode: promocode?.promocode,
                            startAt: promocode?.startAt,
                            title: promocode?.title,
                          });
                          setPromocodeId(promocode?.id);
                          setShowChangeStatusAlert(true);
                        }}
                      >
                        {promocode?.isActive ? (
                          <i className="icon dripicons-checkmark text-success font-size-20"></i>
                        ) : (
                          <i className="icon dripicons-cross text-danger font-size-20"></i>
                        )}
                      </a>
                    </td>
                    <td className="table-field-actions">
                      <Dropdown className="btn-group">
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="btn btn-sm btn-icon-only"
                        >
                          <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                        </Dropdown.Toggle>
                        <AppendedMyComponent>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#"
                              onClick={() => {
                                history.push("/promo-codes/" + promocode?.id);
                              }}
                            >
                              <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={() => {
                                setPromocodeId(promocode?.id);
                                showAlert();
                              }}
                            >
                              <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </AppendedMyComponent>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={{ textAlign: "center" }}>
                    No records found
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={9} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showChangeStatusAlert && (
        <SweetAlert
          success
          showCancel
          title="Are you sure want to change status?"
          onConfirm={() => setShowChangeStatusAlert(false)}
          onCancel={() => setShowChangeStatusAlert(false)}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={() => setShowChangeStatusAlert(false)}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={handlePromocodeStatus}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
      {sweetAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to change status?"
          onConfirm={hideAlert}
          onCancel={hideAlert}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={hideAlert}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={handleDelete}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </div>
  );
};

export default TankExchangePromocodeList;

/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import User from "../../assets/img/user.jpg";
import TRootState from "../../store/root.types";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";

import {
  deleteVendorActionThunk,
  updateVendorStatusActionThunk,
} from "../../store/vendor/vendor.action.async";
import { BarsLoader } from "../loader/Loader";

interface Prop {
  setFilter: Function;
  filter: string;
  getAction: Function;
}

const VendorList: React.FC<Prop> = ({ setFilter, filter, getAction }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { vendor, count } = useSelector(
    (state: TRootState) => state.vendor.vendorsData
  );
  const loading = useSelector((state: TRootState) => state.vendor.loading);

  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [status, setStatus] = useState<number>(-1);
  const [sweetAlert, setSweetAlert] = useState(false);

  const handleShowChangeStatus = () => {
    setShowChangeStatusAlert(true);
  };

  const handleCloseChangeStatus = () => {
    dispatch(updateVendorStatusActionThunk(vendorId, status === 0 ? 1 : 0));
    setShowChangeStatusAlert(false);
  };

  const showAlert = () => {
    setSweetAlert(true);
  };

  const hideAlert = () => {
    setSweetAlert(false);
  };

  const handleDelete = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteVendorActionThunk(vendorId, isLastPage ? getAction : undefined)
    );
    hideAlert();
  };
  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover nowrap m-0">
          <thead>
            <tr>
              <th className="sorting">
                <span
                  onClick={() =>
                    filter === "ASC" ? setFilter("DESC") : setFilter("ASC")
                  }
                >
                  Full Name
                </span>
              </th>
              <th>Email Id</th>
              <th>Registration Date</th>
              {/* <th>Assigned Zipcode</th> */}
              <th className="text-center">Vendor Commission </th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              vendor && vendor?.length > 0 && typeof vendor === "object" ? (
                vendor?.map((vendor, index: number) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td>
                        <div className="media">
                          <img
                            className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                            alt="user-icon"
                            src={vendor?.profileImage || User}
                          />
                          <div className="media-body">
                            <h6 className="mt-1 mb-0">{vendor?.fullName}</h6>
                            <span className="text-muted">
                              {vendor?.countryCode} {vendor?.mobileNumber}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{vendor?.email}</td>
                      <td>{moment(vendor?.createdAt).format("DD/MM/YYYY")}</td>
                      <td className="text-center">
                        {vendor?.vendor?.comissionFee
                          ? vendor?.vendor?.comissionFee + "%"
                          : "-"}
                      </td>
                      <td className="text-center">
                        <a
                          href="#"
                          onClick={() => {
                            setStatus(vendor?.vendor?.status);
                            setVendorId(vendor?.id);
                            handleShowChangeStatus();
                          }}
                        >
                          {vendor?.vendor?.status ? (
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
                                as={Link}
                                to={
                                  "/vendors/view/" +
                                  vendor?.id +
                                  "/basic-details"
                                }
                              >
                                <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                                View
                              </Dropdown.Item>
                              <Dropdown.Item
                                as={Link}
                                to={{
                                  pathname: "/vendors/" + vendor?.id,
                                  state: { tab: 1 },
                                }}
                              >
                                <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setVendorId(vendor?.id);
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
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No records found.
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
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
                onClick={handleCloseChangeStatus}
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
          title="Are you sure want to delete vendor?"
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
    </>
  );
};

export default VendorList;

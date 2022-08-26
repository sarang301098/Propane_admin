import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import User from "../../assets/img/user.jpg";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";
import {
  deleteCustomerActionThunk,
  updateCustomerActionThunk,
} from "../../store/customer/customer.actions.async";
interface Prop {
  setFilter: Function;
  filter: string;
  getAction: Function;
}
const CustomerList: React.FC<Prop> = ({ setFilter, filter, getAction }) => {
  const dispatch = useDispatch();

  const customersData = useSelector(
    (state: TRootState) => state.customer.customersData
  );
  const loading = useSelector((state: TRootState) => state.customer.loading);

  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [customerStatusChange, setCustomerStatusChange] = useState(false);
  const [customerId, setCustomerId] = useState<string | number>("");
  const [customerStatus, setCustomerStatus] = useState(false);

  const deleteCustomerHandler = () => {
    // const isLastPage = Number(state?.page || 1) !== Math.ceil(customersData?.count / itemsPerPage);
    dispatch(deleteCustomerActionThunk(customerId, getAction));
    setDeleteCustomer(false);
  };

  const StatusCustomerHandler = () => {
    dispatch(updateCustomerActionThunk(customerId, !customerStatus));
    setCustomerStatusChange(false);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th className="w-250 sorting">
                <span
                  onClick={() =>
                    filter === "ASC" ? setFilter("DESC") : setFilter("ASC")
                  }
                >
                  Full Name
                </span>
              </th>
              <th>Email Id</th>
              <th className="text-center">Total Orders</th>
              <th>Registration Date</th>
              <th className="text-center">Membership Status</th>
              <th className="w-150 text-center">Customer Status</th>
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
            ) : customersData.customers &&
              customersData.customers.length > 0 ? (
              customersData.customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="media">
                      <img
                        className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                        src={customer?.profileImage || User}
                        alt=""
                      />
                      <div className="media-body">
                        <h6 className="mt-1 mb-0">{customer.fullName}</h6>
                        <span className="text-muted">
                          {customer.countryCode}
                          {customer.mobileNumber}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  {(customer?.orders["1"] || [])?.length < 1 &&
                  (customer?.orders["2"] || [])?.length < 1 ? (
                    <td className="text-center">-</td>
                  ) : (
                    <td className="text-center">
                      <Link
                        to={`/customers/view/${customer.id}/orders/fuel-delivery`}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip01`}>
                              Fuel Order -
                              {(customer?.orders["1"] || [])?.length < 1
                                ? 0
                                : (customer?.orders["1"] || [])?.length}
                              <br />
                              Propane Tank -
                              {(customer?.orders["2"] || [])?.length < 1
                                ? 0
                                : (customer?.orders["2"] || [])?.length}
                            </Tooltip>

                            // <Tooltip id={`tooltip02`}>
                            //   Propane Tank Exchange Order: Spare Tank - 10,
                            //   Exchange - 10, Accessories - 10
                            // </Tooltip>
                          }
                        >
                          <span className="badge badge-light">
                            {/* {((customer?.orders["1"] || [])?.length < 1
                              ? 0
                              : (customer?.orders["1"] || [])?.length) +
                              ((customer?.orders["2"] || [])?.length < 1
                                ? 0
                                : (customer?.orders["2"] || [])?.length)} */}
                            {(customer?.orders["1"] || [])?.length +
                              (customer?.orders["2"] || [])?.length}
                          </span>
                        </OverlayTrigger>
                      </Link>
                    </td>
                  )}
                  <td>{moment(customer.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="text-center">
                    {customer.userSubscriptionCount > 0 ? (
                      <span className="text-info">Paid</span>
                    ) : (
                      <span className="text-success">Free</span>
                    )}
                  </td>
                  <td className="text-center">
                    <i
                      className={`icon dripicons-${
                        customer.isActive
                          ? "checkmark text-success"
                          : "cross text-danger"
                      } font-size-20`}
                      onClick={() => {
                        setCustomerId(customer.id);
                        setCustomerStatus(customer.isActive);
                        setCustomerStatusChange(true);
                      }}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          // onClick={() => setCustomerId(customer.id)}
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to={`/customers/view/${customer.id}/basic-details`}
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setCustomerId(customer.id);
                              setCustomerStatus(customer.isActive);
                              setCustomerStatusChange(true);
                            }}
                          >
                            <i
                              className={`fa fa-${
                                customer.isActive ? "times" : "check"
                              } fa-fw text-accent-custom`}
                            ></i>{" "}
                            {customer.isActive ? "Inactive" : "Active"}
                          </Dropdown.Item>

                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setCustomerId(customer?.id);
                              setDeleteCustomer(true);
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
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No Customers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {deleteCustomer && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to delete?"
          onConfirm={() => setDeleteCustomer(false)}
          onCancel={() => setDeleteCustomer(false)}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={() => setDeleteCustomer(false)}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={deleteCustomerHandler}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
      {customerStatusChange && (
        <SweetAlert
          success
          showCancel
          title="Are you sure want to change status?"
          onConfirm={() => setCustomerStatusChange(false)}
          onCancel={() => setCustomerStatusChange(false)}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={() => setCustomerStatusChange(false)}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={StatusCustomerHandler}
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

export default CustomerList;

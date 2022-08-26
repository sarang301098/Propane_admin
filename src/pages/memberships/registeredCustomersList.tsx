import React, { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

import User from "../../assets/img/user.jpg";
import { BarsLoader } from "../../components/loader/Loader";

import TRootState from "../../store/root.types";
import moment from "moment";
import {
  deleteCustomerActionThunk,
  updateCustomerActionThunk,
} from "../../store/customer/customer.actions.async";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";
interface Prop {
  setFilter: Function;
  filter: string;
  getAction: Function;
}
const RegisteredCustomersList: React.FC<Prop> = ({ setFilter, filter, getAction }) => {
  const dispatch = useDispatch();

  const [deleteCustomer, setDeleteCustomer] = useState(false);
  const [customerStatusChange, setCustomerStatusChange] = useState(false);
  const [customerId, setCustomerId] = useState<string | number>("");
  const [customerStatus, setCustomerStatus] = useState(false);
  const [deleteId, setDeleteId] = useState<string | number | null>("");

  const membershipList = useSelector((state: TRootState) => state.customer.customersData);
  const loading = useSelector((state: TRootState) => state.customer.loading);

  const deleteCustomerHandler = () => {
    // const isLastPage = Number(state?.page || 1) !== Math.ceil(customersData?.count / itemsPerPage);
    dispatch(deleteCustomerActionThunk(deleteId, getAction));
    setDeleteCustomer(false);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th className="sorting">
                <span onClick={() => (filter === "ASC" ? setFilter("DESC") : setFilter("ASC"))}>
                  Full Name
                </span>
              </th>
              <th>Email Id</th>
              <th>Registered Date</th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : membershipList.customers && membershipList.customers.length > 0 ? (
              membershipList.customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="media">
                      <img
                        className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                        src={User}
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
                  <td>{moment(customer.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="table-field-status">
                    <i
                      className={`icon dripicons-checkmark ${
                        customer.isActive ? "dripicons-checkmark text-success" : "dripicons-cross text-danger"
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
                      <Dropdown.Toggle id="dropdown-basic" className="btn btn-sm btn-icon-only">
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          onClick={() => setCustomerId(customer.id)}
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
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
                              setDeleteId(customer?.id);
                              setDeleteCustomer(true);
                            }}
                          >
                            <i className="fa fa-trash-alt fa-fw text-accent-custom"></i> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </AppendedMyComponent>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No Membership available
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
              <button className="btn btn-dark min-w-100 mr-3" onClick={() => setDeleteCustomer(false)}>
                No
              </button>
              <button className="btn btn-danger min-w-100" onClick={deleteCustomerHandler}>
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
              <button className="btn btn-dark min-w-100 mr-3" onClick={() => setCustomerStatusChange(false)}>
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={() => {
                  dispatch(updateCustomerActionThunk(customerId, !customerStatus));
                  setCustomerStatusChange(false);
                }}
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

export default RegisteredCustomersList;

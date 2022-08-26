import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";

import { Sidebar } from "../../../components/sidebar/sidebar";
import { getCustomerByIdActionThunk } from "../../../store/customer/customer.actions.async";
import TRootState from "../../../store/root.types";

interface Prop {
  children: ReactNode;
}

const CustomersView: React.FC<Prop> = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { customerId } = useParams<{ customerId: string }>();

  const customerById = useSelector(
    (state: TRootState) => state.customer.customerById
  );

  useEffect(() => {
    dispatch(getCustomerByIdActionThunk(customerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>
                    Customer Details
                    <i
                      className={`icon dripicons-${
                        customerById.isActive
                          ? "checkmark text-success"
                          : "cross text-danger"
                      } font-size-24 ml-3 align-middle`}
                    ></i>
                  </h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() => history.push("/customers")}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs m-0">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/customers/view/${customerId}/basic-details`}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Basic Details
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/customers/view/${customerId}/membership-details`}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Membership Details
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/customers/view/${customerId}/orders/fuel-delivery`}
                        className="nav-link"
                        activeClassName="nav-link show active"
                        isActive={() =>
                          (pathname || "")?.includes(
                            `/customers/view/${customerId}/orders`
                          )
                        }
                      >
                        Orders
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">{children}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomersView;

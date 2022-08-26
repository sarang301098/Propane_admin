import React, { ReactNode, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../../components/sidebar/sidebar";
import { getOrderByIdActionThunk } from "../../../store/orders/orders.actions.async";
import TRootState from "../../../store/root.types";
import { BarsLoader } from "../../../components/loader/Loader";
import OrderStatus from "../../../components/orderStatus/OrderStatus";

interface Prop {
  children: ReactNode;
}

const ViewOrderFuelDelivery: React.FC<Prop> = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();
  const { loading, orderById } = useSelector(
    (state: TRootState) => state?.orders
  );
  useEffect(() => {
    dispatch(getOrderByIdActionThunk(orderId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        {loading ? (
          <BarsLoader />
        ) : (
          <div className="content-wrapper">
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>
                      Order Id {orderId}{" "}
                      {/* {orderById?.order?.order?.isPaid ? (
                        <span className="badge badge-info badge-pill view-badge font-size-12">
                          Delivered
                        </span>
                      ) : (
                        <span className="badge badge-green badge-pill view-badge font-size-12">
                          Pending
                        </span>
                      )} */}
                      <OrderStatus
                        status={orderById?.order?.status || ""}
                        className="view-badge font-size-12"
                      />
                    </h1>
                  </div>
                  <div className="m-l-10">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        history.action !== "POP"
                          ? history.goBack()
                          : history?.push(
                              "/orders/pending-orders/fuel-delivery"
                            );
                      }}
                    >
                      <i className="fa fa-angle-left">&nbsp;</i> Back
                    </button>
                  </div>
                </div>
              </header>
              <section className="page-content container-fluid">
                <div className="card card-tabs clearfix">
                  <div className="card-header clearfix ">
                    <ul className="nav nav-tabs primary-tabs">
                      <li className="nav-item" role="presentation">
                        <NavLink
                          to={`/orders/view-fuel-delivery/${orderId}/basic-details`}
                          className="nav-link"
                          activeClassName="nav-link show active"
                        >
                          Basic Details
                        </NavLink>
                      </li>
                      <li className="nav-item" role="presentation">
                        <NavLink
                          to={`/orders/view-fuel-delivery/${orderId}/order-summary`}
                          className="nav-link"
                          activeClassName="nav-link show active"
                        >
                          Order Summary
                        </NavLink>
                      </li>
                      <li className="nav-item" role="presentation">
                        <NavLink
                          to={`/orders/view-fuel-delivery/${orderId}/driver-details`}
                          className="nav-link"
                          activeClassName="nav-link show active"
                        >
                          Driver Details
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
        )}
      </div>
    </React.Fragment>
  );
};

export default ViewOrderFuelDelivery;

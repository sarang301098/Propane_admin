import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDashboardViewActionThunk } from "../../../store/DashboardStore/dashboard.actions.async";
import TRootState from "../../../store/root.types";

const DashboardView = () => {
  const dispatch = useDispatch();

  const dashboardView = useSelector((state: TRootState) => state?.dashboard?.dashboardDataView);

  useEffect(() => {
    dispatch(getDashboardViewActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="row">
      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link to="/customers">
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-accent">{dashboardView?.customersCount}</h2>
            <h6 className="text-muted m-t-10 font-weight-500">Total No. of Customers</h6>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link to="/vendors/list">
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-warning">{dashboardView?.vendorsCount}</h2>
            <h6 className="text-muted m-t-10 font-weight-500">Total No. of Vendors</h6>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link to="/drivers/vendor-drivers">
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-info">{dashboardView?.vendorsDriver}</h2>
            <h6 className="text-muted m-t-10 font-weight-500">Total No. of Vendor's Drivers</h6>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link to="/drivers/freelance-drivers">
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-secondary">
              {dashboardView?.freelanceDriver}
            </h2>
            <h6 className="text-muted m-t-10 font-weight-500">Total No. of Freelance Drivers</h6>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link
          to={{
            pathname: "/orders/all-orders/fuel-delivery",
            state: { todayOrders: "today" },
          }}
        >
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-success">{dashboardView?.todaysOrders}</h2>
            <h6 className="text-muted m-t-10 font-weight-500">Today's Orders</h6>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link
          to={{
            pathname: "/orders/all-orders/fuel-delivery",
            state: { completedOrders: "complete" },
          }}
        >
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-primary">
              {dashboardView?.deliveredOrders}
            </h2>
            <h6 className="text-muted m-t-10 font-weight-500">Total Orders Completed</h6>
          </div>
        </Link>
      </div>

      <div className="col-md-12 col-lg-6 col-xl-3">
        <Link
          to={{
            pathname: "/orders/all-orders/fuel-delivery",
            state: { cancelledOrders: "cancel" },
          }}
        >
          <div className="card card-body">
            <h2 className="card-title m-b-5 font-weight-500 text-warning">
              {dashboardView?.cancelledOrders}
            </h2>
            <h6 className="text-muted m-t-10 font-weight-500">Total No. of Cancelled Orders</h6>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-6 col-xl-3">
        <div className="card card-body">
          <h2 className="card-title m-b-5 font-weight-500 text-success">${dashboardView?.totalRevenue}</h2>
          <h6 className="text-muted m-t-10 font-weight-500">Total Revenue</h6>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import TodaysOutOrders from "./TodaysOutOrders";
import AllOrders from "./AllOrders";

const DashboardOrdersView: React.FC = () => {
  const history = useHistory();
  const state = history?.location?.state as { tab: number };

  const [tabValue, setTabValue] = useState(state?.tab || 1);

  return (
    <div className="card card-tabs clearfix">
      <div className="card-header clearfix">
        <ul className="nav nav-tabs primary-tabs">
          <li className="nav-item" role="presentation">
            <button
              onClick={() => {
                setTabValue(1);
                history.push(history?.location?.pathname, {
                  tab: 1,
                });
              }}
              className={tabValue === 1 ? "nav-link active show" : "nav-link"}
            >
              Today's Out for Delivery Orders
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => {
                setTabValue(2);
                history.push(history?.location?.pathname, {
                  tab: 2,
                });
              }}
              className={tabValue === 2 ? "nav-link active show" : "nav-link"}
            >
              Orders
            </button>
          </li>
        </ul>
      </div>
      <div className="card-body p-0">
        <div className="tab-content">
          {tabValue === 1 ? <TodaysOutOrders /> : null}
          {tabValue === 2 ? <AllOrders /> : null}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrdersView;

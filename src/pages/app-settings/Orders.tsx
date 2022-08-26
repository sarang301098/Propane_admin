import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import AppSettings from "./list";

interface Prop {
  children: ReactNode;
}

const Orders: React.FC<Prop> = ({ children }) => {
  return (
    <AppSettings>
      <div className="tab-pane fadeIn active" id="tab-1">
        <div className="card-header clearfix ">
          <ul className="nav nav-tabs primary-tabs">
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/settings/app-settings/orders/fuel-delivery"}
                className="nav-link"
                activeClassName="nav-link show active"
              >
                Fuel delivery
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/settings/app-settings/orders/tank-exchange"}
                className="nav-link"
                activeClassName="nav-link show active"
              >
                Propane Tank Exchange
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="tab-content">{children}</div>
      </div>
    </AppSettings>
  );
};

export default Orders;

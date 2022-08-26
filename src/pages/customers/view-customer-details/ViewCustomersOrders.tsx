import React, { ReactNode } from "react";
import { NavLink, useParams } from "react-router-dom";

import CustomersView from "./view";

interface Prop {
  children: ReactNode;
}

const ViewCustomersOrders: React.FC<Prop> = ({ children }) => {
  const { customerId } = useParams<{ customerId: string }>();

  return (
    <CustomersView>
      <div className="tab-pane fadeIn active" id="tab-3">
        <div className="card-header clearfix ">
          <ul className="nav nav-tabs primary-tabs">
            <li className="nav-item" role="presentation">
              <NavLink
                to={`/customers/view/${customerId}/orders/fuel-delivery`}
                className="nav-link"
                activeClassName="nav-link show active"
              >
                Fuel delivery
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={`/customers/view/${customerId}/orders/tank-exchange`}
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
    </CustomersView>
  );
};

export default ViewCustomersOrders;

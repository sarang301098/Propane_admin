import React, { ReactNode } from "react";
import { NavLink, useParams } from "react-router-dom";
import DriversView from "./view";

interface Prop {
  children: ReactNode;
}

const DriverViewOrdersDetails: React.FC<Prop> = ({ children }) => {
  const { id } = useParams<{ id: string }>();
  return (
    <DriversView>
      <div className="tab-pane fadeIn active" id="tab-3">
        <div className="card-header clearfix ">
          <ul className="nav nav-tabs primary-tabs">
            <li className="nav-item" role="presentation">
              <NavLink
                to={`/drivers/view/${id}/orders/fuel-delivery`}
                className="nav-link"
                activeClassName="nav-link show active"
              >
                Fuel delivery
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={`/drivers/view/${id}/orders/tank-exchange`}
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
    </DriversView>
  );
};

export default DriverViewOrdersDetails;

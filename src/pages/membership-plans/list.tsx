import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { Sidebar } from "../../components/sidebar/sidebar";

interface Prop {
  children: ReactNode;
}

const MemberShipPlanList: React.FC<Prop> = ({ children }) => {
  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Membership Plans</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/membership-plans/fuel-delivery"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Bulk Fuel Delivery
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/membership-plans/tank-exchange"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Propane Tank Exchange
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

export default MemberShipPlanList;

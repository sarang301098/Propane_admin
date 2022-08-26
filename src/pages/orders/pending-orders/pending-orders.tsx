import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../../../components/sidebar/sidebar";

interface Prop {
  children: ReactNode;
}

const PendingOrders: React.FC<Prop> = ({ children }) => {
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
                  <h1>Pending Orders</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/orders/pending-orders/fuel-delivery"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Fuel Delivery
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/orders/pending-orders/tank-exchange"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Propane Tank Exchange Delivery
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

export default PendingOrders;

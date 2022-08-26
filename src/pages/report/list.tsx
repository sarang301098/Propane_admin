import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { Sidebar } from "../../components/sidebar/sidebar";

interface Prop {
  children: ReactNode;
}

const Report: React.FC<Prop> = ({ children }) => {
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
                  <h1>Reports</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/customer"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Customer Reports
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/vendor"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Vendor Reports
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/driver"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Driver Reports
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/order"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Order Reports
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/product"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Product Reports
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/transaction"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Transaction Reports
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/reports/inventory-stock"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Inventory Stock Reports
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

export default Report;

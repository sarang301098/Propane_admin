import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";

interface Prop {
  children: ReactNode;
}

const MemberShipList: React.FC<Prop> = ({ children }) => {
  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Subscription Customers</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/memberships/registered"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Registered Customers
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/memberships/subscribed"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Subscribed Customers
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

export default MemberShipList;

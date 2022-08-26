import React, { ReactNode, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Sidebar } from "../../components/sidebar/sidebar";
import { getAppSettingsDataActionThunk } from "../../store/appSettings/appSettings.actions.async";

interface Prop {
  children: ReactNode;
}

const AppSettings: React.FC<Prop> = ({ children }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppSettingsDataActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>App Settings</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs m-0">
                <div className="card-header clearfix">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/app-settings/orders/fuel-delivery"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                        isActive={() =>
                          (pathname || "")?.includes(
                            "/settings/app-settings/orders"
                          )
                        }
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/app-settings/general"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        General
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

export default AppSettings;

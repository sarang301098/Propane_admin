import React, { ReactNode, useEffect } from "react";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Sidebar } from "../../../components/sidebar/sidebar";
import { getDriverByIdActionThunk } from "../../../store/drivers/drivers.actions.async";

interface Prop {
  children: ReactNode;
}

const DriversView: React.FC<Prop> = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriverByIdActionThunk(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="app">
      <div className="d-block d-lg-none">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>
                  Driver Details
                  <i className="icon dripicons-checkmark text-success font-size-24 ml-3 align-middle"></i>
                </h1>
              </div>
              <div className="m-l-10">
                <button
                  className="btn btn-secondary"
                  onClick={() => history.goBack()}
                >
                  <i className="fa fa-angle-left">&nbsp;</i> Back
                </button>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card card-tabs clearfix">
              <div className="card-header clearfix ">
                <ul className="nav nav-tabs primary-tabs m-0">
                  <li className="nav-item" role="presentation">
                    <NavLink
                      to={`/drivers/view/${id}/basic-details`}
                      className="nav-link"
                      activeClassName={"nav-link active show"}
                    >
                      Basic Details
                    </NavLink>
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavLink
                      to={`/drivers/view/${id}/orders/fuel-delivery`}
                      className="nav-link"
                      activeClassName={"nav-link active show"}
                      isActive={() =>
                        (pathname || "").includes(`/drivers/view/${id}/orders`)
                      }
                    >
                      Orders
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
  );
};

export default DriversView;

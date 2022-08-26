import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import { getNotificationActionThunk } from "../../store/notification/notification.action.async";
import TRootState from "../../store/root.types";

interface Prop {
  children?(search: string, page: number, setPage: Function): React.ReactNode;
}

const Notifications: React.FC<Prop> = ({ children, ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = history?.location?.state as { page: string };
  const { pathname } = history.location;

  const handleRedirectToSendNewNotification = () => {
    history.push("/settings/notifications/new");
  };

  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const [searchNotification, setSearchNotification] = useState("");
  const [page, setPage] = useState(Number(state?.page) || 1);

  const fetchNotifications = (search: string) => {
    dispatch(
      getNotificationActionThunk(
        1,
        itemsPerPage,
        pathname === "/settings/notifications/received" ? false : true,
        search
      )
    );
  };

  const handleSubmit = () => {
    fetchNotifications(searchNotification);
    setPage(1);
    history.push(pathname, { page: 1 });
  };

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Notifications</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchNotification}
                      onChange={(e) => setSearchNotification(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={handleSubmit}
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      fetchNotifications("");
                      setSearchNotification("");
                    }}
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRedirectToSendNewNotification}
                  >
                    Send New Notification
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs notifications clearfix">
                <div className="card-header clearfix">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/notifications/received"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        {" "}
                        Notification Recieved{" "}
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/settings/notifications/sent"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Notifications Sent
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    {children && children(searchNotification, page, setPage)}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notifications;

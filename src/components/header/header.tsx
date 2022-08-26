/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

import Logo from "../../assets/img/logo.png";
import User from "../../assets/img/user.jpg";
import { logout } from "../../store/auth/auth.action";
import {
  getNotificationActionThunk,
  updateNotificationActionThunk,
} from "../../store/notification/notification.action.async";
import TRootState from "../../store/root.types";

export const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { notifications, unreadNotificaionCount } = useSelector(
    (state: TRootState) => state?.notification?.headerNotification
  );
  const userId = useSelector(
    (state: TRootState) => state?.profile?.profileData?.id
  );

  const { count } = useSelector(
    (state: TRootState) => state?.notification?.notifications
  );

  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [MobileToggle, setMobileToggle] = useState(false);

  const handleSidebarToggleChange = () => {
    const temp = !sidebarToggle;
    setSidebarToggle(!sidebarToggle);
    if (temp) {
      document!.querySelector("body")!.classList.add("aside-left-open");
    } else {
      document!.querySelector("body")!.classList.remove("aside-left-open");
    }
  };

  const handleMobileToggleChange = () => {
    const temp = !MobileToggle;
    setMobileToggle(!MobileToggle);
    if (temp) {
      document!.querySelector("body")!.classList.add("mobile-topbar-toggle");
    } else {
      document!.querySelector("body")!.classList.remove("mobile-topbar-toggle");
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
    localStorage.removeItem("lToken");
    localStorage.removeItem("lRefreshToken");
  };

  /**
   * steps:
   *  1): Get the navitem as an argument
   *  2): Check if current path exists in routes array
   *  3): If path exists in routes array then add active-header class else add nothing.
   * @param item
   * @returns
   */
  const isActive = (item: typeof navItems[0]) =>
    (item.routes || []).some((route) =>
      item?.activeRoute
        ? history.location.pathname.startsWith(route)
        : history.location.pathname === route
    );

  const navItems = [
    {
      to: "/dashboard",
      title: "Dashboard",
      routes: ["/", "/dashboard"],
    },
    {
      title: "Orders",
      routes: [
        "/orders/pending-orders/fuel-delivery",
        "/orders/pending-orders/tank-exchange",
        "/orders/orders-history/fuel-delivery",
        "/orders/orders-history/tank-exchange",
        "/orders/all-orders/fuel-delivery",
        "/orders/all-orders/tank-exchange",
      ],
      items: [
        {
          to: "/orders/pending-orders/fuel-delivery",
          title: "Pending Orders",
          routes: [
            "/orders/pending-orders/fuel-delivery",
            "/orders/pending-orders/tank-exchange",
          ],
        },
        {
          to: "/orders/orders-history/fuel-delivery",
          title: "Orders History",
          routes: [
            "/orders/orders-history/fuel-delivery",
            "/orders/orders-history/tank-exchange",
          ],
        },
        {
          to: "/orders/all-orders/fuel-delivery",
          title: "All Orders",
          routes: [
            "/orders/all-orders/fuel-delivery",
            "/orders/all-orders/tank-exchange",
          ],
        },
      ],
    },
    {
      to: "/orders/map",
      title: "Map",
      routes: ["/orders/map"],
    },
    {
      to: "/customers",
      title: "Customers",
      routes: ["/customers"],
      activeRoute: true,
    },
    {
      to: "/vendors/list",
      title: "Vendors",
      queryParam: true,
      activeRoute: true,
      routes: ["/vendors"],
    },
    {
      title: "Drivers",
      queryParam: true,
      routes: [
        "/drivers/vendor-drivers",
        "/drivers/freelance-drivers",
        "/drivers/freelance-driver-payment",
        "/drivers",
      ],
      activeRoute: true,
      items: [
        {
          to: "/drivers/vendor-drivers",
          title: "Vendor's Drivers",
          routes: ["/drivers/vendor-drivers"],
        },
        {
          to: "/drivers/freelance-drivers",
          title: "Freelance Drivers",
          routes: ["/drivers/freelance-drivers"],
        },
        {
          to: "/drivers/freelance-driver-payment",
          title: "Freelance Drivers Payments",
          routes: ["/drivers/freelance-driver-payment"],
        },
      ],
    },
    {
      title: "Product Settings",
      routes: [
        "/products/fuel-delivery",
        "/products/tank-exchange",
        "/accessories/list",
        "/cylinder-size/list",
        "/states",
        "/location-where-to-deliver/list",
        "/promo-codes",
      ],
      activeRoute: true,
      items: [
        {
          to: "/products/fuel-delivery",
          routes: ["/products/fuel-delivery", "/products/tank-exchange"],
          title: "Products",
        },
        {
          to: "/accessories/list",
          title: "Accessories",
          routes: ["/accessories/list"],
        },
        {
          to: "/cylinder-size/list",
          title: "Cylinder Size",
          routes: ["/cylinder-size/list"],
        },
        {
          to: "/states",
          title: "Sales Tax",
          routes: ["/states"],
          activeRoute: true,
        },
        {
          to: "/location-where-to-deliver/list",
          routes: ["/location-where-to-deliver/list"],
          title: "Location of Where to Deliver",
        },
        {
          to: "/promo-codes/fuel-delivery",
          title: "Promocode",
          routes: ["/promo-codes/fuel-delivery", "/promo-codes/tank-exchange"],
        },
      ],
    },
    {
      to: "/reports/customer",
      title: "Reports",
      routes: [
        "/reports/customer",
        "/reports/vendor",
        "/reports/driver",
        "/report/order",
        "/reports/product",
        "/reports/transaction",
        "/reports/inventory-stock",
      ],
    },
    {
      to: "/earnings/net",
      title: "Earnings",
      routes: ["/earnings/net"],
    },
  ];

  useEffect(() => {
    dispatch(getNotificationActionThunk(1, 5, false, "", true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const markAsRead = () => {
    const notificationIds = notifications?.map(
      (notification) => notification?.id
    );
    dispatch(
      updateNotificationActionThunk(notificationIds, "read", userId || "")
    );
  };
  const adminProfile = useSelector(
    (state: TRootState) => state.profile.profileData
  );

  return (
    <React.Fragment>
      <nav className="top-toolbar navbar navbar-mobile navbar-tablet">
        <ul className="navbar-nav nav-left">
          <li className="nav-item">
            <a href="#" onClick={() => handleSidebarToggleChange()}>
              <i className="icon dripicons-align-left"></i>
            </a>
          </li>
        </ul>
        <ul className="navbar-nav nav-left site-logo">
          <li>
            <div className="logo-custom">
              <img src={Logo} alt="Logo" />
            </div>
          </li>
        </ul>
        <ul className="navbar-nav nav-right">
          <li className="nav-item">
            <a onClick={() => handleMobileToggleChange()}>
              <i className="icon dripicons-dots-3 rotate-90"></i>
            </a>
          </li>
        </ul>
      </nav>
      <nav className="top-toolbar navbar navbar-desktop flex-nowrap">
        <ul className="site-logo d-none d-lg-inline-block">
          <li>
            <Link to="/dashboard">
              <div className="logo-custom">
                <img src={Logo} alt="Logo" />
              </div>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav m-lg-auto">
          {navItems.map((item, index) => (
            <li className="nav-item nav-text" key={index}>
              {item.items ? (
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={item.title}
                  menuVariant="dark"
                  key={index}
                  className={isActive(item) ? "active-header" : ""}
                >
                  {item.items.map((innerItem, index) => (
                    <NavDropdown.Item
                      as={NavLink}
                      to={innerItem.to}
                      exact
                      key={index}
                      className={
                        isActive(innerItem) ? "active-sidebar-link" : ""
                      }
                    >
                      {innerItem.title}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <NavLink
                  to={item.to}
                  exact
                  className={isActive(item) ? "active-header" : ""}
                >
                  <span>{item.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item tio-icon-menu">
            <NavLink
              to="/settings/profile"
              className={
                history.location.pathname.startsWith("/settings")
                  ? "active-settings"
                  : ""
              }
            >
              <i className="icon dripicons-gear"></i>
            </NavLink>
          </li>
          <li className="nav-item dropdown tio-icon-menu dropdown-notifications dropdown-menu-lg">
            <Dropdown
              align="end"
              className="btn-group nav-link text-center lh-56"
            >
              <Dropdown.Toggle id="dropdown-basic" className="p-0">
                <i className="icon dripicons-bell text-white"></i>
                {unreadNotificaionCount ? (
                  <span className="noti-count">{unreadNotificaionCount}</span>
                ) : null}
                {/* {notifications?.filter(
                  (notification) =>
                    !(notification?.readedBy || [])?.includes(userId || "")
                )?.length ? (
                  <span className="noti-count">
                    {
                      notifications?.filter(
                        (notification) =>
                          !(notification?.readedBy || [])?.includes(
                            userId || ""
                          )
                      )?.length
                    }
                  </span>
                ) : null} */}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-right profile-dropdown">
                <div className="card card-notification">
                  <div className="card-header d-flex align-items-center">
                    <h5 className="card-title m-0">Notifications</h5>
                    <ul className="actions top-right">
                      <li>
                        <Dropdown className="btn-group">
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="btn btn-sm btn-icon-only"
                          >
                            <i className="icon dripicons-dots-3 zmdi-hc-fw rotate-90"></i>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={markAsRead}>
                              <i className="fa fa-check-circle fa-fw text-accent-custom"></i>{" "}
                              Mark as All Read
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="card-container-wrapper">
                      <div
                        className="card-container m-0 p-0"
                        data-scroll="dark"
                      >
                        <div className="timeline">
                          {notifications?.length ? (
                            notifications?.map((notification) => (
                              <div className="mb-3 p-0" key={notification?.id}>
                                <Link
                                  to="/settings/notifications/received"
                                  className="default-color"
                                >
                                  {notification?.description}. <br />
                                  <small className="text-muted">
                                    {moment(notification?.createdAt)?.format(
                                      "DD/MM/YYYY hh:mm A"
                                    )}
                                  </small>
                                </Link>
                              </div>
                            ))
                          ) : (
                            <div>
                              <p>Notificaions not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="nav-item dropdown">
            <Dropdown
              align="end"
              className="btn-group"
              style={{ marginTop: ".46rem" }}
            >
              <Dropdown.Toggle id="dropdown-basic">
                <img
                  src={User}
                  className="w-35 h-35 min-w-35 o-cover rounded-circle"
                  alt="John Smith"
                  height="35px"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="profile-dropdown"
                style={{
                  animationName: "slideUpIn!important",
                }}
              >
                <div className="dropdown-header">
                  <div className="media d-user">
                    <img
                      className="align-self-center mr-3 w-40 h-40 o-cover rounded-circle"
                      src={User}
                      alt="John Smith"
                    />
                    <div className="media-body">
                      <h5 className="mt-0 mb-0">
                        {adminProfile?.fullName || "-"}
                      </h5>
                      <span style={{ fontSize: ".6875rem" }}>
                        {adminProfile?.email || "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <Dropdown.Item
                  className="header-dropdown-item"
                  as={Link}
                  to={`/settings/profile`}
                >
                  <i className="icon dripicons-user"></i> My Profile
                </Dropdown.Item>
                <Dropdown.Item
                  className="header-dropdown-item"
                  as={Link}
                  to={`/settings/change-password`}
                >
                  <i className="icon dripicons-gear"></i> Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  className="header-dropdown-item"
                  onClick={logoutHandler}
                >
                  <i className="icon dripicons-lock"></i> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Header;

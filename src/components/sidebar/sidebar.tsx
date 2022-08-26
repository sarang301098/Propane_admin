import React from "react";
import { NavLink, useHistory } from "react-router-dom";

export const Sidebar = () => {
  const history = useHistory();
  const isActive = (item: typeof navItems[0]) =>
    (item.routes || []).some((route) =>
      history.location.pathname.startsWith(route)
    );
  const navItems = [
    {
      title: "My Profile",
      icon: "icons dripicons-user",
      to: "/settings/profile",
      routes: ["/settings/profile"],
    },
    {
      title: "Time Slot",
      icon: "icons dripicons-clock",
      to: "/settings/timeslot/list",
      routes: ["/settings/timeslot/list"],
    },
    {
      title: "Government Holidays",
      icon: "icons dripicons-calendar",
      to: "/settings/holiday/list",
      routes: ["/settings/holiday/list"],
    },
    {
      title: "Transactions",
      icon: "icons dripicons-document",
      to: "/settings/transactions",
      routes: ["/settings/transactions"],
    },
    {
      title: "Subscription Customers",
      icon: "icons dripicons-user-id",
      to: "/settings/memberships/registered",
      routes: [
        "/settings/memberships/registered",
        "/settings/memberships/subscribed",
      ],
    },
    {
      title: "Membership Plans",
      icon: "icons dripicons-menu",
      to: "/settings/membership-plans/fuel-delivery",
      routes: [
        "/settings/membership-plans/fuel-delivery",
        "/settings/membership-plans/tank-exchange",
      ],
    },
    {
      title: "Email Templates",
      icon: "icons dripicons-document",
      to: "/settings/email-templates/list",
      routes: ["/settings/email-templates"],
    },
    {
      title: "Roles & Permissions",
      icon: "icons dripicons-menu",
      to: "/settings/roles-permissions",
      routes: ["/settings/roles-permissions"],
    },
    {
      title: "Sub Admins",
      icon: "icons dripicons-user-group",
      to: "/settings/sub-admins",
      routes: ["/settings/sub-admins"],
    },
    {
      title: "Notifications",
      icon: "icons dripicons-bell",
      to: "/settings/notifications/received",
      routes: ["/settings/notifications/received"],
    },
    {
      title: "App Settings",
      icon: "icons dripicons-gear",
      to: "/settings/app-settings/orders/fuel-delivery",
      routes: [
        "/settings/app-settings/orders/fuel-delivery",
        "/settings/app-settings/general",
        "/settings/app-settings/orders/tank-exchange",
      ],
    },
    {
      title: "CMS Pages",
      icon: "icons dripicons-document",
      to: "/settings/cms/customers",
      routes: [
        "/settings/cms/customers",
        "/settings/cms/vendors",
        "/settings/cms/driver",
        "/settings/cms/xyz",
      ],
    },
  ];
  return (
    <React.Fragment>
      <aside className="sidebar sidebar-left">
        <div className="sidebar-content">
          <nav className="main-menu">
            <ul className="nav metismenu">
              {navItems?.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.to}
                    className={isActive(item) ? "active-sidebar-link" : ""}
                  >
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;

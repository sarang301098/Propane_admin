import { lazy } from "react";

const routes = [
  {
    path: "dashboard",
    component: lazy(() => import("../pages/dashboard/dashboard")),
    exact: true,
  },
  {
    path: "settings/profile",
    component: lazy(() => import("../pages/profile/profile")),
    exact: true,
  },
  {
    path: "settings/profile/edit",
    component: lazy(() => import("../pages/profile/edit-profile")),
    exact: true,
  },
  {
    path: "settings/change-password",
    component: lazy(() => import("../pages/profile/change-password")),
    exact: true,
  },
  {
    path: "settings/roles-permissions",
    component: lazy(() => import("../pages/roles-permissions/list")),
    exact: true,
  },
  {
    path: "settings/roles-permissions/:id",
    component: lazy(() => import("../pages/roles-permissions/form")),
    exact: true,
  },
  {
    path: "settings/sub-admins",
    component: lazy(() => import("../pages/sub-admins/list")),
    exact: true,
  },
  {
    path: "settings/app-settings/orders/fuel-delivery",
    component: lazy(() => import("../pages/app-settings/OrderFuel")),
    exact: true,
  },
  {
    path: "settings/app-settings/orders/tank-exchange",
    component: lazy(() => import("../pages/app-settings/OrderTank")),
    exact: true,
  },
  {
    path: "settings/app-settings/general",
    component: lazy(() => import("../pages/app-settings/General")),
    exact: true,
  },
  {
    path: "reports/customer",
    component: lazy(() => import("../pages/report/CustomerReports")),
    exact: true,
  },
  {
    path: "reports/vendor",
    component: lazy(() => import("../pages/report/VendorReports")),
    exact: true,
  },
  {
    path: "reports/driver",
    component: lazy(() => import("../pages/report/DriverReports")),
    exact: true,
  },
  {
    path: "reports/order",
    component: lazy(() => import("../pages/report/OrderReports")),
    exact: true,
  },
  {
    path: "reports/product",
    component: lazy(() => import("../pages/report/ProductReports")),
    exact: true,
  },
  {
    path: "reports/transaction",
    component: lazy(() => import("../pages/report/TransactionReports")),
    exact: true,
  },
  {
    path: "reports/inventory-stock",
    component: lazy(() => import("../pages/report/InventoryStockReports")),
    exact: true,
  },
  {
    path: "earnings/net",
    component: lazy(() => import("../pages/earnings/NetEarnings")),
    exact: true,
  },
  {
    path: "earnings/cancelled-orders",
    component: lazy(() => import("../pages/earnings/CancelledOrdersEarnings")),
    exact: true,
  },
  {
    path: "orders/pending-orders/fuel-delivery",
    component: lazy(() => import("../pages/orders/pending-orders/pending-orders-fuel")),
    exact: true,
  },
  {
    path: "orders/pending-orders/tank-exchange",
    component: lazy(() => import("../pages/orders/pending-orders/pending-orders-tank")),
    exact: true,
  },
  {
    path: "orders/orders-history/fuel-delivery",
    component: lazy(() => import("../pages/orders/orders-history/orders-history-fuel")),
    exact: true,
  },
  {
    path: "orders/orders-history/tank-exchange",
    component: lazy(() => import("../pages/orders/orders-history/order-history-tank")),
    exact: true,
  },
  {
    path: "orders/all-orders/fuel-delivery",
    component: lazy(() => import("../pages/orders/all-orders/all-orders-fuel")),
    exact: true,
  },
  {
    path: "orders/all-orders/tank-exchange",
    component: lazy(() => import("../pages/orders/all-orders/all-orders-tank")),
    exact: true,
  },
  {
    path: "orders/view-fuel-delivery/:orderId/basic-details",
    component: lazy(() => import("../pages/orders/view-order-fuel/view-order-fuel-delivery-basic-details")),
    exact: true,
  },
  {
    path: "orders/view-fuel-delivery/:orderId/order-summary",
    component: lazy(() => import("../pages/orders/view-order-fuel/view-order-fuel-delivery-order-summary")),
    exact: true,
  },
  {
    path: "orders/view-fuel-delivery/:orderId/driver-details",
    component: lazy(() => import("../pages/orders/view-order-fuel/view-order-fuel-delivery-driver-details")),
    exact: true,
  },
  {
    path: "orders/view-propane-tank/:orderId/basic-details",
    component: lazy(() => import("../pages/orders/view-order-tank/view-order-propane-tank-basic-details")),
    exact: true,
  },
  {
    path: "orders/view-propane-tank/:orderId/order-summary",
    component: lazy(() => import("../pages/orders/view-order-tank/view-order-propane-tank-order-summary")),
    exact: true,
  },
  {
    path: "orders/view-propane-tank/:orderId/driver-details",
    component: lazy(() => import("../pages/orders/view-order-tank/view-order-propane-tank-driver-details")),
    exact: true,
  },
  {
    path: "orders/map",
    component: lazy(() => import("../pages/orders/map")),
    exact: true,
  },
  {
    path: "customers",
    component: lazy(() => import("../pages/customers/list")),
    exact: true,
  },
  {
    path: "customers/view/:customerId/basic-details",
    component: lazy(() => import("../pages/customers/view-customer-details/ViewCustomersBasicDetails")),
    exact: true,
  },
  {
    path: "customers/view/:customerId/membership-details",
    component: lazy(() => import("../pages/customers/view-customer-details/ViewCustomersMembershipDetails")),
    exact: true,
  },
  {
    path: "customers/view/:customerId/orders/fuel-delivery",
    component: lazy(() => import("../pages/customers/view-customer-orders/ViewCustomerOrderFuelDelivery")),
    exact: true,
  },
  {
    path: "customers/view/:customerId/orders/tank-exchange",
    component: lazy(() => import("../pages/customers/view-customer-orders/ViewCustomerOrdersPropaneTank")),
    exact: true,
  },
  {
    path: "settings/memberships/registered",
    component: lazy(() => import("../pages/memberships/registeredCustomers")),
    exact: true,
  },
  {
    path: "settings/memberships/subscribed",
    component: lazy(() => import("../pages/memberships/subscribedCustomers")),
    exact: true,
  },
  {
    path: "drivers/vendor-drivers",
    component: lazy(() => import("../pages/drivers/vendor-drivers")),
    exact: true,
  },
  {
    path: "drivers/freelance-drivers",
    component: lazy(() => import("../pages/drivers/freelance-drivers")),
    exact: true,
  },
  {
    path: "drivers/view/:id/basic-details",
    component: lazy(() => import("../pages/drivers/drivers-view/DriverViewBasicDetails")),
    exact: true,
  },
  {
    path: "drivers/view/:id/orders/fuel-delivery",
    component: lazy(() => import("../pages/drivers/drivers-view/DriverViewOrdersDetailsFuel")),
    exact: true,
  },
  {
    path: "drivers/view/:id/orders/tank-exchange",
    component: lazy(() => import("../pages/drivers/drivers-view/DriverViewOrdersDetailsTank")),
    exact: true,
  },
  {
    path: "drivers/freelance-driver-payment",
    component: lazy(() => import("../pages/freelance-driver-payment/list")),
    exact: true,
  },
  {
    path: "drivers/:driverId/completed-orders",
    component: lazy(() => import("../pages/freelance-driver-payment/completed-orders")),
    exact: true,
  },
  {
    path: "vendors/list",
    component: lazy(() => import("../pages/vendors/list")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/basic-details",
    component: lazy(() => import("../components/vendors/ViewVendorBasicDetails")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/business-details",
    component: lazy(() => import("../components/vendors/ViewVendorBusinessDetails")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/product-pricing/fuel-delivery",
    component: lazy(() => import("../components/vendors/ViewVendorFuelDeliveryProduct")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/product-pricing/tank-exchange",
    component: lazy(() => import("../components/vendors/ViewVendorTankExchangeProduct")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/schedule",
    component: lazy(() => import("../components/vendors/ViewVendorSchedule")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/accessories",
    component: lazy(() => import("../components/vendors/ViewVendorAccessories")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/fees-settings",
    component: lazy(() => import("../components/vendors/ViewVendorFees")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/orders/fuel-delivery",
    component: lazy(() => import("../components/vendors/ViewVendorsFuelDeliveryOrders")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/orders/tank-exchange",
    component: lazy(() => import("../components/vendors/ViewVendorsTankExchangeOrder")),
    exact: true,
  },
  {
    path: "vendors/view/:vendorId/stock-history",
    component: lazy(() => import("../components/vendors/ViewVendorsStockHistory")),
    exact: true,
  },
  {
    path: "vendors/:vendorId",
    component: lazy(() => import("../pages/vendors/add")),
    exact: true,
  },
  {
    path: "settings/notifications/received",
    component: lazy(() => import("../pages/notifications/NotificationRecieved")),
    exact: true,
  },
  {
    path: "settings/notifications/sent",
    component: lazy(() => import("../pages/notifications/NotificationSent")),
    exact: true,
  },
  {
    path: "settings/notifications/new",
    component: lazy(() => import("../pages/notifications/form")),
    exact: true,
  },
  {
    path: "settings/email-templates/list",
    component: lazy(() => import("../pages/email-templates/list")),
    exact: true,
  },
  {
    path: "settings/email-templates/:templateId/edit",
    component: lazy(() => import("../pages/email-templates/form")),
    exact: true,
  },
  {
    path: "settings/email-templates/:templateId/view",
    component: lazy(() => import("../pages/email-templates/view")),
    exact: true,
  },
  {
    path: "schedule/list",
    component: lazy(() => import("../pages/schedule/list")),
    exact: true,
  },
  {
    path: "location-where-to-deliver/list",
    component: lazy(() => import("../pages/location-where-to-deliver/list")),
    exact: true,
  },
  {
    path: "promo-codes/fuel-delivery",
    component: lazy(() => import("../pages/promocode/FuelDeliveryPromocode")),
    exact: true,
  },
  {
    path: "promo-codes/tank-exchange",
    component: lazy(() => import("../pages/promocode/TankExchangePromocode")),
    exact: true,
  },
  {
    path: "promo-codes/:promocodeId",
    component: lazy(() => import("../pages/promocode/form")),
    exact: true,
  },
  {
    path: "settings/cms/view/:pageId",
    component: lazy(() => import("../pages/cms/view")),
    exact: true,
  },
  {
    path: "settings/cms/form/:pageId",
    component: lazy(() => import("../pages/cms/form")),
    exact: true,
  },
  {
    path: "settings/cms/",
    component: lazy(() => import("../pages/cms/list")),
  },
  {
    path: "products/",
    component: lazy(() => import("../pages/products/list")),
  },
  {
    path: "accessories/list",
    component: lazy(() => import("../pages/accessories/list")),
    exact: true,
  },
  {
    path: "cylinder-size/list",
    component: lazy(() => import("../pages/cylinder-size/list")),
    exact: true,
  },
  {
    path: "settings/transactions",
    component: lazy(() => import("../pages/transactions/list")),
    exact: true,
  },
  {
    path: "settings/membership-plans/fuel-delivery",
    component: lazy(() => import("../pages/membership-plans/fuel-delivery-plans")),
    exact: true,
  },
  {
    path: "settings/membership-plans/tank-exchange",
    component: lazy(() => import("../pages/membership-plans/propane-tank-plans")),
    exact: true,
  },
  {
    path: "settings/membership-plans/fuel-delivery/:id/edit",
    component: lazy(() => import("../pages/membership-plans/form-fuel-delivery")),
    exact: true,
  },
  {
    path: "settings/membership-plans/tank-exchange/:id/edit",
    component: lazy(() => import("../pages/membership-plans/form-propane-tank")),
    exact: true,
  },
  {
    path: "states",
    component: lazy(() => import("../pages/tax-configuration/states")),
    exact: true,
  },
  {
    path: "states/:stateId/county",
    component: lazy(() => import("../pages/tax-configuration/county")),
    exact: true,
  },
  {
    path: "states/:stateId/counties/:countyId/zip-codes",
    component: lazy(() => import("../pages/tax-configuration/zipcode")),
    exact: true,
  },
  {
    path: "settings/timeslot/list",
    component: lazy(() => import("../pages/timeslot/list")),
    exact: true,
  },
  {
    path: "settings/holiday/list",
    component: lazy(() => import("../pages/holiday/list")),
    exact: true,
  },
  {
    path: "/",
    component: lazy(() => import("../pages/dashboard/dashboard")),
    exact: true,
  },
  {
    path: "*",
    component: lazy(() => import("../components/pageNotFound/PageNotFound")),
    exact: true,
  },
];

export default routes;

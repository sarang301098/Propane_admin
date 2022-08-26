import { combineReducers, CombinedState } from "redux";
import { Reducer } from "react";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/auth.reducer";
import testReducer from "./test/test.reducer";
import dashboardReducer from "./DashboardStore/dashboard.reducer";
import customerReducer from "./customer/customer.reducer";
import cmsReducer from "./cms/cms.reducer";
import deliveryLocationReducer from "./deliveryLocation/deliveryLocation.reducer";
import salesTaxReducer from "./salesTax/salesTax.reducer";
import emailTemplateReducer from "./emailTemplate/emailTemplate.reducer";
import earningReducer from "./earnings/earning.reducer";
import timeSlotReducer from "./timesSlot/timeSlot.reducer";
import paginationReducer from "./pagination/pagination.reducer";
import appSettingsReducer from "./appSettings/appSettings.reducer";
import accessoriesReducer from "./accessories/accessories.reducer";
import productsReducer from "./products/products.reducer";
import categoryReducer from "./category/category.reducer";
import cylinderSizeReducer from "./cylinderSize/cylinderSize.reducer";
import profileReducer from "./profile/profile.reducer";
import vendorReducer from "./vendor/vendor.reducer";
import orderReducer from "./orders/orders.reducer";
import membershipReducer from "./membership/membership.reducer";
import userReducer from "./user/user.reducer";
import promocodeReducer from "./promocode/promocode.reducer";
import transactionReducer from "./transactions/transaction.reducer";
import governmentHolidayReducer from "./governmentHolidays/governmentHolidays.reducer";
import notificationReducer from "./notification/notification.reducer";
import ReportReducer from "./reports/reports.reducer";
import membershipPlansReducer from "./membershipPlan/membershipPlans.reducer";
import driversReducer from "./drivers/drivers.reducer";
import subAdminReducer from "./subAdmin/subAdmin.reducer";
import rolesAndPermissionReducer from "./rolesAndPermissions/rolesAndPermissions.reducer";

const driversPersistConfig = {
  key: "drivers",
  storage: storage,
  whitelist: ["driverId"],
};

const customerPersistConfig = {
  key: "customer",
  storage: storage,
  whitelist: ["customerId"],
};

const membershipPlansPersistConfig = {
  key: "membershipPlans",
  storage: storage,
  whitelist: ["membershipPlansById", "planId"],
};

const ordersPersistConfig = {
  key: "orders",
  storage: storage,
  whitelist: ["orderId"],
};

const reducers: Reducer<CombinedState<any>, any> = combineReducers({
  auth: authReducer,
  test: testReducer,
  dashboard: dashboardReducer,
  customer: persistReducer(customerPersistConfig, customerReducer),
  cms: cmsReducer,
  deliveryLocation: deliveryLocationReducer,
  salesTax: salesTaxReducer,
  emailTemplate: emailTemplateReducer,
  earning: earningReducer,
  timeSlot: timeSlotReducer,
  pagination: paginationReducer,
  appSettings: appSettingsReducer,
  accessories: accessoriesReducer,
  products: productsReducer,
  category: categoryReducer,
  cylinderSize: cylinderSizeReducer,
  profile: profileReducer,
  vendor: vendorReducer,
  orders: persistReducer(ordersPersistConfig, orderReducer),
  membership: membershipReducer,
  user: userReducer,
  promocode: promocodeReducer,
  transaction: transactionReducer,
  governmentHoliday: governmentHolidayReducer,
  notification: notificationReducer,
  reports: ReportReducer,
  membershipPlans: persistReducer(membershipPlansPersistConfig, membershipPlansReducer),
  drivers: persistReducer(driversPersistConfig, driversReducer),
  subAdmin: subAdminReducer,
  rolesAndPermission: rolesAndPermissionReducer,
});
export default reducers;

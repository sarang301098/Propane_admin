import { TAuthState } from "./auth/auth.types";
import { TTestState } from "./test/test.types";
import { TSalesTaxState } from "./salesTax/salesTax.types";
import { TCylinderSizeState } from "./cylinderSize/cylinderSize.types";
import { TCustomerState } from "./customer/customer.types";
import { TCmsPagesState } from "./cms/cms.types";
import { TAppSettingsState } from "./appSettings/appSettings.types";
import { TAccessoriesState } from "./accessories/accessories.types";
import { TProductsState } from "./products/products.types";
import { TCategoryState } from "./category/category.types";
import { TDeliveryLocationState } from "./deliveryLocation/deliveryLocation.types";
import { TEmailTemplateState } from "./emailTemplate/emailTemplate.types";
import { TDashboardState } from "./DashboardStore/dashboard.types";
import { TPaginationState } from "./pagination/pagination.types";
import { TTimeSlotState } from "./timesSlot/timeSlot.types";
import { TEarningState } from "./earnings/earning.types";
import { TProfileState } from "./profile/profile.types";
import { TVendorState } from "./vendor/vendor.types";
import { TOrdersState } from "./orders/orders.types";
import { TTransactionState } from "./transactions/transaction.types";
import { TMembershipState } from "./membership/membership.types";
import { THolidayState } from "./governmentHolidays/governmentHolidays.types";
import { TNotificationState } from "./notification/notification.types";
import { TUserState } from "./user/user.types";
import { TPromocodeState } from "./promocode/promocode.types";
import { TReportsState } from "./reports/reports.types";
import { TMembershipPlansState } from "./membershipPlan/membershipPlans.types";
import { TDriversState } from "./drivers/drivers.types";
import { TSubAdminState } from "./subAdmin/subAdmin.types";
import { TRolesAndPermissionState } from "./rolesAndPermissions/rolesAndPermissions.types";

/**
 * Import all not available imports.
 * Module wise who made that module import accordingly.
 */

type TRootState = {
  auth: TAuthState;
  test: TTestState;
  salesTax: TSalesTaxState;
  cylinderSize: TCylinderSizeState;
  customer: TCustomerState;
  cms: TCmsPagesState;
  appSettings: TAppSettingsState;
  accessories: TAccessoriesState;
  products: TProductsState;
  category: TCategoryState;
  deliveryLocation: TDeliveryLocationState;
  emailTemplate: TEmailTemplateState;
  dashboard: TDashboardState;
  pagination: TPaginationState;
  timeSlot: TTimeSlotState;
  earning: TEarningState;
  profile: TProfileState;
  vendor: TVendorState;
  orders: TOrdersState;
  transaction: TTransactionState;
  membership: TMembershipState;
  governmentHoliday: THolidayState;
  notification: TNotificationState;
  user: TUserState;
  promocode: TPromocodeState;
  reports: TReportsState;
  membershipPlans: TMembershipPlansState;
  drivers: TDriversState;
  subAdmin: TSubAdminState;
  rolesAndPermission: TRolesAndPermissionState;
};

export default TRootState;

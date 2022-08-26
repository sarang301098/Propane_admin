import { ActionType } from "typesafe-actions";

import * as actions from "./reports.action";

type TReportsActionType = ActionType<typeof actions>;

type TCustomerDetails = {
  user_id: string;
  user_full_name: string;
  user_email: string;
  user_mobile_number: number;
  user_user_type: string;
  user_created_at: string;
  user_is_active: boolean;
  user_user_subscription_count: number;
  TotalAmountPaid: number;
  TotalOrders: string | number;
  user_country_code: string;
}[];

type TGetVendorReportsPayload = {
  user_id: string;
  user_full_name: string;
  user_email: string;
  user_country_code: string;
  user_mobile_number: number;
  user_user_type: string;
  user_created_at: string;
  user_is_active: boolean;
  TotalAmountPaidOnline: number;
  TotalEarning: number;
  VendorNetEarning: number;
  TotalAmountDueToAdmin: number;
  AdminNetEarning: number;
  totalAmountPaidToFreelanceDriver: number;
  DeliveredOrders: number;
  RescheduleOrders: number;
  PassesOrders: number;
}[];

type TGetDriverReportsPayload = {
  user_id: string;
  user_full_name: string;
  user_email: string;
  user_mobile_number: number;
  user_user_type: string;
  user_created_at: string;
  user_is_active: boolean;
  drivers_is_online: boolean;
  vendors_business_name: string;
  users_full_name: string;
  vendor_id: string;
  TotalOrders: number;
  totalAmount: number;
  user_country_code: string;
}[];

type TGetTransactionReportsPayload = {
  id: number;
  orderType: number;
  grandTotal: number;
  scheduleDate: string;
  vendorReceivedAmount: number;
  adminReceivedAmount: number;
  createdAt: string;
  vendor: TUserDetails;
  driver: TUserDetails;
  order: {
    id: number;
    isPaid: boolean;
    user: TUserDetails;
  };
}[];
type TUserDetails = {
  id: string;
  fullName: string;
  email: string;
  countryCode: string;
  mobileNumber: number;
};

type TInventoryStockReportsPayload = {
  addedAt: string;
  addedStockQty: number;
  remainingStock: number;
  openingStock: number;
  soldOutStock: number;
  category: {
    name: string;
  };
  product: {
    name: string;
  };
  accessory: {
    name: string;
  };
  cylinderSize: {
    cylinderSize: number;
  };
  vendor: {
    businessName: number;
    user: {
      id: string;
      fullName: string;
    };
  };
}[];
type TProductReportsPayload = {
  products_name: string;
  orderdetails_order_type: number;
  cylinderSizes_cylinder_size: number;
  TotalOrder: number;
  TotalSales: number;
}[];

type TOrderReportsPayload = {
  driver_full_name: string;
  driver_id: string;
  orderDetails_admin_received_amount: number;
  orderDetails_created_at: string;
  orderDetails_grand_total: number;
  orderDetails_id: number;
  orderDetails_order_type: number;
  orderDetails_schedule_date: string;
  orderDetails_status: string;
  order_id: number;
  order_is_paid: boolean;
  user_full_name: string;
  user_id: string;
  vendor_full_name: string;
  vendor_id: string;
  vendorsDriver: boolean;
}[];

type TReportsState = {
  loading: boolean;
  customerData: { customers: TCustomerDetails; count: number };
  vendorData: { vendor: TGetVendorReportsPayload; count: number };
  driverData: { drivers: TGetDriverReportsPayload; count: number };
  orderData: { ordersReports: TOrderReportsPayload; count: number };
  productData: { productReports: TProductReportsPayload; count: number };
  transactionData: {
    transactions: TGetTransactionReportsPayload;
    count: number;
  };
  inventoryStockData: {
    inventoryReports: TInventoryStockReportsPayload;
    count: number;
  };
};

export {
  TReportsActionType,
  TReportsState,
  TGetCustomerReportsPayload,
  TGetDriverReportsPayload,
  TGetVendorReportsPayload,
  TGetTransactionReportsPayload,
  TInventoryStockReportsPayload,
  TProductReportsPayload,
  TOrderReportsPayload,
  TCustomerDetails,
  TUserDetails,
};

import { ActionType } from "typesafe-actions";

import * as actions from "./drivers.action";

type TDriversActionType = ActionType<typeof actions>;

type TGetVendorDriversPayload = {
  count: number;
  drivers: {
    id: string;
    fullName: string;
    createdAt: string;
    isActive: boolean;
    mobileNumber: number;
    profileImage: string | null;
    countryCode: number;
    driver: {
      id: string | number;
      isSuspended: boolean;
      isOnline: boolean;
      isApproved: boolean;
      orderType: number;
      zipcodeIds: string | number;
      personalId: string | number;
      idInformation: string | number;
      driverVehicle: string | number;
      vehicalNo: string;
      status: number;
      lat: number;
      long: number;
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      identity: string | number;
      updatedBy: string;
      licenceNo: string | number;
      identityInformation: string | number;
      orderCapacity: number;
      vendorId: number;
    };
    orders: {
      1: {
        id: number;
        orderType: number;
        status: string;
      }[];
      2: {
        id: number;
        orderType: number;
        status: string;
      }[];
    };
  }[];
};

type TDriverDetailsPayload = {
  id: string;
  fullName: string;
  email: string;
  countryCode: number;
  mobileNumber: number;
  userType: string;
  profileImage: string;
  stripeCustomerId: null;
  userSubscriptionCount: null;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  createdBy: null | string;
  updatedBy: null | string;
  isActive: boolean;
  driver: {
    id: string | number;
    isSuspended: boolean;
    isOnline: boolean;
    isApproved: boolean;
    orderType: number;
    zipcodeIds: string | number;
    personalId: string | number;
    idInformation: string | number;
    driverVehicle: string;
    vehicalNo: string;
    status: number;
    lat: number;
    long: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    identity: string | number;
    updatedBy: string;
    licenceNo: string | number;
    identityInformation: string | number;
    orderCapacity: number;
    vendorId: number;
  };
  documents: {
    id: number;
    documentUrl: string;
    documentType: number;
  }[];
  orders: {
    1: {
      id: number;
      orderType: number;
      status: string;
    }[];
    2: {
      id: number;
      orderType: number;
      status: string;
    }[];
  };
};

type TGetFreelanceDriversPayload = {
  count: number;
  drivers: {
    user_id: string | number;
    user_full_name: string;
    user_email: string;
    user_country_code: string | number;
    user_mobile_number: string | number;
    user_profile_image: any;
    TotalAmount: number | null;
    completedOrder: number | null;
    paidAmount: number | null;
    orders_is_paid: number | string;
    remainingAmounts: string | number;
  }[];
};

type TGetDriverOrdersPayload = {
  count: number;
  orders: {
    id: number;
    orderType: number;
    status: string;
    imageOne: null | string;
    imageTwo: null | string;
    startTime: string;
    endTime: string;
    subTotal: number;
    grandTotal: number;
    leakageFee: number;
    scheduleDate: string;
    indexPrice: number;
    vendorDeliveryFee: number;
    generalDeliveryFee: null | number;
    vendorReceivedAmount: number;
    freelanceDriverReceivedAmount: number;
    driverCancellationCharge: number;
    customerCancellationCharge: number;
    adminReceivedAmount: number;
    refundAmount: number;
    cancellationReasonOther: null | string;
    salesTaxPercentage: number;
    salesTaxAmount: number;
    locationFee: number;
    cylindersize: number;
    qty: number;
    priority: null | string;
    isDelivered: boolean;
    promocodeDiscountAmount: number;
    promocodeDiscountPercentage: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    createdBy: null | string;
    updatedBy: null | string;
    orderId: number;
    productId: null | number;
    vendorId: string;
    driverId: string;
    locationId: number;
    cylinderSizeId: number;
    categoryId: number;
    accessoryId: null | number;
    promocodeId: null | number;
    cancellationReasonId: null | number;
    lat: number;
    long: number;
    userId: string;
    userName: string;
    address: string;
    timeSlotsId: number;
    invoicedReceiptUrl: string;
    vendorName: string;
    isVendorsDriver: number;
    driverName: string;
    categoryName: string;
  }[];
};

type TGetDriverOrdersTankPayload = {
  count: number;
  ordersTank: {
    orderId: string;
    status: string;
    createdOn: string;
    customerName: string;
    category: string;
    startSlot: string;
    endSlot: string;
    city: string;
    country: string;
    zipCode: string;
    driverName: string;
    freelance: boolean;
    vendorName: string;
  }[];
};

type TGetDriverCompletedOrdersTankPayload = {
  count: number;
  orders: {
    id: string;
    status: string;
    createdAt: string;
    customerName: string;
    // category: string;
    startTime: string;
    endTime: string;
    address: string;
    scheduleDate: string;
    vendorName: string;
    orderType: number;
  }[];
};

type TAllDrivers = {
  drivers: { id: string; fullName: string }[];
  count: number;
};

type TDriversState = {
  loading: boolean;
  vendorDriversList: TGetVendorDriversPayload;
  freelanceDriversList: TGetVendorDriversPayload;
  driverId: string;
  singleDriverData: TDriverDetailsPayload | null;
  freelanceDriversPaymentList: TGetFreelanceDriversPayload;
  driverOrdersList: TGetDriverOrdersPayload;
  driverOrdersTankList: TGetDriverOrdersTankPayload;
  completedOrdersList: TGetDriverCompletedOrdersTankPayload;
  allDrivers: TAllDrivers;
  allVendorDrivers: { id: string | number; fullName: string }[];
  allFreelanceDrivers: { id: string | number; fullName: string }[];
  driverLocation: { lat: string | number; long: string | number } | null;
};

export {
  TDriversActionType,
  TGetVendorDriversPayload,
  TGetFreelanceDriversPayload,
  TGetDriverOrdersPayload,
  TGetDriverOrdersTankPayload,
  TGetDriverCompletedOrdersTankPayload,
  TDriversState,
  TDriverDetailsPayload,
};

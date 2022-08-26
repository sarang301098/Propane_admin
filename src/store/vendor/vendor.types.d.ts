import { ActionType } from "typesafe-actions";
import * as actions from "./vendor.action";

type TVendorPayload = {
  countryCode: string;
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  isActive: boolean;
  mobileNumber: string;
  profileImage: null | string;
  userType: string;
  vendor: {
    comissionFee: null | number;
    id: string | number;
    leakageFee: null | number;
    status: number;
    zipcodeIds: (number | string)[];
  };
};

type TVendorState = {
  loading: boolean;
  vendorByIdLoading: boolean;
  vendorsData: { count: number; vendor: TVendorPayload[] };
  singleVendorData: TAddVendorPayload | null;
  product: {
    vendorProducts: TVendorProductPayload[];
    count: number;
  };
  allVendors: { id: string | number; fullName: string }[];
  vendorOrders: { orders: TVendorOrder[]; count: number };
  stockHistory: TVendorStockHistory;
};

type TVendorProductTiers = {
  [key: string]: string | number | Record<string, string | number>[] | boolean;
  createdAt: string;
  createdBy: string;
  from: number;
  id: number;
  to: number;
  pricing: {
    createdAt: string;
    createdBy: string;
    id: number;
    price: number;
    updatedAt: string;
    updatedBy: string;
  }[];
  updatedAt: string;
  updatedBy: string;
  position: number;
  vendorProductId: number;
};

type TVendorPricing = Partial<{
  createdAt: string;
  categoryId: number;
  cylinderSizeId: number;
  createdBy: string;
  id: number;
  price: number;
  vendorProductId: number;
  vendorProductTiersId: number;
  updatedAt: string;
  updatedBy: string;
  [key: string]: string | number;
}>[];

type TVendorProductPayload = {
  createdAt: string;
  createdBy: string;
  id: number;
  isCompleted: boolean;
  isSalesTax: boolean;
  pricing: TVendorPricing;
  tiers: TVendorProductTiers[];
  updatedAt: string;
  updatedBy: string;
  isNewProduct?: boolean;
  isTiersSaved?: boolean;
  isPriceSaved?: boolean;
  vendorId: string;
  zipcodeIds: null | string[];
  productId: string | undefined;
  product: {
    details: {
      categoryId: number;
      discount: number;
      id: number;
      indexPrice: number | string;
      productId: number;
    }[];
    id: number;
    status: number;
    name: string;
  };
};

type TVendorStockHistory = {
  vendorStock: {
    addedAt: string;
    addedStockQty: number;
    remainingStock: number;
    openingStock: number;
    soldOutStock: null | string;
    category: {
      id: number;
      name: string;
    };
    product: {
      id: number;
      name: string;
    };
    cylinderSize: {
      id: number;
      cylinderSize: number;
    };
    accessory: {
      id: number;
      name: string;
    };
  }[];
  count: number;
};

type TVendorProduct = {
  id: number;
  isCompleted: boolean;
  isSalesTax: boolean;
  orderType: number;
  productId: number;
  pricing: {
    categoryId: number;
    createdAt: string;
    createdBy: string;
    cylinderSizeId: number;
    deletedAt: null | string;
    id: number;
    price: number;
    updatedAt: string;
    updatedBy: string;
    vendorProductId: number;
    vendorProductTiersId: number;
  }[];
  product: {
    id: number;
    isActive: boolean;
    logo: string;
    name: string;
    orderType: number;
    status: number;
    details: {
      categoryId: number;
      createdAt: string;
      createdBy: string;
      deletedAt: null | string;
      discount: number;
      id: number;
      indexPrice: number;
      productId: number;
      updatedAt: string;
      updatedBy: string;
    }[];
    pricing: {
      categoryId: number;
      createdAt: string;
      createdBy: string;
      cylinderSizeId: 2;
      deletedAt: null | string;
      id: number;
      price: number;
      updatedAt: string;
      updatedBy: string;
      vendorProductId: number;
      vendorProductTiersId: number;
    }[];
    tiers: {
      createdAt: string;
      createdBy: string;
      deletedAt: null | string;
      from: number;
      id: number;
      position: number;
      to: number;
      updatedAt: string;
      updatedBy: string;
      vendorProductId: number;
    }[];
    vendorId: string;
    zipcodeIds: null;
  };
};

type TVendorOrder = {
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
};

type TAddVendorPayload = {
  fullName: string;
  email: string;
  countryCode: string;
  mobileNumber: number;
  userType: string;
  otp: null | number;
  profileImage: null | string;
  deletedAt: null | string;
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  documents: {
    createdAt: string;
    createdBy: null | string;
    deletedAt: null | string;
    documentType: number;
    documentUrl: string;
    id: number | string;
    updatedAt: string;
    updatedBy: null | string;
    userId: string;
  };
  vendor: {
    zipcodeIds: (number | string)[];
    status: number;
    createdBy: string;
    updatedBy: string;
    businessName: null | string;
    businessAddress: null | string;
    comissionFee: number;
    leakageFee: null | string;
    phoneNumber: null | number;
    verificationSendDatetime: null | string;
    lowStockReminder: null;
    accessoryIds: number[];
    profileCompletedStatus: number;
    id: number;
    createdAt: string;
    updatedAt: string;
    vendorSchecules: {
      maxAcceptOrderLimit: number;
      id?: number | null;
      day: number;
      status?: number;
      isChecked: boolean;
      timeSlot: {
        id: null | number;
        startTime: string;
        endTime: string;
      } | null;
    }[];
  };
  vendorProducts: TVendorProduct[];
};

type TVendorActionTypes = ActionType<typeof actions>;
export {
  TVendorPricing,
  TVendorActionTypes,
  TVendorState,
  TAddVendorPayload,
  TVendorProductPayload,
  TVendorProduct,
  TVendorProductTiers,
  TVendorStockHistory,
};

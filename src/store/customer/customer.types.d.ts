import { ActionType } from "typesafe-actions";
import * as actions from "./customer.action";

type TCustomerPayload = {
  count: number;
  customers: {
    countryCode: string;
    createdAt: string;
    email: string;
    fullName: string;
    id: string;
    isActive: boolean;
    mobileNumber: string;
    orders: any;
    profileImage: any;
    userSubscriptionCount: number;
  }[];
};

type TCustomerOrdersFuel = {
  count: number;
  orders: {
    id: string | number;
    status: string;
    createdAt: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    address: string;
    vendorName: string;
    driverName: string;
  }[];
};

type TCustomerOrdersTank = {
  count: number;
  orders: {
    id: string | number;
    status: string;
    createdAt: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    address: string;
    vendorName: string;
    categoryName: string;
    driverName: string;
    isVendorsDriver: number;
  }[];
};

type TAllCustomers = {
  count: number;
  customers: { id: string; fullName: string }[];
};

type TCustomerState = {
  loading: boolean;
  customersData: TCustomerPayload;
  customerId: string | number;
  customerById: {
    isActive: boolean;
    profileImage: any;
    id: string;
    fullName: string;
    countryCode: string;
    mobileNumber: string;
    email: string;
    createdAt: string;
    orders: number;
    subscription: { id: string; startDate: string; endDate: string; membershipPlan: { name: string } }[] | [];
  };
  customerOrderFuelData: TCustomerOrdersFuel;
  customerOrderTankData: TCustomerOrdersTank;
  allCustomers: TAllCustomers;
};

type TCustomerActionType = ActionType<typeof actions>;

export {
  TCustomerPayload,
  TCustomerOrdersFuel,
  TCustomerOrdersTank,
  TCustomerState,
  TCustomerActionType,
  TAllCustomers,
};

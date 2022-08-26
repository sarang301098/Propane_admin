import { ActionType } from "typesafe-actions";

import * as actions from "./dashboard.action";

type TDashboardActionType = ActionType<typeof actions>;

type TGetDashboardDataViewPayload = {
  vendorsCount: number;
  customersCount: number;
  vendorsDriver: number;
  freelanceDriver: number;
  deliveredOrders: number;
  cancelledOrders: number;
  todaysOrders: number;
  totalRevenue: number;
};

type TGetDashboardOrderPayload = {
  count: number;
  orders: {
    id: string;
    status: string;
    createdAt: string;
    userId: string | number;
    userName: string;
    categoryName: string;
    scheduleDate: string;
    startTime: string;
    endTime: string;
    address: string;
    driverName: string;
    driverId: string;
    lat: string;
    long: string;
    isVendorsDriver: number;
    truckLocation: boolean | string;
    grandTotal: number;
    vendorName: string;
    orderType: number;
    vendorId: string | number;
  }[];
};

type TDashboardState = {
  loading: boolean;
  dashboardDataView: TGetDashboardDataViewPayload;
  dashboardOrders: TGetDashboardOrderPayload;
  dashboardAllOrders: TGetDashboardOrderPayload;
};

export {
  TDashboardActionType,
  TGetDashboardDataViewPayload,
  TGetDashboardOrderPayload,
  TDashboardState,
};

import { action } from "typesafe-actions";
import DashboardActionTypeEnum from "./dashboard.enum";
import { TGetDashboardDataViewPayload, TGetDashboardOrderPayload } from "./dashboard.types";

/**
 * dashboard loading action creator
 * @returns
 */
const dashboardLoadingAction = () => action(DashboardActionTypeEnum.DASHBOARD_LOADING);

/**
 * dashboard loaded action creator
 * @returns
 */
const dashboardLoadedAction = () => action(DashboardActionTypeEnum.DASHBOARD_LOADED);

/**
 * get dashboard view action creator
 * @param payload
 * @returns
 */
const getDashboardViewAction = (payload: TGetDashboardDataViewPayload) =>
  action(DashboardActionTypeEnum.GET_DASHBOARD_VIEW_DATA, payload);

/**
 * get dashboard  action creator
 * @param orders
 * @returns
 */
const getDashboardOrdersAction = (orders: TGetDashboardOrderPayload) =>
  action(DashboardActionTypeEnum.GET_DASHBOARD_ORDERS, orders);

/**
 * get dashboard  action creator
 * @param orders
 * @returns
 */
const getDashboardAllOrdersAction = (orders: TGetDashboardOrderPayload) =>
  action(DashboardActionTypeEnum.GET_DASHBOARD_ALL_ORDERS, orders);

export {
  dashboardLoadingAction,
  dashboardLoadedAction,
  getDashboardViewAction,
  getDashboardOrdersAction,
  getDashboardAllOrdersAction,
};

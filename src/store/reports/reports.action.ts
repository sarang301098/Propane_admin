import { action } from "typesafe-actions";

import ReportsActionTypeEnum from "./reports.enum";
import {
  TGetCustomerReportsPayload,
  TGetDriverReportsPayload,
  TGetTransactionReportsPayload,
  TGetVendorReportsPayload,
  TInventoryStockReportsPayload,
  TOrderReportsPayload,
  TProductReportsPayload,
} from "./reports.types";

/**
 * reports loading action creator
 * @returns
 */
const reportsLoadingAction = () =>
  action(ReportsActionTypeEnum.REPORTS_LOADING);

/**
 * reports loaded action creator
 * @returns
 */
const reportsLoadedAction = () => action(ReportsActionTypeEnum.REPORTS_LOADED);

/**
 * get customer reports action creator
 * @param customerData
 * @returns
 */
const getCustomerReportsAction = (payload: {
  customers: TGetCustomerReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_CUSTOMER_REPORTS, payload);

/**
 * get vendor reports action creator
 * @param vendorData
 * @returns
 */
const getVendorReportsAction = (payload: {
  vendor: TGetVendorReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_VENDOR_REPORTS, payload);

/**
 * get driver reports action creator
 * @param driverData
 * @returns
 */
const getDriverReportsAction = (payload: {
  drivers: TGetDriverReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_DRIVER_REPORTS, payload);

const getOrderReportsAction = (payload: {
  ordersReports: TOrderReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_ORDERS_REPORTS, payload);

const getProductsReportsAction = (payload: {
  productReports: TProductReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_PRODUCTS_REPORTS, payload);

const getTransactionReportsAction = (payload: {
  transactions: TGetTransactionReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_TRANSACTION_REPORTS, payload);

const getInventoryStockReportsAction = (payload: {
  inventoryReports: TInventoryStockReportsPayload;
  count: number;
}) => action(ReportsActionTypeEnum.GET_INVENTORY_STOCK_REPORTS, payload);

export {
  reportsLoadingAction,
  reportsLoadedAction,
  getCustomerReportsAction,
  getVendorReportsAction,
  getDriverReportsAction,
  getOrderReportsAction,
  getProductsReportsAction,
  getTransactionReportsAction,
  getInventoryStockReportsAction,
};

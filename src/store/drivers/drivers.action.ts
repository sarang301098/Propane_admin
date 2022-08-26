import { action } from "typesafe-actions";

import DriversActionTypeEnum from "./drivers.enum";
import {
  TDriverDetailsPayload,
  TGetDriverCompletedOrdersTankPayload,
  TGetDriverOrdersPayload,
  TGetFreelanceDriversPayload,
  TGetVendorDriversPayload,
} from "./drivers.types";

/**
 * drivers loading action creator
 * @returns
 */
const driversLoadingAction = () =>
  action(DriversActionTypeEnum.DRIVERS_LOADING);

/**
 * drivers loaded action creator
 * @returns
 */
const driversLoadedAction = () => action(DriversActionTypeEnum.DRIVERS_LOADED);

/**
 * get vendor drivers action creator
 * @param vendorDriversList
 * @returns
 */
const getVendorDriversAction = (vendorDriversList: TGetVendorDriversPayload) =>
  action(DriversActionTypeEnum.GET_VENDOR_DRIVERS, vendorDriversList);

/**
 * get freelance drivers action creator
 * @param freelanceDriversList
 * @returns
 */
const getFreelanceDriversAction = (
  freelanceDriversList: TGetVendorDriversPayload
) => action(DriversActionTypeEnum.GET_FREELANCE_DRIVERS, freelanceDriversList);

/**
 * get driver by id action creator
 * @param payload
 * @returns
 */
const getDriverByIdAction = (payload: {
  driverId: string | number;
  singleDriverData: TDriverDetailsPayload;
}) => action(DriversActionTypeEnum.GET_DRIVER_BY_ID, payload);

const deleteDriverAction = (payload: {
  driverId: string;
  isFreelanceDriver: boolean;
}) => {
  return action(DriversActionTypeEnum.DELETE_DRIVER, payload);
};
/**
 * get freelance driver payment status list
 * @param freelanceDriversPaymentList
 * @returns
 */
const getFreelanceDriversPaymentAction = (
  freelanceDriversPaymentList: TGetFreelanceDriversPayload
) =>
  action(
    DriversActionTypeEnum.GET_FREELANCE_DRIVERS_PAYMENT,
    freelanceDriversPaymentList
  );

/**
 * get driver delivery orders list
 * @param driverOrders
 * @returns
 */
const getDriverOrdersAction = (driverOrders: TGetDriverOrdersPayload) =>
  action(DriversActionTypeEnum.GET_DRIVER_ORDERS, driverOrders);

const getDriverCompletedOrdersTankAction = (
  driverCompletedOrders: TGetDriverCompletedOrdersTankPayload
) =>
  action(
    DriversActionTypeEnum.GET_DRIVER_COMPLETED_ORDERS,
    driverCompletedOrders
  );

/**
 * get all vendor drivers action
 * @param payload
 * @returns
 */
const getAllVendorDriversAction = (
  payload: { id: string | number; fullName: string }[]
) => action(DriversActionTypeEnum.GET_ALL_VENDOR_DRIVERS, payload);

/**
 * get all freelance drivers action
 * @param payload
 * @returns
 */
const getAllFreelanceDriversAction = (
  payload: { id: string | number; fullName: string }[]
) => action(DriversActionTypeEnum.GET_ALL_FREELANCE_DRIVERS, payload);

const getAllDriversAction = (payload: any) =>
  action(DriversActionTypeEnum?.GET_ALL_DRIVERS, payload);

const updateDriverStatusAction = (payload: {
  isActive: boolean;
  id: string | number;
  isFreelanceDriver: boolean;
}) => {
  return action(DriversActionTypeEnum.UPDATE_DRIVER_STATUS, payload);
};
const updateDriverApprovalAction = (payload: {
  status: number;
  id: string | number;
  isFreelanceDriver: boolean;
}) => {
  return action(DriversActionTypeEnum.UPDATE_DRIVER_APPROVAL, payload);
};

const getDriverLocationAction = (payload: any) => {
  return action(DriversActionTypeEnum.GET_DRIVER_LOCATION, payload);
};

export {
  driversLoadingAction,
  driversLoadedAction,
  getVendorDriversAction,
  getFreelanceDriversAction,
  getDriverByIdAction,
  getFreelanceDriversPaymentAction,
  getDriverOrdersAction,
  getDriverCompletedOrdersTankAction,
  getAllDriversAction,
  getAllVendorDriversAction,
  getAllFreelanceDriversAction,
  updateDriverStatusAction,
  updateDriverApprovalAction,
  deleteDriverAction,
  getDriverLocationAction,
};

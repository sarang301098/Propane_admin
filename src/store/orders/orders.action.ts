import { action } from "typesafe-actions";
import OrdersActionTypeEnum from "./orders.enum";
import {
  TOrdersFuel,
  TOrdersTank,
  TRescheduleTimeSlots,
  TOrderByIdPayload,
} from "./orders.types";

/**
 * order loading action creator
 * @returns
 */
const ordersLoadingAction = (payload?: boolean) =>
  action(OrdersActionTypeEnum.ORDERS_LOADING, payload);

/**
 * order loaded action creator
 * @returns
 */
const ordersLoadedAction = () => action(OrdersActionTypeEnum.ORDERS_LOADED);

/**
 * get order id action creator
 * @param payload
 * @returns
 */
const getOrderIdAction = (payload: string | number) =>
  action(OrdersActionTypeEnum.GET_ORDER_ID, payload);

/**
 * get order by id action creator
 * @param payload
 * @returns
 */
const getOrderByIdAction = (payload: TOrderByIdPayload) =>
  action(OrdersActionTypeEnum.GET_ORDER_BY_ID, payload);

/**
 * get fuel delivery orders action creator
 * @param fuelOrders
 * @returns
 */
const getOrderFuelAction = (fuelOrders: TOrdersFuel) =>
  action(OrdersActionTypeEnum.GET_ORDERS_FUEL, fuelOrders);

/**
 * get propane tank orders action creator
 * @param tankOrders
 * @returns
 */
const getOrderTankAction = (tankOrders: TOrdersTank) =>
  action(OrdersActionTypeEnum.GET_ORDERS_TANK, tankOrders);

/**
 * cancel order action creator
 * @returns
 */
const cancelOrderAction = () => action(OrdersActionTypeEnum.CANCEL_ORDER);

/**
 * get reschedule time slots action creator
 * @param payload
 * @returns
 */
const getRescheduleSlotOrderAction = (payload: TRescheduleTimeSlots) =>
  action(OrdersActionTypeEnum.RESCHEDULE_TIME_SLOTS, payload);

/**
 * reschedule order update action creator
 * @returns
 */
const rescheduleOrderAction = () =>
  action(OrdersActionTypeEnum.RESCHEDULE_ORDER_UPDATE);

export {
  ordersLoadingAction,
  ordersLoadedAction,
  getOrderIdAction,
  getOrderByIdAction,
  getOrderFuelAction,
  getOrderTankAction,
  cancelOrderAction,
  getRescheduleSlotOrderAction,
  rescheduleOrderAction,
};

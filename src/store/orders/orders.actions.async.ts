import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  ordersLoadingAction,
  ordersLoadedAction,
  getOrderByIdAction,
  getOrderFuelAction,
  getOrderTankAction,
  cancelOrderAction,
  getRescheduleSlotOrderAction,
  rescheduleOrderAction,
} from "./orders.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/orders/ordersService";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get order by id action thunk
 * @returns
 */
export const getOrderByIdActionThunk = (
  id: string | number,
  sort?: string,
  loading?: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(ordersLoadingAction(loading));

    requestFromServer
      .getOrderByIdAPI(id, sort)
      .then((response) => {
        dispatch(getOrderByIdAction(response.data));
      })
      .catch((error) => {
        dispatch(ordersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get orders fuel action thunk
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorName
 * @param driverName
 * @param orderStatus
 * @returns
 */
export const getOrdersFuelActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  orderStatus: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(ordersLoadingAction());
    requestFromServer
      .getOrdersFuelAPI(
        search,
        page,
        perPage,
        startAt,
        endAt,
        sort,
        sortBy,
        vendorName,
        driverName,
        orderStatus
      )
      .then((response) => {
        dispatch(getOrderFuelAction(response?.data));
      })
      .catch((error) => {
        dispatch(ordersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get orders tank action thunk
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorName
 * @param driverName
 * @param freelanceDriverName
 * @param orderCategory
 * @param orderStatus
 * @returns
 */
export const getOrdersTankActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  freelanceDriverName: string | null,
  orderCategory: string | number | null,
  orderStatus: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(ordersLoadingAction());
    requestFromServer
      .getOrdersTankAPI(
        search,
        page,
        perPage,
        startAt,
        endAt,
        sort,
        sortBy,
        vendorName,
        driverName,
        freelanceDriverName,
        orderCategory,
        orderStatus
      )
      .then((response) => {
        dispatch(getOrderTankAction(response?.data));
      })
      .catch((error) => {
        dispatch(ordersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * cancel order action thunk
 * @param reason
 * @param status
 * @param id
 * @returns
 */
export const cancelOrderActionThunk = (
  reason: string,
  status: string,
  id: string | number,
  getOrders: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(ordersLoadingAction());
    requestFromServer
      .cancelOrderAPI(reason, status, id)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(cancelOrderAction());
          successToast("Order Cancelled successfully.");
          getOrders &&
            setTimeout(() => {
              getOrders();
              successToast("Order Cancelled successfully.");
            }, 1000);
        } else {
          dispatch(ordersLoadedAction());
          errorToast("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(ordersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get reschedule Slot
 * @param vendorIds
 * @param date
 * @returns
 */
export const getRescheduleSlotOrderActionThunk = (
  vendorIds: (string | number)[],
  date: moment.Moment | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(ordersLoadingAction());
    requestFromServer
      .getRescheduleSlotOrderAPI(vendorIds, date)
      .then((response) => {
        dispatch(getRescheduleSlotOrderAction(response.data.timeSlot));
      })
      .catch((error) => {
        dispatch(ordersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * reschedule order action thunk
 * @param orderId
 * @param timeSlotsId
 * @param scheduleDate
 * @param getOrders
 * @returns
 */
export const rescheduleOrderActionThunk = (
  orderId: string | number,
  timeSlotsId: string | number,
  scheduleDate: moment.Moment | undefined,
  getOrders: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(ordersLoadingAction());
    requestFromServer
      .getRescheduleOrderAPI(orderId, timeSlotsId, scheduleDate)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          dispatch(rescheduleOrderAction());
          successToast("Order Rescheduled successfully.");
          getOrders &&
            setTimeout(() => {
              getOrders();
            }, 1000);
        } else {
          dispatch(ordersLoadedAction());
          errorToast("Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(ordersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

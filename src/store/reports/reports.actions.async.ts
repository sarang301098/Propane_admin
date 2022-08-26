import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  reportsLoadingAction,
  reportsLoadedAction,
  getCustomerReportsAction,
  getDriverReportsAction,
  getVendorReportsAction,
  getOrderReportsAction,
  getProductsReportsAction,
  getTransactionReportsAction,
  getInventoryStockReportsAction,
} from "./reports.action";
import { errorToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/reports/reportsService";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get customer reports list thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getCustomerReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  membershipStatus: string,
  customerStatus: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getCustomerReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        membershipStatus,
        customerStatus,
        sort
      )
      .then((response) => {
        dispatch(getCustomerReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get vendor reports list thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getVendorReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  vendorStatus: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getVendorReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        vendorStatus,
        sort
      )
      .then((response) => {
        dispatch(getVendorReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get driver reports list thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getDriverReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  driverName: string | null,
  freelanceDriverName: string,
  driverStatus: string,
  sort: string,
  sortBy: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getDriverReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        driverName,
        freelanceDriverName,
        driverStatus,
        sort,
        sortBy
      )
      .then((response) => {
        dispatch(getDriverReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get order report action thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getOrderReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  orderType: string,
  paymentStatus: string | boolean,
  orderStatus: string,
  sort: string,
  sortBy: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getOrderReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        orderType,
        paymentStatus,
        orderStatus,
        sort,
        sortBy
      )
      .then((response) => {
        dispatch(getOrderReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};
/**
 * get product reports action thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getProductReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  orderType: string,
  product: string,
  cylinderSize: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getProductReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        orderType,
        product,
        cylinderSize
      )
      .then((response) => {
        dispatch(getProductsReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get transaction report action thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getTransactionReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  orderType: string,
  paymentStatus: string | boolean,
  sort: string,
  sortBy: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getTransactionReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        orderType,
        paymentStatus,
        sort,
        sortBy
      )
      .then((response) => {
        dispatch(getTransactionReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get inventory stock report action thunk
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getInventoryStockReportsActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  category: string,
  product: string,
  accessory: string,
  cylinderSize: string,
  vendorName: string,
  sort: string,
  sortBy: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(reportsLoadingAction());

    requestFromServer
      .getInventoryStockReportsAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        category,
        product,
        accessory,
        cylinderSize,
        vendorName,
        sort,
        sortBy
      )
      .then((response) => {
        dispatch(getInventoryStockReportsAction(response.data));
      })
      .catch((error) => {
        dispatch(reportsLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

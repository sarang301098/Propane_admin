import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  dashboardLoadingAction,
  dashboardLoadedAction,
  getDashboardOrdersAction,
  getDashboardViewAction,
  getDashboardAllOrdersAction,
} from "./dashboard.action";
import { errorToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/dashboard/dashboardService";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get dashboard today out orders thunk
 * @param page
 * @param perPage
 * @param today
 * @param search
 * @param orderType
 * @param vendorName
 * @param driverName
 * @param orderStatus
 * @param sort
 * @param sortBy
 * @returns
 */
export const getDashboardOrdersActionThunk = (
  page: number,
  perPage: number,
  today: boolean,
  search: string | number | null,
  orderType: string | number | null,
  vendorName: string | number | null,
  driverName: string | number | null,
  orderStatus: string | null,
  sort: string,
  sortBy: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(dashboardLoadingAction());

    requestFromServer
      .getDashboardOrdersAPI(
        page,
        perPage,
        today,
        search,
        orderType,
        vendorName,
        driverName,
        orderStatus,
        sort,
        sortBy
      )
      .then((response) => {
        dispatch(getDashboardOrdersAction(response.data));
      })
      .catch((error) => {
        dispatch(dashboardLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get dashboard all orders thunk
 * @param page
 * @param perPage
 * @param today
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @returns
 */
export const getDashboardAllOrdersActionThunk = (
  page: number,
  perPage: number,
  today: boolean,
  startAt: moment.Moment | undefined | null,
  endAt: moment.Moment | undefined | null,
  sort: string,
  sortBy: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(dashboardLoadingAction());

    requestFromServer
      .getDashboardAllOrdersAPI(page, perPage, today, startAt, endAt, sort, sortBy)
      .then((response) => {
        dispatch(getDashboardAllOrdersAction(response.data));
      })
      .catch((error) => {
        dispatch(dashboardLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get dashboard view thunk
 * @returns
 */
export const getDashboardViewActionThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(dashboardLoadingAction());

    requestFromServer
      .getDashboardViewAPI()
      .then((response) => {
        dispatch(getDashboardViewAction(response.data));
      })
      .catch((error) => {
        dispatch(dashboardLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

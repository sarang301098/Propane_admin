import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import moment from "moment";

import { errorToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/earnings/earningService";
import {
  getCancelOrderEarningFailed,
  getCancelOrderEarningPending,
  getCancelOrderEarningSuccess,
  getEarningFailed,
  getEarningPending,
  getEarningSuccess,
} from "./earning.action";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get all earnings list thunk
 * @returns
 */
export const getEarningActionThunk = (
  page: number,
  perPage: number,
  search: string | null,
  startDate: moment.Moment | null | undefined,
  endDate: moment.Moment | null | undefined,
  selectVendor: string | number | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getEarningPending());

    requestFromServer
      .getEarningsList(page, perPage, search, startDate, endDate, selectVendor)
      .then((response) => {
        dispatch(getEarningSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getEarningFailed());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

export const getCancelOrderEarningActionThunk = (
  page: number,
  perPage: number,
  search: string | null,
  startDate: moment.Moment | null | undefined,
  endDate: moment.Moment | null | undefined,
  selectVendor: string | number | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getCancelOrderEarningPending());

    requestFromServer
      .getCancelOrderEarningsList(page, perPage, search, startDate, endDate, selectVendor)
      .then((response) => {
        dispatch(getCancelOrderEarningSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getCancelOrderEarningFailed());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

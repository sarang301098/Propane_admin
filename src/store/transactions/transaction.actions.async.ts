import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  transactionLoadingAction,
  transactionLoadedAction,
  getTransactionAction,
} from "./transaction.action";
import { errorToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/transaction/transactionService";
import moment from "moment";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get transactions list thunk
 * @returns
 */
export const getTransactionActionThunk = (
  page: number,
  perPage: number,
  search: string,
  startAt: string | moment.Moment,
  endAt: string | moment.Moment
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(transactionLoadingAction());
    requestFromServer
      .getTransactionDataAPI(page, perPage, search, startAt, endAt)
      .then((response) => {
        dispatch(getTransactionAction(response.data));
      })
      .catch((error) => {
        dispatch(transactionLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  getCategoryFailed,
  getCategoryPending,
  getCategorySuccess,
} from "./category.action";
import * as requestFromServer from "../../services/category/categoryService";
import { errorToast } from "../../components/toast/toast";

/**
 * Get product categories action thunk
 * @returns
 */
export const getCategoryActionThunk = (
  orderType?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getCategoryPending());
    requestFromServer
      .getCategory(orderType || "")
      .then((res) => {
        dispatch(getCategorySuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCategoryFailed());
        errorToast("Something went wrong");
      });
  };
};

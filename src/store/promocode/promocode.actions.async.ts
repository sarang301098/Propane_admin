import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import {
  addPromocodeFailed,
  addPromocodePending,
  addPromocodeSuccess,
  deletePromocodeFailed,
  deletePromocodePending,
  deletePromocodeSuccess,
  getPromocodeByIdFailed,
  getPromocodeByIdPendng,
  getPromocodeByIdSuccess,
  getPromocodeFailed,
  getPromocodePendng,
  getPromocodeSuccess,
  updatePromocodeFailed,
  updatePromocodePending,
  updatePromocodeSuccess,
} from "./promocode.action";
import { InitialValue } from "./promocode.types";
import * as requestFromServer from "../../services/promocode/promocodeService";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get promocodes action thunk
 * @param page
 * @param itemsPerpage
 * @param categoryId
 * @param productId
 * @param status
 * @param search
 * @param orderType
 * @returns
 */
export const getPromocodeActionThunk = (
  page: number,
  itemsPerpage: number,
  categoryId: string,
  productId: string,
  status: string | undefined,
  search?: string,
  orderType?: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getPromocodePendng());
    requestFromServer
      .getPromocode(
        page,
        itemsPerpage,
        categoryId,
        productId,
        status,
        orderType,
        search
      )
      .then((res) => {
        dispatch(getPromocodeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPromocodeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get promocode by id action thunk
 * @param id
 * @returns
 */
export const getPromoByIdcodeActionThunk = (
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getPromocodeByIdPendng());
    requestFromServer
      .getPromocodeById(id)
      .then((res) => {
        dispatch(getPromocodeByIdSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getPromocodeByIdFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add promocode action thunk
 * @param values
 * @param redirect
 * @returns
 */
export const addPromocodeActionThunk = (
  values: InitialValue,
  redirect: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addPromocodePending());
    requestFromServer
      .addPromocode(values)
      .then((res) => {
        dispatch(addPromocodeSuccess(res.data));
        successToast("Promocode added successfully");
        redirect();
      })
      .catch((err) => {
        dispatch(addPromocodeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update promocode action thunk
 * @param values
 * @param id
 * @param redirect
 * @returns
 */
export const updatePromocodeActionThunk = (
  values: InitialValue,
  id: string | number,
  redirect: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updatePromocodePending());
    requestFromServer
      .updatePromocode(id, values)
      .then((res) => {
        dispatch(updatePromocodeSuccess({ id, isActive: values?.isActive }));
        successToast("Promocode updated successfully");
        redirect();
      })
      .catch((err) => {
        dispatch(updatePromocodeFailed());
        errorToast(err?.response?.data.message || "Something went wrong");
      });
  };
};

/**
 * Delete promocode action thunk
 * @param id
 * @returns
 */
export const deletePromocodeActionThunk = (
  id: string | number,
  getPromocode: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deletePromocodePending());
    requestFromServer
      .deletePromocode(id)
      .then((res) => {
        if (res.status > 200 && res.status < 300) {
          dispatch(deletePromocodeSuccess({ productId: id, getPromocode }));
          successToast("Promocode deleted successfully");
          getPromocode && setTimeout(() => getPromocode(), 1000);
        } else {
          dispatch(deletePromocodeFailed());
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        dispatch(deletePromocodeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

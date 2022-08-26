import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/accesssories/accessoriesService";
import {
  addAccessoriesFailed,
  addAccessoriesPending,
  addAccessoriesSuccess,
  deleteAccessoriesFailed,
  deleteAccessoriesPending,
  deleteAccessoriesSuccess,
  gerAccessoriesFailed,
  getAccessoriesPending,
  getAccessoriesSuccess,
  updateAccessoriesFailed,
  updateAccessoriesPending,
  updateAccessoriesSuccess,
} from "./accessories.action";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get accessories action thunk
 * @param search
 * @returns
 */
export const getAccessoriesActionThunk = (
  search: string,
  page: number,
  perPage: number,
  isFilter?: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getAccessoriesPending());
    requestFromServer
      .getAccessories(search, page, perPage, isFilter)
      .then((res) => {
        dispatch(getAccessoriesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(gerAccessoriesFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add accessories action thunk
 * @param name
 * @param image
 * @param price
 * @param description
 * @returns
 */
export const addAccessoriesActionThunk = (
  name: string,
  image: string,
  price: number,
  description: string,
  itemsPerpage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addAccessoriesPending());
    requestFromServer
      .addAccessories(name, image, price, description)
      .then((res) => {
        dispatch(addAccessoriesSuccess({ accessory: res.data, itemsPerpage }));
        successToast("Accessory added successfully");
      })
      .catch((err) => {
        dispatch(addAccessoriesFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update accessories action thunk
 * @param name
 * @param image
 * @param price
 * @param description
 * @param id
 * @returns
 */
export const updateAccessoriesActionThunk = (
  name: string,
  image: string,
  price: number,
  description: string,
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateAccessoriesPending());
    requestFromServer
      .updateAccessories(name, image, price, description, id)
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          dispatch(
            updateAccessoriesSuccess({
              accessoryDetails: { name, image, price, description },
              accessoryId: Number(id),
            })
          );
          successToast("Accessory updated successfully");
        } else {
          errorToast("Something went wrong");
          dispatch(updateAccessoriesFailed());
        }
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(updateAccessoriesFailed());
      });
  };
};

/**
 * Delete accessories action thunk
 * @param id
 * @returns
 */
export const deleteAcccessoriesActionThunk = (
  id: string,
  getAction: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteAccessoriesPending());
    requestFromServer
      .deleteAccesories(Number(id))
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          successToast("Accessory deleted successfully");
          dispatch(deleteAccessoriesSuccess({ id: Number(id), getAction }));
          getAction && setTimeout(() => getAction(), 1000);
        } else {
          errorToast("Something went wrong");
          dispatch(deleteAccessoriesFailed());
        }
      })
      .catch((err) => {
        errorToast("Something went wrong");
        dispatch(deleteAccessoriesFailed());
      });
  };
};

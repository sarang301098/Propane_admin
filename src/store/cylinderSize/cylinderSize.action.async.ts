import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/cylinderSize/cylinderSize";
import {
  getCylinderSizePending,
  getCylinderSizeSuccess,
  getCylinderSizeFailed,
  updateCylinderSizePending,
  updateCylinderSizeSuccess,
  updateCylinderSizeFailed,
  deleteCylinderSizePending,
  deleteCylinderSizeSucess,
  deleteCylinderSizeFailed,
  addCylinderSizePending,
  addCylinderSizeSuccess,
  addCylinderSizeFailed,
} from "./cylinderSize.action";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get cylinder size action thunk
 * @param q
 * @returns
 */
export const getCylinderSizeActionThunk = (
  isFilters: boolean,
  page: number,
  perPage: number,
  q?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getCylinderSizePending());
    requestFromServer
      .getCylinderSize(isFilters, page, perPage, q || "")
      .then((res) => {
        dispatch(getCylinderSizeSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getCylinderSizeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update cylinder size action thunk
 * @param id
 * @param cylinderSize
 * @returns
 */
export const updateCylinderSizeActionThunk = (
  id: number,
  cylinderSize: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateCylinderSizePending());
    requestFromServer
      .updateCylinderSize(id, cylinderSize)
      .then((res) => {
        dispatch(updateCylinderSizeSuccess({ id, cylinderSize }));
        successToast("Cylinder size updated successfully");
      })
      .catch((err) => {
        dispatch(updateCylinderSizeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete cylinder size action thunk
 * @param id
 * @returns
 */
export const deleteCylinderSizeActionThunk = (
  id: number,
  getAction: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteCylinderSizePending());
    requestFromServer
      .deleteCylinderSize(id)
      .then(async (res) => {
        await dispatch(deleteCylinderSizeSucess({ id, getAction }));
        successToast("Cylinder size deleted successfully");
        getAction && getAction();
      })
      .catch((err) => {
        dispatch(deleteCylinderSizeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add cylinder size action thunk
 * @param cylinderSize
 * @returns
 */
export const addCylinderSizeActionThunk = (
  cylinderSize: number,
  itemsPerPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addCylinderSizePending());
    requestFromServer
      .addCylinderSize(cylinderSize)
      .then((res) => {
        dispatch(
          addCylinderSizeSuccess({ cylinderSize: res.data, itemsPerPage })
        );
        successToast("Cylinder size added successfully");
      })
      .catch((err) => {
        dispatch(addCylinderSizeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

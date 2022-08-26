import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/holiday/holiday";
import {
  addHolidayPending,
  addHolidaySuccess,
  addHolidayFailed,
  getHolidayPending,
  getHolidaySuccess,
  getHolidayFailed,
  getAllVendorsPending,
  getAllVendorsSuccess,
  getAllVendorsFailed,
  deleteHolidayPending,
  deleteHolidaySucess,
  deleteHolidayFailed,
  updateHolidayPending,
  updateHolidaySuccess,
  updateHolidayFailed,
} from "./governmentHolidays.action";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get holiday action thnuk
 * @param page
 * @param perPage
 * @param search
 * @param vendorId
 * @returns
 */
export const getHolidayActionThunk = (
  page: number,
  perPage: number,
  search: string,
  vendorId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getHolidayPending());

    requestFromServer
      .getHoliday(page, perPage, search, vendorId)
      .then((res) => {
        dispatch(getHolidaySuccess(res.data));
      })
      .catch((error) => {
        dispatch(getHolidayFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};
/**
 * Get all vendors action thunk
 * @returns
 */
export const getAllVendorsActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getAllVendorsPending());

    requestFromServer
      .getAllVendors()
      .then((res) => {
        dispatch(getAllVendorsSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getAllVendorsFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add holiday action thunk
 * @param date
 * @param vendorIds
 * @param description
 * @param itemsPerPage
 * @returns
 */
export const addHolidayActionThunk = (
  date: string,
  vendorIds: (string | number)[],
  description: string,
  itemsPerPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addHolidayPending());
    requestFromServer
      .addHoliday(date, vendorIds, description)
      .then((res) => {
        dispatch(
          addHolidaySuccess({
            holidayData: res.data,
            itemsPerPage,
          })
        );
        successToast("Holiday Added Successfully.");
      })
      .catch((error) => {
        dispatch(addHolidayFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update holiday action thunk
 * @param date
 * @param vendorId
 * @param description
 * @param id
 * @returns
 */
export const updateHolidayActionThunk = (
  date: string,
  vendorId: (string | number)[],
  description: string,
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateHolidayPending());

    requestFromServer
      .updateHoliday(date, vendorId, description, id)
      .then((res) => {
        dispatch(
          updateHolidaySuccess({ id, description, vendorIds: vendorId, date })
        );
        successToast("Holiday Updated Successfully.");
      })
      .catch((error) => {
        dispatch(updateHolidayFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete holiday action thunk
 * @param id
 * @returns
 */
export const deleteteHolidayActionThunk = (
  id: string | null,
  getAction: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteHolidayPending());

    requestFromServer
      .deleteHoliday(id)
      .then(async (res) => {
        await dispatch(deleteHolidaySucess({ id, getAction }));
        successToast("Holiday Deleted Successfully.");
        getAction && getAction();
      })
      .catch((error) => {
        dispatch(deleteHolidayFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

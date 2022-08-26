import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  driversLoadingAction,
  driversLoadedAction,
  getVendorDriversAction,
  getFreelanceDriversAction,
  getFreelanceDriversPaymentAction,
  getDriverOrdersAction,
  getDriverCompletedOrdersTankAction,
  getAllDriversAction,
  getAllVendorDriversAction,
  getAllFreelanceDriversAction,
  updateDriverStatusAction,
  updateDriverApprovalAction,
  deleteDriverAction,
  getDriverByIdAction,
  getDriverLocationAction,
} from "./drivers.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/drivers/driversService";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get vendor drivers thunk
 * @returns
 */
export const getVendorDriversActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  driverStatus: string,
  driverApprovalStatus: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());

    requestFromServer
      .getVendorDriversAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        driverStatus,
        driverApprovalStatus,
        sort
      )
      .then((response) => {
        dispatch(getVendorDriversAction(response.data));
      })
      .catch((error) => {
        dispatch(driversLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get freelance drivers thunk
 * @returns
 */
export const getFreelanceDriversActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  driverStatus: string,
  driverApprovalStatus: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());

    requestFromServer
      .getFreelanceDriversAPI(
        search,
        page,
        perPage,
        startDate,
        endDate,
        driverStatus,
        driverApprovalStatus,
        sort
      )
      .then((response) => {
        dispatch(getFreelanceDriversAction(response.data));
      })
      .catch((error) => {
        dispatch(driversLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get freelance drivers payment status list thunk
 * @param page
 * @param perPage
 * @param search
 * @param paymentStatus
 * @returns
 */
export const getFreelanceDriversPaymentActionThunk = (
  search: string | number | null,
  page: number,
  perPage: number,
  paymentStatus: string | number | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());

    requestFromServer
      .getFreelanceDriversPaymentAPI(search, page, perPage, paymentStatus)
      .then((response) => {
        dispatch(getFreelanceDriversPaymentAction(response?.data));
      })
      .catch((error) => {
        dispatch(driversLoadedAction());
        if (error?.response && error?.response?.data) {
          errorToast(error?.response?.data?.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get driver fuel delivery orders list
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getDriverOrdersActionThunk = (
  driverId: string,
  search: string | null,
  page: number,
  perPage: number,
  orderType: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  customerName: string | number,
  ordersStatus: string | number,
  sort: string,
  sortBy: string,
  categoryId?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());

    requestFromServer
      .getDriverOrdersFuelAPI(
        driverId,
        search,
        page,
        perPage,
        orderType,
        startDate,
        endDate,
        customerName,
        ordersStatus,
        sort,
        sortBy,
        categoryId
      )
      .then((response) => {
        dispatch(getDriverOrdersAction(response.data));
      })
      .catch((error) => {
        dispatch(driversLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get driver completed orders
 * @param search
 * @param page
 * @param perPage
 * @param sort
 * @param sortBy
 * @param vendorId
 * @param driverId
 * @param status
 * @returns
 */
export const getDriverCompletedOrdersActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  sort: string,
  sortBy: string | null,
  vendorId: string | number | null,
  driverId: string | number,
  status: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());

    requestFromServer
      .getDriverCompletedOrdersAPI(
        search,
        page,
        perPage,
        sort,
        sortBy,
        vendorId,
        driverId,
        status
      )
      .then((response) => {
        dispatch(getDriverCompletedOrdersTankAction(response?.data));
      })
      .catch((error) => {
        dispatch(driversLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

export const getAllDriversActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());

    requestFromServer
      .getAllDrivers()
      .then((response) => {
        dispatch(getAllDriversAction(response.data));
      })
      .catch((error) => {
        dispatch(driversLoadedAction());
      });
  };
};
/**
 * get all Vendor drivers action thunk
 * @param isFreelancer
 * @param isFilters
 * @returns
 */
export const getAllVendorDriversActionThunk = (
  isFreelancer: boolean,
  isFilters: boolean,
  vendorId?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(driversLoadingAction());

    requestFromServer
      .getAllVendorDriversAPI(isFreelancer, isFilters, vendorId)
      .then((response) => {
        dispatch(getAllVendorDriversAction(response.data.drivers));
      })
      .catch((error) => {
        // dispatch(driversLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get all Vendor drivers action thunk
 * @param isFreelancer
 * @param isFilters
 * @returns
 */
export const getAllFreelanceDriversActionThunk = (
  isFreelancer: boolean,
  isFilters: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(driversLoadingAction());

    requestFromServer
      .getAllFreelanceDriversAPI(isFreelancer, isFilters)
      .then((response) => {
        dispatch(getAllFreelanceDriversAction(response.data.drivers));
      })
      .catch((error) => {
        // dispatch(driversLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};
/**
 * Update driver status action thunk
 * @param isActive
 * @param id
 * @returns
 */
export const updateDriverActionThunk = (
  isActive: boolean,
  id: string | number,
  isFreelanceDriver: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());
    requestFromServer
      .updateDriverStatus(isActive, id)
      .then((res) => {
        dispatch(updateDriverStatusAction({ isActive, id, isFreelanceDriver }));
        successToast("Driver status updated successfully");
      })
      .catch((err) => {
        dispatch(driversLoadedAction());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

export const updateDriverApprovalActionThunk = (
  status: number,
  id: string | number,
  isFreelanceDriver: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());
    requestFromServer
      .updateDriverApproval(id, status)
      .then((res) => {
        dispatch(updateDriverApprovalAction({ status, id, isFreelanceDriver }));
        successToast("Driver status updated successfully");
      })
      .catch((err) => {
        dispatch(driversLoadedAction());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

export const deleteDriverActionThunk = (
  driverId: string,
  isFreelanceDriver: boolean,
  getAction: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());
    requestFromServer
      .deleteDriver(driverId)
      .then((res) => {
        dispatch(deleteDriverAction({ driverId, isFreelanceDriver }));
        successToast("Driver deleted successfully");
        getAction && setTimeout(() => getAction(), 1000);
      })
      .catch((err) => {
        dispatch(driversLoadedAction());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

export const getDriverByIdActionThunk = (
  driverId: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(driversLoadingAction());
    requestFromServer
      .getDriverById(driverId)
      .then((res) => {
        dispatch(
          getDriverByIdAction({ driverId, singleDriverData: res?.data })
        );
      })
      .catch((err) => {
        dispatch(driversLoadedAction());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

export const getDriverLocationActionThunk = (
  driverId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    requestFromServer
      .getDriverLocationAPI(driverId)
      .then((res) => {
        dispatch(getDriverLocationAction(res.data));
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

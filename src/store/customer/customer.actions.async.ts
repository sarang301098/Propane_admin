import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import * as requestFromServer from "../../services/customer/customerService";
import { errorToast, successToast } from "../../components/toast/toast";
import {
  customersLoadingAction,
  customersLoadedAction,
  getCustomersAction,
  getCustomerOrderFuelAction,
  getCustomerOrderTankAction,
  getAllCustomersAction,
  updateCustomersAction,
  getCustomersByIdAction,
  deleteCustomersAction,
} from "./customer.action";

/**
 * get customers action thunk
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param customerStatus
 * @param sort
 * @returns
 */
export const getCustomersActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  membershipStatus: number | null,
  customerStatus: null | boolean,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(customersLoadingAction());

    requestFromServer
      .getCustomersAPI(search, page, perPage, startAt, endAt, membershipStatus, customerStatus, sort)
      .then((response) => {
        dispatch(getCustomersAction(response.data));
      })
      .catch((error) => {
        dispatch(customersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * update customer status action thunk
 * @param id
 * @param isActive
 * @returns
 */
export const updateCustomerActionThunk = (
  id: string | number,
  isActive: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(customersLoadingAction());

    requestFromServer
      .updateCustomersAPI(id, isActive)
      .then(() => {
        dispatch(updateCustomersAction({ id, isActive }));
        successToast("Customer status updated successfully.");
      })
      .catch((error) => {
        dispatch(customersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get customer data by id action thunk
 * @param id
 * @returns
 */
export const getCustomerByIdActionThunk = (id: string | number): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(customersLoadingAction());

    requestFromServer
      .getCustomersByIdAPI(id)
      .then((response) => {
        dispatch(getCustomersByIdAction(response.data));
      })
      .catch((error) => {
        dispatch(customersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get customer fuel orders action thunk
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorName
 * @param driverName
 * @param orderStatus
 * @param id
 * @returns
 */
export const getCustomerOrdersFuelActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  orderStatus: string | null,
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(customersLoadingAction());
    requestFromServer
      .getCustomersOrdersFuelAPI(
        search,
        page,
        perPage,
        startAt,
        endAt,
        sort,
        sortBy,
        vendorName,
        driverName,
        orderStatus,
        id
      )
      .then((response) => {
        dispatch(getCustomerOrderFuelAction(response.data));
      })
      .catch((error) => {
        dispatch(customersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get customer propane tank orders action thunk
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorName
 * @param driverName
 * @param freelanceDriverName
 * @param orderCategory
 * @param orderStatus
 * @param id
 * @returns
 */
export const getCustomerOrdersTankActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  freelanceDriverName: string | null,
  orderCategory: string | number | null,
  orderStatus: string | null,
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(customersLoadingAction());

    requestFromServer
      .getCustomersOrdersTankAPI(
        search,
        page,
        perPage,
        startAt,
        endAt,
        sort,
        sortBy,
        vendorName,
        driverName,
        freelanceDriverName,
        orderCategory,
        orderStatus,
        id
      )
      .then((response) => {
        dispatch(getCustomerOrderTankAction(response.data));
      })
      .catch((error) => {
        dispatch(customersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

export const getAllCustomersActionThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(customersLoadingAction());
    requestFromServer
      .getAllCustomers()
      .then((response) => {
        dispatch(
          getAllCustomersAction({
            ...response.data,
            customers: response?.data?.vendors,
          })
        );
      })
      .catch((error) => {
        dispatch(customersLoadedAction());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * customer delete action thunk
 * @param id
 * @param page
 * @param perPage
 * @returns
 */
export const deleteCustomerActionThunk = (
  id: string | number | null,
  getCustomers: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(customersLoadingAction());

    const deleteAsyncData = async () => {
      try {
        const response = await requestFromServer.deleteCustomersAPI(id);

        if (response.status >= 200 && response.status < 300) {
          dispatch(deleteCustomersAction());
          successToast("Customer deleted successfully.");
          getCustomers && setTimeout(() => getCustomers(), 1000);
        } else {
          dispatch(customersLoadedAction());
          errorToast("Something went wrong");
        }
      } catch (error: any) {
        dispatch(customersLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      }
    };
    deleteAsyncData();

    // requestFromServer
    //   .deleteCustomersAPI(id)
    //   .then(() => {
    //     dispatch(deleteCustomersAction());

    //     dispatch(
    //       getCustomersActionThunk(
    //         null,
    //         page,
    //         perPage,
    //         null || undefined,
    //         null || undefined,
    //         null,
    //         null,
    //         "ASC"
    //       )
    //     );
    //   })
    //   .catch((error) => {
    //     dispatch(customersLoadedAction());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   });
  };
};

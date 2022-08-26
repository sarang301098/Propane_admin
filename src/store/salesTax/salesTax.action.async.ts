import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/salesTax/salesTaxService";
import {
  addCountiesFailed,
  addCountiesPending,
  addCountiesSuccess,
  addStateFailed,
  addStatePending,
  addStateSuccess,
  deleteCountiesFailed,
  deleteCountiesPending,
  deleteCountiesSuccess,
  deleteStateFailed,
  deleteStatePending,
  deleteStateSuccess,
  getCountiesPending,
  getCountiesSuccess,
  getStatesFailed,
  getStatesPending,
  getStatesSuccess,
  updateCountiesPending,
  updateCountiesSuccess,
  updateStateFailed,
  updateStatePending,
  updateStateSuccess,
  getZipcodeSuccess,
  getZipcodePending,
  getZipcodeFailed,
  addZipcodeSuccess,
  addZipcodeFailed,
  updateZipcodePending,
  updateZipcodeSuccess,
  updateZipcodeFailed,
  deleteZipcodePending,
  deleteZipcodeSuccess,
  deleteZipcodeFailed,
} from "./salesTax.action";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get states aaction thunk
 * @param page
 * @param perPage
 * @param q
 * @returns
 */
export const getStatesActionThunk = (
  page: number,
  perPage: number,
  q: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getStatesPending());
    requestFromServer
      .getStates(page, perPage, q, sort)
      .then((response) => {
        dispatch(getStatesSuccess(response.data));
      })
      .catch((err) => {
        dispatch(getStatesFailed());
        errorToast(err?.response?.message?.data || "Something went wrong");
      });
  };
};

/**
 * Add states action thunk
 * @param name
 * @param salesTax
 * @param status
 * @returns
 */
export const addStateActionThunk = (
  name: string,
  salesTax: string,
  status: number,
  itemsPerPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addStatePending());
    requestFromServer
      .addState(name, salesTax, status)
      .then((res) => {
        dispatch(addStateSuccess({ state: res.data, itemsPerPage }));
        successToast("State added successfully");
      })
      .catch((err) => {
        dispatch(addStateFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update states action thunk
 * @param name
 * @param saleTax
 * @param status
 * @param stateId
 * @returns
 */
export const updateStateActionThunk = (
  name: string,
  saleTax: string,
  status: number,
  stateId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateStatePending());
    requestFromServer
      .updateState(name, saleTax, status, stateId)
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          dispatch(updateStateSuccess({ name, saleTax, status, stateId }));
          successToast("State updated successfully.");
        } else {
          dispatch(updateStateFailed());
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        dispatch(updateStateFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete state action thunk
 * @param stateId
 * @returns
 */
export const deleteStateActionThunk = (
  stateId: string,
  getStates: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteStatePending());
    requestFromServer
      .deleteState(stateId)
      .then(() => {
        successToast("State deleted successfully");
        dispatch(deleteStateSuccess({ stateId, getStates }));
        getStates && setTimeout(() => getStates(), 1000);
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(deleteStateFailed());
      });
  };
};

/* Counties */

/**
 * Get counties action thunk
 * @param page
 * @param perPage
 * @param q
 * @param stateId
 * @returns
 */
export const getContiesActoinThunk = (
  page: number,
  perPage: number,
  q: string,
  stateId: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getCountiesPending());
    requestFromServer
      .getCounties(page, perPage, q, stateId, sort)
      .then((res) => {
        dispatch(getCountiesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getStatesFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add counties action thunk
 * @param name
 * @param salesTaxOne
 * @param salesTaxTwo
 * @param status
 * @param stateId
 * @returns
 */
export const addCountyActionThunk = (
  name: string,
  salesTaxOne: string,
  salesTaxTwo: string,
  status: number,
  stateId: string,
  itemsPerPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addCountiesPending());
    requestFromServer
      .addCounty(name, salesTaxOne, salesTaxTwo, status, stateId)
      .then((res) => {
        dispatch(addCountiesSuccess({ county: res.data, itemsPerPage }));
        successToast("State added successfully");
      })
      .catch((err) => {
        dispatch(addCountiesFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update counties action thunk
 * @param name
 * @param salesTaxOne
 * @param salesTaxTwo
 * @param status
 * @param stateId
 * @returns
 */
export const updateCountiesActionThunk = (
  name: string,
  salesTaxOne: string,
  salesTaxTwo: string,
  status: number,
  stateId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateCountiesPending());
    requestFromServer
      .updateCounty(name, salesTaxOne, salesTaxTwo, status, stateId)
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          dispatch(
            updateCountiesSuccess({
              name,
              salesTaxOne,
              salesTaxTwo,
              status,
              stateId,
            })
          );
          successToast("County updated successsfully");
        } else {
          dispatch(updateStateFailed());
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        dispatch(updateStateFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete counties action thunk
 * @param countyId
 * @returns
 */
export const deleteCountiesActionThunk = (
  countyId: string,
  getCounties: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteCountiesPending());
    requestFromServer
      .deleteCounty(countyId)
      .then((res) => {
        successToast("State deleted successfully");
        dispatch(deleteCountiesSuccess({ countyId, getCounties }));
        getCounties && setTimeout(() => getCounties(), 1000);
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(deleteCountiesFailed());
      });
  };
};

/* Zipcodes */

/**
 * Get zipcodes action thunk
 * @param page
 * @param perPage
 * @param q
 * @param stateId
 * @param countyId
 * @returns
 */
export const getZipcodesActioThunk = (
  isFilters: boolean,
  page: number,
  perPage: number,
  q: string,
  stateId: string,
  countyId: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getZipcodePending());
    requestFromServer
      .getZipcodes(isFilters, page, perPage, q, stateId, countyId, sort)
      .then((res) => {
        dispatch(getZipcodeSuccess(res.data));
      })
      .catch(() => {
        dispatch(getZipcodeFailed());
        errorToast("Something went wrong");
      });
  };
};

/**
 * Add zipcodes action thunk
 * @param areaName
 * @param zipcode
 * @param status
 * @param countyId
 * @returns
 */
export const addZipcodeActionThunk = (
  areaName: string,
  zipcode: string,
  status: number,
  countyId: string,
  itemsPerPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getZipcodePending());
    requestFromServer
      .addZipcode(areaName, Number(zipcode), Number(status), Number(countyId))
      .then((res) => {
        dispatch(addZipcodeSuccess({ zipcode: res.data, itemsPerPage }));
        successToast("Zipcode added successfully");
      })
      .catch((err) => {
        dispatch(addZipcodeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update zipcodes action thunk
 * @param areaName
 * @param zipcode
 * @param status
 * @param zipcodeId
 * @returns
 */
export const updateZipcodesActionThunk = (
  areaName: string,
  zipcode: number,
  status: number,
  zipcodeId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateZipcodePending());
    requestFromServer
      .updateZipcode(areaName, Number(zipcode), status, zipcodeId)
      .then((res) => {
        dispatch(
          updateZipcodeSuccess({ areaName, zipcode, status, zipcodeId })
        );
        successToast("Zipcode updated successfully");
      })
      .catch((err) => {
        dispatch(updateZipcodeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete zipcode action thunk
 * @param zipcodeId
 * @returns
 */
export const deleteZipcodeActionThunk = (
  zipcodeId: string,
  getZipcodes: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteZipcodePending());
    requestFromServer
      .deleteZipcode(zipcodeId)
      .then(() => {
        Promise.resolve(
          dispatch(deleteZipcodeSuccess({ zipcodeId, getZipcodes }))
        ).then(() => {
          successToast("Zipcode deleted successfully");
          getZipcodes && setTimeout(() => getZipcodes(), 1000);
        });
      })
      .catch((err) => {
        dispatch(deleteZipcodeFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

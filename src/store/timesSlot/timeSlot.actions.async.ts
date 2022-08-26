import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  timeSlotLoaded,
  getTimeSlot,
  timeSlotLoading,
  addNewTimeSlot,
  editTimeSlot,
  deleteTimeSlot,
} from "./timeSlot.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/timeSlot/timeSlotService";
import { TAddTimeSlotPayload, TEditTimeSlotPayload } from "./timeSlot.types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get time slot thunk
 * @returns
 */
export const getTimeSlotActionThunk = (
  search: string | null,
  page: number,
  perPage: number,
  isFilters?: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(timeSlotLoading());

    const getAsyncData = async () => {
      try {
        const response = await requestFromServer.getTimeSlotList(search, page, perPage, isFilters);
        dispatch(getTimeSlot(response.data));
      } catch (error: any) {
        dispatch(timeSlotLoaded());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      }
    };
    getAsyncData();

    // requestFromServer
    //   .getTimeSlotList(search, page, perPage, isFilters)
    //   .then((response) => {
    //     dispatch(getTimeSlot(response.data));
    //   })
    //   .catch((error) => {
    //     dispatch(timeSlotLoaded());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   });
  };
};

/**
 * add time slot thunk
 * @param values
 * @returns
 */
export const addTimeSlotActionThunk = (
  values: TAddTimeSlotPayload,
  page: number,
  perPageItem: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(timeSlotLoading());

    const addAsyncData = async () => {
      try {
        const response = await requestFromServer.addTimeSlot(values);

        dispatch(addNewTimeSlot());

        if (response.data.availableTimeSlots.length > 0) {
          errorToast(response.data.availableTimeSlots.length + " Slot is already available.");
        }

        if (response.data.createdTimeSlots.length > 0) {
          // setTimeout(() => {
          dispatch(getTimeSlotActionThunk(null, page, perPageItem));
          // }, 750);
          successToast(response.data.createdTimeSlots.length + " Time slots added successfully.");
        }
      } catch (error: any) {
        dispatch(timeSlotLoaded());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      }
    };
    addAsyncData();

    // requestFromServer
    //   .addTimeSlot(values)
    //   .then((response) => {
    //     dispatch(addNewTimeSlot());

    //     if (response.data.availableTimeSlots.length > 0) {
    //       errorToast(response.data.availableTimeSlots.length + " Slot is already available.");
    //     }

    //     if (response.data.createdTimeSlots.length > 0) {
    //       setTimeout(() => {
    //         dispatch(getTimeSlotActionThunk(null, page, perPageItem));
    //       }, 750);
    //       successToast(response.data.createdTimeSlots.length + " Time slots added successfully.");
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(timeSlotLoaded());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   });
  };
};

/**
 * edit time slot thunk
 * @param id
 * @param values
 * @returns
 */
export const editTimeSlotActionThunk = (
  id: number | null,
  values: TEditTimeSlotPayload
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(timeSlotLoading());

    requestFromServer
      .editTimeSlot(id, values)
      .then((response) => {
        dispatch(
          editTimeSlot({
            id: response.data.id,
            startTime: response.data.startTime,
            endTime: response.data.endTime,
          })
        );
        successToast("Time slot updated successfully.");
      })
      .catch((error) => {
        dispatch(timeSlotLoaded());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * delete time slot thunk
 * @param id
 * @returns
 */
export const deleteTimeSlotActionThunk = (
  id: number | null,
  page: number,
  perPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    // dispatch(timeSlotLoading());

    const deleteAsyncData = async () => {
      try {
        const response = await requestFromServer.deleteTimeSlot(id);
        dispatch(deleteTimeSlot());
        successToast("Time slots deleted.");

        if (response.status === 204) {
          dispatch(getTimeSlotActionThunk(null, page, perPage));
        }
      } catch (error: any) {
        dispatch(timeSlotLoaded());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      }
    };
    deleteAsyncData();

    // requestFromServer
    //   .deleteTimeSlot(id)
    //   .then(() => {
    //     dispatch(deleteTimeSlot());

    //     setTimeout(() => {
    //       dispatch(getTimeSlotActionThunk(null, page, perPage));
    //       successToast("Time slots deleted.");
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     dispatch(timeSlotLoaded());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   });
  };
};

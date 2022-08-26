import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  membershipLoadingAction,
  membershipLoadedAction,
  getMembershipAction,
  editMembershipAction,
  deleteMembershipAction,
} from "./membership.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/membership/membershipService";
import { TEditMembershipPayload } from "./membership.types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get membership thunk
 * @returns
 */
export const getMembershipActionThunk = (
  page: number,
  perPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipLoadingAction());

    requestFromServer
      .getMemberShipAPI(page, perPage)
      .then((response) => {
        dispatch(getMembershipAction(response.data));
      })
      .catch((error) => {
        dispatch(membershipLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * edit membership thunk
 * @param id
 * @param values
 * @returns
 */
export const editMembershipActionThunk = (
  id: number | string | null,
  values: TEditMembershipPayload
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipLoadingAction());

    requestFromServer
      .editMembershipAPI(id, values)
      .then(() => {
        dispatch(editMembershipAction());
        successToast("Membership edited.");
      })
      .catch((error) => {
        dispatch(membershipLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * delete membership thunk
 * @param id
 * @returns
 */
export const deleteMembershipActionThunk = (
  id: number | string | null,
  page: number,
  perPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipLoadingAction());

    requestFromServer
      .deleteMembershipAPI(id)
      .then(async () => {
        await dispatch(deleteMembershipAction());
        await dispatch(getMembershipActionThunk(page, perPage));

        successToast("Membership deleted.");
      })
      .catch((error) => {
        dispatch(membershipLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

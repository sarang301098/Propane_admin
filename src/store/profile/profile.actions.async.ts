import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  profileLoadingAction,
  profileLoadedAction,
  getProfileAction,
  editProfileAction,
} from "./profile.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/profile/profileService";
import { TEditProfilePayload } from "./profile.types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get profile data thunk
 * @returns
 */
export const getProfileActionThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(profileLoadingAction());

    requestFromServer
      .getProfileDataAPI()
      .then((response) => {
        dispatch(getProfileAction(response.data));
      })
      .catch((error) => {
        dispatch(profileLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * edit profile data thunk
 * @param id
 * @param values
 * @returns
 */
export const editProfileActionThunk = (
  id: string,
  values: TEditProfilePayload
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(profileLoadingAction());

    requestFromServer
      .editProfileAPI(id, values)
      .then(async () => {
        await dispatch(editProfileAction());
        await dispatch(getProfileActionThunk());
        successToast("Profile updated successfully.");
      })
      .catch((error) => {
        dispatch(profileLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

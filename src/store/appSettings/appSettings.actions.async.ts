import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import {
  appSettingsPending,
  appSettingsLoaded,
  getAppSettings,
  updateAppSettings,
} from "./appSettings.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/appSettings/appSettings";
import { TUpdateAppSettingsPayload } from "./appSettings.types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get app settings thunk
 * @returns
 */
export const getAppSettingsDataActionThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(appSettingsPending());

    requestFromServer
      .getAppSettingsAPI()
      .then((response) => {
        dispatch(getAppSettings(response.data.settings));
      })
      .catch((error) => {
        dispatch(appSettingsLoaded());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * update app settings thunk
 * @returns
 */
export const updateAppSettingsDataActionThunk = (
  settings: TUpdateAppSettingsPayload
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(appSettingsPending());

    requestFromServer
      .updateAppSettingsAPI(settings)
      .then(() => {
        dispatch(updateAppSettings());
        successToast("Settings updated successfully.");
      })
      .catch((error) => {
        dispatch(appSettingsLoaded());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

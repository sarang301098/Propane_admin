import { API } from "../../middleware/middleware";
import { TUpdateAppSettingsPayload } from "../../store/appSettings/appSettings.types";

/**
 * get app settings api call
 * @returns
 */
export const getAppSettingsAPI = (): Promise<any> => {
  return API.get("/appsettings");
};

/**
 * update app settings api call
 * @returns
 */
export const updateAppSettingsAPI = (
  settings: TUpdateAppSettingsPayload
): Promise<any> => {
  return API.patch("/appsettings/many", settings);
};

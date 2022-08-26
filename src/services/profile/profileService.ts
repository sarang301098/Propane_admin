import { API } from "../../middleware/middleware";
import { TEditProfilePayload } from "../../store/profile/profile.types";

/**
 * get profile api call
 * @returns
 */
export const getProfileDataAPI = (): Promise<any> => {
  return API.get("/users/profile/me");
};

/**
 * edit profile api call
 * @param id
 * @param values
 * @returns
 */

export const editProfileAPI = (id: string, values: TEditProfilePayload): Promise<any> => {
  return API.put("/users/" + id, { ...values });
};

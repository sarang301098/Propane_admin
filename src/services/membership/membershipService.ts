import { API } from "../../middleware/middleware";
import { TEditMembershipPayload } from "../../store/membership/membership.types";

/**
 * get membership api call
 * @returns
 */
export const getMemberShipAPI = (page: number, perPage: number): Promise<any> => {
  return API.get("/mocky", { params: { type: "membership", page, perPage } });
};

/**
 * edit membership api call
 * @param id
 * @param values
 * @returns
 */
export const editMembershipAPI = (
  id: number | string | null,
  values: TEditMembershipPayload
): Promise<any> => {
  return API.put("/membership/" + id, { ...values });
};

/**
 * delete membership api call
 * @param id
 * @returns
 */
export const deleteMembershipAPI = (id: number | string | null): Promise<any> => {
  return API.delete("/membership/" + id);
};

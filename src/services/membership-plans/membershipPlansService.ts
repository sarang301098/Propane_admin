import { API } from "../../middleware/middleware";

/**
 * get membership plan api call
 * @returns
 */
export const getMemberShipPlanAPI = (
  searchPlan?: string | null,
  planStatus?: boolean | null
): Promise<any> => {
  return API.get("/membershipPlans", { params: { search: searchPlan, status: planStatus } });
};

/**
 * get membership plan by id api call
 * @param id
 * @returns
 */
export const getMemberShipPlanAByIdAPI = (id: number | null): Promise<any> => {
  return API.get("/membershipPlans/" + id);
};

/**
 * edit membership plan api call
 * @param values
 * @returns
 */

export const editMembershipPlanAPI = (values: Record<string, any>): Promise<any> => {
  return API.patch("/membershipPlans", values);
};

/**
 * delete membership plan api call
 * @param id
 * @returns
 */
// export const deleteMembershipPlanAPI = (id: number | string | null): Promise<any> => {
//   return API.delete("/membershipPlan/" + id);
// };

import { API } from "../../middleware/middleware";
import { TRolesPayload } from "../../store/rolesAndPermissions/rolesAndPermissions.types";
/**
 * Get roles API call
 * @param page
 * @param perPage
 * @param search
 * @returns
 */
const getRoles = (
  page: number,
  perPage: number,
  // sort: string,
  search?: string
): Promise<any> => {
  return API.get("/roles", {
    params: {
      page,
      perPage,
      // sort,
      search: search || undefined,
      // sortBy: "fullName",
    },
  });
};

/**
 * Get roles by id API call
 * @param id
 * @returns
 */
const getRolesById = (id: string): Promise<any> => {
  return API.get("/roles/" + id);
};

/**
 * Get modules API call
 * @returns
 */
const getModules = (): Promise<any> => {
  return API.get("/modules");
};

/**
 * Update roles API call
 * @param values
 * @param id
 * @returns
 */
const updateRoles = (values: TRolesPayload, id: string): Promise<any> => {
  return API.put("/roles/" + id, { ...values });
};

/**
 * Delete roles API integration
 * @param id
 * @returns
 */
const deleteRoles = (id: string): Promise<any> => {
  return API.delete("/roles/" + id);
};

/**
 * Add roles API integration
 * @param values
 * @returns
 */
const addRoles = (values: TRolesPayload): Promise<any> => {
  return API.post("/roles", values);
};

/**
 * Update roles status API Integration
 * @param isActive
 * @param id
 * @returns
 */
const updateRolesStatus = (
  isActive: boolean,
  id: string | number
): Promise<any> => {
  return API.put("/roles/" + id, { isActive });
};
export {
  getRoles,
  addRoles,
  getModules,
  updateRoles,
  getRolesById,
  deleteRoles,
  updateRolesStatus,
};

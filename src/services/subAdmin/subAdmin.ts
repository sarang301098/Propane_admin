import { API } from "../../middleware/middleware";

/**
 * Get sub admin API call
 * @param page
 * @param perPage
 * @param search
 * @returns
 */
const getSubAdmin = (
  page: number,
  perPage: number,
  search: string,
  sort: string
): Promise<any> => {
  return API.get("/subAdmins", {
    params: {
      page,
      perPage,
      search: search || undefined,
      sort,
      sortBy: "fullName",
    },
  });
};

/**
 * Get sub admin by id API call
 * @param id
 * @returns
 */
const getSubAdminById = (id: string | number): Promise<any> => {
  return API.get("/subAdmins/" + id);
};

/**
 * Get all roles API call
 * @returns
 */
const getAllRoles = (): Promise<any> => {
  return API.get("/roles/all/options");
};
/**
 * Add sub admin API call
 * @returns
 */
const addSubAdmin = (
  status: boolean,
  mobileNumber: number,
  email: string,
  fullName: string,
  roleId: number
): Promise<any> => {
  return API.post("/subAdmins", {
    status: Number(status) ? true : false,
    countryCode: "+1",
    mobileNumber,
    email,
    fullName,
    roleId,
  });
};

/**
 * Update sub admin API call
 * @returns
 */
const updateSubAdmin = (
  status: boolean,
  mobileNumber: number,
  email: string,
  fullName: string,
  roleId: number,
  id: string | number
): Promise<any> => {
  return API.put("/subAdmins/" + id, {
    status: Number(status) ? true : false,
    countryCode: "+1",
    mobileNumber,
    email,
    fullName,
    roleId,
  });
};

/**
 * Delete sub admin API call
 * @param id
 * @returns
 */
const deleteSubAdmin = (id: string | null): Promise<any> => {
  return API.delete("/subAdmins/" + id);
};

/**
 * Update sub admin status API call
 * @param isActive
 * @returns
 */
const updateSubAdminStatus = (
  isActive: boolean,
  id: string | number
): Promise<any> => {
  return API.put("/users/" + id, { isActive });
};

export {
  getSubAdmin,
  getSubAdminById,
  getAllRoles,
  addSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
  updateSubAdminStatus,
};

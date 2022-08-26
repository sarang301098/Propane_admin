import { action } from "typesafe-actions";
import actionTypes from "./subAdmin.enum";
import { TSingleSubAdminPayload, TSubAdminPayload } from "./subAdmin.types";

/**
 * Get sub admin pending action creator
 * @returns
 */
const getSubAdminPending = () => {
  return action(actionTypes.GET_SUB_ADMIN_PENDING);
};

/**
 * Get sub admin success action creator
 * @param payload
 * @returns
 */
const getSubAdminSuccess = (payload: object) => {
  return action(actionTypes.GET_SUB_ADMIN_SUCCESS, payload);
};

/**
 * Get sub admin failed action creator
 * @returns
 */
const getSubAdminFailed = () => {
  return action(actionTypes.GET_SUB_ADMIN_FAILED);
};

/**
 * Get sub admin by id pending action creator
 * @returns
 */
const getSubAdminByIdPending = () => {
  return action(actionTypes.GET_SUB_ADMIN_BY_ID_PENDING);
};

/**
 * Get sub admin by id success action creator
 * @returns
 */
const getSubAdminByIdSuccess = (payload: TSingleSubAdminPayload) => {
  return action(actionTypes.GET_SUB_ADMIN_BY_ID_SUCCESS, payload);
};

/**
 * Get sub admin by id failed action creator
 * @returns
 */
const getSubAdminByIdFailed = () => {
  return action(actionTypes.GET_SUB_ADMIN_BY_ID_FAILED);
};

/**
 *Get all roles pending action creator
 * @returns
 */
const getAllRolesPending = () => {
  return action(actionTypes.GET_ALL_ROLES_PENDING);
};

/**
 * Get all roles success action creator
 * @returns
 */
const getAllRolesSuccess = (payload: object) => {
  return action(actionTypes.GET_ALL_ROLES_SUCCESS, payload);
};

/**
 * Get all roles failed action creator
 * @returns
 */
const getAllRolesFailed = () => {
  return action(actionTypes.GET_ALL_ROLES_FAILED);
};
/**
 * Update sub admin pending action creator
 * @returns
 */
const updateSubAdminPending = () => {
  return action(actionTypes.UPDATE_SUB_ADMIN_PENDING);
};

/**
 * Update sub admin success action creator
 * @returns
 */
const updateSubAdminSuccess = (payload: {
  id: string | number;
  roleId: string | number;
  fullName: string;
  email: string;
  mobileNumber: number;
  status: boolean;
}) => {
  return action(actionTypes.UPDATE_SUB_ADMIN_SUCCESS, payload);
};

/**
 * Update sub admin failed action creator
 * @returns
 */
const updateSubAdminFailed = () => {
  return action(actionTypes.UPDATE_SUB_ADMIN_FAILED);
};

/**
 * Add sub admin pending action creator
 * @returns
 */
const addSubAdminPending = () => {
  return action(actionTypes.ADD_SUB_ADMIN_FAILED);
};

/**
 * Add sub admin success action creator
 * @param payload
 * @returns
 */
const addSubAdminSuccess = (payload: {
  subAdminData: TSubAdminPayload;
  itemsPerPage: number;
}) => {
  return action(actionTypes.ADD_SUB_ADMIN_SUCCESS, payload);
};

/**
 * Add sub admin failed action creator
 * @returns
 */
const addSubAdminFailed = () => {
  return action(actionTypes.ADD_SUB_ADMIN_FAILED);
};

/**
 * Delete sub admin pending action creator
 * @returns
 */
const deleteSubAdminPending = () => {
  return action(actionTypes.DELETE_SUB_ADMIN_PENDING);
};

/**
 * Delete sub admin success action creator
 * @param payload
 * @returns
 */
const deleteSubAdminSuccess = (payload: string | null) => {
  return action(actionTypes.DELETE_SUB_ADMIN_SUCCESS, payload);
};

/**
 * Delete sub admin failed action creator
 * @returns
 */
const deleteSubAdminFailed = () => {
  return action(actionTypes.DELTE_SUB_ADMIN_FAILED);
};

/**
 * Update sub admin status pending action creator
 * @returns
 */
const updateSubAdminStatusPending = () => {
  return action(actionTypes.UPDATE_SUB_ADMIN_STATUS_PENDING);
};

/**
 *  Update sub admin status success action creator
 * @returns
 */
const updateSubAdminStatusSuccess = (payload: {
  isActive: boolean;
  id: string | number;
}) => {
  return action(actionTypes.UPDATE_SUB_ADMIN_STATUS_SUCCESS, payload);
};

/**
 * Update sub admin status failed action creator
 * @returns
 */
const updateSubAdminStatusFailed = () => {
  return action(actionTypes.UPDATE_SUB_ADMIN_STATUS_FAILED);
};
export {
  getSubAdminPending,
  getSubAdminSuccess,
  getSubAdminFailed,
  getSubAdminByIdPending,
  getSubAdminByIdSuccess,
  getSubAdminByIdFailed,
  getAllRolesPending,
  getAllRolesSuccess,
  getAllRolesFailed,
  updateSubAdminPending,
  updateSubAdminSuccess,
  updateSubAdminFailed,
  addSubAdminPending,
  addSubAdminSuccess,
  addSubAdminFailed,
  deleteSubAdminPending,
  deleteSubAdminSuccess,
  deleteSubAdminFailed,
  updateSubAdminStatusPending,
  updateSubAdminStatusSuccess,
  updateSubAdminStatusFailed,
};

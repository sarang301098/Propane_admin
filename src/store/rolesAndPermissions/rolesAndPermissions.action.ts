import { action } from "typesafe-actions";
import actionTypes from "./rolesAndPermissions.enum";
import { TRolesPayload } from "./rolesAndPermissions.types";

/**
 * Get Roles Pending Action Creator
 * @returns
 */
const getRolesPending = () => {
  return action(actionTypes.GET_ROLES_PENDING);
};

/**
 * Get Roles Success Action Creator
 * @param payload
 * @returns
 */
const getRolesSuccess = (payload: object) => {
  return action(actionTypes.GET_ROLES_SUCCESS, payload);
};

/**
 * Get Roles Failed Action Creator
 * @returns
 */
const getRolesFailed = () => {
  return action(actionTypes.GET_ROLES_FAILED);
};

/**
 * Get role by id pending action creator
 * @returns
 */
const getRoleByIdPending = () => {
  return action(actionTypes.GET_ROLES_BY_ID_PENDING);
};

/**
 * Get role by id success action creator
 * @param payload
 * @returns
 */
const getRoleByIdSuccess = (payload: object) => {
  return action(actionTypes.GET_ROLES_BY_ID_SUCCESS, payload);
};

/**
 * Get role by id failed action creator
 * @returns
 */
const getRoleByIdFailed = () => {
  return action(actionTypes.GET_ROLES_BY_ID_FAILED);
};

/**
 * Get module pending
 * @returns
 */
const getMoulesPending = () => {
  return action(actionTypes.GET_MODULES_PENDING);
};

/**
 * Get modules success action creator
 * @param payload
 * @returns
 */
const getModulesSuccess = (payload: object) => {
  return action(actionTypes.GET_MODULES_SUCCESS, payload);
};

/**
 * Get modules failed action creator
 * @returns
 */
const getModulesFailed = () => {
  return action(actionTypes.GET_MODULES_FAILED);
};
/**
 * Update Roles and Permission Pending Action Creator
 * @returns
 */
const updateRolesAndPermissionPending = () => {
  return action(actionTypes.UPDATE_ROLES_AND_PERMISSION_PENDING);
};

/**
 * Update Roles and Permission Success Action Creator
 * @param payload
 * @returns
 */
const updateRolesAndPermissionSuccess = (payload: {
  values: TRolesPayload;
  id: string;
}) => {
  return action(actionTypes.UPDATE_ROLES_AND_PERMISSION_SUCCESS, payload);
};

/**
 * Update Roles and Permission Failed Action Creator
 * @returns
 */
const updateRolesAndPermissionFailed = () => {
  return action(actionTypes.UPDATE_ROLES_AND_PERMISSION_FAILED);
};

/**
 * Delete role pending action creator
 * @returns
 */
const deleteRolePending = () => {
  return action(actionTypes.DELETE_ROLES_PENDING);
};

/**
 * Delete role success action creator
 * @returns
 */
const deleteRoleSuccess = (payload: string) => {
  return action(actionTypes.DELETE_ROLES_SUCCESS, Number(payload));
};

/**
 * Delete role failed action creator
 * @returns
 */
const deleteRoleFailed = () => {
  return action(actionTypes.DELETE_ROLES_FAILED);
};

/**
 * Add roles pending action creator
 * @returns
 */
const addRolesPending = () => {
  return action(actionTypes.ADD_ROLES_PENDING);
};

/**
 * Add roles success action creator
 * @param payload
 * @returns
 */
const addRolesSuccess = (payload: object) => {
  return action(actionTypes.ADD_ROLES_SUCCESS, payload);
};

/**
 * Add roles failed action creator
 * @returns
 */
const addRolesFailed = () => {
  return action(actionTypes.ADD_ROLES_FAILED);
};

/**
 * Update roles status pending action creator
 * @returns
 */
const updateRolesStatusPending = () => {
  return action(actionTypes.UPDATE_ROLES_STATUS_PENDING);
};

/**
 * Update roles status success action creator
 * @param payload
 * @returns
 */
const updateRolesStatusSuccess = (payload: {
  isActive: boolean;
  id: string | number;
}) => {
  return action(actionTypes.UPDATE_ROLES_STATUS_SUCCESS, payload);
};

/**
 * Update roles status failed action creator
 * @returns
 */
const updateRolesStatusFailed = () => {
  return action(actionTypes.UPDATE_ROLES_STATUS_FAILED);
};
export {
  getRolesPending,
  getRolesSuccess,
  getRolesFailed,
  getMoulesPending,
  getModulesSuccess,
  getModulesFailed,
  addRolesPending,
  addRolesSuccess,
  addRolesFailed,
  getRoleByIdPending,
  getRoleByIdSuccess,
  getRoleByIdFailed,
  deleteRolePending,
  deleteRoleSuccess,
  deleteRoleFailed,
  updateRolesAndPermissionPending,
  updateRolesAndPermissionSuccess,
  updateRolesAndPermissionFailed,
  updateRolesStatusPending,
  updateRolesStatusSuccess,
  updateRolesStatusFailed,
};

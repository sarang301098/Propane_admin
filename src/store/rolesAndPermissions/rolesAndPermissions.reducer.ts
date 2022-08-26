import actionTypes from "./rolesAndPermissions.enum";
import {
  TRolesAndPermissionActionTypes,
  TRolesAndPermissionState,
} from "./rolesAndPermissions.types";
const ininitialState: TRolesAndPermissionState = {
  loading: false,
  modulesData: { count: 0, modules: [] },
  rolesData: {
    count: 0,
    roles: [],
  },
  singleRolesData: {},
};
const rolesAndPermissionReducer = (
  state = ininitialState,
  action: TRolesAndPermissionActionTypes
) => {
  switch (action.type) {
    case actionTypes.GET_ROLES_PENDING:
      return { ...state, loading: true };

    case actionTypes.GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        rolesData: action.payload,
      };

    case actionTypes.GET_ROLES_FAILED:
      return { ...state, loading: false };

    case actionTypes.GET_MODULES_PENDING:
      return { ...state, loading: true };

    case actionTypes.GET_MODULES_SUCCESS:
      return {
        ...state,
        loading: false,
        modulesData: action.payload,
      };

    case actionTypes.GET_MODULES_FAILED:
      return { ...state, loading: false };

    case actionTypes.GET_ROLES_BY_ID_PENDING:
      return { ...state, loading: true };

    case actionTypes.GET_ROLES_BY_ID_SUCCESS:
      return { ...state, loading: false, singleRolesData: action.payload };

    case actionTypes.GET_ROLES_BY_ID_FAILED:
      return { ...state, loading: true };

    case actionTypes.ADD_ROLES_PENDING:
      return { ...state, loading: true };

    case actionTypes.ADD_ROLES_SUCCESS:
      const addRoles = [...state.rolesData?.roles];
      if (state.rolesData.roles.length < action.payload.itemsPerPage) {
        addRoles.push(action.payload.addRoles);
      }

      return {
        ...state,
        loading: false,
        rolesData: { ...state?.rolesData, roles: addRoles },
      };

    case actionTypes.ADD_ROLES_FAILED:
      return { ...state, loading: false };

    case actionTypes.UPDATE_ROLES_AND_PERMISSION_PENDING:
      return { ...state, loading: true };

    case actionTypes.UPDATE_ROLES_AND_PERMISSION_SUCCESS:
      const roleId = action.payload.id;
      const updatedRole = [...state.rolesData?.roles];
      const roleIndex = updatedRole?.findIndex(
        (role) => role.id === Number(roleId)
      );
      if (roleIndex > -1) {
        updatedRole[roleIndex].name = action.payload.values.name;
        updatedRole[roleIndex].isActive = action.payload.values.status;
      }
      return {
        ...state,
        loading: false,
        rolesData: {
          ...state?.rolesData,
          roles: updatedRole,
        },
      };

    case actionTypes.UPDATE_ROLES_AND_PERMISSION_FAILED:
      return { ...state, loading: false };

    case actionTypes.DELETE_ROLES_PENDING:
      return { ...state, loading: true };

    case actionTypes.DELETE_ROLES_SUCCESS:
      const deleteRoleId = action.payload;
      const deleteRole = [...state.rolesData?.roles];
      const deleteRoleIndex = deleteRole?.findIndex(
        (role) => role.id === deleteRoleId
      );
      if (deleteRoleIndex > -1) {
        deleteRole.splice(deleteRoleIndex, 1);
      }

      return {
        ...state,
        loading: false,
        rolesData: {
          ...state?.rolesData,
          roles: deleteRole,
          count:
            deleteRoleIndex > -1
              ? state?.rolesData?.count - 1
              : state?.rolesData?.count,
        },
      };

    case actionTypes.DELETE_ROLES_FAILED:
      return { ...state, loading: false };

    case actionTypes.UPDATE_ROLES_STATUS_PENDING:
      return { ...state, loading: true };

    case actionTypes.UPDATE_ROLES_STATUS_SUCCESS:
      const updatedRoleStatus = [...state.rolesData.roles];
      const updateRolesStatusId = updatedRoleStatus.findIndex(
        (roles) => roles.id === Number(action.payload.id)
      );
      if (updateRolesStatusId > -1) {
        updatedRoleStatus[updateRolesStatusId]["isActive"] =
          action.payload.isActive;
      }
      return {
        ...state,
        loading: false,
        rolesData: {
          ...state?.rolesData,
          roles: updatedRoleStatus,
        },
      };

    case actionTypes.UPDATE_ROLES_STATUS_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default rolesAndPermissionReducer;

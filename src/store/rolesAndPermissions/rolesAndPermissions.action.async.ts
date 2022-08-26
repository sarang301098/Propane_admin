import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import {
  getRolesPending,
  getRolesSuccess,
  getRolesFailed,
  getMoulesPending,
  getModulesSuccess,
  getModulesFailed,
  addRolesPending,
  addRolesSuccess,
  addRolesFailed,
  updateRolesAndPermissionPending,
  updateRolesAndPermissionSuccess,
  updateRolesAndPermissionFailed,
  deleteRolePending,
  deleteRoleSuccess,
  deleteRoleFailed,
  getRoleByIdFailed,
  getRoleByIdSuccess,
  getRoleByIdPending,
  updateRolesStatusPending,
  updateRolesStatusSuccess,
  updateRolesStatusFailed,
} from "./rolesAndPermissions.action";
import * as requestFromServer from "../../services/rolesAndPermission/rolesAndPermission";
import { toast } from "react-toastify";
import { TRolesPayload } from "./rolesAndPermissions.types";
import { errorToast, successToast } from "../../components/toast/toast";

const notifyError = (error: string) => toast.error(error, { theme: "colored" });

/**
 * Get roles action thunk
 * @param page
 * @param perPage
 * @param search
 * @returns
 */
export const getRolesActionThunk = (
  page: number,
  perPage: number,
  // sort: string,
  search?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getRolesPending());
    return requestFromServer
      .getRoles(page, perPage, search)
      .then((res) => {
        dispatch(getRolesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getRolesFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get role by id action thunk
 * @param id
 * @returns
 */
export const getRoleByIdActionThunk = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getRoleByIdPending());
    return requestFromServer
      .getRolesById(id)
      .then((res) => {
        dispatch(getRoleByIdSuccess(res?.data?.role));
      })
      .catch((error) => {
        dispatch(getRoleByIdFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get modules action thunk
 * @returns
 */
export const getModulesActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getMoulesPending());
    return requestFromServer
      .getModules()
      .then((res) => {
        dispatch(getModulesSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getModulesFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add roles action thunk
 * @param values
 * @returns
 */
export const addRolesAndActionThunk = (
  values: TRolesPayload
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addRolesPending());

    return requestFromServer
      .addRoles(values)
      .then((res) => {
        dispatch(addRolesSuccess(res.data));
        successToast("Role added successfully");
      })
      .catch((error) => {
        dispatch(addRolesFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update roles and permission action thunk
 * @param values
 * @param id
 * @returns
 */
export const updateRolesAndPermissionActionThunk = (
  values: TRolesPayload,
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateRolesAndPermissionPending());

    return requestFromServer
      .updateRoles(values, id)
      .then((res) => {
        if (res.status === 204) {
          dispatch(updateRolesAndPermissionSuccess({ values, id }));
          successToast("Role updated successfully");
        }
      })
      .catch((error) => {
        dispatch(updateRolesAndPermissionFailed());
        errorToast(error?.response?.data?.message || "Something went wrong.");
      });
  };
};

/**
 * Delete role action thunk
 * @param id
 * @returns
 */
export const deleteRoleActionThunk = (
  id: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteRolePending());

    return requestFromServer
      .deleteRoles(id)
      .then((res) => {
        dispatch(deleteRoleSuccess(id));
        successToast("Role deleted successfully");
      })
      .catch((error) => {
        notifyError("Something went wrong.");
        dispatch(deleteRoleFailed());
        errorToast(error?.response?.data?.message || "Something went wrong.");
      });
  };
};

/**
 * Update roles status action creator
 * @param isActive
 * @param id
 * @returns
 */
export const updateRolesStatusActionThunk = (
  isActive: boolean,
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateRolesStatusPending());
    requestFromServer
      .updateRolesStatus(isActive, id)
      .then((res) => {
        dispatch(updateRolesStatusSuccess({ isActive, id }));
        successToast("Role status updated successfully");
      })
      .catch((err) => {
        dispatch(updateRolesStatusFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

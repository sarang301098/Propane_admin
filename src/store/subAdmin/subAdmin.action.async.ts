import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/subAdmin/subAdmin";
import { errorToast, successToast } from "../../components/toast/toast";
import {
  addSubAdminFailed,
  addSubAdminPending,
  addSubAdminSuccess,
  deleteSubAdminFailed,
  deleteSubAdminPending,
  deleteSubAdminSuccess,
  getAllRolesFailed,
  getAllRolesPending,
  getAllRolesSuccess,
  getSubAdminByIdFailed,
  getSubAdminByIdPending,
  getSubAdminByIdSuccess,
  getSubAdminFailed,
  getSubAdminPending,
  getSubAdminSuccess,
  updateSubAdminFailed,
  updateSubAdminPending,
  updateSubAdminStatusFailed,
  updateSubAdminStatusPending,
  updateSubAdminStatusSuccess,
  updateSubAdminSuccess,
} from "./subAdmin.action";

/**
 * Get sub admin action thunk
 * @param page
 * @param perPage
 * @param search
 * @returns
 */
export const getSubAdminActionThunk = (
  page: number,
  perPage: number,
  search: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getSubAdminPending());
    requestFromServer
      .getSubAdmin(page, perPage, search, sort)
      .then((res) => {
        dispatch(getSubAdminSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getSubAdminFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get sub admin by id action thunk
 * @param id
 * @returns
 */
export const getSubAdminByIdActionThunk = (
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getSubAdminByIdPending());
    requestFromServer
      .getSubAdminById(id)
      .then((res) => {
        dispatch(getSubAdminByIdSuccess(res.data?.subAdmin?.roleId));
      })
      .catch((err) => {
        dispatch(getSubAdminByIdFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get all roles action creator
 * @returns
 */
export const getAllRolesActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getAllRolesPending());
    requestFromServer
      .getAllRoles()
      .then((res) => {
        dispatch(getAllRolesSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getAllRolesFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update sub admin action thunk
 * @returns
 */
export const updateSubAdminActionThunk = (
  status: boolean,
  mobileNumber: number,
  email: string,
  fullName: string,
  roleId: number,
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateSubAdminPending());
    requestFromServer
      .updateSubAdmin(status, mobileNumber, email, fullName, roleId, id)
      .then((res) => {
        dispatch(
          updateSubAdminSuccess({
            id,
            roleId,
            fullName,
            email,
            mobileNumber,
            status,
          })
        );
        successToast("Sub admin updated successfully");
      })
      .catch((err) => {
        dispatch(updateSubAdminFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete sub admin action thunk
 * @param id
 * @returns
 */
export const deleteSubAdminActionThunk = (
  id: string | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteSubAdminPending());
    requestFromServer
      .deleteSubAdmin(id)
      .then((res) => {
        dispatch(deleteSubAdminSuccess(id));
        successToast("Sub admin deleted successfully");
      })
      .catch((err) => {
        dispatch(deleteSubAdminFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add sub admin action thunk
 * @returns
 */
export const addSubAdminActionThunk = (
  status: boolean,
  mobileNumber: number,
  email: string,
  fullName: string,
  roleId: number,
  itemsPerPage: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addSubAdminPending());
    requestFromServer
      .addSubAdmin(status, mobileNumber, email, fullName, roleId)
      .then((res) => {
        dispatch(
          addSubAdminSuccess({
            subAdminData: res.data.user,
            itemsPerPage,
          })
        );
        successToast("Sub admin added successfully");
      })
      .catch((err) => {
        dispatch(addSubAdminFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update sub admin action thunk
 * @param isActive
 * @returns
 */
export const updateSubAdminStatusActionThunk = (
  isActive: boolean,
  id: string | number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateSubAdminStatusPending());
    requestFromServer
      .updateSubAdminStatus(isActive, id)
      .then((res) => {
        dispatch(updateSubAdminStatusSuccess({ isActive, id }));
        successToast("Sub admin status updated successfully");
      })
      .catch((err) => {
        dispatch(updateSubAdminStatusFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

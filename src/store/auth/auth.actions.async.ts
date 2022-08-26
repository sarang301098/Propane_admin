import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RouteComponentProps } from "react-router-dom";

import {
  authPending,
  loginSuccess,
  authSuccess,
  forgotPassword,
  resetForgotPasswordSuccess,
  changePassword,
  logout,
} from "./auth.action";
import { errorToast, successToast } from "../../components/toast/toast";
import { setWithExpiry } from "../../utils/helpers/password";
import * as requestFromServer from "../../services/auth/authService";
import {
  TLoginPayloadData,
  TForgotPasswordPayloadData,
  TResetForgotPasswordPayloadData,
  TChangePasswordPayloadData,
} from "./auth.types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * auth user login thunk
 * @param values
 * @param rememberMe
 */
export const loginActionThunk = (
  values: TLoginPayloadData,
  rememberMe: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());
    setTimeout(() => {
      dispatch(authSuccess());
    }, 10000);
    requestFromServer
      .authLogin(values)
      .then((response) => {
        dispatch(
          loginSuccess({ token: response.data.access_token, refreshToken: response.data.refresh_token })
        );
        if (rememberMe) {
          setWithExpiry("encPass", values.password, values.email, 9);
        }
        if (!rememberMe) {
          localStorage.removeItem("rememberMe");
        }
        localStorage.setItem("lToken", response.data.access_token);
        localStorage.setItem("lRefreshToken", response.data.refresh_token);
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * auth user forgot password thunk
 * @param values
 * @returns
 */
export const forgotPasswordActionThunk = (
  values: TForgotPasswordPayloadData,
  showConfirmModal: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());
    requestFromServer
      .authForgotPassword(values)
      .then(() => {
        dispatch(forgotPassword());
        showConfirmModal();
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * auth user reset forgot password thunk
 * @param values
 * @returns
 */
export const ResetForgotPasswordActionThunk = (
  values: TResetForgotPasswordPayloadData,
  history: RouteComponentProps["history"]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());

    requestFromServer
      .authResetForgotPassword(values)
      .then(async (response) => {
        await dispatch(resetForgotPasswordSuccess());
        history.push("/login");
        successToast(response.data.message);
        localStorage.removeItem("rememberMe");
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * auth user change password thunk
 * @param values
 * @returns
 */
export const changePasswordActionThunk = (
  values: TChangePasswordPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(authPending());
    requestFromServer
      .authChangePassword(values)
      .then((response) => {
        dispatch(changePassword());
        if (response.data && response.data.message) {
          successToast(response.data.message);
        }
        localStorage.removeItem("rememberMe");
        dispatch(logout());
      })
      .catch((error) => {
        dispatch(authSuccess());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

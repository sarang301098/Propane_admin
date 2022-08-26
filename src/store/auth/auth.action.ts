import { action } from "typesafe-actions";
import AuthActionTypeEnum from "./auth.enum";
import { TAuthPayload } from "./auth.types";

/**
 * auth pending action creator
 * @returns
 */
const authPending = () => action(AuthActionTypeEnum.AUTH_PENDING);

/**
 * auth success action creator
 * @returns
 */
const authSuccess = () => action(AuthActionTypeEnum.AUTH_SUCCESS);

/**
 * auth login action creator
 * @param token
 * @returns
 */
const loginSuccess = (token: TAuthPayload) =>
  action(AuthActionTypeEnum.LOGIN_SUCCESS, token);

/**
 * auth logout action creator
 * @returns
 */
const logout = () => action(AuthActionTypeEnum.LOGOUT);

/**
 * auth forgot password action creator
 * @returns
 */
const forgotPassword = () => action(AuthActionTypeEnum.FORGOT_PASSWORD);

/**
 * auth reset forgot password action creator
 * @returns
 */
const resetForgotPasswordSuccess = () =>
  action(AuthActionTypeEnum.RESET_FORGOT_PASSWORD);

/**
 * auth change password action creator
 * @returns
 */
const changePassword = () => action(AuthActionTypeEnum.CHANGE_PASSWORD);

export {
  authPending,
  authSuccess,
  loginSuccess,
  logout,
  forgotPassword,
  resetForgotPasswordSuccess,
  changePassword,
};

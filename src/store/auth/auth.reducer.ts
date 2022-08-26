import AuthActionTypeEnum from "./auth.enum";
import { TAuthActionType, TAuthState } from "./auth.types";

const INITIAL_STATE: TAuthState = {
  loading: false,
  token: null,
  refreshToken: null,
};

const authReducer = (state = INITIAL_STATE, action: TAuthActionType): TAuthState => {
  switch (action.type) {
    case AuthActionTypeEnum.AUTH_PENDING:
      return { ...state, loading: true };

    case AuthActionTypeEnum.AUTH_SUCCESS:
      return { ...state, loading: false };

    case AuthActionTypeEnum.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token || null,
        refreshToken: action.payload.refreshToken || null,
      };

    case AuthActionTypeEnum.FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
      };

    case AuthActionTypeEnum.RESET_FORGOT_PASSWORD:
      return {
        ...state,
        loading: false,
      };

    case AuthActionTypeEnum.CHANGE_PASSWORD:
      return {
        ...state,
        loading: false,
      };

    case AuthActionTypeEnum.LOGOUT:
      return {
        ...state,
        token: null,
        refreshToken: null,
      };

    default:
      return state;
  }
};

export default authReducer;

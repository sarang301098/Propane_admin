import UserActionTypeEnum from "./user.enum";
import { TUserState, TUserActionType } from "./user.types";

const initialState: TUserState = {
  loading: true,
  usersList: { users: [], count: 0 },
};

const userReducer = (
  state = initialState,
  action: TUserActionType
): TUserState => {
  switch (action.type) {
    case UserActionTypeEnum.GET_USER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypeEnum.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        usersList: action.payload,
      };
    case UserActionTypeEnum.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default userReducer;

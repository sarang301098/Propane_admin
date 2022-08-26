import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { getUsersPending, getUsersSuccess } from "./user.action";
import * as requestFromServer from "../../services/user/userService";
import { errorToast } from "../../components/toast/toast";
import { gerAccessoriesFailed } from "../accessories/accessories.action";

export const getUsersActionThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getUsersPending());
    requestFromServer
      .getUser()
      .then((res) => {
        dispatch(getUsersSuccess(res.data));
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message);
        dispatch(gerAccessoriesFailed());
      });
  };
};

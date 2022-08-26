import { action } from "typesafe-actions";
import UserActionTypeEnum from "./user.enum";

const getUsersSuccess = (payload: {
  count: number;
  users: { fullName: string; id: string }[];
}) => action(UserActionTypeEnum.GET_USER_SUCCESS, payload);

const getUsersFailed = () => action(UserActionTypeEnum.GET_USER_FAILED);

const getUsersPending = () => action(UserActionTypeEnum.GET_USER_PENDING);

export { getUsersSuccess, getUsersFailed, getUsersPending };

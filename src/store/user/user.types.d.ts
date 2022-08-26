import { ActionType } from "typesafe-actions";
import * as actions from "./user.action";

type TUserActionType = ActionType<typeof actions>;

type TUserState = {
  loading: boolean;
  usersList: { count: number; users: { fullName: string; id: string }[] };
};

export { TUserActionType, TUserState };

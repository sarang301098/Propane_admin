import { ActionType } from "typesafe-actions";
import * as actions from "./auth.action";

type TPaginationState = {
  perPageItems: number;
};

type TPaginationActionType = ActionType<typeof actions>;

export { TPaginationState, TPaginationActionType };

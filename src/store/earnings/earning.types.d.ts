import { ActionType } from "typesafe-actions";
import * as actions from "./earning.action";

type TEarningState = {
  loading: boolean;
  netEarningList: { count: number; earnings: Record<string, string | number>[] };
  cancelOrderEarningList: { count: number; cancelledearnings: Record<string, string | number>[] };
};

type TEarningActionType = ActionType<typeof actions>;

export { TEarningActionType, TEarningState };

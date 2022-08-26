import { ActionType } from "typesafe-actions";
import * as actions from "./earning.action";

type TCylinderSizePayload = {
  id: number;
  cylinderSize: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: null | string;
};
type TCylinderSizeState = {
  loading: boolean;
  cylinderSizeData: { count: number; cylinderSizes: TCylinderSizePayload[] };
};

type TCylinderSizeActionType = ActionType<typeof actions>;

export { TCylinderSizeState, TCylinderSizePayload, TCylinderSizeActionType };

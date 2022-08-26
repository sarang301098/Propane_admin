import { ActionType } from "typesafe-actions";
import * as actions from "./auth.action";

type TTestState = {
  loading: boolean;
  test: string | null;
};

type TTestPayload = {
  test: string | null;
};

type TTestPayloadData = {
  testEmail: string;
  testPassword: string;
};

type TTestActionType = ActionType<typeof actions>;

export { TTestActionType, TTestState, TTestPayload, TTestPayloadData };

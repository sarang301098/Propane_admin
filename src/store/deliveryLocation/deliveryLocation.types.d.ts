import * as actions from "./dashboard.action.creator";
import { ActionType } from "typesafe-actions";

type TDeliveryLoacationPayload = {};

type TDeliveryLocationState = {
  deliveryLocationData: any;
  loading: boolean;
};
type TDeliveryLocationActionTypes = ActionType<typeof actions>;

export {
  TDeliveryLoacationPayload,
  TDeliveryLocationState,
  TDeliveryLocationActionTypes,
};

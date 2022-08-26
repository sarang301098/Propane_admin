import { action } from "typesafe-actions";
import actionTypes from "./deliveyLocation.action.enum";

const deliveryLocationPending = () => {
  return action(actionTypes.GET_DELIVERY_LOCATION_PENDING);
};

const deliveryLocationSuccess = (payload: object) => {
  return action(actionTypes.GET_DELIVERY_LOCATION_SUCCESS, payload);
};

const deliveryLocationFailed = () => {
  return action(actionTypes.GET_DELIVERY_LOCATION_FAILED);
};
const updateDeliveryLocationPending = () => {
  return action(actionTypes.UPDATE_DELIVERY_LOCATION_PENDING);
};
const updateDeliveryLocationSuccess = (payload: {
  id: number;
  name: string;
  description: string;
  price: number;
}) => {
  return action(actionTypes.UPDATE_DELIVERY_LOCATION_SUCCESS, payload);
};
const updateDeliveryLocatinFailed = () => {
  return action(actionTypes.UPDATE_DELIVERY_LOCATION_FAILED);
};
export {
  deliveryLocationPending,
  deliveryLocationSuccess,
  deliveryLocationFailed,
  updateDeliveryLocationPending,
  updateDeliveryLocationSuccess,
  updateDeliveryLocatinFailed,
};

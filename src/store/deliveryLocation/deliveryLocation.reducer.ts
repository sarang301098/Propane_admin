import { TDeliveryLocationState } from "./deliveryLocation.types";
import actionTypes from "./deliveyLocation.action.enum";
const ininitialState: TDeliveryLocationState = {
  deliveryLocationData: [],
  loading: false,
};
const deliveryLocationReducer = (state = ininitialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_DELIVERY_LOCATION_PENDING:
      return { ...state, loading: true };
    case actionTypes.GET_DELIVERY_LOCATION_SUCCESS:
      return { ...state, loading: false, deliveryLocationData: action.payload };
    case actionTypes.GET_DELIVERY_LOCATION_FAILED:
      return { ...state, loading: false };
    case actionTypes.UPDATE_DELIVERY_LOCATION_PENDING:
      return { ...state, loading: true };
    case actionTypes.UPDATE_DELIVERY_LOCATION_SUCCESS:
      const updatedDeliveryLocations = [
        ...state.deliveryLocationData.deliveryLocations,
      ];
      const id = updatedDeliveryLocations.findIndex(
        (state) => state.id === Number(action.payload.id)
      );
      updatedDeliveryLocations[id]["name"] = action.payload.name;
      updatedDeliveryLocations[id]["description"] = action.payload.description;
      updatedDeliveryLocations[id]["price"] = action.payload.price;
      return {
        ...state,
        loading: false,
        deliveryLocationData: {
          ...state.deliveryLocationData,
          deliveryLocations: updatedDeliveryLocations,
        },
      };
    case actionTypes.UPDATE_DELIVERY_LOCATION_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default deliveryLocationReducer;

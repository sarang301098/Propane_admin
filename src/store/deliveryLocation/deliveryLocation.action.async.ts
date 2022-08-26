import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import {
  deliveryLocationPending,
  deliveryLocationSuccess,
  deliveryLocationFailed,
  updateDeliveryLocationPending,
  updateDeliveryLocationSuccess,
  updateDeliveryLocatinFailed,
} from "./deliveryLocation.action.creator";
import * as requestFromServer from "../../services/deliveryLocation/deliveryLocation";
import { errorToast, successToast } from "../../components/toast/toast";

export const deliveryLocationActionThunk = (
  q: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deliveryLocationPending());

    return requestFromServer
      .getDeliveryLocation(q)
      .then((res) => {
        dispatch(deliveryLocationSuccess(res.data));
      })
      .catch((error) => {
        dispatch(deliveryLocationFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

export const updateDeliveryLocationActionThunk = (
  id: string,
  name: string,
  description: string,
  price: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateDeliveryLocationPending());

    return requestFromServer
      .updateDeliveryLocation(id, name, description, price)
      .then((res) => {
        dispatch(
          updateDeliveryLocationSuccess({
            id: Number(id),
            name,
            description,
            price,
          })
        );
        successToast("Location details updated succesfully");
      })
      .catch((error) => {
        dispatch(updateDeliveryLocatinFailed());
        errorToast(error?.response?.data?.message || "Something went wrong");
      });
  };
};

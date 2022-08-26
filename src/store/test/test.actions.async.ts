import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { test, testPending, testSuccess } from "./test.action";
import * as requestFromServer from "../../services/test/testService";
import { TTestPayloadData } from "./test.types";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * auth user login thunk
 * @param values
 * @returns
 */
export const testActionThunk = (
  values: TTestPayloadData
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(testPending());

    requestFromServer
      .testApi(values)
      .then((response) => {
        dispatch(test(response.data));
      })
      .catch((error) => {
        dispatch(testSuccess());
        if (error.response && error.response.data) {
          console.log(error.response.data.message);
        } else {
          console.log("Something went wrong.");
        }
      });
  };
};

import TestActionTypeEnum from "./test.enum";
import { TTestActionType, TTestState } from "./test.types";

const INITIAL_STATE: TTestState = {
  loading: false,
  test: null,
};

const testReducer = (
  state = INITIAL_STATE,
  action: TTestActionType
): TTestState => {
  switch (action.type) {
    case TestActionTypeEnum.PENDING:
      return {
        ...state,
        loading: true,
      };

    case TestActionTypeEnum.SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case TestActionTypeEnum.TEST:
      return {
        ...state,
        loading: false,
        test: action.payload.test || null,
      };

    default:
      return state;
  }
};

export default testReducer;

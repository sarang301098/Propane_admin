import EarningActionTypeEnum from "./earning.enum";
import { TEarningActionType, TEarningState } from "./earning.types";

const INITIAL_STATE: TEarningState = {
  loading: false,
  netEarningList: { count: 0, earnings: [] },
  cancelOrderEarningList: { count: 0, cancelledearnings: [] },
};

const earningReducer = (state = INITIAL_STATE, action: TEarningActionType): TEarningState => {
  switch (action.type) {
    case EarningActionTypeEnum.GET_NET_EARNINGS_PENDING:
      return { ...state, loading: true };

    case EarningActionTypeEnum.GET_NET_EARNINGS_FAILED:
      return { ...state, loading: false };

    case EarningActionTypeEnum.GET_NET_EARNINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        netEarningList: action.payload,
      };

    case EarningActionTypeEnum.GET_CANCEL_ORDER_EARNING_PENDING:
      return { ...state, loading: true };

    case EarningActionTypeEnum.GET_CANCEL_ORDER_EARNING_FAILED:
      return { ...state, loading: false };

    case EarningActionTypeEnum.GET_CANCEL_ORDER_EARNING_SUCCESS:
      return {
        ...state,
        loading: false,
        cancelOrderEarningList: action.payload,
      };

    default:
      return state;
  }
};

export default earningReducer;

import TransactionActionTypeEnum from "./transaction.enum";
import { TTransactionActionType, TTransactionState } from "./transaction.types";

const INITIAL_STATE: TTransactionState = {
  loading: false,
  transactionData: { transactions: [], count: 0 },
};

const transactionReducer = (
  state = INITIAL_STATE,
  action: TTransactionActionType
): TTransactionState => {
  switch (action.type) {
    case TransactionActionTypeEnum.TRANSACTION_LOADING:
      return { ...state, loading: true };

    case TransactionActionTypeEnum.TRANSACTION_LOADED:
      return { ...state, loading: false };

    case TransactionActionTypeEnum.GET_TRANSACTION:
      return {
        ...state,
        loading: false,
        transactionData: action.payload,
      };

    default:
      return state;
  }
};

export default transactionReducer;

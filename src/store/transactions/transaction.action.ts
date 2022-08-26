import { action } from "typesafe-actions";

import TransactionActionTypeEnum from "./transaction.enum";
import { TGetTransactionPayload } from "./transaction.types";

/**
 * transaction loading action creator
 * @returns
 */
const transactionLoadingAction = () =>
  action(TransactionActionTypeEnum.TRANSACTION_LOADING);

/**
 * transaction loaded action creator
 * @returns
 */
const transactionLoadedAction = () =>
  action(TransactionActionTypeEnum.TRANSACTION_LOADED);

/**
 * get transaction action creator
 * @param transactionData
 * @returns
 */
const getTransactionAction = (transactionData: TGetTransactionPayload) =>
  action(TransactionActionTypeEnum.GET_TRANSACTION, transactionData);

export {
  transactionLoadingAction,
  transactionLoadedAction,
  getTransactionAction,
};

import { ActionType } from "typesafe-actions";

import * as actions from "./transaction.action";

type TTransactionActionType = ActionType<typeof actions>;

type TUserDetails = {
  id: string;
  fullName: string;
  countryCode: string;
  mobileNumber: string;
  email: string;
};

type TGetTransactionPayload = {
  count: number;
  transactions: {
    id: number;
    grandTotal: number;
    vendorReceivedAmount: number;
    driverReceivedAmount: number;
    adminReceivedAmount: number;
    createdAt: string;
    vendor: TUserDetails;
    driver: TUserDetails;
    user: TUserDetails;
  }[];
};

type TTransactionState = {
  loading: boolean;
  transactionData: TGetTransactionPayload;
};

export { TTransactionActionType, TGetTransactionPayload, TTransactionState };

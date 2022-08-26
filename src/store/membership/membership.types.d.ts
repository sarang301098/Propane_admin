import { ActionType } from "typesafe-actions";

import * as actions from "./membership.action";

type TMembershipActionType = ActionType<typeof actions>;

type TGetMembershipPayload = {
  count: number;
  membership: {
    orderId: string;
    customerName: string;
    customerMobile: string;
    customerEmail: string;
    registeredDate: string;
    status: true;
  }[];
};

type TMembershipState = {
  loading: boolean;
  membershipList: TGetMembershipPayload;
};

type TEditMembershipPayload = {
  status: boolean;
};

export { TMembershipActionType, TGetMembershipPayload, TMembershipState, TEditMembershipPayload };

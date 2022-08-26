import { ActionType } from "typesafe-actions";

import * as actions from "./membershipPlan.action";

type TMembershipPlansActionType = ActionType<typeof actions>;

type Plans = {
  id: number;
  name: string;
  productIds: string[];
  prices: {
    period: number;
    price: number;
    details: { label: string; key: number; value: any }[];
  }[];
  categoryIds: string[];
  isActive: boolean;
}[];

type PlansById = {
  id: number;
  name: string;
  productIds: string[];
  prices: {
    id: number;
    period: number;
    price: number;
    details: { id: number; label: string; key: number; value: any }[];
    isActive: boolean;
  }[];
  categoryIds: string[];
  isActive: boolean;
};

type TMembershipPlansState = {
  loading: boolean;
  fuelMembershipPlansList: { plans: Plans; count: number };
  tankMembershipPlansList: { plans: Plans; count: number };
  membershipPlansById: PlansById;
  planId: string | number;
};

export { TMembershipPlansActionType, TMembershipPlansState };

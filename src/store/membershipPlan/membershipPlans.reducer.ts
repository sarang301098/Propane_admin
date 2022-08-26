import MembershipPlansActionTypeEnum from "./membershipPlans.enum";
import { TMembershipPlansActionType, TMembershipPlansState } from "./membershipPlans.types";

const INITIAL_STATE: TMembershipPlansState = {
  loading: false,
  fuelMembershipPlansList: { plans: [], count: 0 },
  tankMembershipPlansList: { plans: [], count: 0 },
  membershipPlansById: { id: 0, name: "", productIds: [], prices: [], categoryIds: [], isActive: false },
  planId: "",
};

const membershipPlansReducer = (
  state = INITIAL_STATE,
  action: TMembershipPlansActionType
): TMembershipPlansState => {
  switch (action.type) {
    case MembershipPlansActionTypeEnum.MEMBERSHIP_PLANS_LOADING:
      return { ...state, loading: true };

    case MembershipPlansActionTypeEnum.MEMBERSHIP_PLANS_LOADED:
      return { ...state, loading: false };

    case MembershipPlansActionTypeEnum.GET_MEMBERSHIP_PLANS:
      return {
        ...state,
        loading: false,
        fuelMembershipPlansList: {
          count: action.payload.count,
          plans: action.payload.plans.filter((plan: any) => plan.type === 1),
        },
        tankMembershipPlansList: {
          count: action.payload.count,
          plans: action.payload.plans.filter((plan: any) => plan.type === 2),
        },
      };

    case MembershipPlansActionTypeEnum.GET_MEMBERSHIP_PLANS_BY_ID:
      return {
        ...state,
        loading: false,
        membershipPlansById: action.payload,
      };

    case MembershipPlansActionTypeEnum.EDIT_MEMBERSHIP_PLANS:
      return {
        ...state,
        loading: false,
      };

    case MembershipPlansActionTypeEnum.EDIT_FUEL_MEMBERSHIP_STATUS:
      const planIdFuel = action.payload.id;
      const updatePlanStatusFuel = [...state.fuelMembershipPlansList.plans];
      const planIndexFuel = state.fuelMembershipPlansList.plans.findIndex((plan) => plan?.id === planIdFuel);

      updatePlanStatusFuel[planIndexFuel].isActive = action.payload.isActive ? true : false;

      return {
        ...state,
        loading: false,
        fuelMembershipPlansList: {
          ...state.fuelMembershipPlansList,
          plans: updatePlanStatusFuel,
        },
      };

    case MembershipPlansActionTypeEnum.EDIT_TANK_MEMBERSHIP_STATUS:
      const planIdTank = action.payload.id;
      const updatePlanStatusTank = [...state.tankMembershipPlansList.plans];
      const planIndexTank = state.tankMembershipPlansList.plans.findIndex((plan) => plan?.id === planIdTank);

      updatePlanStatusTank[planIndexTank].isActive = action.payload.isActive ? true : false;

      return {
        ...state,
        loading: false,
        tankMembershipPlansList: {
          ...state.tankMembershipPlansList,
          plans: updatePlanStatusTank,
        },
      };

    case MembershipPlansActionTypeEnum.GET_PLAN_ID:
      return {
        ...state,
        loading: false,
        planId: action.payload,
      };

    default:
      return state;
  }
};

export default membershipPlansReducer;

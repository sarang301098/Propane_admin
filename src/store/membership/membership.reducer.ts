import MembershipActionTypeEnum from "./membership.enum";
import { TMembershipActionType, TMembershipState } from "./membership.types";

const INITIAL_STATE: TMembershipState = {
  loading: false,
  membershipList: { membership: [], count: 0 },
};

const membershipReducer = (state = INITIAL_STATE, action: TMembershipActionType): TMembershipState => {
  switch (action.type) {
    case MembershipActionTypeEnum.MEMBERSHIP_LOADING:
      return { ...state, loading: true };

    case MembershipActionTypeEnum.MEMBERSHIP_LOADED:
      return { ...state, loading: false };

    case MembershipActionTypeEnum.GET_MEMBERSHIP:
      return {
        ...state,
        loading: false,
        membershipList: action.payload,
      };

    case MembershipActionTypeEnum.EDIT_MEMBERSHIP:
      return {
        ...state,
        loading: false,
      };

    case MembershipActionTypeEnum.DELETE_MEMBERSHIP:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default membershipReducer;

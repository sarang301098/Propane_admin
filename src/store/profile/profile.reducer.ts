import TimeSlotActionTypeEnum from "./profile.enum";
import { TProfileActionType, TProfileState } from "./profile.types";

const INITIAL_STATE: TProfileState = {
  loading: false,
  profileData: null,
};

const profileReducer = (
  state = INITIAL_STATE,
  action: TProfileActionType
): TProfileState => {
  switch (action.type) {
    case TimeSlotActionTypeEnum.PROFILE_LOADING:
      return { ...state, loading: true };

    case TimeSlotActionTypeEnum.PROFILE_LOADED:
      return { ...state, loading: false };

    case TimeSlotActionTypeEnum.GET_PROFILE:
      return {
        ...state,
        loading: false,
        profileData: action.payload,
      };

    case TimeSlotActionTypeEnum.EDIT_PROFILE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default profileReducer;

import { TCategoryState, TCateoryActionTypes } from "./category.types";
import TCategotyActionTypeEnum from "./ctaegory.enum";

const initialState: TCategoryState = {
  loading: false,
  categories: { count: 0, categories: [] },
};

const categoryReducer = (
  state = initialState,
  action: TCateoryActionTypes
): TCategoryState => {
  switch (action.type) {
    case TCategotyActionTypeEnum.GET_CATEGORY_PENDING:
      return {
        ...state,
        loading: true,
        categories: { count: 0, categories: [] },
      };
    case TCategotyActionTypeEnum.GET_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
      };
    case TCategotyActionTypeEnum.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;

import PaginationActionTypeEnum from "./pagination.enum";
import { TPaginationActionType, TPaginationState } from "./pagination.types";

const INITIAL_STATE: TPaginationState = {
  perPageItems: 10,
};

const paginationReducer = (
  state = INITIAL_STATE,
  action: TPaginationActionType
): TPaginationState => {
  switch (action.type) {
    case PaginationActionTypeEnum.PAGINATION_PER_PAGE_ITEMS:
      return {
        ...state,
        perPageItems: action.payload,
      };

    default:
      return state;
  }
};

export default paginationReducer;

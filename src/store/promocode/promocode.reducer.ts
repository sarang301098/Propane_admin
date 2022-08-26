import PromocodeActionTypeEnum from "./promocode.enum";
import { TPromocodeActionTypes, TPromocodeState } from "./promocode.types";

const initialState: TPromocodeState = {
  loading: false,
  promocodeList: { count: 0, promocodes: [] },
  singlePromocode: null,
};

const promocodeReducer = (
  state = initialState,
  action: TPromocodeActionTypes
): TPromocodeState => {
  switch (action.type) {
    case PromocodeActionTypeEnum.GET_PROMOCODE_PENDING:
      return {
        ...state,
        loading: true,
        singlePromocode: null,
      };
    case PromocodeActionTypeEnum.GET_PROMOCODE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case PromocodeActionTypeEnum.GET_PROMOCODE_SUCCESS:
      return {
        ...state,
        loading: false,
        promocodeList: action.payload,
      };

    case PromocodeActionTypeEnum.GET_PROMOCODE_BY_ID_PENDING:
      return {
        ...state,
        loading: true,
        singlePromocode: null,
      };

    case PromocodeActionTypeEnum.GET_PROMOCODE_BY_ID_FAILED:
      return {
        ...state,
        loading: false,
      };

    case PromocodeActionTypeEnum.GET_PROMOCODE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        singlePromocode: action.payload,
      };

    case PromocodeActionTypeEnum.ADD_PROMOCODE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case PromocodeActionTypeEnum.ADD_PROMOCODE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case PromocodeActionTypeEnum.ADD_PROMOCODE_SUCCESS:
      const addedPromocodes = [...state.promocodeList.promocodes];
      addedPromocodes.push(action.payload);
      return {
        ...state,
        loading: false,
        promocodeList: {
          count: state.promocodeList.count + 1,
          promocodes: addedPromocodes,
        },
      };

    case PromocodeActionTypeEnum.DELETE_PROMOCODE_PENDING:
      return {
        ...state,
        loading: false,
      };
    case PromocodeActionTypeEnum.DELETE_PROMOCODE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case PromocodeActionTypeEnum.DELETE_PROMOCODE_SUCCESS:
      const deletedPromocode = [...state?.promocodeList?.promocodes];
      const deleteId = deletedPromocode?.findIndex(
        (promocode) => promocode?.id === action?.payload?.productId
      );
      if (deleteId > -1) {
        deletedPromocode.splice(deleteId, 1);
      }
      return {
        ...state,
        loading: action?.payload?.getPromocode ? true : false,
        promocodeList: {
          count: state.promocodeList.count - 1,
          promocodes: deletedPromocode,
        },
      };
    case PromocodeActionTypeEnum.UPDATE_PROMOCODE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case PromocodeActionTypeEnum.UPDATE_PROMOCODE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case PromocodeActionTypeEnum.UPDATE_PROMOCODE_SUCCESS:
      const updatedPromocode = [...state?.promocodeList?.promocodes];
      const updateIndex = updatedPromocode?.findIndex(
        (promocode) => promocode?.id === action.payload?.id
      );
      if (updateIndex > -1) {
        updatedPromocode[updateIndex]["isActive"] = Number(
          action?.payload?.isActive
        )
          ? true
          : false;
      }
      return {
        ...state,
        loading: false,
        promocodeList: {
          ...state?.promocodeList,
          promocodes: updatedPromocode,
        },
      };
    default:
      return state;
  }
};

export default promocodeReducer;

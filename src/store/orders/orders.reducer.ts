import OrdersActionTypeEnum from "./orders.enum";
import { TOrdersActionType, TOrdersState } from "./orders.types";

const INITIAL_STATE: TOrdersState = {
  loading: false,
  orderId: "",
  orderById: null,
  orderFuelData: { orders: [], count: 0 },
  orderTankData: { orders: [], count: 0 },
  rescheduleTimeSlots: [],
};

const ordersReducer = (
  state = INITIAL_STATE,
  action: TOrdersActionType
): TOrdersState => {
  switch (action.type) {
    case OrdersActionTypeEnum.ORDERS_LOADING:
      return {
        ...state,
        loading: action?.payload !== undefined ? action?.payload : true,
      };

    case OrdersActionTypeEnum.ORDERS_LOADED:
      return { ...state, loading: false };

    case OrdersActionTypeEnum.GET_ORDER_ID:
      return {
        ...state,
        loading: false,
        orderId: action.payload,
      };

    case OrdersActionTypeEnum.GET_ORDER_BY_ID:
      return {
        ...state,
        loading: false,
        orderById: action.payload,
      };

    case OrdersActionTypeEnum.GET_ORDERS_FUEL:
      return {
        ...state,
        loading: false,
        orderFuelData: action.payload,
      };

    case OrdersActionTypeEnum.GET_ORDERS_TANK:
      return {
        ...state,
        loading: false,
        orderTankData: action.payload,
      };

    case OrdersActionTypeEnum.CANCEL_ORDER:
      return {
        ...state,
        loading: false,
      };

    case OrdersActionTypeEnum.RESCHEDULE_TIME_SLOTS:
      return {
        ...state,
        loading: false,
        rescheduleTimeSlots: action.payload,
      };

    case OrdersActionTypeEnum.RESCHEDULE_ORDER_UPDATE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default ordersReducer;

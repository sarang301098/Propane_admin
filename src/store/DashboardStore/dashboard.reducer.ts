import DashboardActionTypeEnum from "./dashboard.enum";
import { TDashboardActionType, TDashboardState } from "./dashboard.types";

const INITIAL_STATE: TDashboardState = {
  loading: false,
  dashboardDataView: {
    vendorsCount: 0,
    customersCount: 0,
    vendorsDriver: 0,
    freelanceDriver: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    todaysOrders: 0,
    totalRevenue: 0,
  },
  dashboardOrders: { orders: [], count: 0 },
  dashboardAllOrders: { orders: [], count: 0 },
};

const dashboardReducer = (state = INITIAL_STATE, action: TDashboardActionType): TDashboardState => {
  switch (action.type) {
    case DashboardActionTypeEnum.DASHBOARD_LOADING:
      return { ...state, loading: true };

    case DashboardActionTypeEnum.DASHBOARD_LOADED:
      return { ...state, loading: false };

    case DashboardActionTypeEnum.GET_DASHBOARD_ORDERS:
      return {
        ...state,
        loading: false,
        dashboardOrders: action.payload,
      };

    case DashboardActionTypeEnum.GET_DASHBOARD_ALL_ORDERS:
      return {
        ...state,
        loading: false,
        dashboardAllOrders: action.payload,
      };

    case DashboardActionTypeEnum.GET_DASHBOARD_VIEW_DATA:
      return {
        ...state,
        loading: false,
        dashboardDataView: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;

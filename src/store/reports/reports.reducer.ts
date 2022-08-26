import ReportsActionTypeEnum from "./reports.enum";
import { TReportsActionType, TReportsState } from "./reports.types";

const INITIAL_STATE: TReportsState = {
  loading: false,
  customerData: { customers: [], count: 0 },
  vendorData: { vendor: [], count: 0 },
  driverData: { drivers: [], count: 0 },
  orderData: { ordersReports: [], count: 0 },
  productData: { productReports: [], count: 0 },
  transactionData: { transactions: [], count: 0 },
  inventoryStockData: { inventoryReports: [], count: 0 },
};

const reportsReducer = (
  state = INITIAL_STATE,
  action: TReportsActionType
): TReportsState => {
  switch (action.type) {
    case ReportsActionTypeEnum.REPORTS_LOADING:
      return { ...state, loading: true };

    case ReportsActionTypeEnum.REPORTS_LOADED:
      return { ...state, loading: false };

    case ReportsActionTypeEnum.GET_CUSTOMER_REPORTS:
      return {
        ...state,
        loading: false,
        customerData: action?.payload,
      };

    case ReportsActionTypeEnum.GET_VENDOR_REPORTS:
      return {
        ...state,
        loading: false,
        vendorData: action?.payload,
      };

    case ReportsActionTypeEnum.GET_DRIVER_REPORTS:
      return {
        ...state,
        loading: false,
        driverData: action?.payload,
      };

    case ReportsActionTypeEnum.GET_ORDERS_REPORTS:
      return {
        ...state,
        loading: false,
        orderData: action?.payload,
      };
    case ReportsActionTypeEnum.GET_PRODUCTS_REPORTS:
      return {
        ...state,
        loading: false,
        productData: action?.payload,
      };
    case ReportsActionTypeEnum.GET_TRANSACTION_REPORTS:
      return {
        ...state,
        loading: false,
        transactionData: action?.payload,
      };
    case ReportsActionTypeEnum.GET_INVENTORY_STOCK_REPORTS:
      return {
        ...state,
        loading: false,
        inventoryStockData: action?.payload,
      };
    default:
      return state;
  }
};

export default reportsReducer;

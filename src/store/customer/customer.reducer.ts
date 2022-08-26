import CustomerActionTypeEnum from "./customer.enum";
import { TCustomerActionType, TCustomerState } from "./customer.types";

const INITIAL_STATE: TCustomerState = {
  loading: false,
  customersData: { customers: [], count: 0 },
  customerId: "",
  allCustomers: { customers: [], count: 0 },
  customerById: {
    isActive: false,
    profileImage: null,
    id: "",
    fullName: "",
    countryCode: "",
    mobileNumber: "",
    email: "",
    createdAt: "",
    orders: 0,
    subscription: [],
  },
  customerOrderFuelData: { orders: [], count: 0 },
  customerOrderTankData: { orders: [], count: 0 },
};

const customerReducer = (state = INITIAL_STATE, action: TCustomerActionType): TCustomerState => {
  switch (action.type) {
    case CustomerActionTypeEnum.CUSTOMER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CustomerActionTypeEnum.CUSTOMER_LOADED:
      return {
        ...state,
        loading: false,
      };

    case CustomerActionTypeEnum.GET_CUSTOMER:
      return {
        ...state,
        loading: false,
        customersData: action.payload,
      };

    case CustomerActionTypeEnum.CUSTOMER_ID:
      return {
        ...state,
        loading: false,
        customerId: action.payload,
      };

    case CustomerActionTypeEnum.UPDATE_CUSTOMER_STATUS:
      const customerId = action.payload.id;
      const updateCustomerId = [...state.customersData.customers];
      const customerIndex = state.customersData.customers.findIndex(
        (customer) => customer?.id === customerId
      );

      updateCustomerId[customerIndex].isActive = action.payload.isActive ? true : false;

      return {
        ...state,
        loading: false,
        customersData: {
          ...state.customersData,
          customers: updateCustomerId,
        },
      };

    case CustomerActionTypeEnum.GET_CUSTOMER_BY_ID:
      return {
        ...state,
        loading: false,
        customerById: action.payload,
      };

    case CustomerActionTypeEnum.GET_CUSTOMER_ORDERS_FUEL:
      return {
        ...state,
        loading: false,
        customerOrderFuelData: action.payload,
      };

    case CustomerActionTypeEnum.GET_CUSTOMER_ORDERS_TANK:
      return {
        ...state,
        loading: false,
        customerOrderTankData: action.payload,
      };

    case CustomerActionTypeEnum.GET_ALL_CUSTOMERS:
      return {
        ...state,
        loading: false,
        allCustomers: action.payload,
      };

    case CustomerActionTypeEnum.DELETE_CUSTOMERS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default customerReducer;

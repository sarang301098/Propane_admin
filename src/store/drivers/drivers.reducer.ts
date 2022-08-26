import DriversActionTypeEnum from "./drivers.enum";
import { TDriversActionType, TDriversState } from "./drivers.types";

const INITIAL_STATE: TDriversState = {
  loading: false,
  vendorDriversList: { drivers: [], count: 0 },
  freelanceDriversList: { drivers: [], count: 0 },
  driverId: "",
  singleDriverData: null,
  freelanceDriversPaymentList: { drivers: [], count: 0 },
  driverOrdersList: { orders: [], count: 0 },
  driverOrdersTankList: { ordersTank: [], count: 0 },
  completedOrdersList: { orders: [], count: 0 },
  allDrivers: { drivers: [], count: 0 },
  allVendorDrivers: [],
  allFreelanceDrivers: [],
  driverLocation: null,
};

const driversReducer = (state = INITIAL_STATE, action: TDriversActionType): TDriversState => {
  switch (action.type) {
    case DriversActionTypeEnum.DRIVERS_LOADING:
      return { ...state, loading: true };

    case DriversActionTypeEnum.DRIVERS_LOADED:
      return { ...state, loading: false };

    case DriversActionTypeEnum.GET_VENDOR_DRIVERS:
      return {
        ...state,
        loading: false,
        vendorDriversList: action.payload,
      };
    case DriversActionTypeEnum.GET_FREELANCE_DRIVERS:
      return {
        ...state,
        loading: false,
        freelanceDriversList: action.payload,
      };
    case DriversActionTypeEnum.GET_DRIVER_BY_ID:
      return {
        ...state,
        loading: false,
        singleDriverData: action?.payload?.singleDriverData,
      };

    case DriversActionTypeEnum.GET_FREELANCE_DRIVERS_PAYMENT:
      return {
        ...state,
        loading: false,
        freelanceDriversPaymentList: action.payload,
      };

    case DriversActionTypeEnum.GET_DRIVER_ORDERS:
      return {
        ...state,
        loading: false,
        driverOrdersList: action.payload,
      };

    case DriversActionTypeEnum.GET_DRIVER_COMPLETED_ORDERS:
      return {
        ...state,
        loading: false,
        completedOrdersList: action.payload,
      };
    case DriversActionTypeEnum.GET_ALL_DRIVERS:
      return {
        ...state,
        loading: false,
        allDrivers: action.payload,
      };

    case DriversActionTypeEnum.GET_ALL_VENDOR_DRIVERS:
      return {
        ...state,
        loading: false,
        allVendorDrivers: action.payload,
      };

    case DriversActionTypeEnum.GET_ALL_FREELANCE_DRIVERS:
      return {
        ...state,
        loading: false,
        allFreelanceDrivers: action.payload,
      };
    case DriversActionTypeEnum.UPDATE_DRIVER_STATUS:
      const updateDriverStatus = action?.payload?.isFreelanceDriver
        ? [...state?.freelanceDriversList?.drivers]
        : [...state?.vendorDriversList?.drivers];
      const updatedDriverStatusId = updateDriverStatus.findIndex(
        (driver) => driver?.id === action.payload.id
      );
      if (updatedDriverStatusId > -1) {
        updateDriverStatus[updatedDriverStatusId]["isActive"] = action.payload.isActive;
      }
      return {
        ...state,
        loading: false,
        ...(action.payload.isFreelanceDriver
          ? {
              freelanceDriversList: {
                count: updateDriverStatus?.length,
                drivers: updateDriverStatus,
              },
            }
          : {
              vendorDriversList: {
                count: updateDriverStatus?.length,
                drivers: updateDriverStatus,
              },
            }),
      };
    case DriversActionTypeEnum.UPDATE_DRIVER_APPROVAL:
      const driverId = action.payload.id;
      const updateDriverApproval = action.payload.isFreelanceDriver
        ? [...state.freelanceDriversList.drivers]
        : [...state?.vendorDriversList?.drivers];
      const driverIndex = updateDriverApproval.findIndex((driver) => driver?.id === driverId);
      updateDriverApproval[driverIndex].driver.status = action.payload.status;
      return {
        ...state,
        loading: false,
        ...(action.payload.isFreelanceDriver
          ? {
              freelanceDriversList: {
                count: updateDriverApproval?.length,
                drivers: updateDriverApproval,
              },
            }
          : {
              vendorDriversList: {
                count: updateDriverApproval?.length,
                drivers: updateDriverApproval,
              },
            }),
      };
    case DriversActionTypeEnum.DELETE_DRIVER:
      const driverData = action?.payload?.isFreelanceDriver
        ? [...state?.freelanceDriversList?.drivers]
        : [...state?.vendorDriversList?.drivers];
      const driversId = driverData.findIndex((driver) => driver?.id === action?.payload?.driverId);
      if (driversId > -1) {
        driverData.splice(driversId, 1);
      }
      return {
        ...state,
        loading: false,
        ...(action?.payload?.isFreelanceDriver
          ? {
              freelanceDriversList: {
                ...state?.freelanceDriversList,
                count: state?.freelanceDriversList?.count - 1,
                drivers: driverData,
              },
            }
          : {
              vendorDriversList: {
                ...state?.vendorDriversList,
                count: state?.vendorDriversList?.count - 1,
                drivers: driverData,
              },
            }),
      };
    case DriversActionTypeEnum.GET_DRIVER_LOCATION:
      return {
        ...state,
        driverLocation: action.payload,
      };
    default:
      return state;
  }
};

export default driversReducer;

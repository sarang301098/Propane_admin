import SalesTaxActionTypeEnum from "./salesTax.enum";
import {
  TSalesTaxState,
  TSalesTaxActionTypes,
  TStatesPayload,
  TCountyPayload,
  TZipcodePayload,
} from "./salesTax.types";

const INITIAL_STATE: TSalesTaxState = {
  loading: false,
  statesData: { states: [], count: 0 },
  countyData: { counties: [], count: 0, state: null },
  zipcodeData: { count: 0, zipcodes: [], county: null },
};

const helper = (
  states: TStatesPayload[] | TCountyPayload[] | TZipcodePayload[],
  stateId: string
) => {
  const id = states.findIndex((state) => state.id === Number(stateId));
  return id;
};

const salesTaxReducer = (
  state = INITIAL_STATE,
  action: TSalesTaxActionTypes
): TSalesTaxState => {
  switch (action.type) {
    case SalesTaxActionTypeEnum.GET_STATES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.GET_STATES_SUCCESS:
      return {
        ...state,
        statesData: action.payload,
        loading: false,
      };
    case SalesTaxActionTypeEnum.GET_STATES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SalesTaxActionTypeEnum.UPDATE_STATE_SUCCESS:
      const updatedStates = [...state.statesData.states];
      const updateStateId = helper(updatedStates, action.payload.stateId);
      if (updateStateId > -1) {
        updatedStates[updateStateId]["name"] = action.payload.name;
        updatedStates[updateStateId]["salesTax"] = Number(
          action.payload.saleTax
        );
        updatedStates[updateStateId]["status"] = action.payload.status;
      }
      return {
        ...state,
        statesData: { ...state.statesData, states: updatedStates },
        loading: false,
      };

    case SalesTaxActionTypeEnum.UPDATE_STATE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.UPDATE_STATE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SalesTaxActionTypeEnum.DELETE_STATE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.DELETE_STATE_SUCCESS:
      const statesData = [...state.statesData.states];
      const stateId = helper(statesData, action.payload?.stateId);
      if (stateId > -1) {
        statesData.splice(stateId, 1);
      }
      return {
        ...state,
        loading: action.payload.getStates ? true : false,
        statesData: {
          ...state.statesData,
          states: statesData,
          count: state.statesData.count - 1,
        },
      };
    case SalesTaxActionTypeEnum.DELETE_STATE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SalesTaxActionTypeEnum.ADD_STATE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.ADD_STATE_SUCCESS:
      let newStates: TStatesPayload[] = [...state.statesData.states];
      if (state.statesData.states.length < action.payload.itemsPerPage) {
        newStates.push(action.payload.state);
      }
      return {
        ...state,
        loading: false,
        statesData: {
          count: state.statesData.count + 1,
          states: newStates,
        },
      };
    case SalesTaxActionTypeEnum.ADD_STATE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SalesTaxActionTypeEnum.GET_COUNTIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.GET_COUNTIES_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SalesTaxActionTypeEnum.GET_COUNTIES_SUCCESS:
      return {
        ...state,
        loading: false,
        countyData: action.payload,
      };
    case SalesTaxActionTypeEnum.ADD_COUNTIES_SUCCESS:
      let newCounty: TCountyPayload[] = [...state.countyData.counties];
      if (state.countyData.counties.length < action.payload.itemsPerPage) {
        newCounty.push(action.payload.county);
      }
      return {
        ...state,
        loading: false,
        countyData: {
          ...state?.countyData,
          count: state?.countyData?.count + 1,
          counties: newCounty,
        },
      };
    case SalesTaxActionTypeEnum.ADD_COUNTIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.ADD_COUNTIES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SalesTaxActionTypeEnum.UPDATE_COUNTIES_PENDING:
      return {
        ...state,
        loading: true,
      };

    case SalesTaxActionTypeEnum.UPDATE_COUNTIES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SalesTaxActionTypeEnum.UPDATE_COUNTIES_SUCCESS:
      const updatedCounties = [...state.countyData.counties];
      const countyId = helper(updatedCounties, action.payload.stateId);
      if (countyId > -1) {
        updatedCounties[countyId]["status"] = Number(action.payload.status);
        updatedCounties[countyId]["salesTaxOne"] = Number(
          action.payload.salesTaxOne
        );
        updatedCounties[countyId]["salesTaxTwo"] = Number(
          action.payload.salesTaxTwo
        );
        updatedCounties[countyId]["name"] = action.payload.name;
      }
      return {
        ...state,
        loading: false,
        countyData: { ...state.countyData, counties: updatedCounties },
      };
    case SalesTaxActionTypeEnum.DELETE_COUNTIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.DELETE_COUNTIES_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SalesTaxActionTypeEnum.DELETE_COUNTIES_SUCCESS:
      const deleteCounties = [...state.countyData.counties];
      const deleteId = helper(deleteCounties, action.payload?.countyId);
      if (deleteId > -1) {
        deleteCounties.splice(deleteId, 1);
      }
      return {
        ...state,
        loading: action?.payload?.getCounties ? true : false,
        countyData: {
          ...state?.countyData,
          count: state.countyData.count - 1,
          counties: deleteCounties,
        },
      };

    case SalesTaxActionTypeEnum.GET_ZIPCODES_SUCCESS:
      return {
        ...state,
        loading: false,
        zipcodeData: action.payload,
      };

    case SalesTaxActionTypeEnum.GET_ZIPCODES_PENDING:
      return {
        ...state,
        loading: true,
      };

    case SalesTaxActionTypeEnum.GET_ZIPCODES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SalesTaxActionTypeEnum.ADD_ZIPCODES_PENDING:
      return {
        ...state,
        loading: true,
      };

    case SalesTaxActionTypeEnum.ADD_ZIPCODES_SUCCESS:
      const newZipcode = [...state.zipcodeData.zipcodes];
      if (state.zipcodeData.zipcodes.length < action.payload.itemsPerPage) {
        newZipcode.push(action.payload.zipcode);
      }
      return {
        ...state,
        loading: false,
        zipcodeData: {
          ...state?.zipcodeData,
          count: state.zipcodeData.count + 1,
          zipcodes: newZipcode,
        },
      };

    case SalesTaxActionTypeEnum.ADD_ZIPCODES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case SalesTaxActionTypeEnum.UPDATE_ZIPCODE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.UPDATE_ZIPCODE_SUCCESS:
      const updateZipcode = [...state.zipcodeData.zipcodes];
      const updateId = helper(updateZipcode, action.payload.zipcodeId);
      if (updateId > -1) {
        updateZipcode[updateId]["status"] = action.payload.status;
        updateZipcode[updateId]["areaName"] = action.payload.areaName;
        updateZipcode[updateId]["zipcode"] = action.payload.zipcode;
      }
      return {
        ...state,
        loading: false,
        zipcodeData: {
          ...state.zipcodeData,
          zipcodes: updateZipcode,
        },
      };
    case SalesTaxActionTypeEnum.UPDATE_ZIPCODE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case SalesTaxActionTypeEnum.DELETE_ZIPCODE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case SalesTaxActionTypeEnum.DELETE_ZIPCODE_SUCCESS:
      const deleteZipcode = [...state.zipcodeData.zipcodes];
      const deleteZipcodeId = helper(deleteZipcode, action.payload.zipcodeId);
      if (deleteZipcodeId > -1) {
        deleteZipcode.splice(deleteZipcodeId, 1);
      }
      return {
        ...state,
        loading: action.payload.getZipcodes ? true : false,
        zipcodeData: {
          ...state?.zipcodeData,
          count: state.zipcodeData.count - 1,
          zipcodes: deleteZipcode,
        },
      };
    default:
      return state;
  }
};

export default salesTaxReducer;

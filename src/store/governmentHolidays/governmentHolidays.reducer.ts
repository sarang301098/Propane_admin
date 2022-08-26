import { THolidayPayload, THolidayState } from "./governmentHolidays.types";
import actionTypes from "./governmentHolidays.enum";
const ininitialState: THolidayState = {
  holidayData: { count: 0, holidays: [] },
  loading: false,
  vendorsData: { count: 0, vendor: [] },
};
const governmentHolidayReducer = (state = ininitialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_HOLIDAY_PENDING:
      return { ...state, loading: true };

    case actionTypes.GET_HOLIDAY_SUCCESS:
      return { ...state, loading: false, holidayData: action.payload };

    case actionTypes.GET_HOLIDAY_FAILED:
      return { ...state, loading: false };

    case actionTypes.ADD_HOLIDAY_PENDING:
      return { ...state, loading: true };

    case actionTypes.ADD_HOLIDAY_SUCCESS:
      let newHoliday: THolidayPayload[] = [...state.holidayData.holidays];
      if (state.holidayData.holidays.length < action.payload.itemsPerPage) {
        newHoliday.push(action.payload.holidayData);
      }
      return {
        ...state,
        loading: false,
        holidayData: {
          count: state.holidayData.count + 1,
          holidays: newHoliday,
        },
      };

    case actionTypes.ADD_HOLIDAY_FAILED:
      return { ...state, loading: false };

    case actionTypes.GET_ALL_VENDORS_PENDING:
      return { ...state, loading: true };

    case actionTypes.GET_ALL_VENDORS_SUCCESS:
      return { ...state, loading: false, vendorsData: action.payload };

    case actionTypes.GET_ALL_VENDORS_FAILED:
      return { ...state, loading: false };

    case actionTypes.DELETE_HOLIDAY_PENDING:
      return { ...state, loading: true };

    case actionTypes.DELETE_HOLIDAY_SUCCESS:
      const holidayData = [...state.holidayData.holidays];
      const holidayId = holidayData.findIndex(
        (holiday) => holiday.id === Number(action.payload)
      );
      if (holidayId > -1) {
        holidayData.splice(holidayId, 1);
      }
      return {
        ...state,
        loading: action.payload.getAction ? true : false,
        holidayData: {
          ...state.holidayData,
          holidays: holidayData,
          count: state.holidayData.count - 1,
        },
      };

    case actionTypes.DELETE_HOLIDAY_FAILED:
      return { ...state, loading: false };

    case actionTypes.UPDATE_HOLIDAY_PENDING:
      return { ...state, loading: true };

    case actionTypes.UPDATE_HOLIDAY_SUCCESS:
      const updatedHoliday = [...state.holidayData.holidays];
      const updatedHolidayId = updatedHoliday.findIndex(
        (holiday) => holiday.id === Number(action.payload.id)
      );
      if (updatedHolidayId > -1) {
        updatedHoliday[updatedHolidayId]["date"] = action.payload.date;
        updatedHoliday[updatedHolidayId]["vendorIds"] =
          action.payload.vendorIds;
        updatedHoliday[updatedHolidayId]["description"] =
          action.payload.description;
      }
      return {
        ...state,
        holidayData: { ...state.holidayData, holiday: updatedHoliday },
        loading: false,
      };

    case actionTypes.UPDATE_HOLIDAY_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};
export default governmentHolidayReducer;

import { action } from "typesafe-actions";
import HolidayTypeEnum from "./governmentHolidays.enum";
import { THolidayPayload } from "./governmentHolidays.types";
/**
 * Get holiday pending action creator
 * @returns
 */
const getHolidayPending = () => action(HolidayTypeEnum.GET_HOLIDAY_PENDING);

/**
 * Get holiday success action creator
 * @param payload
 * @returns
 */
const getHolidaySuccess = (payload: Object) =>
  action(HolidayTypeEnum.GET_HOLIDAY_SUCCESS, payload);

/**
 *  Get holiday failed action creator
 * @returns
 */
const getHolidayFailed = () => action(HolidayTypeEnum.GET_HOLIDAY_FAILED);

/**
 * Get all vendors pending action creator
 * @returns
 */
const getAllVendorsPending = () =>
  action(HolidayTypeEnum.GET_ALL_VENDORS_PENDING);

/**
 *  Get all vendors success action creator
 * @param payload
 * @returns
 */
const getAllVendorsSuccess = (payload: Record<string, string>) =>
  action(HolidayTypeEnum.GET_ALL_VENDORS_SUCCESS, payload);

/**
 *  Get all vendors failed action creator
 * @returns
 */
const getAllVendorsFailed = () =>
  action(HolidayTypeEnum.GET_ALL_VENDORS_FAILED);

/**
 * Add holiday pending action creator
 * @returns
 */
const addHolidayPending = () => action(HolidayTypeEnum.ADD_HOLIDAY_PENDING);

/**
 * Add holiday succes action creator
 * @param payload
 * @returns
 */
const addHolidaySuccess = (payload: {
  holidayData: THolidayPayload;
  itemsPerPage: number;
}) => action(HolidayTypeEnum.ADD_HOLIDAY_SUCCESS, payload);

/**
 * Add holiday failed action creator
 * @returns
 */
const addHolidayFailed = () => action(HolidayTypeEnum.ADD_HOLIDAY_FAILED);

/**
 * Update holiday pending action creator
 * @returns
 */
const updateHolidayPending = () =>
  action(HolidayTypeEnum.UPDATE_HOLIDAY_PENDING);

/**
 * Update holiday success action creator
 * @param payload
 * @returns
 */
const updateHolidaySuccess = (payload: {
  id: number | string;
  description: string;
  vendorIds: (string | number)[];
  date: string;
}) => action(HolidayTypeEnum.UPDATE_HOLIDAY_SUCCESS, payload);

/**
 * Update holiday failed action creator
 * @returns
 */
const updateHolidayFailed = () => action(HolidayTypeEnum.UPDATE_HOLIDAY_FAILED);

/**
 * Delete holiday pending action creator
 * @returns
 */
const deleteHolidayPending = () =>
  action(HolidayTypeEnum.DELETE_HOLIDAY_PENDING);

/**
 * Delete holiday success action creator
 * @param payload
 * @returns
 */
const deleteHolidaySucess = (payload: {
  id: string | null;
  getAction: Function | undefined;
}) => action(HolidayTypeEnum.DELETE_HOLIDAY_SUCCESS, payload);

/**
 * Delete holiday failed action creator
 * @returns
 */
const deleteHolidayFailed = () => action(HolidayTypeEnum.DELETE_HOLIDAY_FAILED);

export {
  addHolidayPending,
  addHolidaySuccess,
  addHolidayFailed,
  getHolidayPending,
  getHolidaySuccess,
  getHolidayFailed,
  getAllVendorsPending,
  getAllVendorsSuccess,
  getAllVendorsFailed,
  updateHolidayPending,
  updateHolidaySuccess,
  updateHolidayFailed,
  deleteHolidayPending,
  deleteHolidaySucess,
  deleteHolidayFailed,
};

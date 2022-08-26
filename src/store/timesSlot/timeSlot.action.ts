import { action } from "typesafe-actions";
import TimeSlotActionTypeEnum from "./timeSlot.enum";
import { TGetTimeSlotPayload } from "./timeSlot.types";

/**
 * timeSlot loading action creator
 * @returns
 */
const timeSlotLoading = () => action(TimeSlotActionTypeEnum.TIME_SLOT_LOADING);

/**
 * timeSlot loaded action creator
 * @returns
 */
const timeSlotLoaded = () => action(TimeSlotActionTypeEnum.TIME_SLOT_LOADED);

/**
 * get all slot action creator
 * @param timeSlotList
 * @returns
 */
const getTimeSlot = (timeSlotList: TGetTimeSlotPayload) =>
  action(TimeSlotActionTypeEnum.GET_TIME_SLOT, timeSlotList);

/**
 *add time slot action creator
 * @returns
 */
const addNewTimeSlot = () => action(TimeSlotActionTypeEnum.ADD_TIME_SLOT);

/**
 * edit time slot action creator
 * @returns
 */
const editTimeSlot = (editSlot: { id: number | null; startTime: string; endTime: string }) =>
  action(TimeSlotActionTypeEnum.EDIT_TIME_SLOT, editSlot);

/**
 * delete time slot action creator
 * @returns
 */
const deleteTimeSlot = () => action(TimeSlotActionTypeEnum.DELETE_TIME_SLOT);

export { timeSlotLoading, timeSlotLoaded, getTimeSlot, addNewTimeSlot, editTimeSlot, deleteTimeSlot };

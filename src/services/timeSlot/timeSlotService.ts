import { API } from "../../middleware/middleware";
import { TAddTimeSlotPayload, TEditTimeSlotPayload } from "../../store/timesSlot/timeSlot.types";

/**
 * get time slot api call
 * @returns
 */
export const getTimeSlotList = (
  search: string | null,
  page: number,
  perPage: number,
  isFilters?: boolean
): Promise<any> => {
  if (isFilters === false) {
    return API.get("/timeslots", { params: { isFilters } });
  }
  return API.get("/timeslots", { params: { search, page, perPage } });
};

/**
 * add time slot api call
 * @param values
 * @returns
 */
export const addTimeSlot = (values: TAddTimeSlotPayload): Promise<any> => {
  return API.post("/timeslots", { timeSlots: values });
};

/**
 * edit time slot api call
 * @param id
 * @param values
 * @returns
 */

export const editTimeSlot = (id: number | null, values: TEditTimeSlotPayload): Promise<any> => {
  return API.put("/timeslots/" + id, { ...values });
};
/**
 * delete time slot api call
 * @param id
 * @returns
 */
export const deleteTimeSlot = (id: number | null): Promise<any> => {
  return API.delete("/timeslots/" + id);
};

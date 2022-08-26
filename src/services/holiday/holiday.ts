import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * Get holiday API call
 * @returns
 */
const getHoliday = (
  page: number,
  perPage: number,
  search: string,
  vendorId: string
): Promise<any> => {
  return API.get("/governmentHolidays", {
    params: {
      page,
      perPage,
      search: search || undefined,
      vendorId: vendorId === "All" ? undefined : vendorId,
    },
  });
};
/**
 * Get all vendors API call
 * @returns
 */
const getAllVendors = (): Promise<any> => {
  return API.get("/vendors", { params: { isFilters: false } });
};

/**
 * Add holiday API call
 * @returns
 */
const addHoliday = (
  date: string,
  vendorIds: (string | number)[],
  description: string
): Promise<any> => {
  return API.post("/governmentHolidays", {
    date: moment(date).startOf("day").add(moment.duration(12, "hours")),
    vendorIds,
    description,
  });
};

/**
 * Update holiday API call
 * @returns
 */
const updateHoliday = (
  date: string,
  vendorIds: Array<string | number>,
  description: string,
  id: string | null
): Promise<any> => {
  return API.put("/governmentHolidays/" + id, { date, vendorIds, description });
};

/**
 * Delete holiday API call
 * @returns
 */
const deleteHoliday = (id: string | null): Promise<any> => {
  return API.delete("/governmentHolidays/" + id);
};
export { getHoliday, addHoliday, updateHoliday, deleteHoliday, getAllVendors };

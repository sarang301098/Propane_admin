import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * get earnings all data api call
 * @returns
 */
export const getEarningsList = (
  page: number,
  perPage: number,
  search: string | null,
  startDate: moment.Moment | null | undefined,
  endDate: moment.Moment | null | undefined,
  selectVendor: string | number | null
): Promise<any> => {
  return API.get("/earnings/net", {
    params: {
      page,
      perPage,
      search,
      startAt: startDate ? moment(startDate).toDate() : null || undefined,
      endAt: endDate ? moment(endDate).toDate() : null || undefined,
      vendorId: selectVendor,
    },
  });
};

export const getCancelOrderEarningsList = (
  page: number,
  perPage: number,
  search: string | null,
  startDate: moment.Moment | null | undefined,
  endDate: moment.Moment | null | undefined,
  selectVendor: string | number | null
): Promise<any> => {
  return API.get("/earnings/cancelled", {
    params: {
      page,
      perPage,
      search,
      startAt: startDate ? moment(startDate).toDate() : null || undefined,
      endAt: endDate ? moment(endDate).toDate() : null || undefined,
      vendorId: selectVendor,
    },
  });
};

import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * get transaction api call
 * @returns
 */
const getTransactionDataAPI = (
  page: number,
  perPage: number,
  search: string,
  startAt: string | moment.Moment,
  endAt: string | moment.Moment
): Promise<any> => {
  return API.get("/transaction", {
    params: {
      page,
      perPage,
      search: search || undefined,
      startAt: startAt
        ? moment(startAt)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endAt ? moment(endAt).utc().endOf("day").toDate() : undefined,
    },
  });
};

export { getTransactionDataAPI };

import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * get orders by id api call
 * @returns
 */
export const getOrderByIdAPI = (
  id: string | number,
  sort?: string
): Promise<any> => {
  return API.get("/orders/byId/" + id, {
    params: { sort: sort || "ASC", sortBy: "fullName" },
  });
};

/**
 * get orders fuel api call
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorName
 * @param driverName
 * @param orderStatus
 * @returns
 */
export const getOrdersFuelAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  orderStatus: string[]
): Promise<any> => {
  return API.get("/orders", {
    params: {
      search,
      page,
      perPage,
      startAt: startAt ? moment(startAt).toDate() : null || undefined,
      endAt: endAt ? moment(endAt).toDate() : null || undefined,
      sort,
      sortBy,
      vendorId: vendorName,
      driverId: driverName,
      status: orderStatus,
      orderType: 1,
    },
  });
};

/**
 * get orders tank api call
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorName
 * @param driverName
 * @param freelanceDriverName
 * @param orderCategory
 * @param orderStatus
 * @returns
 */
export const getOrdersTankAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  freelanceDriverName: string | null,
  orderCategory: string | number | null,
  orderStatus: string[]
): Promise<any> => {
  return API.get("/orders", {
    params: {
      search,
      page,
      perPage,
      startAt: startAt ? moment(startAt).toDate() : null || undefined,
      endAt: endAt ? moment(endAt).toDate() : null || undefined,
      sort,
      sortBy,
      vendorId: vendorName,
      driverId: driverName,
      freelanceDriverId: freelanceDriverName,
      categoryId: orderCategory,
      status: orderStatus,
      orderType: 2,
    },
  });
};

/**
 * cancel order api
 * @param reason
 * @param status
 * @param id
 * @returns
 */
export const cancelOrderAPI = (
  reason: string,
  status: string,
  id: string | number
): Promise<any> => {
  return API.put("/orders/" + id, { reason, status });
};

/**
 * get reschedule slots api
 * @param vendorIds
 * @param date
 * @returns
 */
export const getRescheduleSlotOrderAPI = (
  vendorIds: (string | number)[],
  date: moment.Moment | undefined
): Promise<any> => {
  return API.get("/timeslots/product/all", {
    params: { vendorIds, date: date ? moment(date).toDate() : undefined },
  });
};

/**
 * reschedule order api
 * @param orderId
 * @param timeSlotsId
 * @param scheduleDate
 * @returns
 */
export const getRescheduleOrderAPI = (
  orderId: string | number,
  timeSlotsId: string | number,
  scheduleDate: moment.Moment | undefined
): Promise<any> => {
  return API.patch("/orders/reschedule/" + orderId, {
    timeSlotsId,
    scheduleDate: scheduleDate ? moment(scheduleDate).toDate() : undefined,
  });
};

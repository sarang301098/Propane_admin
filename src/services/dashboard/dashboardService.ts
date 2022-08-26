import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * get dashboard view api
 * @returns
 */
const getDashboardViewAPI = (): Promise<any> => {
  return API.get("/dashboard/admin");
};

/**
 *  get dashboard orders api
 * @param page
 * @param perPage
 * @param isTodayDelivered
 * @param search
 * @param orderType
 * @param vendorName
 * @param driverName
 * @param orderStatus
 * @param sort
 * @param sortBy
 * @returns
 */
const getDashboardOrdersAPI = (
  page: number,
  perPage: number,
  isTodayDelivered: boolean,
  search: string | number | null,
  orderType: string | number | null,
  vendorName: string | number | null,
  driverName: string | number | null,
  orderStatus: string | null,
  sort: string,
  sortBy: string | null
): Promise<any> => {
  return API.get("/dashboard/admin/orders", {
    params: {
      page,
      perPage,
      isTodayDelivered,
      search,
      orderType,
      vendorId: vendorName,
      driverId: driverName,
      status: orderStatus,
      sort,
      sortBy,
    },
  });
};

/**
 * get dashboard all orders api
 * @param page
 * @param perPage
 * @param isTodayDelivered
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @returns
 */
const getDashboardAllOrdersAPI = (
  page: number,
  perPage: number,
  isTodayDelivered: boolean,
  startAt: moment.Moment | undefined | null,
  endAt: moment.Moment | undefined | null,
  sort: string,
  sortBy: string | null
): Promise<any> => {
  return API.get("/dashboard/admin/orders", {
    params: {
      page,
      perPage,
      isTodayDelivered,
      startAt: startAt ? moment(startAt).toDate() : undefined || null,
      endAt: startAt ? moment(endAt).toDate() : undefined || null,
      sort,
      sortBy,
    },
  });
};

export { getDashboardViewAPI, getDashboardOrdersAPI, getDashboardAllOrdersAPI };

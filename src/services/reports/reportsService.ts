import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * get customer reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getCustomerReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  membershipStatus: string,
  customerStatus: string,
  sort: string
): Promise<any> => {
  return API.get("/reports/customers", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      status: membershipStatus === "All" ? undefined : Number(membershipStatus),
      isActive: customerStatus === "All" ? undefined : customerStatus,
      sort,
    },
  });
};

/**
 * get vendor reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getVendorReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  vendorStatus: string,
  sort: string
): Promise<any> => {
  return API.get("/reports/vendor", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      isActive: vendorStatus === "All" ? undefined : vendorStatus,
      sort,
    },
  });
};

/**
 * get driver reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getDriverReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  driverName: string | null,
  freelanceDriverName: string,
  driverStatus: string,
  sort: string,
  sortBy: string | null
): Promise<any> => {
  return API.get("/reports/drivers", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      driverId: driverName === "All" ? undefined : driverName,
      freelanceDriverId:
        freelanceDriverName === "All" ? undefined : freelanceDriverName,
      isActive: driverStatus === "All" ? undefined : driverStatus,
      sort,
      sortBy,
    },
  });
};
/**
 * get order reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getOrderReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  orderType: string,
  paymentStatus: string | boolean,
  orderStatus: string,
  sort: string,
  sortBy: string | null
): Promise<any> => {
  return API.get("/reports/ordersReport", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      orderType: orderType === "All" ? undefined : orderType,
      paymentStatus:
        paymentStatus === "All" ? undefined : paymentStatus === "paid" ? 1 : 0,
      status: orderStatus === "All" ? undefined : orderStatus,
      sort,
      sortBy,
    },
  });
};

/**
 * get products reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getProductReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  orderType: string,
  product: string,
  cylinderSize: string
): Promise<any> => {
  return API.get("reports/product", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      orderType: orderType === "all" ? undefined : orderType,
      productId: product === "all" ? undefined : product,
      cylinderSizeId: cylinderSize === "all" ? undefined : cylinderSize,
    },
  });
};

/**
 * get transaction reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getTransactionReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  orderType: string,
  paymentStatus: string | boolean,
  sort: string,
  sortBy: string | null
): Promise<any> => {
  return API.get("/reports/transactions", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      orderType: orderType === "All" ? undefined : orderType,
      paymentStatus:
        paymentStatus === "All" ? undefined : paymentStatus === "paid" ? 1 : 0,
      sort,
      sortBy,
    },
  });
};

/**
 * get inventory stock reports api call
 * @param search
 * @param page
 * @param perPage
 * @returns
 */
export const getInventoryStockReportsAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startDate: moment.Moment | string,
  endDate: moment.Moment | string,
  category: string,
  product: string,
  accessory: string,
  cylinderSize: string,
  vendorName: string,
  sort: string,
  sortBy: string | null
): Promise<any> => {
  return API.get("/reports/inventoryStock", {
    params: {
      search,
      page,
      perPage,
      startAt: startDate
        ? moment(startDate)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endDate ? moment(endDate).utc().endOf("day").toDate() : undefined,
      categoryId: category === "all" ? undefined : category,
      productId: product === "all" ? undefined : product,
      accessoryId: accessory === "all" ? undefined : accessory,
      cylinderSizeId: cylinderSize === "all" ? undefined : cylinderSize,
      vendorId: vendorName === "all" ? undefined : vendorName,
      sort,
      sortBy,
    },
  });
};

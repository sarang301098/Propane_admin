import { API } from "../../middleware/middleware";
import moment from "moment";
/**
 * get customers api call
 * @param page
 * @param perPage
 * @returns
 */
export const getCustomersAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  membershipStatus: number | null,
  customerStatus: null | boolean,
  sort: string
): Promise<any> => {
  return API.get("/customers", {
    params: {
      search,
      page,
      perPage,
      startAt: startAt ? moment(startAt).toDate() : null || undefined,
      endAt: endAt ? moment(endAt).toDate() : null || undefined,
      membershipStatus: membershipStatus,
      status: customerStatus,
      sort,
    },
  });
};

/**
 * Update customer status
 * @param isActive
 * @returns
 */
export const updateCustomersAPI = (id: string | number, isActive: boolean): Promise<any> => {
  return API.put("/users/" + id, { isActive });
};

/**
 * get customer data by id api call
 * @param id
 * @returns
 */
export const getCustomersByIdAPI = (id: number | string): Promise<any> => {
  return API.get("/customers/" + id);
};

/**
 * get customer fuel orders api call
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
 * @param id
 * @returns
 */
export const getCustomersOrdersFuelAPI = (
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | null | undefined,
  endAt: moment.Moment | null | undefined,
  sort: string,
  sortBy: string | null,
  vendorName: string | null,
  driverName: string | null,
  orderStatus: string | null,
  id: string | number
): Promise<any> => {
  return API.get(`/customers/${id}/orders`, {
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
 * get customer propane tank api call
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
 * @param id
 * @returns
 */
export const getCustomersOrdersTankAPI = (
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
  orderStatus: string | null,
  id: string | number
): Promise<any> => {
  return API.get(`/customers/${id}/orders`, {
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

export const getAllCustomers = (): Promise<any> => {
  return API.get("/customers/all/options");
};

/**
 * delete customer api call
 * @param id
 * @returns
 */
export const deleteCustomersAPI = (id: string | number | null): Promise<any> => {
  return API.delete(`/customers/${id}`);
};

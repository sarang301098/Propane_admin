import moment from "moment";
import { API } from "../../middleware/middleware";

/**
 * Get vendor API call
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param search
 * @param zipcodeId
 * @param vendorStatus
 * @param sort
 * @returns
 */
const getVendors = (
  isFilters: boolean,
  page: number,
  perPage: number,
  startAt: moment.Moment | string,
  endAt: moment.Moment | string,
  search: string,
  zipcodeId: string,
  vendorStatus: string,
  sort: string
): Promise<any> => {
  if (!isFilters) {
    return API.get("/vendors", { params: { isFilters } });
  }
  return API.get("/vendors", {
    params: {
      page,
      perPage,
      startAt: startAt ? moment(startAt).toDate() : undefined,
      endAt: endAt
        ? moment(endAt).toDate() || moment().endOf("day")
        : undefined,
      search: search || undefined,
      status:
        !vendorStatus || vendorStatus === "all" ? undefined : vendorStatus,
      zipcodeId: zipcodeId || undefined,
      isFilters,
      sort,
      sortBy: "fullName",
    },
  });
};

/**
 * Get vendor by Id API call
 * @param vendorId
 * @returns
 */
const getVendorById = (vendorId: string): Promise<any> => {
  return API.get("/vendors/user/" + vendorId, {
    params: { userType: "vendor" },
  });
};

/**
 * Get vendor product API call
 * @param vendorId
 * @param orderType
 * @returns
 */
const getVendorProducts = (
  vendorId: string,
  orderType: number,
  page?: number,
  perPage?: number,
  startAt?: moment.Moment | string,
  endAt?: moment.Moment | string,
  productId?: number | null,
  cylinderSizeId?: number,
  search?: string
): Promise<any> => {
  return API.get("/vendorProducts/all/productPricing", {
    params: {
      vendorId,
      orderType,
      page,
      perPage,
      startAt: startAt?.toString() || undefined,
      endAt: endAt?.toString() || undefined,
      productId,
      cylinderSizeId: cylinderSizeId || undefined,
      search: search || undefined,
    },
  });
};

/**
 * Add vendor product API call
 * @param vendorId
 * @param productId
 * @param isSalesTax
 * @param orderType
 * @returns
 */
const addVendorProducts = (
  vendorId: string,
  productId: string,
  isSalesTax: boolean,
  orderType: number
): Promise<any> => {
  return API.post("/vendorProducts", {
    vendorId,
    productId,
    isSalesTax,
    orderType,
  });
};

/**
 * Update vendor product API call
 * @param vendorProductId
 * @param isSalesTax
 * @param productId
 * @param vendorId
 * @returns
 */
const updateVendorProduct = (
  vendorProductId: number | undefined,
  isSalesTax: boolean | undefined,
  productId: string | undefined,
  vendorId: string
): Promise<any> => {
  return API.put("/vendorProducts/" + vendorProductId, {
    isSalesTax,
    productId,
    vendorId,
  });
};

/**
 * Updated vendor product tiers API call
 * @param tiers ]
 * @returns
 */
const updateVendorProductTiers = (
  tiers: { id: number; from: number; to: number }[]
): Promise<any> => {
  return API.patch("/vendorProducts/tiers", { tiers });
};

/**
 * Delete vendor product API call
 * @param productId
 * @returns
 */
const deleteVendorProduct = (productId: number): Promise<any> => {
  return API.delete("/vendorProducts/" + productId);
};

/**
 * Add vendor product tier success API call
 * @param pricing
 * @returns
 */
const addVendorProductTiersPricing = (
  pricing: Partial<{
    categoryId: undefined | number;
    cylinderSizeId: undefined | number;
    vendorProductTierId: number | undefined;
    vendorProductId: number;
    price: number | string;
  }>[]
): Promise<any> => {
  return API.post("/vendorProducts/pricing", { pricing });
};

/**
 * Update vendor product tiers pricing API call
 * @param pricing
 * @returns
 */
const updateVendorProductTiersPricing = (
  pricing: Partial<{
    categoryId: undefined | number;
    cylinderSizeId: undefined | number;
    vendorProductTierId: number | undefined;
    vendorProductId: number;
    price: number | string;
  }>[]
): Promise<any> => {
  return API.patch("/vendorProducts/pricing", { pricing });
};

/**
 * Delete vendor product pricing API call
 * @param ids
 * @returns
 */
const deleteVendorProductPricing = (
  ids: (number | undefined)[]
): Promise<any> => {
  return API.delete("/vendorProducts/pricing", { data: { ids } });
};

/**
 * Add vendor API call
 * @param data
 * @returns
 */
const addVendor = (data: any): Promise<any> => {
  return API.post("/vendors", data);
};

/**
 * Update vendor API call
 * @param data
 * @param vendorId
 * @returns
 */
const updateVendor = (data: any, vendorId: string): Promise<any> => {
  return API.put(`/vendors/${vendorId}`, data);
};

/**
 * Update vendor status API call
 * @param id
 * @param status
 * @returns
 */
const updateVendorStatus = (id: string, status: number | null) => {
  return API.patch("/users/status-change/", {
    userId: id,
    status,
    userType: "vendor",
  });
};

/**
 * Delete vendor API call
 * @param vendorId
 * @returns
 */
const deleteVendor = (vendorId: string) => {
  return API.delete(`/vendors/${vendorId}`);
};

/**
 * get all vendor API call
 * @returns
 */
const getAllVendorAPI = () => {
  return API.get("vendors/all/options");
};

const getVendorStockHistory = (
  vendorId: string,
  page: number,
  perPage: number,
  category: string,
  product: string,
  accessory: string,
  cylinderSize: string,
  startAt: moment.Moment | string,
  endAt: moment.Moment | string,
  sort: string,
  sortBy: string,
  search: string
) => {
  return API.get("/vendorMangeStock/history", {
    params: {
      vendorId,
      page,
      perPage,
      categoryId: category === "all" ? undefined : category,
      productId: product === "all" ? undefined : product,
      accessoriesId: accessory === "all" ? undefined : accessory,
      cylinderSizeId: cylinderSize === "all" ? undefined : cylinderSize,
      startAt: startAt
        ? moment(startAt)
            .utcOffset(0)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toISOString()
        : undefined,
      endAt: endAt ? moment(endAt).utc().endOf("day").toDate() : undefined,
      sort,
      sortBy,
      search: search || undefined,
    },
  });
};
export {
  getVendors,
  addVendor,
  updateVendor,
  getVendorById,
  deleteVendor,
  updateVendorStatus,
  getVendorProducts,
  addVendorProducts,
  updateVendorProduct,
  updateVendorProductTiers,
  addVendorProductTiersPricing,
  updateVendorProductTiersPricing,
  deleteVendorProduct,
  deleteVendorProductPricing,
  getAllVendorAPI,
  getVendorStockHistory,
};

/**
 * Get vendors API call
 * @param orderType
 * @param search
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param sort
 * @param sortBy
 * @param vendorId
 * @param driverId
 * @param freelanceDriverId
 * @param orderCategory
 * @param orderStatus
 * @param customerId
 * @returns
 */
export const getVendorOrders = (
  orderType: number,
  search: string | null,
  page: number,
  perPage: number,
  startAt: moment.Moment | string,
  endAt: moment.Moment | string,
  sort: string,
  sortBy: string | null,
  vendorId: string | null,
  driverId: string | null,
  freelanceDriverId: string | undefined,
  orderCategory: string | number | null,
  orderStatus: string | null,
  customerId: string
): Promise<any> => {
  return API.get(`/vendors/${vendorId}/orders`, {
    params: {
      orderType,
      search: search || undefined,
      page,
      perPage,
      startAt: startAt ? moment(startAt).toDate() : undefined,
      endAt: endAt ? moment(endAt).toDate() : undefined,
      sort,
      sortBy,
      driverId: driverId || undefined,
      freelanceDriverId: freelanceDriverId || undefined,
      categoryId: orderCategory || undefined,
      status: orderStatus === "All" ? undefined : orderStatus || undefined,
      customerId: customerId || undefined,
    },
  });
};

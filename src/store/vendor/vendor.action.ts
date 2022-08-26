import { action } from "typesafe-actions";
import VendorActionTypeEnum from "./vendor.enum";
import {
  TAddVendorPayload,
  TVendorProductPayload,
  TVendorStockHistory,
} from "./vendor.types";

/**
 * Get vendor success action creator
 * @param payload
 * @returns
 */
const getVendorsSuccess = (payload: any) =>
  action(VendorActionTypeEnum.GET_VENDOR_SUCCESS, payload);

/**
 * Get vendor pending action creator
 * @returns
 */
const getVendorPending = () => action(VendorActionTypeEnum.GET_VENDOR_PENDING);

/**
 * Get vendor failed action creator
 * @returns
 */
const getVendorFailed = () => action(VendorActionTypeEnum.GET_VENDOR_FAILED);

/**
 * Get vendor by Id success action creator
 * @param payload
 * @returns
 */
const getVendorByIdSucess = (payload: TAddVendorPayload) =>
  action(VendorActionTypeEnum.GET_SINGLE_VENDOR_SUCCESS, payload);

/**
 * Get vendor by Id pending action creator
 * @returns
 */
const getVendorByIdPending = () =>
  action(VendorActionTypeEnum.GET_SINGLE_VENDOR_PENDING);

/**
 *  Get vendor by Id failed action creator
 * @returns
 */
const getVendorByIdFailed = () =>
  action(VendorActionTypeEnum.GET_SINGLE_VENDOR_FAILED);

/**
 * Get vendor product success action creator
 * @param payload
 * @returns
 */
const getVendorProductSuccess = (payload: {
  vendorProducts: TVendorProductPayload[];
  count: number;
}) => action(VendorActionTypeEnum.GET_VENDOR_PRODUCT_SUCCESS, payload);

/**
 * Get vendor product failed action creator
 * @returns
 */
const getVendorProductFailed = () =>
  action(VendorActionTypeEnum.GET_VENDOR_PRODUCT_FAILED);

const getVendorProductPending = () =>
  action(VendorActionTypeEnum.GET_VENDOR_PRODUCT_PENDING);

const updateVendorProductPending = () =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_PRODUCT_PENDING);
/**
 * Update vendor product success action creator
 * @param payload
 * @returns
 */
const updateVendorProductSuccess = (payload: {
  vendorProductId: number | undefined;
  status: boolean;
  productId: string;
  vendorId: string;
}) => action(VendorActionTypeEnum.UPDATE_VENDOR_PRODUCT_SUCCESS, payload);

/**
 * Update vendor product failed action creator
 * @returns
 */
const updateVendorProductFailed = () =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_PRODUCT_FAILED);

const addVendorProductPending = () =>
  action(VendorActionTypeEnum.ADD_VENDOR_PRODUCT_PENDING);
/**
 * Add vendor product success action creator
 * @param payload
 * @returns
 */
const addVendorProductSuccess = (payload: TVendorProductPayload) =>
  action(VendorActionTypeEnum?.ADD_VENDOR_PRODUCT_SUCCESS, payload);

/**
 * Add vendor product failed action creator
 * @returns
 */
const addVendorProductFailed = () =>
  action(VendorActionTypeEnum.ADD_VENDOR_PRODUCT_FAILED);

/**
 * Update vendor product tier success action creator
 * @param payload
 * @returns
 */
const updateVendorProductTiersSuccess = (payload: {
  tiers: { id: number; from: number; to: number }[];
  productId: number;
}) => action(VendorActionTypeEnum.ADD_VENDOR_PRODUCT_TIER_SUCCESS, payload);

const updateVendorProductTiersPending = () =>
  action(VendorActionTypeEnum.ADD_VENDOR_PRODUCT_TIER_PENDING);

/**
 * Update vendor product tiers failed action creator
 * @returns
 */
const updateVendorProductTiersFailed = () =>
  action(VendorActionTypeEnum.ADD_VENDOR_PRODUCT_TIER_FAILED);

/**
 * Add vendor product pricing success action creator
 * @param payload
 * @returns
 */
const addVendorProductTierPricingSuccess = (payload: {
  pricing: Partial<{
    [key: string]: string | number;
    createdAt: string;
    categoryId: number;
    cylinderSizeId: number;
    createdBy: string;
    id: number;
    price: number;
    vendorProductId: number;
    vendorProductTiersId: number;
    updatedAt: string;
    updatedBy: string;
  }>[];
  index: number;
  orderType?: number;
}) => action(VendorActionTypeEnum.ADD_PRODUCT_TIER_PRICING_SUCCESS, payload);

/**
 * Add vendor product pricing failed action creator
 * @returns
 */
const addVendorProductTierPricingFailed = () =>
  action(VendorActionTypeEnum.ADD_PRODUCT_TIER_PRICING_FAILED);

/**
 * Add vendor product pricing pending action creator
 * @returns
 */
const addVendorProductTierPricingPending = () =>
  action(VendorActionTypeEnum.ADD_PRODUCT_TIER_PRICING_PENDING);

/**
 * Update vendor product pricing success action creator
 * @param payload
 * @returns
 */
const updateVendorProductPricingSuccess = (payload: {
  pricing: Partial<{
    categoryId: undefined | number;
    cylinderSizeId: undefined | number;
    vendorProductTierId: number | undefined;
    vendorProductId: number;
    price: number | string;
    id: number | undefined;
  }>[];
  productId: number | string;
}) => action(VendorActionTypeEnum.UPDATE_PRODUCT_TIER_PRICING_SUCCESS, payload);

/**
 * Update vendor  product pricing failed action creator
 * @returns
 */
const updateVendorProductPricingFailed = () =>
  action(VendorActionTypeEnum.UPDATE_PRODUCT_TIER_PRICING_FAILED);

/**
 * Update vendor  product pricing pending action creator
 * @returns
 */
const updateVendorProductPricingPending = () =>
  action(VendorActionTypeEnum.UPDATE_PRODUCT_TIER_PRICING_PENDING);

/**
 * Delete vendor product success action creator
 * @param payload
 * @returns
 */
const deleteVendorProductSuccess = (payload: number) =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_SUCCESS, payload);

/**
 * Delete vendor product failed action creactor
 * @returns
 */
const deleteVendorProductFailed = () =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_FAILED);

/**
 * Delete vendor product pending action creactor
 * @returns
 */
const deleteVendorProductPending = () =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PENDING);

/**
 *Delete vendor product tier success action creator
 * @param payload
 * @returns
 */
const deleteVendorPricingTierSuccess = (payload: {
  ids: (number | undefined)[];
  index: number;
}) =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PRICING_SUCCESS, payload);

/**
 * Delete vendor product tier failed action creator
 * @returns
 */
const deleteVendorPricingTierFailed = () =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PRICING_FAILED);

/**
 * Delete vendor product tier pending action creator
 * @returns
 */
const deleteVendorPricingTierPending = () =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PRICING_PENDING);

/**
 *  Add vendor success action creator
 * @param payload
 * @returns
 */
const addVendorSuccess = (payload: any) =>
  action(VendorActionTypeEnum.ADD_VENDOR_SUCCESS, payload);

/**
 * Add vendor pending action creator
 * @returns
 */
const addVendorPending = () => action(VendorActionTypeEnum.ADD_VENDOR_PENDING);

/**
 * Add vendor failed action creator
 * @returns
 */
const addVendorFailed = () => action(VendorActionTypeEnum.ADD_VENDOR_FAILED);

/**
 * Update vendor success action creator
 * @param payload
 * @returns
 */
const updateVendorSuccess = (payload: Record<string, any>) =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_SUCCESS, payload);

/**
 * Update vendor pending action creator
 * @returns
 */
const updateVendorPending = () =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_PENDING);

/**
 * Update vendor failed action creator
 * @returns
 */
const updateVendorFailed = () =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_FAILED);

/**
 * Update vendor status success action creator
 * @param payload
 * @returns
 */
const updateVendorStatusSuccess = (payload: { id: string; status: number }) =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_STATUS_SUCCESS, payload);

/**
 * Update vendor status pending action creator
 * @returns
 */
const updateVendorStatusPending = () =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_STATUS_PENDING);

/**
 * Update vendor status failed action creator
 * @returns
 */
const updateVendorStatusFailed = () =>
  action(VendorActionTypeEnum.UPDATE_VENDOR_STATUS_FAILED);

/**
 * Delete vendor failed action creator
 * @returns
 */
const deleteVendorFailed = () =>
  action(VendorActionTypeEnum.DELETE_VENDOR_FAILED);

/**
 * Delete vendor success action creator
 * @returns
 */
const deleteVendorSuccess = (payload: {
  getVendors: undefined | Function;
  vendorId: string;
}) => action(VendorActionTypeEnum.DELETE_VENDOR_SUCCESS, payload);

/**
 * Delete vendor pending action creator
 * @returns
 */
const deleteVendorPending = () =>
  action(VendorActionTypeEnum.DELETE_VENDOR_PENDING);

/**
 * get all vendor action
 * @returns
 */
const getAllVendorSuccess = (
  payload: { id: string | number; fullName: string }[]
) => action(VendorActionTypeEnum.GET_ALL_VENDOR_SUCCESS, payload);

/**
 * Get all vendor pending action creator
 * @returns
 */
const getAllVendorPending = () =>
  action(VendorActionTypeEnum.GET_ALL_VENDOR_PENDING);

/**
 * Get all vendor failed action creator
 * @returns
 */
const getAllVendorFailed = () =>
  action(VendorActionTypeEnum.GET_ALL_VENDOR_FAILED);

/**
 * Get vendor orders pending action creator
 * @returns
 */
const getAllVendorOrdersPending = () =>
  action(VendorActionTypeEnum.GET_VENDOR_ORDERS_PENDING);

/**
 * Get vendor orders failed action creator
 * @returns
 */
const getAllVendorOrdersFailed = () =>
  action(VendorActionTypeEnum.GET_VENDOR_ORDERS_FAILED);

/**
 * Get vendor orders success action creator
 * @param payload
 * @returns
 */
const getAllVendorOrdersSuccess = (payload: any) =>
  action(VendorActionTypeEnum.GET_VENDOR_ORDERS_SUCCESS, payload);

const getVendorStockHistorySuccess = (payload: TVendorStockHistory) =>
  action(VendorActionTypeEnum.GET_VENDOR_STOCK_HISTORY_SUCCESS, payload);

const getVendorStockHistoryPending = () =>
  action(VendorActionTypeEnum.GET_VENDOR_STOCK_HISTORY_PENDING);
const getVendorStockHistoryFailed = () =>
  action(VendorActionTypeEnum.GET_VENDOR_STOCK_HISTORY_FAILED);

export {
  getVendorsSuccess,
  getVendorPending,
  getVendorFailed,
  getVendorByIdSucess,
  getVendorByIdPending,
  getVendorByIdFailed,
  getVendorProductSuccess,
  getVendorProductPending,
  getVendorProductFailed,
  updateVendorProductPending,
  updateVendorProductSuccess,
  updateVendorProductFailed,
  updateVendorProductTiersSuccess,
  updateVendorProductTiersFailed,
  updateVendorProductTiersPending,
  updateVendorProductPricingSuccess,
  updateVendorProductPricingPending,
  updateVendorProductPricingFailed,
  addVendorProductTierPricingSuccess,
  addVendorProductTierPricingFailed,
  addVendorProductTierPricingPending,
  deleteVendorPricingTierSuccess,
  deleteVendorPricingTierFailed,
  deleteVendorProductPending,
  deleteVendorPricingTierPending,
  addVendorProductSuccess,
  addVendorProductFailed,
  addVendorProductPending,
  deleteVendorProductFailed,
  deleteVendorProductSuccess,
  addVendorSuccess,
  addVendorPending,
  addVendorFailed,
  updateVendorSuccess,
  updateVendorPending,
  updateVendorFailed,
  updateVendorStatusSuccess,
  updateVendorStatusPending,
  updateVendorStatusFailed,
  deleteVendorFailed,
  deleteVendorSuccess,
  deleteVendorPending,
  getAllVendorSuccess,
  getAllVendorPending,
  getAllVendorFailed,
  getAllVendorOrdersPending,
  getAllVendorOrdersFailed,
  getAllVendorOrdersSuccess,
  getVendorStockHistorySuccess,
  getVendorStockHistoryPending,
  getVendorStockHistoryFailed,
};

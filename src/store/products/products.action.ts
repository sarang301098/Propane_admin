import { action } from "typesafe-actions";
import ProductsActionTypeEnum from "./products.enum";
import { TProductsPayload } from "./products.types";

/**
 * Get product success action creator
 * @param payload
 * @returns
 */
const getProductsSuccess = (payload: {
  count: number;
  products: TProductsPayload[];
}) => action(ProductsActionTypeEnum.GET_PRODUCTS_SUCCESS, payload);

/**
 * Get product pending action creator
 * @returns
 */
const getProductsPending = () =>
  action(ProductsActionTypeEnum.GET_PRODUCTS_PENDING);

/**
 * Get product failed action creator
 * @returns
 */
const getProductsFailed = () =>
  action(ProductsActionTypeEnum.GET_PRODUCTS_FAILED);

/**
 * Get product by id success action creator
 * @param payload
 * @returns
 */
const getProductByIdSuccess = (payload: TProductsPayload) =>
  action(ProductsActionTypeEnum.GET_PRODUCT_BY_ID_SUCCESS, payload);

/**
 * Get product by id failed action creator
 * @returns
 */
const getProductByIdFailed = () =>
  action(ProductsActionTypeEnum?.GET_PRODUCT_BY_ID_FAILED);

/**
 * Get product by id pending action creator
 * @returns
 */
const getProductByIdPending = () =>
  action(ProductsActionTypeEnum?.GET_PRODUCT_BY_ID_PENDING);
/**
 * Add product success action creator
 * @param payload
 * @returns
 */
const addProductsSuccess = (payload: {
  product: TProductsPayload;
  orderType: number;
}) => action(ProductsActionTypeEnum.ADD_PRODUCTS_SUCCESS, payload);

/**
 * Add product pending action creator
 * @returns
 */
const addProductsPending = () =>
  action(ProductsActionTypeEnum.ADD_PRODUCTS_PENDING);

/**
 *Add product failed action creator
 * @returns
 */
const addProductsFailed = () =>
  action(ProductsActionTypeEnum.ADD_PRODUCTS_FAILED);

/**
 * Update product success action creator
 * @param payload
 * @returns
 */
const updateProductSuccess = (payload: {
  product: {
    id: string;
    name: string;
    orderType: number;
    status: number;
    logo: string;
    details: {
      id?: number;
      indexPrice: number | string;
      discount: number | string;
      categoryId?: string;
    }[];
  };
}) => action(ProductsActionTypeEnum.UPDATE_PRODUCTS_SUCCESS, payload);

/**
 * Update product pending  action creator
 * @returns
 */
const updateProductPending = () =>
  action(ProductsActionTypeEnum.UPDATE_PRODUCTS_PENDING);

/**
 * Update product failed action creator
 * @returns
 */
const updateProductFailed = () =>
  action(ProductsActionTypeEnum.UPDATE_PRODUCTS_FAILED);

/**
 * Delete product success action creator
 * @param payload
 * @returns
 */
const deleteProductSuccess = (payload: {
  productId: string;
  orderType: number;
}) => action(ProductsActionTypeEnum.DELETE_PRODUCTS_SUCCESS, payload);

/**
 * Delete product failed action creator
 * @returns
 */
const deleteProductFailed = () =>
  action(ProductsActionTypeEnum.DELETE_PRODUCTS_FAILED);

/**
 * Delete product pending action creator
 * @returns
 */
const deleteProductPending = () =>
  action(ProductsActionTypeEnum.DELETE_PRODUCTS_PENDING);

export {
  getProductsSuccess,
  getProductsPending,
  getProductsFailed,
  addProductsSuccess,
  addProductsPending,
  addProductsFailed,
  updateProductSuccess,
  updateProductPending,
  updateProductFailed,
  deleteProductSuccess,
  deleteProductFailed,
  deleteProductPending,
  getProductByIdSuccess,
  getProductByIdFailed,
  getProductByIdPending,
};

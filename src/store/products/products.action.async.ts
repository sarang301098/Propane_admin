import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  addProductsFailed,
  addProductsPending,
  addProductsSuccess,
  deleteProductFailed,
  deleteProductPending,
  deleteProductSuccess,
  getProductByIdFailed,
  getProductByIdPending,
  getProductByIdSuccess,
  getProductsFailed,
  getProductsPending,
  getProductsSuccess,
  updateProductFailed,
  updateProductPending,
  updateProductSuccess,
} from "./products.action";
import * as requestFromServer from "../../services/products/productsService";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get products action thunk
 * @param search
 * @param categoryId
 * @param orderType
 * @returns
 */
export const getProductsActionThunk = (
  search?: string,
  categoryId?: string,
  categoryIds?: string[],
  orderType?: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getProductsPending());
    requestFromServer
      .getProducts(search, categoryId, categoryIds, orderType)
      .then((res) => {
        dispatch(getProductsSuccess(res?.data));
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(getProductsFailed());
      });
  };
};

/**
 * Get product by id action thunk
 * @param productId
 * @returns
 */
export const getProducByIdActionThunk = (productId: string): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getProductByIdPending());
    requestFromServer
      .getProductById(productId)
      .then((res) => {
        dispatch(getProductByIdSuccess(res?.data?.product));
      })
      .catch(() => {
        dispatch(getProductByIdFailed());
      });
  };
};

/**
 * Add products action thunk
 * @param name
 * @param orderType
 * @param status
 * @param logo
 * @param details
 * @returns
 */
export const addProductsActionThunk = (
  name: string,
  orderType: number,
  status: number,
  logo: string,
  details: {
    indexPrice: number | string;
    discount: number | string;
    category?: { id: string; name: string };
  }[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addProductsPending());
    const detailsForApi = details.map((product) => ({
      ...product,
      categoryId: product?.category?.id,
      category: undefined,
    }));
    requestFromServer
      .addProducts(name, orderType, status, logo, detailsForApi)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch(addProductsSuccess({ product: res?.data, orderType }));
          successToast("Product added successfully");
        }
      })
      .catch((err) => {
        dispatch(addProductsFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update product action thunk
 * @param productId
 * @param name
 * @param orderType
 * @param status
 * @param logo
 * @param details
 * @returns
 */
export const updateProductActionThunk = (
  productId: string,
  name: string,
  orderType: number,
  status: number,
  logo: string,
  details: {
    id?: number;
    indexPrice: number | string;
    discount: number | string;
    category?: { id: string; name: string };
  }[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateProductPending());
    const detailsForApi = details?.map((product) => ({
      ...product,
      categoryId: product.category?.id,
      category: undefined,
    }));

    requestFromServer
      .updateProduct(productId, name, status, logo, orderType, detailsForApi)
      .then((res) => {
        if (res?.status === 200 || res?.status === 204) {
          dispatch(
            updateProductSuccess({
              product: {
                name,
                orderType,
                status,
                logo,
                details,
                id: productId,
              },
            })
          );
          successToast("Product updated successfully");
        } else {
          errorToast("Something went wrong");
          dispatch(updateProductFailed());
        }
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(updateProductFailed());
      });
  };
};

/**
 * Delete product action thunk
 * @param productId
 * @param orderType
 * @returns
 */
export const deleteProductActionThunk = (
  productId: string,
  orderType: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteProductPending());
    requestFromServer
      .deleteProduct(productId)
      .then((res) => {
        if (res?.status === 201 || res?.status === 204) {
          successToast("Product deleted successfully");
          dispatch(deleteProductSuccess({ productId, orderType }));
        } else {
          errorToast("Something went wrong");
          dispatch(deleteProductFailed());
        }
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(deleteProductSuccess({ productId, orderType }));
      });
  };
};

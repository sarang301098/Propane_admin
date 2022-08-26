import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  addVendorFailed,
  addVendorPending,
  addVendorProductFailed,
  addVendorProductSuccess,
  addVendorSuccess,
  deleteVendorFailed,
  deleteVendorPending,
  deleteVendorPricingTierFailed,
  deleteVendorPricingTierSuccess,
  deleteVendorProductFailed,
  deleteVendorProductSuccess,
  deleteVendorSuccess,
  getVendorByIdFailed,
  getVendorByIdPending,
  getVendorByIdSucess,
  getVendorFailed,
  getVendorPending,
  getVendorProductFailed,
  getVendorProductSuccess,
  getVendorsSuccess,
  updateVendorFailed,
  updateVendorPending,
  updateVendorProductFailed,
  updateVendorProductSuccess,
  addVendorProductTierPricingFailed,
  addVendorProductTierPricingSuccess,
  updateVendorProductTiersFailed,
  updateVendorProductTiersSuccess,
  updateVendorStatusFailed,
  updateVendorStatusPending,
  updateVendorStatusSuccess,
  updateVendorSuccess,
  updateVendorProductPricingSuccess,
  updateVendorProductPricingFailed,
  getVendorProductPending,
  addVendorProductPending,
  updateVendorProductPending,
  updateVendorProductTiersPending,
  deleteVendorProductPending,
  addVendorProductTierPricingPending,
  deleteVendorPricingTierPending,
  updateVendorProductPricingPending,
  getAllVendorSuccess,
  getAllVendorPending,
  getAllVendorFailed,
  getAllVendorOrdersPending,
  getAllVendorOrdersSuccess,
  getAllVendorOrdersFailed,
  getVendorStockHistoryPending,
  getVendorStockHistorySuccess,
  getVendorStockHistoryFailed,
} from "./vendor.action";
import * as requestFromServer from "../../services/vendor/vendorService";
import { errorToast, successToast } from "../../components/toast/toast";
import moment from "moment";

/**
 * Get vendors action thunk
 * @param page
 * @param perPage
 * @param startAt
 * @param endAt
 * @param search
 * @param zipcode
 * @param vendorStatus
 * @param sort
 * @returns
 */
export const getVendorsActionThunk = (
  isFilters: boolean,
  page: number,
  perPage: number,
  startAt: moment.Moment | string,
  endAt: moment.Moment | string,
  search: string,
  zipcode: string,
  vendorStatus: string,
  sort: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getVendorPending());
    requestFromServer
      .getVendors(
        isFilters,
        page,
        perPage,
        startAt,
        endAt,
        search,
        zipcode,
        vendorStatus,
        sort
      )
      .then((res) => {
        dispatch(getVendorsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getVendorFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get vendor by Id action thunk
 * @param vendorId
 * @returns
 */
export const getVendorByIdActionThunk = (
  vendorId: string,
  redirect?: Function,
  successRedirect?: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getVendorByIdPending());
    requestFromServer
      .getVendorById(vendorId)
      .then((res) => {
        dispatch(getVendorByIdSucess(res.data));
        successRedirect && successRedirect();
      })
      .catch((err) => {
        dispatch(getVendorByIdFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
        redirect && redirect();
      });
  };
};

/**
 * Get vendor product action thunk
 * @param vendorId
 * @param orderType
 * @returns
 */
export const getVendorProductActionThunk = (
  vendorId: string,
  orderType: number,
  page?: number,
  perPage?: number,
  startAt?: moment.Moment | string,
  endAt?: moment.Moment | string,
  productId?: number | null,
  cylinderSizeId?: number,
  search?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getVendorProductPending());
    requestFromServer
      .getVendorProducts(
        vendorId,
        orderType,
        page,
        perPage,
        startAt,
        endAt,
        productId,
        cylinderSizeId,
        search
      )
      .then((res) => {
        dispatch(getVendorProductSuccess(res?.data));
      })
      .catch((err) => {
        dispatch(getVendorProductFailed());
        errorToast(err?.response?.message?.data || "Something went wrong");
      });
  };
};

/**
 * Add vendor product action thunk
 * @param vendorId
 * @param productId
 * @param isSalesTax
 * @param orderType
 * @returns
 */
export const addVendorProductActionThunk = (
  vendorId: string,
  productId: string,
  isSalesTax: boolean,
  orderType: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addVendorProductPending());
    requestFromServer
      .addVendorProducts(vendorId, productId, isSalesTax, orderType)
      .then((res) => {
        dispatch(addVendorProductSuccess(res.data.vendorProduct));
        successToast("Product added successfully");
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message);
        dispatch(addVendorProductFailed());
      });
  };
};

/**
 * Update vendor product action thunk
 * @param vendorProductId
 * @param status
 * @param productId
 * @param vendorId
 * @returns
 */
export const updateVendorProductActionThunk = (
  vendorProductId: number | undefined,
  status: boolean,
  productId: string,
  vendorId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateVendorProductPending());
    requestFromServer
      .updateVendorProduct(vendorProductId, status, productId, vendorId)
      .then((res) => {
        dispatch(
          updateVendorProductSuccess({
            vendorProductId,
            status,
            productId,
            vendorId,
          })
        );
        successToast("Product updated successfully");
      })
      .catch((err) => {
        dispatch(updateVendorProductFailed());
        errorToast(err?.response?.data?.message);
      });
  };
};

/**
 * Update vendor product tier action thunk
 * @param tiers
 * @param productId
 * @param saveTier
 * @returns
 */
export const updateVendorProductTiersActionThunk = (
  tiers: { id: number; from: number; to: number }[],
  productId: number,
  saveTier: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateVendorProductTiersPending());
    requestFromServer
      .updateVendorProductTiers(tiers)
      .then((res) => {
        dispatch(updateVendorProductTiersSuccess({ tiers, productId }));
        successToast("Product tiers updated successfully");
        saveTier();
      })
      .catch((err) => {
        dispatch(updateVendorProductTiersFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete vendor product action thunk
 * @param productId
 * @returns
 */
export const deletVendorProductActionThunk = (
  productId: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteVendorProductPending());
    requestFromServer
      .deleteVendorProduct(productId)
      .then((res) => {
        dispatch(deleteVendorProductSuccess(productId));
        successToast("Product deleted successfully");
      })
      .catch((err) => {
        dispatch(deleteVendorProductFailed());
        errorToast(err?.response?.data?.message);
      });
  };
};

/**
 * Add vendor product tiers action thunk
 * @param pricing
 * @param index
 * @param orderType
 * @returns
 */
export const vendorProductPricingTierActionThunk = (
  pricing: Partial<{
    categoryId: undefined | number;
    cylinderSizeId: undefined | number;
    vendorProductTierId: number | undefined;
    vendorProductId: number;
    price: number | string;
    id: number | undefined;
  }>[],
  index: number,
  orderType?: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addVendorProductTierPricingPending());
    requestFromServer
      .addVendorProductTiersPricing(pricing)
      .then((res) => {
        dispatch(
          addVendorProductTierPricingSuccess({
            pricing: res.data?.pricing,
            index,
            orderType,
          })
        );
        successToast("Tiers price added successfully");
      })
      .catch((err) => {
        dispatch(addVendorProductTierPricingFailed());
        errorToast(err?.response?.data?.message);
      });
  };
};

/**
 * Delete vendor  product  pricing action thunk
 * @param ids
 * @param index
 * @returns
 */
export const deleteVendorProductPricingActionThunk = (
  ids: (number | undefined)[],
  index: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteVendorPricingTierPending());
    requestFromServer
      .deleteVendorProductPricing(ids)
      .then((res) => {
        dispatch(deleteVendorPricingTierSuccess({ ids, index }));
        successToast("Price deleted successfully");
      })
      .catch((err) => {
        dispatch(deleteVendorPricingTierFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update vendor product pricing action thunk
 * @param pricing
 * @returns
 */
export const updateVendorProductPricingActionThunk = (
  pricing: Partial<{
    categoryId: undefined | number;
    cylinderSizeId: undefined | number;
    vendorProductTierId: number | undefined;
    vendorProductId: number;
    price: number | string;
    id: number | undefined;
  }>[],
  productId: number | string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateVendorProductPricingPending());
    requestFromServer
      .updateVendorProductTiersPricing(pricing)
      .then((res) => {
        dispatch(updateVendorProductPricingSuccess({ pricing, productId }));
        successToast("Price updated successfully");
      })
      .catch((err) => {
        dispatch(updateVendorProductPricingFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Add vendor action thunk
 * @param data
 * @returns
 */
export const addVendorActionThunk = (
  data: any
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(addVendorPending());
    requestFromServer
      .addVendor(data)
      .then((res) => {
        dispatch(addVendorSuccess(res?.data));
        successToast("Vendor addedd successfully");
      })
      .catch((err) => {
        dispatch(addVendorFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update vendor action thunk
 * @param data
 * @param vendorId
 * @param updateTab
 * @returns
 */
export const updateVendorActionThunk = (
  data: Record<string, any>,
  vendorId: string,
  updateTab?: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateVendorPending());
    requestFromServer
      .updateVendor({ ...data, allData: undefined }, vendorId)
      .then(() => {
        updateTab && updateTab();
        dispatch(updateVendorSuccess(data));
        successToast("Your details are updated sucessfully!");
      })
      .catch((err) => {
        dispatch(updateVendorFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update vendor status action thunk
 * @param id
 * @param isActive
 * @returns
 */
export const updateVendorStatusActionThunk = (
  id: string,
  status: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateVendorStatusPending());
    requestFromServer
      .updateVendorStatus(id, status)
      .then((res) => {
        dispatch(updateVendorStatusSuccess({ id, status }));
        successToast("Status updated successfully");
      })
      .catch((err) => {
        dispatch(updateVendorStatusFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Delete vendor action thunk
 * @param vendorId
 * @returns
 */
export const deleteVendorActionThunk = (
  vendorId: string,
  getVendors: Function | undefined
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteVendorPending());
    requestFromServer
      .deleteVendor(vendorId)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          dispatch(deleteVendorSuccess({ vendorId, getVendors }));
          successToast("Vendor deleted successfully");
          getVendors && setTimeout(() => getVendors(), 1000);
        } else {
          dispatch(deleteVendorFailed());
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        dispatch(deleteVendorFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * get all vendor action thunk
 * @returns
 */
export const getAllVendorActionThunk = (): ThunkAction<
  void,
  {},
  {},
  AnyAction
> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getAllVendorPending());
    requestFromServer
      .getAllVendorAPI()
      .then((res) => {
        dispatch(getAllVendorSuccess(res.data && res?.data?.vendors));
      })
      .catch((err) => {
        dispatch(getAllVendorFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get vendor orders Action Thunk
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
export const getVendorOrdersActionThunk = (
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
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getAllVendorOrdersPending());

    requestFromServer
      .getVendorOrders(
        orderType,
        search,
        page,
        perPage,
        startAt,
        endAt,
        sort,
        sortBy,
        vendorId,
        driverId,
        freelanceDriverId,
        orderCategory,
        orderStatus,
        customerId
      )
      .then((response) => {
        dispatch(getAllVendorOrdersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllVendorOrdersFailed());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

export const getVendorStockHistoryActionThunk = (
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
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getVendorStockHistoryPending());
    requestFromServer
      .getVendorStockHistory(
        vendorId,
        page,
        perPage,
        category,
        product,
        accessory,
        cylinderSize,
        startAt,
        endAt,
        sort,
        sortBy,
        search
      )
      .then((res) => {
        dispatch(getVendorStockHistorySuccess(res.data));
      })
      .catch((err) => {
        dispatch(getVendorStockHistoryFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

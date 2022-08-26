import _ from "lodash";
import VendorActionTypeEnum from "./vendor.enum";
import { TVendorActionTypes, TVendorState } from "./vendor.types";

const initialState: TVendorState = {
  loading: false,
  vendorByIdLoading: false,
  vendorsData: { count: 0, vendor: [] },
  singleVendorData: null,
  product: {
    vendorProducts: [],
    count: 0,
  },
  allVendors: [],
  vendorOrders: { count: 0, orders: [] },
  stockHistory: { count: 0, vendorStock: [] },
};

const vendorReducer = (
  state = initialState,
  action: TVendorActionTypes
): TVendorState => {
  switch (action.type) {
    case VendorActionTypeEnum.GET_VENDOR_PENDING:
      return {
        ...state,
        loading: true,
        singleVendorData: null,
      };
    case VendorActionTypeEnum.GET_VENDOR_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.GET_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        vendorsData: action.payload,
      };
    case VendorActionTypeEnum.GET_SINGLE_VENDOR_PENDING:
      return {
        ...state,
        vendorByIdLoading: true,
      };
    case VendorActionTypeEnum.GET_SINGLE_VENDOR_FAILED:
      return {
        ...state,
        vendorByIdLoading: false,
      };
    case VendorActionTypeEnum.GET_SINGLE_VENDOR_SUCCESS:
      return {
        ...state,
        vendorByIdLoading: false,
        singleVendorData: action.payload,
      };
    case VendorActionTypeEnum.GET_VENDOR_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.GET_VENDOR_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.GET_VENDOR_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_PRODUCT_SUCCESS:
      const updateProduct = [...state?.product?.vendorProducts];
      const index = updateProduct?.findIndex(
        (product) => product?.id === Number(action?.payload?.vendorProductId)
      );
      if (index > -1) {
        updateProduct[index]["isSalesTax"] = action?.payload?.status;
        updateProduct[index]["productId"] = action?.payload?.productId;
      }
      return {
        ...state,
        loading: false,
        product: {
          ...state.product,
          vendorProducts: updateProduct,
        },
      };
    case VendorActionTypeEnum.ADD_VENDOR_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.ADD_VENDOR_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.ADD_VENDOR_PRODUCT_SUCCESS:
      const addProduct = [...state.product.vendorProducts];
      action.payload["isNewProduct"] = true;
      addProduct.push({ ...action.payload });
      return {
        ...state,
        loading: false,
        product: {
          ...state?.product,
          vendorProducts: addProduct,
          count: state?.product?.count + 1,
        },
      };
    case VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_SUCCESS:
      const deleteProduct = [...state.product.vendorProducts];
      const deleteProductIndex = deleteProduct?.findIndex(
        (product) => product?.id === action.payload
      );
      if (deleteProductIndex > -1) {
        deleteProduct?.splice(deleteProductIndex, 1);
      }
      return {
        ...state,
        loading: false,
        product: {
          ...state?.product,
          vendorProducts: deleteProduct,
          count: deleteProductIndex > -1 ? state?.product?.count - 1 : 0,
        },
      };
    case VendorActionTypeEnum.ADD_VENDOR_PRODUCT_TIER_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.ADD_VENDOR_PRODUCT_TIER_FAILED:
      return {
        ...state,
        loading: false,
      };

    case VendorActionTypeEnum.ADD_VENDOR_PRODUCT_TIER_SUCCESS:
      const productId = action.payload.productId;
      const updateTier = [...state?.product?.vendorProducts];
      const productIndex = updateTier?.findIndex(
        (product) => product?.id === productId
      );
      if (productIndex > -1) {
        updateTier[productIndex] = {
          ...updateTier[productIndex],
          isTiersSaved: true,
        };
        updateTier[productIndex]?.tiers?.map((tier) =>
          action.payload.tiers?.map(
            (innerTier) =>
              innerTier?.id === tier?.id &&
              ((tier.from = innerTier.from), (tier.to = innerTier.to))
          )
        );
      }
      return {
        ...state,
        loading: false,
        product: {
          ...state?.product,
          vendorProducts: updateTier,
        },
      };
    case VendorActionTypeEnum.ADD_PRODUCT_TIER_PRICING_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.ADD_PRODUCT_TIER_PRICING_FAILED:
      return {
        ...state,
        loading: false,
      };

    case VendorActionTypeEnum.ADD_PRODUCT_TIER_PRICING_SUCCESS:
      const addProductPrice = [...state.product.vendorProducts];
      if (action.payload.orderType) {
        for (let price of action.payload.pricing) {
          addProductPrice[action.payload?.index]["pricing"]?.push(price);
        }
      } else {
        addProductPrice[action.payload?.index]["pricing"] =
          action.payload?.pricing || [];
      }
      addProductPrice[action.payload?.index]["isPriceSaved"] = true;
      return {
        ...state,
        loading: false,
        product: {
          ...state?.product,
          vendorProducts: addProductPrice,
        },
      };

    case VendorActionTypeEnum.UPDATE_PRODUCT_TIER_PRICING_PENDING:
      return {
        ...state,
        loading: true,
      };

    case VendorActionTypeEnum.UPDATE_PRODUCT_TIER_PRICING_SUCCESS:
      const updatePricing = [...state?.product?.vendorProducts];
      const updatePriceIndex = updatePricing?.findIndex(
        (product) => product.id === action?.payload.productId
      );
      updatePriceIndex > -1 &&
        updatePricing[updatePriceIndex]?.pricing?.map((price) =>
          action?.payload?.pricing?.map(
            (innerPrice) =>
              price?.id === innerPrice?.id &&
              (price.price = innerPrice?.price as number)
          )
        );

      return {
        ...state,
        loading: false,
        product: {
          ...state?.product,
          vendorProducts: updatePricing,
        },
      };

    case VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PRICING_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PRICING_FAILED:
      return {
        ...state,
        loading: false,
      };

    case VendorActionTypeEnum.DELETE_VENDOR_PRODUCT_PRICING_SUCCESS:
      const deleteCategory = [...state?.product?.vendorProducts];
      deleteCategory[action.payload.index]["pricing"] = deleteCategory[
        action.payload.index
      ]["pricing"]?.filter(
        (category) => !(action.payload?.ids || [])?.includes(category?.id)
      );
      return {
        ...state,
        loading: false,
        product: {
          ...state?.product,
          vendorProducts: deleteCategory,
        },
      };

    case VendorActionTypeEnum.ADD_VENDOR_PENDING:
      return {
        ...state,
        loading: true,
        singleVendorData: null,
      };
    case VendorActionTypeEnum.ADD_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        singleVendorData: action.payload,
      };
    case VendorActionTypeEnum.ADD_VENDOR_FAILED:
      return {
        ...state,
        loading: false,
        singleVendorData: null,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_STATUS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case VendorActionTypeEnum.UPDATE_VENDOR_STATUS_SUCCESS:
      const vendorId = action.payload.id;
      const updateVendorStatus = [...state.vendorsData.vendor];
      const vendorIndex = state.vendorsData.vendor.findIndex(
        (vendor) => vendor?.id === vendorId
      );
      if (vendorIndex > -1) {
        updateVendorStatus[vendorIndex].vendor.status = action.payload.status;
      }

      return {
        ...state,
        loading: false,
        vendorsData: {
          ...state.vendorsData,
          vendor: updateVendorStatus,
        },
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_STATUS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_SUCCESS:
      let updateVendor = _.cloneDeep(state.singleVendorData);

      if (state?.singleVendorData && updateVendor) {
        if (action?.payload?.currentTab === 2) {
          updateVendor.documents = action?.payload?.documents;
          updateVendor.vendor = {
            ...state?.singleVendorData?.vendor,
            ...action.payload,
          };
        } else if (action?.payload?.currentTab === 1) {
          updateVendor = { ...state?.singleVendorData, ...action.payload };
          updateVendor.vendor.zipcodeIds = action?.payload?.zipcodeIds;
          updateVendor.vendor.status = action?.payload?.status;
        } else if (action?.payload?.currentTab === 5) {
          updateVendor.vendor.vendorSchecules = action?.payload?.allData;
        } else {
          updateVendor.vendor = {
            ...state?.singleVendorData?.vendor,
            ...action.payload,
          };
        }
      }
      updateVendor &&
        state.singleVendorData &&
        (updateVendor["vendor"]["profileCompletedStatus"] =
          state?.singleVendorData?.vendor?.profileCompletedStatus === 1
            ? 3
            : state?.singleVendorData?.vendor?.profileCompletedStatus + 1);
      return {
        ...state,
        loading: false,
        singleVendorData: updateVendor,
      };
    case VendorActionTypeEnum.UPDATE_VENDOR_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.DELETE_VENDOR_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.DELETE_VENDOR_SUCCESS:
      const deleteVendorId = action.payload?.vendorId;
      const deleteVendors = [...state?.vendorsData?.vendor];
      const deleteIndex = deleteVendors?.findIndex(
        (vendor) => vendor?.id === deleteVendorId
      );
      if (deleteIndex > -1) {
        deleteVendors.splice(deleteIndex, 1);
      }
      return {
        ...state,
        loading: action?.payload?.getVendors ? true : false,
        vendorsData: {
          ...state?.vendorsData,
          count: state?.vendorsData?.count - 1,
          vendor: deleteVendors,
        },
      };
    case VendorActionTypeEnum.DELETE_VENDOR_FAILED:
      return {
        ...state,
        loading: false,
      };

    case VendorActionTypeEnum.GET_ALL_VENDOR_PENDING:
      return {
        ...state,
        loading: true,
      };

    case VendorActionTypeEnum.GET_ALL_VENDOR_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.GET_ALL_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        allVendors: action.payload,
      };
    case VendorActionTypeEnum.GET_VENDOR_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        vendorOrders: action.payload,
      };
    case VendorActionTypeEnum.GET_VENDOR_ORDERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.GET_VENDOR_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.GET_VENDOR_STOCK_HISTORY_PENDING:
      return {
        ...state,
        loading: true,
      };
    case VendorActionTypeEnum.GET_VENDOR_STOCK_HISTORY_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VendorActionTypeEnum.GET_VENDOR_STOCK_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        stockHistory: action.payload,
      };
    default:
      return state;
  }
};

export default vendorReducer;

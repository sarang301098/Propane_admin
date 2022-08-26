import ProductsActionTypeEnum from "./products.enum";
import { TProductsState, TProductsActionType } from "./products.types";

const initialState: TProductsState = {
  loading: false,
  productsData: {
    count: 0,
    products: { fuelDeliveryProducts: [], tankExchangeProducts: [] },
  },
  singleProductData: null,
};

const productsReducer = (
  state = initialState,
  action: TProductsActionType
): TProductsState => {
  switch (action.type) {
    case ProductsActionTypeEnum.GET_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      };

    case ProductsActionTypeEnum.GET_PRODUCTS_SUCCESS:
      const fuelDeliveryProducts = action?.payload?.products?.filter(
        (product) => product?.orderType === 1
      );
      const tankExchangeProducts = action?.payload?.products?.filter(
        (product) => product?.orderType === 2
      );
      return {
        ...state,
        loading: false,
        productsData: {
          ...action?.payload,
          products: { fuelDeliveryProducts, tankExchangeProducts },
        },
      };
    case ProductsActionTypeEnum.GET_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ProductsActionTypeEnum.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        singleProductData: action.payload,
        loading: false,
      };
    case ProductsActionTypeEnum.GET_PRODUCT_BY_ID_FAILED:
      return {
        ...state,
        singleProductData: null,
        loading: false,
      };

    case ProductsActionTypeEnum.GET_PRODUCT_BY_ID_PENDING:
      return {
        ...state,
        singleProductData: null,
        loading: true,
      };
    case ProductsActionTypeEnum.ADD_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ProductsActionTypeEnum.ADD_PRODUCTS_SUCCESS:
      const updatedProducts = { ...state?.productsData?.products };
      action.payload.orderType === 1
        ? updatedProducts?.fuelDeliveryProducts?.push(action?.payload?.product)
        : updatedProducts?.tankExchangeProducts?.push(action?.payload?.product);

      return {
        ...state,
        loading: false,
        productsData: { ...state?.productsData, products: updatedProducts },
      };
    case ProductsActionTypeEnum.ADD_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ProductsActionTypeEnum.UPDATE_PRODUCTS_PENDING:
      return {
        ...state,
        loading: false,
      };
    case ProductsActionTypeEnum.UPDATE_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ProductsActionTypeEnum.UPDATE_PRODUCTS_SUCCESS:
      const updatedData = { ...state?.productsData?.products };
      if (Number(action?.payload?.product?.orderType) === 1) {
        const updatedProduct = updatedData?.fuelDeliveryProducts;
        const updatedProductedId = updatedProduct?.findIndex(
          (product) =>
            Number(product?.id) === Number(action?.payload?.product?.id)
        );
        if (updatedProductedId > -1) {
          updatedProduct[updatedProductedId]["name"] =
            action?.payload?.product?.name;
          updatedProduct[updatedProductedId]["status"] =
            action?.payload?.product?.status;
          updatedProduct[updatedProductedId]["logo"] =
            action?.payload?.product?.logo;
          updatedProduct[updatedProductedId]["details"] =
            action?.payload?.product?.details;
        }
      } else {
        const updatedProduct = updatedData?.tankExchangeProducts;
        const updatedProductedId = updatedProduct?.findIndex(
          (product) =>
            Number(product?.id) === Number(action?.payload?.product?.id)
        );
        if (updatedProductedId > -1) {
          updatedProduct[updatedProductedId]["name"] =
            action?.payload?.product?.name;
          updatedProduct[updatedProductedId]["status"] =
            action?.payload?.product?.status;
          updatedProduct[updatedProductedId]["logo"] =
            action?.payload?.product?.logo;
          updatedProduct[updatedProductedId]["details"] =
            action?.payload?.product?.details;
        }
      }
      return {
        ...state,
        loading: false,
        productsData: { ...state?.productsData, products: updatedData },
      };
    case ProductsActionTypeEnum.DELETE_PRODUCTS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ProductsActionTypeEnum.DELETE_PRODUCTS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case ProductsActionTypeEnum.DELETE_PRODUCTS_SUCCESS:
      const deleteProduct = { ...state?.productsData?.products };
      if (action?.payload?.orderType === 1) {
        const id = deleteProduct?.fuelDeliveryProducts?.findIndex(
          (product) => product.id === action.payload.productId
        );
        if (id > -1) {
          deleteProduct?.fuelDeliveryProducts?.splice(id, 1);
        }
      } else {
        const id = deleteProduct?.tankExchangeProducts?.findIndex(
          (product) => product.id === action?.payload?.productId
        );
        if (id > -1) {
          deleteProduct?.tankExchangeProducts?.splice(id, 1);
        }
      }
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default productsReducer;

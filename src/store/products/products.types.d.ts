import { ActionType } from "typesafe-actions";
import * as actions from "./products.action";

type TProductsPayload = {
  id: string;
  name: string;
  orderType: number;
  logo: string;
  discount: number;
  status: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
  isActive: boolean;
  details: {
    id?: number;
    indexPrice: number | string;
    discount: number | string;
    name?: string;
    category?: { id: string; name: string };
  }[];
};

type TProductsState = {
  loading: boolean;
  productsData: {
    count: number;
    products: {
      fuelDeliveryProducts: TProductsPayload[];
      tankExchangeProducts: TProductsPayload[];
    };
  };
  singleProductData: {
    id: string;
    name: string;
    logo: string;
    status: number;
    details: {
      id?: number;
      category?: { id: string; name: string };
      indexPrice: number | string;
      discount: number | string;
      isDeleted?: boolean;
    }[];
  } | null;
};

type TProductsActionType = ActionType<typeof actions>;

export { TProductsActionType, TProductsState, TProductsPayload };

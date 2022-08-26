import moment from "moment";
import { ActionType } from "typesafe-actions";
import * as actions from "./promocode.action";

interface InitialValue {
  productId: number | string;
  categoryIds: (string | undefined)[];
  title: string;
  promocode: string;
  discount: number | string;
  customerIds: string[] | { label: string; value: string }[] | null;
  startAt: moment.Moment | string;
  endAt: moment.Moment | string;
  isActive: number | string;
  orderType?: number;
}

type TPromocodeActionTypes = ActionType<typeof actions>;

type TPromocodePayload = {
  categoryIds: (string | undefined)[];
  createdAt?: string;
  createdBy?: string;
  customerIds: string[];
  deletedAt?: null | string;
  discount: number | string;
  endAt: string | moment.Moment;
  id: number;
  isActive: boolean;
  orderType: number;
  product: null | { id: number; name: string; logo: string };
  promocode: string;
  startAt: string | moment.Moment;
  title: string;
};

type TPromocodeState = {
  loading: boolean;
  promocodeList: { count: number; promocodes: TPromocodePayload[] };
  singlePromocode: TPromocodePayload | null;
};

export {
  TPromocodeActionTypes,
  TPromocodePayload,
  TPromocodeState,
  InitialValue,
};

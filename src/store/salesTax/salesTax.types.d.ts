import { ActionType } from "typesafe-actions";
import * as actions from "./salesTax.action";

type TStatesPayload = {
  id: number;
  name: string;
  salesTax: number;
  totalCounties: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: string | null;
  status: number;
};

type TCountyPayload = {
  name: string;
  salesTaxOne: number;
  salesTaxTwo: number;
  createdBy: string;
  updatedBy: string;
  status: number;
  state: { name: string };
  deletedAt: null | string;
  id: number;
  totalZipcodes: number;
  createdAt: string;
  updatedAt: string;
};
type TZipcodePayload = {
  id: number;
  areaName: string;
  zipcode: number;
  salesTax: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  deletedAt: null | string;
  status: number;
  county: {
    name: string;
  };
  state: {
    name: string;
  };
  countyId: number;
  stateId: number;
};

type TSalesTaxState = {
  loading: boolean;
  statesData: { states: TStatesPayload[]; count: number };
  countyData: {
    counties: TCountyPayload[];
    count: number;
    state: { id: number; name: string } | null;
  };
  zipcodeData: {
    zipcodes: TZipcodePayload[];
    count: number;
    county: { id: number; name: string } | null;
  };
};

type TSalesTaxActionTypes = ActionType<typeof actions>;

export {
  TSalesTaxState,
  TSalesTaxActionTypes,
  TStatesPayload,
  TCountyPayload,
  TZipcodePayload,
};

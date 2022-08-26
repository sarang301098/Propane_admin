import { action } from "typesafe-actions";
import SalesTaxActionTypeEnum from "./salesTax.enum";
import {
  TCountyPayload,
  TStatesPayload,
  TZipcodePayload,
} from "./salesTax.types";

/**
 * get states success action creator
 * @param payload
 * @returns
 */
const getStatesSuccess = (payload: {
  states: TStatesPayload[];
  count: number;
}) => action(SalesTaxActionTypeEnum.GET_STATES_SUCCESS, payload);

/**
 * get states failed action creator
 * @returns
 */
const getStatesFailed = () => action(SalesTaxActionTypeEnum.GET_STATES_FAILED);

/**
 * get states pending action creator
 * @returns
 */
const getStatesPending = () =>
  action(SalesTaxActionTypeEnum.GET_STATES_PENDING);

/**
 * add state pending action creator
 * @returns
 */
const addStatePending = () => action(SalesTaxActionTypeEnum.ADD_STATE_PENDING);

/**
 * add state failed action creator
 * @returns
 */
const addStateFailed = () => action(SalesTaxActionTypeEnum.ADD_STATE_FAILED);

/**
 * add state success action creator
 * @param payload
 * @returns
 */
const addStateSuccess = (payload: {
  state: TStatesPayload;
  itemsPerPage: number;
}) => action(SalesTaxActionTypeEnum.ADD_STATE_SUCCESS, payload);

/**
 * update state pending action creator
 * @returns
 */
const updateStatePending = () =>
  action(SalesTaxActionTypeEnum.UPDATE_STATE_PENDING);

/**
 * update state failed action creator
 * @returns
 */
const updateStateFailed = () =>
  action(SalesTaxActionTypeEnum.UPDATE_STATE_FAILED);

/**
 * update state success action creator
 * @param payload
 * @param stateId
 * @returns
 */
const updateStateSuccess = (payload: {
  name: string;
  saleTax: string;
  status: number;
  stateId: string;
}) => action(SalesTaxActionTypeEnum.UPDATE_STATE_SUCCESS, payload);

/**
 * delete state pending action creator
 * @returns
 */
const deleteStatePending = () =>
  action(SalesTaxActionTypeEnum.DELETE_STATE_PENDING);

/**
 * delete state failed action creator
 * @returns
 */
const deleteStateFailed = () =>
  action(SalesTaxActionTypeEnum.DELETE_STATE_FAILED);

/**
 * delete state success action creator
 * @param payload
 * @returns
 */
const deleteStateSuccess = (payload: {
  getStates: Function | undefined;
  stateId: string;
}) => action(SalesTaxActionTypeEnum.DELETE_STATE_SUCCESS, payload);

/* COUNTIES */

/**
 * Get counties success action creator
 * @param payload
 * @returns
 */
const getCountiesSuccess = (payload: {
  counties: TCountyPayload[];
  count: number;
  state: { id: number; name: string } | null;
}) => action(SalesTaxActionTypeEnum.GET_COUNTIES_SUCCESS, payload);

/**
 * Get counties failed action creator
 * @returns
 */
const getCountiesFailed = () =>
  action(SalesTaxActionTypeEnum.GET_COUNTIES_FAILED);

/**
 * Get counties pending action creator
 * @returns
 */
const getCountiesPending = () =>
  action(SalesTaxActionTypeEnum.GET_COUNTIES_PENDING);

/**
 * Add counties success action creator
 * @param payload
 * @returns
 */
const addCountiesSuccess = (payload: {
  county: TCountyPayload;
  itemsPerPage: number;
}) => action(SalesTaxActionTypeEnum.ADD_COUNTIES_SUCCESS, payload);

/**
 * Add counties pending action creator
 * @returns
 */
const addCountiesPending = () =>
  action(SalesTaxActionTypeEnum.ADD_COUNTIES_PENDING);

/**
 * Add counties failed action creator
 * @returns
 */
const addCountiesFailed = () =>
  action(SalesTaxActionTypeEnum.ADD_COUNTIES_FAILED);

/**
 * Update counties pending action creator
 * @returns
 */
const updateCountiesPending = () =>
  action(SalesTaxActionTypeEnum.UPDATE_COUNTIES_PENDING);

/**
 * Update counties success action creator
 * @param payload
 * @param countyId
 * @returns
 */
const updateCountiesSuccess = (payload: {
  name: string;
  salesTaxOne: string;
  salesTaxTwo: string;
  status: number;
  stateId: string;
}) => action(SalesTaxActionTypeEnum.UPDATE_COUNTIES_SUCCESS, payload);

/**
 * Update counties failed action creator
 * @returns
 */
const updateCountiesFailed = () =>
  action(SalesTaxActionTypeEnum.UPDATE_COUNTIES_FAILED);

/**
 * Delete counties pending action creator
 * @returns
 */
const deleteCountiesPending = () =>
  action(SalesTaxActionTypeEnum.DELETE_COUNTIES_PENDING);

/**
 * Delete counties success action creator
 * @param payload
 * @returns
 */
const deleteCountiesSuccess = (payload: {
  countyId: string;
  getCounties: Function | undefined;
}) => action(SalesTaxActionTypeEnum.DELETE_COUNTIES_SUCCESS, payload);

/**
 * Delete counties failed acion creator
 * @returns
 */
const deleteCountiesFailed = () =>
  action(SalesTaxActionTypeEnum.DELETE_COUNTIES_FAILED);

/* Zipcode */

/**
 * Get zipcode success action creator
 * @param payload
 * @returns
 */
const getZipcodeSuccess = (payload: {
  count: number;
  zipcodes: TZipcodePayload[];
  county: { id: number; name: string };
}) => action(SalesTaxActionTypeEnum.GET_ZIPCODES_SUCCESS, payload);

/**
 * Get zipcode pending action creator
 * @returns
 */
const getZipcodePending = () =>
  action(SalesTaxActionTypeEnum.GET_ZIPCODES_PENDING);

/**
 * Get zipcode failed action creator
 * @returns
 */
const getZipcodeFailed = () =>
  action(SalesTaxActionTypeEnum.GET_ZIPCODES_FAILED);

/**
 * Add zipcode success action creator
 * @param payload
 * @returns
 */
const addZipcodeSuccess = (payload: {
  zipcode: TZipcodePayload;
  itemsPerPage: number;
}) => action(SalesTaxActionTypeEnum.ADD_ZIPCODES_SUCCESS, payload);

/**
 * Add zipcode pending action creator
 * @returns
 */
const addZipcodePending = () =>
  action(SalesTaxActionTypeEnum.ADD_ZIPCODES_PENDING);

/**
 * Add zipcode failed action creator
 * @returns
 */
const addZipcodeFailed = () =>
  action(SalesTaxActionTypeEnum.ADD_ZIPCODES_FAILED);

/**
 * Update zipcode success action creator
 * @param payload
 * @param zipcodeId
 * @returns
 */
const updateZipcodeSuccess = (payload: {
  areaName: string;
  zipcode: number;
  status: number;
  zipcodeId: string;
}) => action(SalesTaxActionTypeEnum.UPDATE_ZIPCODE_SUCCESS, payload);

/**
 * Update zipcode failed action creator
 * @returns
 */
const updateZipcodeFailed = () =>
  action(SalesTaxActionTypeEnum.UPDATE_ZIPCODE_FAILED);

/**
 * Update zipcode pending action creator
 * @returns
 */
const updateZipcodePending = () =>
  action(SalesTaxActionTypeEnum.UPDATE_ZIPCODE_PENDING);

/**
 * Delete zipcode pending action creator
 * @returns
 */
const deleteZipcodePending = () =>
  action(SalesTaxActionTypeEnum.DELETE_ZIPCODE_PENDING);

/**
 * Delete zipcode failed action creator
 * @returns
 */
const deleteZipcodeFailed = () =>
  action(SalesTaxActionTypeEnum.DELETE_ZIPCODE_FAILED);

/**
 * Delete zipcode success action creator
 * @param payload
 * @returns
 */
const deleteZipcodeSuccess = (payload: {
  zipcodeId: string;
  getZipcodes: Function | undefined;
}) => action(SalesTaxActionTypeEnum.DELETE_ZIPCODE_SUCCESS, payload);

export {
  getStatesSuccess,
  getStatesFailed,
  getStatesPending,
  updateStatePending,
  updateStateFailed,
  updateStateSuccess,
  addStatePending,
  addStateFailed,
  addStateSuccess,
  deleteStatePending,
  deleteStateFailed,
  deleteStateSuccess,
  getCountiesSuccess,
  getCountiesPending,
  getCountiesFailed,
  addCountiesSuccess,
  addCountiesPending,
  addCountiesFailed,
  updateCountiesPending,
  updateCountiesSuccess,
  updateCountiesFailed,
  deleteCountiesPending,
  deleteCountiesSuccess,
  deleteCountiesFailed,
  getZipcodeSuccess,
  getZipcodePending,
  getZipcodeFailed,
  addZipcodeSuccess,
  addZipcodePending,
  addZipcodeFailed,
  updateZipcodeSuccess,
  updateZipcodeFailed,
  updateZipcodePending,
  deleteZipcodePending,
  deleteZipcodeFailed,
  deleteZipcodeSuccess,
};

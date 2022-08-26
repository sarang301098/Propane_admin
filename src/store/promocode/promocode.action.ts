import { action } from "typesafe-actions";
import PromocodeActionTypeEnum from "./promocode.enum";
import { TPromocodePayload } from "./promocode.types";

/**
 * Get promocode success action creator
 * @param payload
 * @returns
 */
const getPromocodeSuccess = (payload: {
  count: number;
  promocodes: TPromocodePayload[];
}) => action(PromocodeActionTypeEnum.GET_PROMOCODE_SUCCESS, payload);

/**
 * Get promocode pending action creator
 * @returns
 */
const getPromocodePendng = () =>
  action(PromocodeActionTypeEnum.GET_PROMOCODE_PENDING);

/**
 * Get promocode failed action creator
 * @returns
 */
const getPromocodeFailed = () =>
  action(PromocodeActionTypeEnum.GET_PROMOCODE_FAILED);

/**
 * Get promocode by id success action creator
 * @param payload
 * @returns
 */
const getPromocodeByIdSuccess = (payload: TPromocodePayload) =>
  action(PromocodeActionTypeEnum.GET_PROMOCODE_BY_ID_SUCCESS, payload);

/**
 * Get promocode by id pending action creator
 * @returns
 */
const getPromocodeByIdPendng = () =>
  action(PromocodeActionTypeEnum.GET_PROMOCODE_BY_ID_PENDING);

/**
 * Get promocode by id failed action creator
 * @returns
 */
const getPromocodeByIdFailed = () =>
  action(PromocodeActionTypeEnum.GET_PROMOCODE_BY_ID_FAILED);

/**
 * Update promocode success action creator
 * @param payload
 * @returns
 */
const updatePromocodeSuccess = (payload: {
  id: number | string;
  isActive: string | number;
}) => action(PromocodeActionTypeEnum.UPDATE_PROMOCODE_SUCCESS, payload);

/**
 * Update promocode pending action creator
 * @returns
 */
const updatePromocodePending = () =>
  action(PromocodeActionTypeEnum.UPDATE_PROMOCODE_PENDING);

/**
 * Update promocode failed action creator
 * @returns
 */
const updatePromocodeFailed = () =>
  action(PromocodeActionTypeEnum.UPDATE_PROMOCODE_FAILED);

/**
 * Add promocode success action creator
 * @param payload
 * @returns
 */
const addPromocodeSuccess = (payload: TPromocodePayload) =>
  action(PromocodeActionTypeEnum.ADD_PROMOCODE_SUCCESS, payload);

/**
 * Add promocode pending action creator
 * @returns
 */
const addPromocodePending = () =>
  action(PromocodeActionTypeEnum.ADD_PROMOCODE_PENDING);

/**
 * Add promocode failed action creator
 * @returns
 */
const addPromocodeFailed = () =>
  action(PromocodeActionTypeEnum.ADD_PROMOCODE_FAILED);

/**
 * Delete promocode success action creator
 * @param payload
 * @returns
 */
const deletePromocodeSuccess = (payload: {
  productId: string | number;
  getPromocode: Function | undefined;
}) => action(PromocodeActionTypeEnum.DELETE_PROMOCODE_SUCCESS, payload);

/**
 * Delete promocode pending action creator
 * @returns
 */
const deletePromocodePending = () =>
  action(PromocodeActionTypeEnum.DELETE_PROMOCODE_PENDING);

/**
 * Delete promocode failed action creator
 * @returns
 */
const deletePromocodeFailed = () =>
  action(PromocodeActionTypeEnum.DELETE_PROMOCODE_FAILED);

export {
  getPromocodeSuccess,
  getPromocodePendng,
  getPromocodeFailed,
  getPromocodeByIdSuccess,
  getPromocodeByIdPendng,
  getPromocodeByIdFailed,
  updatePromocodeSuccess,
  updatePromocodePending,
  updatePromocodeFailed,
  addPromocodeSuccess,
  addPromocodePending,
  addPromocodeFailed,
  deletePromocodeSuccess,
  deletePromocodePending,
  deletePromocodeFailed,
};

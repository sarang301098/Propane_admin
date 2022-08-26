import { action } from "typesafe-actions";
import EarningActionTypeEnum from "./earning.enum";
// import { TEarningPayload } from "./earning.types";
/**
 * earning loading action creator
 * @returns
 */
const getEarningPending = () => action(EarningActionTypeEnum.GET_NET_EARNINGS_PENDING);

/**
 * earning loaded action creator
 * @returns
 */
const getEarningFailed = () => action(EarningActionTypeEnum.GET_NET_EARNINGS_FAILED);

/**
 * get earning action creator
 * @returns
 */
const getEarningSuccess = (earningList: { count: number; earnings: Record<string, string | number>[] }) =>
  action(EarningActionTypeEnum.GET_NET_EARNINGS_SUCCESS, earningList);

const getCancelOrderEarningSuccess = (payload: {
  count: number;
  cancelledearnings: Record<string, string | number>[];
}) => action(EarningActionTypeEnum.GET_CANCEL_ORDER_EARNING_SUCCESS, payload);

const getCancelOrderEarningPending = () => action(EarningActionTypeEnum.GET_CANCEL_ORDER_EARNING_PENDING);
const getCancelOrderEarningFailed = () => action(EarningActionTypeEnum.GET_CANCEL_ORDER_EARNING_FAILED);
export {
  getEarningPending,
  getEarningFailed,
  getEarningSuccess,
  getCancelOrderEarningSuccess,
  getCancelOrderEarningPending,
  getCancelOrderEarningFailed,
};

import { action } from "typesafe-actions";
import { TCategoryPayload } from "./category.types";
import TCategotyActionTypeEnum from "./ctaegory.enum";

/**
 * Get category success action creator
 * @param payload
 * @returns
 */
const getCategorySuccess = (payload: TCategoryPayload[]) =>
	action(TCategotyActionTypeEnum.GET_CATEGORY_SUCCESS, payload);

/**
 * Get category failed action creator
 * @returns
 */
const getCategoryFailed = () =>
	action(TCategotyActionTypeEnum.GET_CATEGORY_FAILED);

/**
 * Get category pending action creator
 * @returns
 */
const getCategoryPending = () =>
	action(TCategotyActionTypeEnum.GET_CATEGORY_PENDING);

export { getCategorySuccess, getCategoryFailed, getCategoryPending };

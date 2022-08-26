import { action } from "typesafe-actions";
import CmsActionTypeEnum from "./cms.enum";
import { TCmsPagePayload } from "./cms.types";

/**
 * Get cms page success action creator
 * @param payload
 * @returns
 */
const getCmsPageSuccess = (payload: TCmsPagePayload[]) =>
	action(CmsActionTypeEnum.GET_CMS_SUCCESS, payload);

/**
 * get cms page pending action creator
 * @returns
 */
const getCmsPagePending = () => action(CmsActionTypeEnum.GET_CMS_PENDING);

/**
 * Get cms page failed action creator
 * @returns
 */
const getCmsPageFailed = () => action(CmsActionTypeEnum.GET_CMS_FAILED);

/**
 * Update cms page success action creator
 * @param payload
 * @param pageId
 * @returns
 */
const updateCmsPagesSuccess = (payload: TCmsPagePayload, pageId: number) =>
	action(CmsActionTypeEnum.UPDATE_CMS_SUCCESS, { payload, pageId });

/**
 * Update cms page pending action creator
 * @returns
 */
const updateCmsPagesPending = () =>
	action(CmsActionTypeEnum.UPDATE_CMS_PENDING);

/**
 * Update cms page pending action creator
 * @returns
 */
const updateCmsPagesFailed = () => action(CmsActionTypeEnum.UPDATE_CMS_FAILED);

/**
 * Get single cms page success action creator
 * @param payload
 * @returns
 */
const getSingleCmsPageSuccess = (payload: TCmsPagePayload) =>
	action(CmsActionTypeEnum.GET_SINGLE_CMS_SUCCESS, payload);

/**
 * Get single cms page failed action creator
 * @returns
 */
const getSingleCmsPageFailed = () =>
	action(CmsActionTypeEnum.GET_SINGLE_CMS_FAILED);

/**
 * Get single cms page pending action creator
 * @returns
 */
const getSingleCmsPagePending = () =>
	action(CmsActionTypeEnum.GET_SINGLE_CMS_PENDING);

export {
	getCmsPageSuccess,
	getCmsPagePending,
	getCmsPageFailed,
	updateCmsPagesSuccess,
	updateCmsPagesPending,
	updateCmsPagesFailed,
	getSingleCmsPageSuccess,
	getSingleCmsPageFailed,
	getSingleCmsPagePending,
};

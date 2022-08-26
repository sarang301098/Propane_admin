import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/cms/cmsServices";
import {
  getCmsPageFailed,
  getCmsPagePending,
  getCmsPageSuccess,
  getSingleCmsPageFailed,
  getSingleCmsPagePending,
  getSingleCmsPageSuccess,
  updateCmsPagesFailed,
  updateCmsPagesPending,
  updateCmsPagesSuccess,
} from "./cms.action";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get cms pages action thunk
 * @returns
 */
const getCmsPagesActionThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getCmsPagePending());
    requestFromServer
      .getCmsPages("")
      .then((res) => dispatch(getCmsPageSuccess(res.data)))
      .catch((err) => {
        dispatch(getCmsPageFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update cms pages actoin thunk
 * @param pageData
 * @param name
 * @param pageId
 * @returns
 */
const updateCmsPagesActionThunk = (
  pageData: string,
  name: string,
  pageId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateCmsPagesPending());
    requestFromServer
      .updateCmsPages(pageData, name, pageId)
      .then((res) => {
        dispatch(updateCmsPagesSuccess(res.data, Number(pageId)));
        successToast("Page updated successfully");
      })
      .catch((err) => {
        dispatch(updateCmsPagesFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};
export { getCmsPagesActionThunk, updateCmsPagesActionThunk };

/**
 * Get single cms page action thunk
 * @param pageId
 * @returns
 */
export const getSingleCmsPagesActionThunk = (
  pageId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getSingleCmsPagePending());
    requestFromServer
      .getCmsPages(pageId)
      .then((res) => dispatch(getSingleCmsPageSuccess(res.data)))
      .catch((err) => dispatch(getSingleCmsPageFailed()));
  };
};

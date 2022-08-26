import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as requestFromServer from "../../services/emailTemplate/emailTemplateService";
import {
  getEmailTemplateFailed,
  getEmailTemplatePending,
  getEmailTemplateSuccess,
  getSingleEmailTemplateFailed,
  getSingleEmailTemplateSuccess,
  updateEmailTemplateFailed,
  updateEmailTemplatePending,
  updateEmailTemplateSuccess,
} from "./emailTemplate.action";
import { errorToast, successToast } from "../../components/toast/toast";

/**
 * Get email template action thunk
 * @param page
 * @param perPage
 * @param q
 * @returns
 */
export const getEmailTemplateActionThunk = (
  page: number,
  perPage: number,
  q: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getEmailTemplatePending());
    requestFromServer
      .getEmailTemplates(page, perPage, q)
      .then((res) => {
        dispatch(getEmailTemplateSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getEmailTemplateFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Get single email template action thunk
 * @param templateId
 * @returns
 */
export const getSingleTemplateActionThunk = (
  templateId: number
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getEmailTemplatePending());
    requestFromServer
      .getSingleEmailTemplate(templateId)
      .then((res) => {
        dispatch(getSingleEmailTemplateSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getSingleEmailTemplateFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

/**
 * Update email template action thunk
 * @param data
 * @param name
 * @param templateId
 * @param key
 * @returns
 */
export const updateEmailTemplateActionThunk = (
  data: string,
  name: string,
  templateId: number,
  key: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (disaptch: ThunkDispatch<{}, {}, AnyAction>) => {
    disaptch(updateEmailTemplatePending());
    requestFromServer
      .updateEmailTemplate(data, name, templateId, key)
      .then((res) => {
        disaptch(updateEmailTemplateSuccess({ data, name, templateId }));
        successToast("Template updated successfully");
      })
      .catch((err) => {
        disaptch(updateEmailTemplateFailed());
        errorToast(err?.response?.data?.message || "Something went wrong");
      });
  };
};

import { action } from "typesafe-actions";
import EmailTemplateTypeEnum from "./emailTemplate.enum";
import { TEmailTemplatePayload } from "./emailTemplate.types";

/**
 * Get email template success action creator
 * @param payload
 * @returns
 */
const getEmailTemplateSuccess = (payload: {
	count: number;
	emailTemplates: TEmailTemplatePayload[];
}) => action(EmailTemplateTypeEnum.GET_EMAIL_TEMPLATE_SUCCESS, payload);

/**
 * Get email template failed action creator
 * @returns
 */
const getEmailTemplateFailed = () =>
	action(EmailTemplateTypeEnum.GET_EMAIL_TEMPLATE_FAILED);

/**
 * Get email template pending action creator
 * @returns
 */
const getEmailTemplatePending = () =>
	action(EmailTemplateTypeEnum.GET_EMAIL_TEMPLATE_PENDING);

/**
 * Get single email template success action creator
 * @param payload
 * @returns
 */
const getSingleEmailTemplateSuccess = (payload: TEmailTemplatePayload) =>
	action(EmailTemplateTypeEnum.GET_SINGLE_EMAIL_TEMPLATE_SUCCESS, payload);

/**
 * Get single email template failed action creator
 * @returns
 */
const getSingleEmailTemplateFailed = () =>
	action(EmailTemplateTypeEnum.GET_SINGLE_EMAIL_TEMPLATE_FAILED);

/**
 * Get sigle email template pending action creator
 * @returns
 */
const getSingleEmailTemplatePending = () =>
	action(EmailTemplateTypeEnum.GET_SINGLE_EMAIL_TEMPLATE_PENDING);

/**
 * Update email template pending action creator
 * @returns
 */
const updateEmailTemplatePending = () =>
	action(EmailTemplateTypeEnum.UPDATE_EMAIL_TEMPLATE_PENDING);

/**
 * Update email template success action creator
 * @returns
 */
const updateEmailTemplateSuccess = (payload: {
	data: string;
	name: string;
	templateId: number;
}) => action(EmailTemplateTypeEnum.UPDATE_EMAIL_TEMPLATE_SUCCESS, payload);

/**
 * Update email template failed action creator
 * @returns
 */
const updateEmailTemplateFailed = () =>
	action(EmailTemplateTypeEnum.UPDATE_EMAIL_TEMPLATE_FAILED);

export {
	getEmailTemplateSuccess,
	getEmailTemplateFailed,
	getEmailTemplatePending,
	getSingleEmailTemplateSuccess,
	getSingleEmailTemplateFailed,
	getSingleEmailTemplatePending,
	updateEmailTemplatePending,
	updateEmailTemplateSuccess,
	updateEmailTemplateFailed,
};

import { API } from "../../middleware/middleware";

/**
 * Get email template API call
 * @param page
 * @param perPage
 * @param q
 * @returns
 */
const getEmailTemplates = (
  page: number,
  perPage: number,
  q: string
): Promise<any> => {
  return API.get("/emailtemplates", {
    params: { page, perPage, search: q || undefined },
  });
};

/**
 * Get single email template API call
 * @param templateId
 * @returns
 */
const getSingleEmailTemplate = (templateId: number): Promise<any> => {
  return API.get("/emailtemplates/" + templateId);
};

/**
 * Update email template API call
 * @param template
 * @param subject
 * @param templateId
 * @param key
 * @returns
 */
const updateEmailTemplate = (
  template: string,
  subject: string,
  templateId: number,
  key: string
): Promise<any> => {
  return API.put("/emailtemplates/" + templateId, { template, subject, key });
};

export { getEmailTemplates, getSingleEmailTemplate, updateEmailTemplate };

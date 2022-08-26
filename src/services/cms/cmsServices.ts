import { API } from "../../middleware/middleware";

/**
 * Get cms pages api call
 * @param pageId
 * @returns
 */
export const getCmsPages = (pageId?: string): Promise<any> => {
  return API.get("/cmspages/" + pageId);
};

/**
 * Update cms page api call
 * @param content
 * @param name
 * @param pageId
 * @returns
 */
export const updateCmsPages = (content: string, name: string, pageId: string): Promise<any> => {
  return API.put("/cmspages/" + pageId, { content, name });
};

/**
 * cms page view
 * @param userType
 * @param key
 * @returns
 */
export const cmsPageViewAPI = (key: string | null, userType: string | null): Promise<any> => {
  return API.get("/cmspages/single/get-by-key", { params: { userType: userType, key: key } });
};

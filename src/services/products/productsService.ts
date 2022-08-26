import { API } from "../../middleware/middleware";

/**
 * Get Products API call
 * @param search
 * @param categoryId
 * @param orderType
 * @returns
 */
const getProducts = (
  search?: string,
  categoryId?: number | string,
  categoryIds?: string[],
  orderType?: number
): Promise<any> => {
  return API.get("/products", {
    params: {
      search: search || undefined,
      categoryId: categoryId && (categoryId === "All" ? undefined : Number(categoryId)),
      categoryIds: categoryIds,
      orderType: orderType || undefined,
    },
  });
};

/**
 * Add product API call
 * @param name
 * @param orderType
 * @param status
 * @param logo
 * @param details
 * @returns
 */
const addProducts = (
  name: string,
  orderType: number,
  status: number,
  logo: string,
  details: {
    indexPrice: number | string;
    discount: number | string;
    categoryId?: string;
  }[]
): Promise<any> => {
  return API.post("/products/", { name, orderType, status, logo, details });
};

/**
 * Update product API call
 * @param productId
 * @param name
 * @param status
 * @param logo
 * @param details
 * @returns
 */
const updateProduct = (
  productId: string,
  name: string,
  status: number,
  logo: string,
  orderType: number,
  details: {
    id?: number;
    indexPrice: number | string;
    discount: number | string;
    categoryId?: string | null;
  }[]
): Promise<any> => {
  return API.put("/products/" + productId, {
    name,
    status,
    logo,
    orderType,
    details: details?.map((detail) => ({
      ...detail,
      categoryId: Number(detail?.categoryId) || undefined,
      indexPrice: Number(detail?.indexPrice),
      discount: Number(detail?.discount),
    })),
  });
};

/**
 * Delete product API call
 * @param producId
 * @returns
 */
const deleteProduct = (producId: string): Promise<any> => {
  return API.delete("/products/" + producId);
};

/**
 * Get product by id API call
 * @param producId
 * @returns
 */
const getProductById = (producId: string): Promise<any> => {
  return API.get("/products/" + producId);
};

export { getProducts, addProducts, updateProduct, deleteProduct, getProductById };

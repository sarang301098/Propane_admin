import { API } from "../../middleware/middleware";
import { InitialValue } from "../../store/promocode/promocode.types";

/**
 * Get promocodes API call
 * @param page
 * @param perPage
 * @param category
 * @param product
 * @param status
 * @param orderType
 * @param search
 * @returns
 */
const getPromocode = (
  page: number,
  perPage: number,
  category: string,
  product: string,
  status: string | undefined,
  orderType: number | undefined,
  search: string | undefined
): Promise<any> => {
  return API.get("/promocodes", {
    params: {
      page,
      perPage,
      categoryId: category || undefined,
      productId: product || undefined,
      status: status === "" ? undefined : status === "1" ? true : false,
      orderType: orderType || undefined,
      search: search || undefined,
    },
  });
};

/**
 * Get promocode by id API call
 * @param id
 * @returns
 */
const getPromocodeById = (id: string | number): Promise<any> => {
  return API.get("/promocodes/" + id);
};

/**
 * Delete promocode API call
 * @param id
 * @returns
 */
const deletePromocode = (id: string | number): Promise<any> => {
  return API.delete("/promocodes/" + id);
};

/**
 * Update promocode API call
 * @param id
 * @param values
 * @returns
 */
const updatePromocode = (id: string | number, values: InitialValue) => {
  return API.put("/promocodes/" + id, {
    ...values,
    isActive: values?.isActive === "1" ? true : false,
  });
};

/**
 * Add promocode API call
 * @param values
 * @returns
 */
const addPromocode = (values: InitialValue): Promise<any> => {
  return API.post("/promocodes", {
    ...values,
    isActive: values?.isActive === "1" ? true : false,
  });
};

export {
  addPromocode,
  getPromocode,
  deletePromocode,
  updatePromocode,
  getPromocodeById,
};

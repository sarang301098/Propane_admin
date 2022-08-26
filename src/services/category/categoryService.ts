import { API } from "../../middleware/middleware";

const getCategory = (orderType: string): Promise<any> => {
  return API.get("/categories/", {
    params: { orderType: orderType || undefined },
  });
};

export { getCategory };

import { API } from "../../middleware/middleware";

const getAccessories = (
  search: string,
  page: number,
  perPage: number,
  isFilters?: boolean
): Promise<any> => {
  if (isFilters === false) {
    return API.get("/accessories", {
      params: { isFilters },
    });
  }
  return API.get("/accessories", {
    params: { search: search || undefined, page, perPage },
  });
};

const addAccessories = (
  name: string,
  image: string,
  price: number,
  description: string
): Promise<any> => {
  return API.post("/accessories/", { name, image, price, description });
};

const updateAccessories = (
  name: string,
  image: string,
  price: number,
  description: string,
  id: string
): Promise<any> => {
  return API.put("/accessories/" + id, { name, image, price, description });
};

const deleteAccesories = (id: number): Promise<any> => {
  return API.delete("/accessories/" + id);
};

export { getAccessories, addAccessories, updateAccessories, deleteAccesories };

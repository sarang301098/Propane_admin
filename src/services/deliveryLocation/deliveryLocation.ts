import { API } from "../../middleware/middleware";

/**
 * Get Delivery Location
 * @returns
 */
const getDeliveryLocation = (q: string): Promise<any> => {
  return API.get("/deliverylocations", { params: { search: q || undefined } });
};

/**
 * Update Single Delivery Location
 * @param id
 * @param name
 * @param description
 * @param price
 * @returns
 */
const updateDeliveryLocation = (
  id: string,
  name: string,
  description: string,
  price: number
): Promise<any> => {
  return API.put("/deliverylocations/" + id, { name, description, price });
};
export { getDeliveryLocation, updateDeliveryLocation };

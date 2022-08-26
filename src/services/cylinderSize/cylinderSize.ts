import { API } from "../../middleware/middleware";

/**
 * Get cylinder size API call
 * @returns
 */
const getCylinderSize = (
  isFilters: boolean,
  page: number,
  perPage: number,
  q: string
): Promise<any> => {
  if (!isFilters) {
    return API.get("/cylinderSize", { params: { isFilters } });
  }
  return API.get("/cylinderSize", {
    params: { page, perPage, search: q.toString() || undefined },
  });
};

/**
 * Update cylinder size API call
 * @param cylinderSize
 * @returns
 */

const updateCylinderSize = (id: number, cylinderSize: number): Promise<any> => {
  return API.put("/cylinderSize/" + id, {
    cylinderSize: cylinderSize || undefined,
  });
};

/**
 * Delete cylinder size API call
 * @param id
 * @returns
 */

const deleteCylinderSize = (id: number): Promise<any> => {
  return API.delete("cylinderSize/" + id);
};

/**
 * Add cylinder size API call
 * @param cylinderSize
 * @returns
 */

const addCylinderSize = (cylinderSize: number): Promise<any> => {
  return API.post("/cylinderSize", {
    cylinderSize: cylinderSize || undefined,
  });
};

export {
  getCylinderSize,
  updateCylinderSize,
  deleteCylinderSize,
  addCylinderSize,
};

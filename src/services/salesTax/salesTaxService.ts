import { API } from "../../middleware/middleware";

/* States */

/**
 * Get states API call
 * @param page
 * @param perPage
 * @param q
 * @returns
 */
const getStates = (
  page: number,
  perPage: number,
  q: string,
  sort?: string
): Promise<any> => {
  return API.get("/states", {
    params: {
      page,
      perPage,
      search: q || undefined,
      sort: sort || "ASC",
      //   sortBy: "state",
    },
  });
};

/**
 * Add state API call
 * @param name
 * @param salesTax
 * @param status
 * @returns
 */
const addState = (
  name: string,
  salesTax: string,
  status: number
): Promise<any> => {
  return API.post("/states", { name, salesTax, status });
};

/**
 * Update state API call
 * @param name
 * @param salesTax
 * @param status
 * @param stateId
 * @returns
 */
const updateState = (
  name: string,
  salesTax: string,
  status: number,
  stateId: string
): Promise<any> => {
  return API.put("/states/" + stateId, { name, salesTax, status });
};

/**
 * Delete state API call
 * @param stateId
 * @returns
 */
const deleteState = (stateId: string): Promise<any> => {
  return API.delete("/states/" + stateId);
};

/* Counties */

/**
 * Get counties API call
 * @param page
 * @param perPage
 * @param q
 * @param stateId
 * @returns
 */
const getCounties = (
  page: number,
  perPage: number,
  q: string,
  stateId: string,
  sort: string
): Promise<any> => {
  return API.get("/counties", {
    params: {
      page,
      perPage,
      search: q || undefined,
      stateId,
      sort: sort || "ASC",
      sortBy: "countyName",
    },
  });
};

/**
 * Add county API call
 * @param name
 * @param salesTaxOne
 * @param salesTaxTwo
 * @param status
 * @param stateId
 * @returns
 */
const addCounty = (
  name: string,
  salesTaxOne: string,
  salesTaxTwo: string,
  status: number,
  stateId: string
): Promise<any> => {
  return API.post("/counties/", {
    name,
    salesTaxOne,
    salesTaxTwo,
    status,
    stateId,
  });
};

/**
 * Update county API call
 * @param name
 * @param salesTaxOne
 * @param salesTaxTwo
 * @param status
 * @param countyId
 * @returns
 */
const updateCounty = (
  name: string,
  salesTaxOne: string,
  salesTaxTwo: string,
  status: number,
  countyId: string
): Promise<any> => {
  return API.put("/counties/" + countyId, {
    name,
    salesTaxOne,
    salesTaxTwo,
    status,
  });
};

/**
 * Delete county API call
 * @param countyId
 * @returns
 */
const deleteCounty = (countyId: string): Promise<any> => {
  return API.delete("/counties/" + countyId);
};

/* Zipcode */

/**
 * Get zipcodes API call
 * @param page
 * @param perPage
 * @param q
 * @param stateId
 * @param countyId
 * @returns
 */
const getZipcodes = (
  isFilters: boolean,
  page: number,
  perPage: number,
  q: string,
  stateId: string,
  countyId: string,
  sort: string
): Promise<any> => {
  if (!isFilters) {
    return API.get("/zipcodes", { params: { isFilters } });
  }
  return API.get("/zipcodes", {
    params: {
      isFilters: true,
      page,
      perPage,
      search: q || undefined,
      stateId,
      countyId,
      sort,
      sortBy: "areaName",
    },
  });
};

/**
 * Add zipcode API call
 * @param areaName
 * @param zipcode
 * @param status
 * @param countyId
 * @returns
 */
const addZipcode = (
  areaName: string,
  zipcode: number,
  status: number,
  countyId: number
): Promise<any> => {
  return API.post("/zipcodes", { areaName, zipcode, countyId, status });
};

/**
 * Update zipcode API call
 * @param areaName
 * @param zipcode
 * @param status
 * @param zipcodeId
 * @returns
 */
const updateZipcode = (
  areaName: string,
  zipcode: number,
  status: number,
  zipcodeId: string
): Promise<any> => {
  return API.put("/zipcodes/" + zipcodeId, { areaName, zipcode, status });
};

/**
 * Delete zipcode API call
 * @param zipcodeId
 * @returns
 */
const deleteZipcode = (zipcodeId: string): Promise<any> => {
  return API.delete("/zipcodes/" + zipcodeId);
};
export {
  getStates,
  addState,
  updateState,
  deleteState,
  getCounties,
  addCounty,
  updateCounty,
  deleteCounty,
  getZipcodes,
  addZipcode,
  updateZipcode,
  deleteZipcode,
};

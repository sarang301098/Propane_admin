import { API } from "../../middleware/middleware";
import { TTestPayloadData } from "../../store/test/test.types";

/**
 * login api call
 * @param values
 * @returns
 */
export const testApi = (values: TTestPayloadData): Promise<any> => {
  return API.post("", values);
};

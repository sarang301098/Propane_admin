import { API } from "../../middleware/middleware";

export const getUser = (): Promise<any> => {
  return API.get("/users/type/all", { params: { userType: "user" } });
};

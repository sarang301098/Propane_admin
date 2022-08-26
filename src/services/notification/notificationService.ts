import { API } from "../../middleware/middleware";

const getSentNotification = (
  page: number,
  perPage: number,
  isAdmin: boolean,
  search?: string
) => {
  // if (type) {
  //   return API.get("http://localhost:5000/notificationReceived", {
  //     params: { page, perPage, type },
  //   });
  // }
  // return API.get("http://localhost:5000/notificationSent", {
  //   params: { page, perPage },
  // });
  return API.get("/notifications", {
    params: { page, perPage, isAdmin, search: search || undefined },
  });
};

const deleteNotification = (notificationIds: number[]) => {
  return API.post("/notifications/delete", {
    notificationIds,
  });
};

const sendNotification = (
  customerIds: string[],
  notificationMessage: string,
  notifyto: string
): Promise<any> => {
  return API.post("/notifications", {
    notifyto,
    title: "Hello",
    message: notificationMessage,
    notifyIds: customerIds?.length ? customerIds : undefined,
  });
};

const updateNotification = (
  notificationIds: (string | number)[],
  status: string
) => {
  return API.patch("/notifications/read", {
    readedOption: status,
    notificationIds,
  });
};

const getNotifiedUsersSuccess = (userIds: string[]): Promise<any> => {
  return API.patch("/notifications/all/tousers", { userIds });
};

export {
  getSentNotification,
  deleteNotification,
  sendNotification,
  updateNotification,
  getNotifiedUsersSuccess,
};

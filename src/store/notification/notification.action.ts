import { action } from "typesafe-actions";
import NotificationActionTypeEnum from "./notification.enum";
import { TNotificationPayload } from "./notification.types";

const getNotificationSuccess = (payload: {
  notifications: {
    count: number;
    notifications: TNotificationPayload[];
    unreadNotificaionCount: number;
  };
  isHeader?: boolean;
}) => action(NotificationActionTypeEnum.GET_NOTIFICATION_SUCCESS, payload);

const getNotificationPending = (payload?: boolean) =>
  action(NotificationActionTypeEnum.GET_NOTIFICATION_PENDING, payload);

const getNotificationFailed = () =>
  action(NotificationActionTypeEnum.GET_NOTIFICATION_FAILED);

const getNotifiedUsersPending = () =>
  action(NotificationActionTypeEnum.GET_NOTIFIED_USERS_PENDING);

const getNotifiedUsersFailed = () =>
  action(NotificationActionTypeEnum.GET_NOTIFIED_USERS_FAILED);

const getNotifiedUsersSuccess = (
  payload: {
    id: string;
    fullName: string;
    deletedAt: string;
  }[]
) => action(NotificationActionTypeEnum?.GET_NOTIFIED_USERS_SUCCESS, payload);

const sendNotificationSuccess = (payload: {
  notification: TNotificationPayload;
  itemsPerPage: number;
}) => action(NotificationActionTypeEnum.SEND_NOTIFICATION_SUCCESS, payload);

const sendNotificationPending = () =>
  action(NotificationActionTypeEnum.SEND_NOTIFICATION_PENDING);

const sendNotificationFailed = () =>
  action(NotificationActionTypeEnum.SEND_NOTIFICATION_FAILED);

const deleteNotificationSuccess = (payload: {
  notificationIds: number[];
  getAction?: Function;
}) => action(NotificationActionTypeEnum.DELETE_NOTIFICATION_SUCCESS, payload);

const deleteNotificationPending = () =>
  action(NotificationActionTypeEnum.DELETE_NOTIFICATION_PENDING);

const deleteNotificationFailed = () =>
  action(NotificationActionTypeEnum.DELETE_NOTIFICATION_FAILED);

const updateNotificationSuccess = (payload: {
  notificationIds: (string | number)[];
  status: string;
  userId: string;
}) => action(NotificationActionTypeEnum.UPDATE_NOTIFICATION_SUCCESS, payload);

const updateNotificationFailed = () =>
  action(NotificationActionTypeEnum.UPDATE_NOTIFICATION_FAILED);

const updateNotificationPending = () =>
  action(NotificationActionTypeEnum.UPDATE_NOTIFICATION_PENDING);

export {
  getNotificationSuccess,
  getNotificationPending,
  getNotificationFailed,
  getNotifiedUsersPending,
  getNotifiedUsersFailed,
  getNotifiedUsersSuccess,
  sendNotificationSuccess,
  sendNotificationPending,
  sendNotificationFailed,
  deleteNotificationSuccess,
  deleteNotificationPending,
  deleteNotificationFailed,
  updateNotificationSuccess,
  updateNotificationFailed,
  updateNotificationPending,
};

import { ActionType } from "typesafe-actions";
import * as actions from "./notification.action";

type TNotificationPayload = {
  id: number;
  fromId: string;
  toIds: string[];
  title: string;
  description: string;
  notificationType: number;
  toUserType: string | null;
  isAdmin: boolean;
  deletedBy: string[];
  readedBy: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  isChecked: boolean;
};

type TNotificationState = {
  loading: boolean;
  notifications: {
    count: number;
    notifications: TNotificationPayload[];
    unreadNotificaionCount: number;
  };
  headerNotification: {
    count: number;
    notifications: TNotificationPayload[];
    unreadNotificaionCount: number;
  };
  notifiedUser: {
    id: string;
    fullName: string;
    deletedAt: string;
  }[];
};

type TNotificationActionType = ActionType<typeof actions>;

export { TNotificationActionType, TNotificationState, TNotificationPayload };

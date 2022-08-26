import NotificationActionTypeEnum from "./notification.enum";
import {
  TNotificationState,
  TNotificationActionType,
} from "./notification.types";

const initialState: TNotificationState = {
  loading: false,
  notifications: {
    count: 0,
    notifications: [],
    unreadNotificaionCount: 0,
  },
  headerNotification: {
    count: 0,
    notifications: [],
    unreadNotificaionCount: 0,
  },
  notifiedUser: [],
};

const notificationReducer = (
  state = initialState,
  action: TNotificationActionType
): TNotificationState => {
  switch (action.type) {
    case NotificationActionTypeEnum.GET_NOTIFICATION_PENDING:
      return {
        ...state,
        loading: !action.payload ? true : false,
      };
    case NotificationActionTypeEnum.GET_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case NotificationActionTypeEnum.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: !action.payload.isHeader
          ? action.payload?.notifications
          : state?.notifications,
        headerNotification: action.payload.isHeader
          ? action.payload?.notifications
          : state?.headerNotification,
      };
    case NotificationActionTypeEnum?.DELETE_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case NotificationActionTypeEnum.DELETE_NOTIFICATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case NotificationActionTypeEnum.DELETE_NOTIFICATION_SUCCESS:
      const deletedNotification = [
        ...state?.notifications?.notifications,
      ]?.filter(
        (notification) =>
          !(action?.payload?.notificationIds || [])?.includes(notification.id)
      );

      return {
        ...state,
        loading: action?.payload?.getAction ? true : false,
        notifications: {
          ...state?.notifications,
          count:
            state?.notifications?.count -
            action?.payload?.notificationIds?.length,
          notifications: deletedNotification,
        },
      };
    case NotificationActionTypeEnum.SEND_NOTIFICATION_SUCCESS:
      const cloneNotifications = [...state?.notifications?.notifications];
      if (cloneNotifications?.length < action.payload.itemsPerPage) {
        cloneNotifications.push(action.payload.notification);
      }
      return {
        ...state,
        loading: false,
        notifications: {
          ...state?.notifications,
          count: state?.notifications?.count + 1,
          notifications: cloneNotifications,
        },
      };
    case NotificationActionTypeEnum.SEND_NOTIFICATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case NotificationActionTypeEnum.SEND_NOTIFICATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case NotificationActionTypeEnum.UPDATE_NOTIFICATION_SUCCESS:
      const notificationIds = action.payload?.notificationIds;
      const headerNotification = [...state.headerNotification.notifications];
      const notifications = [...state.notifications.notifications];
      if (action?.payload?.status === "read") {
        headerNotification?.map((notification) => {
          if ((notificationIds || [])?.includes(notification?.id)) {
            notification.readedBy = [
              ...notification.readedBy,
              action.payload.userId,
            ];
          }
          return notification;
        });
        notifications?.map((notification) => {
          if ((notificationIds || [])?.includes(notification?.id)) {
            if (!notification?.readedBy?.includes(action?.payload?.userId)) {
              state.headerNotification.unreadNotificaionCount -= 1;
              notification.readedBy = [
                ...notification.readedBy,
                action.payload.userId,
              ];
            }
          }
          return notification;
        });
      } else {
        headerNotification?.map((notification) => {
          if ((notificationIds || [])?.includes(notification?.id)) {
            const userIdIndex = notification?.readedBy?.findIndex(
              (userId) => userId === action?.payload?.userId
            );
            if (userIdIndex > -1) {
              notification.readedBy?.splice(userIdIndex, 1);
            }
          }
          return notification;
        });
        notifications?.map((notification) => {
          if ((notificationIds || [])?.includes(notification?.id)) {
            const userIdIndex = notification?.readedBy?.findIndex(
              (userId) => userId === action?.payload?.userId
            );
            if (userIdIndex > -1) {
              notification.readedBy?.splice(userIdIndex, 1);
              state.headerNotification.unreadNotificaionCount += 1;
            }
          }
          return notification;
        });
      }
      return {
        ...state,
        loading: false,
        headerNotification: {
          ...state?.headerNotification,
          notifications: headerNotification,
        },
        notifications: {
          ...state?.notifications,
          notifications: notifications,
        },
      };

    case NotificationActionTypeEnum.GET_NOTIFIED_USERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case NotificationActionTypeEnum.GET_NOTIFIED_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifiedUser: action.payload,
      };
    case NotificationActionTypeEnum.GET_NOTIFIED_USERS_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;

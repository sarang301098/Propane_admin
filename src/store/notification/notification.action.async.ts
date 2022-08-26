import * as requestFromServer from "../../services/notification/notificationService";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  deleteNotificationFailed,
  deleteNotificationPending,
  deleteNotificationSuccess,
  getNotificationFailed,
  getNotificationPending,
  getNotificationSuccess,
  getNotifiedUsersFailed,
  getNotifiedUsersPending,
  getNotifiedUsersSuccess,
  sendNotificationFailed,
  sendNotificationPending,
  sendNotificationSuccess,
  updateNotificationFailed,
  updateNotificationPending,
  updateNotificationSuccess,
} from "./notification.action";
import { errorToast, successToast } from "../../components/toast/toast";

export const getNotificationActionThunk = (
  page: number,
  perPage: number,
  isAdmin: boolean,
  search?: string,
  isHeader?: boolean
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getNotificationPending(isHeader));
    requestFromServer
      .getSentNotification(page, perPage, isAdmin, search)
      .then((res) => {
        dispatch(getNotificationSuccess({ notifications: res.data, isHeader }));
      })
      .catch((err) => {
        errorToast(err?.response?.data?.message || "Something went wrong");
        dispatch(getNotificationFailed());
      });
  };
};

export const deleteNotificationActionThunk = (
  notificationIds: number[],
  getAction?: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(deleteNotificationPending());

    requestFromServer
      .deleteNotification(notificationIds)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          dispatch(deleteNotificationSuccess({ notificationIds, getAction }));
          successToast("Notification deleted successfully");
          getAction && getAction();
        } else {
          dispatch(deleteNotificationFailed());
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        dispatch(deleteNotificationFailed());
        errorToast(err?.response?.message?.data || "Something went wrong");
      });
  };
};

export const sendNotificationActionThunk = (
  customerIds: string[],
  notificationMessage: string,
  notifyTo: string,
  itemsPerPage: number,
  redirect: Function
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(sendNotificationPending());
    requestFromServer
      .sendNotification(customerIds, notificationMessage, notifyTo)
      .then((res) => {
        dispatch(
          sendNotificationSuccess({
            notification: res.data?.notification,
            itemsPerPage,
          })
        );
        successToast("Notification sent successfully");
        redirect && redirect();
      })
      .catch((err) => {
        dispatch(sendNotificationFailed());
        errorToast(err?.response?.message?.data || "Something went wrong");
      });
  };
};

export const updateNotificationActionThunk = (
  notificationIds: (string | number)[],
  status: string,
  userId: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(updateNotificationPending);
    requestFromServer
      .updateNotification(notificationIds, status)
      .then((res) => {
        dispatch(
          updateNotificationSuccess({ notificationIds, status, userId })
        );
        successToast("Notification updated successfully");
      })
      .catch((err) => {
        dispatch(updateNotificationFailed());
        errorToast(err?.response?.message?.data || "Something went wrong");
      });
  };
};

export const getNotifiedUsersActionThunk = (
  userIds: string[]
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getNotifiedUsersPending());
    requestFromServer
      .getNotifiedUsersSuccess(userIds)
      .then((res) => {
        dispatch(getNotifiedUsersSuccess(res.data?.users || []));
      })
      .catch((err) => {
        dispatch(getNotifiedUsersFailed());
      });
  };
};

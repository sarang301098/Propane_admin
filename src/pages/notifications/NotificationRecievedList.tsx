//TODO: I will use commented code when API is ready
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { BarsLoader } from "../../components/loader/Loader";
import {
  deleteNotificationActionThunk,
  updateNotificationActionThunk,
} from "../../store/notification/notification.action.async";
import TRootState from "../../store/root.types";
import ViewModal from "./ViewModal";
import { TNotificationPayload } from "../../store/notification/notification.types";
interface Prop {
  getAction: Function;
}

const SelectNotification = [
  { value: "read", label: "Mark as Read" },
  { value: "un_read", label: "Mark as Unread" },
];

const NotificationRecievedList: React.FC<Prop> = ({ getAction }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const loading = useSelector(
    (state: TRootState) => state?.notification?.loading
  );
  const { notifications, count } = useSelector(
    (state: TRootState) => state?.notification?.notifications
  );
  const userId = useSelector(
    (state: TRootState) => state?.profile?.profileData?.id
  );

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [receivedNotifications, setReceivedNotifications] = useState(
    notifications
  );
  const [selectedNotification, setSelectedNotification] = useState<number[]>(
    []
  );
  const [
    viewNotification,
    setViewNotification,
  ] = useState<null | TNotificationPayload>(null);
  const [filter, setFilter] = useState("All");
  const [show, setShow] = useState(false);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    let notificationsClone = _.cloneDeep(notifications);
    if (id === "default") {
      notificationsClone = notificationsClone?.map((notification) => ({
        ...notification,
        isChecked: checked,
      }));
      setSelectedNotification(
        receivedNotifications?.map((notification) => notification.id)
      );
    } else {
      notificationsClone = receivedNotifications.map((notification) =>
        notification?.id === Number(id)
          ? { ...notification, isChecked: checked }
          : notification
      );
      if (!(selectedNotification || [])?.includes(Number(id)) && checked) {
        selectedNotification?.push(Number(id));
        setSelectedNotification(selectedNotification);
      } else {
        selectedNotification?.splice(Number(id) - 1, 1);
        setSelectedNotification(selectedNotification);
      }
    }
    setReceivedNotifications(notificationsClone);
  };

  useEffect(() => {
    if (notifications) {
      setReceivedNotifications(
        notifications
          ?.filter((notification) => !notification?.isAdmin)
          ?.map((notification) => ({
            ...notification,
            isChecked: false,
          }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  const handleDelete = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    selectedNotification?.length &&
      dispatch(
        deleteNotificationActionThunk(
          selectedNotification,
          isLastPage ? getAction : undefined
        )
      );
    setSelectedNotification([]);
    hideAlert();
  };

  const showAlert = () => {
    setDeleteAlert(true);
  };
  const hideAlert = () => {
    setDeleteAlert(false);
  };
  return (
    <>
      <ViewModal
        show={show}
        setShow={setShow}
        innerHtml={false}
        notification={viewNotification}
      />
      <ul className="actions top-right">
        <li className="m-l-10">
          <Select
            className="custom-select-dropdown w-175"
            value={
              filter
                ? (SelectNotification || []).find(
                    (prod) => prod.value === filter
                  ) || null
                : null
            }
            onChange={(val) => {
              setFilter((val && val.value) || "");
              selectedNotification?.length &&
                dispatch(
                  updateNotificationActionThunk(
                    selectedNotification,
                    val?.value || "read",
                    userId || ""
                  )
                );
              setSelectedNotification([]);
            }}
            placeholder="-- Notification --"
            options={SelectNotification || []}
          />
        </li>
        <li className="m-l-10">
          <button
            type="button"
            className="btn btn-danger h-35 lh-16"
            onClick={showAlert}
          >
            Remove
          </button>
        </li>
      </ul>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th className="w-50">
                <label
                  className="control control-outline control-primary control--checkbox m-0"
                  htmlFor="default"
                >
                  <input
                    type="checkbox"
                    id="default"
                    checked={
                      receivedNotifications?.length === 0
                        ? false
                        : receivedNotifications?.filter(
                            (notification) => notification?.isChecked === false
                          ).length === 0
                    }
                    onChange={(e) => handleCheck(e)}
                  />
                  <div className="control__indicator"></div>
                </label>
              </th>
              <th>Description</th>
              <th>Date & Time</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              receivedNotifications?.length > 0 ? (
                receivedNotifications?.map((notification, index) => (
                  <tr key={notification?.id}>
                    <td>
                      <label
                        className="control control-outline control-primary control--checkbox m-0"
                        htmlFor={notification?.id?.toString()}
                      >
                        <input
                          type="checkbox"
                          id={notification?.id?.toString()}
                          checked={notification?.isChecked || false}
                          onChange={(e) => handleCheck(e)}
                        />
                        <div className="control__indicator"></div>
                      </label>
                    </td>
                    <td
                      className={
                        !(notification?.readedBy || [])?.includes(userId || "")
                          ? "font-weight-500 text-black"
                          : "text-muted"
                      }
                    >
                      {notification?.description}.{" "}
                    </td>
                    <td
                      className={
                        !(notification?.readedBy || [])?.includes(userId || "")
                          ? "font-weight-500 text-black"
                          : "text-muted"
                      }
                    >
                      {moment(notification?.createdAt)?.format(
                        "DD/MM/YYYY hh:mm A"
                      )}
                    </td>
                    <td>
                      <i
                        className="fa fa-info-circle top-1 m-l-5 m-r-5"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setViewNotification(notification);
                          setShow(true);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No records Found
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {deleteAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to change status?"
          onConfirm={hideAlert}
          onCancel={hideAlert}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={hideAlert}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={handleDelete}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </>
  );
};

export default NotificationRecievedList;

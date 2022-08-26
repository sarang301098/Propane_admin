/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */

//TODO: I will ise commented code when API is ready
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TRootState from "../../store/root.types";
import { Modal } from "react-bootstrap";
import User from "../../assets/img/user.jpg";
import { BarsLoader } from "../../components/loader/Loader";
import _ from "lodash";
import { TNotificationPayload } from "../../store/notification/notification.types";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  deleteNotificationActionThunk,
  getNotifiedUsersActionThunk,
} from "../../store/notification/notification.action.async";
import { getAllDriversActionThunk } from "../../store/drivers/drivers.actions.async";
import { getAllCustomersActionThunk } from "../../store/customer/customer.actions.async";
import { useHistory } from "react-router-dom";
import ViewModal from "./ViewModal";
import moment from "moment";

interface Prop {
  getAction: Function;
}

const NotifcationSentList: React.FC<Prop> = ({ getAction }) => {
  const dispatch = useDispatch();

  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const [showActorModal, setShowActorModal] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [sentNotifications, setSentNotifications] = useState<
    TNotificationPayload[]
  >([]);
  const [selectedNotification, setSelectedNotification] = useState<number[]>(
    []
  );
  const [
    viewNotification,
    setViewNotification,
  ] = useState<null | TNotificationPayload>(null);

  const loading = useSelector(
    (state: TRootState) => state?.notification?.loading
  );
  const { notifications, count } = useSelector(
    (state: TRootState) => state?.notification?.notifications
  );

  const { notifiedUser } = useSelector(
    (state: TRootState) => state?.notification
  );

  const handleShowActors = () => {
    setShowActorModal(true);
  };
  const handleCloseActors = () => {
    setShowActorModal(false);
  };
  const showAlert = () => {
    setDeleteAlert(true);
  };
  const hideAlert = () => {
    setDeleteAlert(false);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e?.target;
    let notificationsClone = _.cloneDeep(notifications);
    if (id === "default") {
      notificationsClone = notificationsClone.map((notification) => ({
        ...notification,
        isChecked: checked,
      }));
      setSelectedNotification(
        sentNotifications?.map((notification) => notification.id)
      );
    } else {
      notificationsClone = sentNotifications.map((notification) =>
        notification?.id === Number(id)
          ? { ...notification, isChecked: checked }
          : notification
      );
      if ((selectedNotification || [])?.includes(Number(id))) {
        selectedNotification?.splice(
          selectedNotification?.indexOf(Number(id)),
          1
        );
        setSelectedNotification(selectedNotification);
      } else {
        selectedNotification?.push(Number(id));
        setSelectedNotification(selectedNotification);
      }
    }
    setSentNotifications(notificationsClone);
  };

  useEffect(() => {
    dispatch(getAllCustomersActionThunk());
    dispatch(getAllDriversActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notifications) {
      setSentNotifications(
        notifications
          ?.filter((notification) => notification?.isAdmin)
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
                      sentNotifications?.length === 0
                        ? false
                        : sentNotifications?.filter(
                            (notification) => notification?.isChecked === false
                          ).length === 0
                    }
                    onChange={(e) => handleCheck(e)}
                  />
                  <div className="control__indicator"></div>
                </label>
              </th>
              <th>Title</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
              <th>Date & Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              sentNotifications?.length > 0 ? (
                sentNotifications?.map((notification, index) => (
                  <tr key={index}>
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
                      dangerouslySetInnerHTML={{
                        __html: notification?.title || "-",
                      }}
                    ></td>
                    {/* <td
                      dangerouslySetInnerHTML={{
                        __html: notification?.description,
                      }}
                    /> */}
                    <td
                      dangerouslySetInnerHTML={{
                        __html: notification?.title || "-",
                      }}
                    ></td>
                    <td className="text-center">
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#399AF2",
                        }}
                        onClick={() => {
                          dispatch(
                            getNotifiedUsersActionThunk(
                              notification?.toIds || []
                            )
                          );
                          handleShowActors();
                        }}
                      >
                        {notification?.toIds?.length}
                      </button>
                    </td>
                    <td>
                      {notification?.createdAt
                        ? moment(notification?.createdAt)?.format(
                            "DD/MM/YYYY hh:mm"
                          )
                        : "-"}
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

        <Modal
          centered
          scrollable
          show={showActorModal && !loading}
          onHide={handleCloseActors}
        >
          <Modal.Header className="justify-content-center">
            <h3 className="modal-title">Actors</h3>
            <button className="close" onClick={handleCloseActors}>
              <span aria-hidden="true" className="zmdi zmdi-close"></span>
            </button>
          </Modal.Header>
          <Modal.Body className="p-0">
            <ul className="list-group list-group-flush customer-list pb-0">
              {notifiedUser?.map((user) => (
                <li className="list-group-item" key={user?.id}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <img src={User} className="w-40 h-40 rounded-circle" />
                      <span className="customer-name">{user?.fullName}</span>
                    </div>
                    {user?.deletedAt && (
                      <div className="align-self-center">
                        <span className={`badge badge-pill badge-danger`}>
                          Deleted
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
              {/* <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">Peter Williams</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">John Smith</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">Peter Williams</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">John Smith</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">Peter Williams</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">John Smith</span>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex align-items-center">
                  <img src={User} className="w-40 h-40 rounded-circle" />
                  <span className="customer-name">Peter Williams</span>
                </div>
              </li> */}
            </ul>
          </Modal.Body>
        </Modal>
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
      </div>
    </>
  );
};

export default NotifcationSentList;

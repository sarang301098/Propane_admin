/* eslint-disable jsx-a11y/alt-text */
//TODO: I will use commented code when API is ready
import React from "react";
import Notifications from "./list";
import { useSelector, useDispatch } from "react-redux";
import { getNotificationActionThunk } from "../../store/notification/notification.action.async";
import TRootState from "../../store/root.types";
import Pagination from "../../components/pagination/Pagination";
import NotifcationSentList from "./NotifcationSentList";

const NotificationSent = () => {
  const dispatch = useDispatch();
  const itemsPerpage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const count = useSelector(
    (state: TRootState) => state?.notification?.notifications?.count
  );

  return (
    <Notifications>
      {(search, page, setPage) => {
        const fetchNotifications = (pageNumber?: number) => {
          dispatch(
            getNotificationActionThunk(
              pageNumber || page,
              itemsPerpage,
              true,
              search
            )
          );
        };
        return (
          <div className="tab-pane fadeIn active" id="tab-1">
            <Pagination
              dispatchAction={fetchNotifications}
              setPage={setPage}
              page={page}
              pageCount={count || 1}
              ItemsComponent={NotifcationSentList}
            />
          </div>
        );
      }}
    </Notifications>
  );
};

export default NotificationSent;

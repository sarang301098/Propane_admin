//TODO: I will use commented code when API is ready
import React from "react";
import Pagination from "../../components/pagination/Pagination";
import Notifications from "./list";
import { useSelector, useDispatch } from "react-redux";
import TRootState from "../../store/root.types";
import NotificationRecievedList from "./NotificationRecievedList";
import { getNotificationActionThunk } from "../../store/notification/notification.action.async";

const NotificationRecieved = () => {
  const dispatch = useDispatch();
  const itemsPerpage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const count = useSelector(
    (state: TRootState) => state?.notification?.notifications.count
  );
  return (
    <Notifications>
      {(search, page, setPage) => {
        const fetchNotifications = (pageNumber?: number) => {
          dispatch(
            getNotificationActionThunk(
              pageNumber || page,
              itemsPerpage,
              false,
              search
            )
          );
        };
        return (
          <div className="tab-pane fadeIn active" id="tab-1">
            <Pagination
              page={page}
              setPage={setPage}
              pageCount={count || 1}
              ItemsComponent={NotificationRecievedList}
              dispatchAction={fetchNotifications}
            />
          </div>
        );
      }}
    </Notifications>
  );
};

export default NotificationRecieved;

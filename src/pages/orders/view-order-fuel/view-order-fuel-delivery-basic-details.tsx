import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveLocation from "../../../components/Map/LiveLocation";
import { getDriverLocationActionThunk } from "../../../store/drivers/drivers.actions.async";
import TRootState from "../../../store/root.types";
// import { useSelector } from "react-redux";

// import TRootState from "../../../store/root.types";
import ViewOrderFuelDelivery from "./view-order-fuel-delivery";

const ViewOrderFuelDeliveryBasicDetails = () => {
  const dispatch = useDispatch();

  const orderById = useSelector(
    (state: TRootState) => state?.orders?.orderById
  );

  const driverLocation = useSelector(
    (state: TRootState) => state?.drivers?.driverLocation
  );

  const [showMap, setShowMap] = useState(false);
  const [markers, setShowMarkers] = useState<
    null | { lat: number | string; lng: number | string }[]
  >(null);

  const [fetchLatLong, setFetchLatLong] = useState<NodeJS.Timer | undefined>();

  return (
    <ViewOrderFuelDelivery>
      <div className="tab-pane fadeIn active" id="tab-1">
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12 col-xl-8">
              <ul className="list-unstyled text-left row mb-0">
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Customer Name</label>
                  <br /> {orderById?.order?.order?.user?.fullName || "-"}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Email </label>
                  <br /> {orderById?.order?.order?.user?.email || "-"}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Mobile Number</label>
                  <br />{" "}
                  {orderById?.order?.order?.user?.countryCode &&
                  orderById?.order?.order?.user?.mobileNumber
                    ? `${orderById?.order?.order?.user?.countryCode} ${orderById?.order?.order?.user?.mobileNumber} `
                    : "-"}{" "}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Zip Code </label>
                  <br />{" "}
                  {orderById?.order?.order?.user?.address?.length
                    ? orderById?.order?.order?.user?.address
                        ?.map((address) => address?.zipCode?.zipcode)
                        ?.join(", ")
                    : "-"}{" "}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Created On </label>
                  <br />{" "}
                  {orderById?.order?.createdAt
                    ? moment(orderById?.order?.createdAt)?.format("DD/MM/YYYY")
                    : "-"}{" "}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">
                    Order Delivery Date & Time Slot
                  </label>
                  <br />{" "}
                  {orderById?.order?.scheduleDate
                    ? moment(orderById?.order?.scheduleDate)?.format(
                        "DD/MM/YYYY - hh:mm"
                      )
                    : "-"}{" "}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Payment Mode</label>
                  <br /> Online
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Promocode</label>
                  <br /> {orderById?.order?.promocodes || "-"}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Delivery Location</label>
                  <br /> {orderById?.order?.order?.address || "-"}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">
                    Location of Where to Deliver{" "}
                  </label>
                  <br /> {orderById?.order?.location?.name || "-"}{" "}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Cancellation Reason</label>
                  <br /> {}
                  {orderById?.order?.cancellationReasonOther
                    ? orderById?.order?.cancellationReasonOther
                    : orderById?.order?.cancellationReasonId
                    ? orderById?.order?.cancellationReason?.id
                      ? orderById?.order?.cancellationReason?.reason
                      : "-"
                    : "-"}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Truck Location </label>
                  <br />
                  {orderById?.order?.order?.lat &&
                  orderById?.order?.order?.long ? (
                    <button
                      className="simple-btn"
                      onClick={() => {
                        setShowMap(true);
                        orderById?.order?.driver?.id &&
                          setFetchLatLong(
                            setInterval(() => {
                              dispatch(
                                getDriverLocationActionThunk(
                                  orderById?.order?.driver?.id
                                )
                              );
                              setShowMarkers([
                                {
                                  lat: driverLocation?.lat
                                    ? +driverLocation?.lat
                                    : "",
                                  lng: driverLocation?.long
                                    ? +driverLocation?.long
                                    : "",
                                },
                              ]);
                            }, 5000)
                          );
                        setShowMarkers([
                          {
                            lat: orderById?.order?.order?.lat
                              ? parseFloat(
                                  orderById?.order?.order?.lat?.toString()
                                )
                              : "",
                            lng: orderById?.order?.order?.long
                              ? parseFloat(
                                  orderById?.order?.order?.long?.toString()
                                )
                              : "",
                          },
                        ]);
                      }}
                    >
                      <i className="icons dripicons-location"></i>
                    </button>
                  ) : (
                    "-"
                  )}
                </li>
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Membership </label>
                  <br />{" "}
                  {orderById?.order?.order?.user?.userSubscriptionCount &&
                  orderById?.order?.order?.user?.userSubscriptionCount > 0 ? (
                    <span className="text-info">Paid</span>
                  ) : (
                    <span className="text-success">Free</span>
                  )}{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <LiveLocation
        showMap={showMap}
        setShowMap={setShowMap}
        fetchLatLong={fetchLatLong}
        markers={markers}
      />
    </ViewOrderFuelDelivery>
  );
};

export default ViewOrderFuelDeliveryBasicDetails;

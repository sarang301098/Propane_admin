import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

import TRootState from "../../../store/root.types";
import { BarsLoader } from "../../../components/loader/Loader";
import OrderStatus from "../../../components/orderStatus/OrderStatus";
import { convertTo12 } from "../../../utils/helpers/timeConvert";
import { AppendedMyComponent } from "../../../components/appendToBody/appendToBody";
import {
  cancelOrderActionThunk,
  rescheduleOrderActionThunk,
  getRescheduleSlotOrderActionThunk,
} from "../../../store/orders/orders.actions.async";
import SingleDatePickerComp from "../../../components/single-date-picker/single-datepicker";
import { getDriverLocationActionThunk } from "../../../store/drivers/drivers.actions.async";
import LiveLocation from "../../../components/Map/LiveLocation";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
  getAction: Function;
}

const AllOrdersFuelList: React.FC<Prop> = ({
  setFilter,
  filter,
  setFilterBy,
  getAction,
}) => {
  const dispatch = useDispatch();

  const rescheduleTimeSlots = useSelector(
    (state: TRootState) => state.orders.rescheduleTimeSlots
  );
  const ordersFuel = useSelector(
    (state: TRootState) => state.orders.orderFuelData
  );
  const loading = useSelector((state: TRootState) => state.orders.loading);
  const driverLocation = useSelector(
    (state: TRootState) => state?.drivers?.driverLocation
  );

  const [showMap, setShowMap] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState("");
  const [rescheduleError, setRescheduleError] = useState("");
  const [rescheduleTimeSlotError, setRescheduleTimeSlotError] = useState("");
  const [orderId, setOrderId] = useState<string | number>("");
  const [vendorId, setVendorId] = useState<string | number>("");
  const [rescheduleDate, setRescheduleDate] = useState<
    moment.Moment | undefined
  >();
  const [timeSlot, setTimeSlot] = useState<string | number>("");
  const [markers, setShowMarkers] = useState<
    null | { lat: number | string; lng: number | string }[]
  >(null);
  const [fetchLatLong, setFetchLatLong] = useState<NodeJS.Timer | undefined>();

  /**
   * cancel order handler
   */
  const cancelOrderSubmitHandler = () => {
    if (cancelReason === "") {
      setCancelError("Please enter the cancellation reason");
    } else if (cancelReason.length > 255) {
      setCancelError("Exceeds maximum length limit of 255 characters");
    } else {
      setCancelReason("");
      setCancelError("");
      dispatch(
        cancelOrderActionThunk(
          cancelReason,
          "cancelled_by_admin",
          orderId,
          getAction
        )
      );
      setShowCancelOrder(false);
    }
  };

  /**
   * reschedule order handler
   */
  const rescheduleOrderSubmitHandler = () => {
    if (!rescheduleDate) {
      setRescheduleError("Please select date");
    } else if (!timeSlot) {
      setRescheduleTimeSlotError("Please select time");
    } else {
      setRescheduleError("");
      setRescheduleTimeSlotError("");
      setRescheduleDate(undefined);
      dispatch(
        rescheduleOrderActionThunk(orderId, timeSlot, rescheduleDate, getAction)
      );
      setShowReschedule(false);
    }
  };

  return (
    <>
      <div className="table-responsive table-th-td-fix">
        <table className="table table-hover nowrap m-0">
          <thead>
            <tr>
              <th className="sticky-col first-col">Order Id</th>
              <th className="sticky-col second-col table-field-status text-left">
                Status
              </th>
              <th className="sticky-col third-col text-nowrap">Created On</th>
              <th className="sticky-col fourth-col sorting">
                <span
                  onClick={() => {
                    filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                    setFilterBy("customer");
                  }}
                >
                  Customer Name
                </span>
              </th>
              <th>Order Delivery Date & Time Slot</th>
              <th>Delivery Location</th>
              <th className="sorting">
                <span
                  onClick={() => {
                    filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                    setFilterBy("driver");
                  }}
                >
                  Driver Name
                </span>
              </th>
              <th className="text-center">Truck Location</th>
              <th className="sorting">
                <span
                  onClick={() => {
                    filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                    setFilterBy("vendor");
                  }}
                >
                  Vendor Name
                </span>
              </th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : ordersFuel.orders && ordersFuel.orders.length > 0 ? (
              ordersFuel.orders.map((order) => (
                <tr key={order?.id}>
                  <td className="sticky-col first-col">{order?.id}</td>
                  <td className="sticky-col second-col table-field-status text-left">
                    <OrderStatus status={order?.status} />
                  </td>
                  <td className="sticky-col third-col">
                    {moment(order?.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="sticky-col fourth-col text-nowrap">
                    {order?.customerName}
                  </td>
                  <td>
                    {moment(order?.scheduleDate).format("DD/MM/YYYY")}{" "}
                    {order?.startTime ? convertTo12(order?.startTime) : null} -{" "}
                    {order?.endTime ? convertTo12(order?.endTime) : null}
                  </td>
                  <td>{order?.address}</td>

                  {order?.driverName ? (
                    <td className="text-nowrap">{order?.driverName}</td>
                  ) : (
                    <td className="text-center">-</td>
                  )}

                  <td className="text-center">
                    <button
                      className="simple-btn "
                      onClick={() => {
                        setShowMap(true);
                        order?.driverId &&
                          setFetchLatLong(
                            setInterval(() => {
                              dispatch(
                                getDriverLocationActionThunk(order?.driverId)
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
                            lat: order?.lat
                              ? parseFloat(order?.lat?.toString())
                              : "",
                            lng: order?.long
                              ? parseFloat(order?.long?.toString())
                              : "",
                          },
                        ]);
                      }}
                    >
                      <i className="icons dripicons-location"></i>
                    </button>
                  </td>
                  {order?.vendorName ? (
                    <td className="text-nowrap">{order?.vendorName}</td>
                  ) : (
                    <td className="text-center">-</td>
                  )}
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          // onClick={() => setOrderId(fuel.OrderId)}
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to={`/orders/view-fuel-delivery/${order?.id}/basic-details`}
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                            View
                          </Dropdown.Item>

                          {[
                            "ongoing",
                            "pending",
                            "refilled",
                            "rescheduled",
                          ].includes(order?.status) ? (
                            <Dropdown.Item
                              href="#"
                              onClick={() => {
                                setShowReschedule(true);
                                setVendorId(order?.vendorId);
                                setOrderId(order?.id);
                              }}
                            >
                              <i className="fa fa-check fa-fw text-accent-custom"></i>{" "}
                              Reschedule
                            </Dropdown.Item>
                          ) : null}

                          {["cancelled", "cancelled_by_admin"].includes(
                            order?.status
                          ) ? (
                            <Dropdown.Item href="#">
                              <i className="far fa-check-circle fa-fw text-accent-custom"></i>{" "}
                              Refund
                            </Dropdown.Item>
                          ) : null}
                          {[
                            "ongoing",
                            "pending",
                            "refilled",
                            "rescheduled",
                          ].includes(order?.status) ? (
                            <Dropdown.Item
                              href="#"
                              onClick={() => {
                                setShowCancelOrder(true);
                                setOrderId(order?.id);
                              }}
                            >
                              <i className="fa fa-times fa-fw text-accent-custom"></i>{" "}
                              Cancel
                            </Dropdown.Item>
                          ) : null}
                        </Dropdown.Menu>
                      </AppendedMyComponent>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} style={{ textAlign: "center" }}>
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <LiveLocation
        showMap={showMap}
        setShowMap={setShowMap}
        fetchLatLong={fetchLatLong}
        markers={markers}
      />
      {/* <Modal
        centered
        size="lg"
        show={showMap}
        onHide={() => {
          fetchLatLong && clearInterval(fetchLatLong);
          setShowMap(false);
        }}
      >
        <Modal.Header>
          <h4 className="modal-title">Truck Location</h4>
          <button
            className="close"
            onClick={() => {
              fetchLatLong && clearInterval(fetchLatLong);
              setShowMap(false);
            }}
          >
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <CustomMap markers={markers ? markers : []} />
        </Modal.Body>
      </Modal> */}
      <Modal centered show={showCancelOrder}>
        <Modal.Header>
          <h4 className="modal-title">Add Cancellation Reason</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Reason <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              rows={4}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            ></textarea>
            <span className="text-danger">
              {cancelReason === "" || cancelReason.length > 255
                ? cancelError
                : null}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowCancelOrder(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={cancelOrderSubmitHandler}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        centered
        scrollable
        show={showReschedule}
        className={"custom-modal"}
      >
        <Modal.Header>
          <h4 className="modal-title">Select Reschedule Date</h4>
          <button className="close" onClick={() => setShowReschedule(false)}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        {/* <form onSubmit={formik.handleSubmit}> */}
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Select Date <span className="text-danger">*</span>
            </label>
            <div className="input-group inner-page-date d-flex">
              <SingleDatePickerComp
                setDate={(date: any) => {
                  setRescheduleDate(date);

                  dispatch(
                    getRescheduleSlotOrderActionThunk([vendorId] || [], date)
                  );
                }}
                date={rescheduleDate}
              />
              <br />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="icon dripicons-calendar"></i>
                </span>
              </div>
            </div>
            <span className="text-danger">
              {!rescheduleDate ? rescheduleError : null}
            </span>
          </div>
          <div className="form-group">
            <label className="control-label">
              Select Time <span className="text-danger">*</span>
            </label>
            <div>
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <BarsLoader />
                </div>
              ) : rescheduleDate &&
                rescheduleTimeSlots &&
                rescheduleTimeSlots.length > 0 ? (
                rescheduleTimeSlots.map((time, index) => (
                  <div key={time?.id}>
                    <label
                      className="control control-outline d-inline-block control-primary control--radio mb-2 mr-3"
                      htmlFor={(time?.id || index) as string}
                    >
                      <input
                        type="radio"
                        id={(time?.id || index) as string}
                        value={time?.id}
                        name="slots"
                        checked={+timeSlot === time?.id}
                        onChange={(event) => setTimeSlot(event.target.value)}
                      />
                      {convertTo12(time.startTime)} -{" "}
                      {convertTo12(time.endTime)}
                      <div className="control__indicator"></div>
                    </label>
                    <br />
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center" }}>No data found</div>
              )}
            </div>

            <span className="text-danger">
              {!timeSlot ? rescheduleTimeSlotError : null}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setShowReschedule(false)}
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            type="button"
            onClick={rescheduleOrderSubmitHandler}
          >
            Reschedule
          </button>
        </Modal.Footer>
        {/* </form> */}
      </Modal>
    </>
  );
};

export default AllOrdersFuelList;

import moment from "moment";
import React, { useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getRescheduleSlotOrderActionThunk,
  rescheduleOrderActionThunk,
} from "../../store/orders/orders.actions.async";
import TRootState from "../../store/root.types";
import { convertTo12 } from "../../utils/helpers/timeConvert";
import { AppendedMyComponent } from "../appendToBody/appendToBody";
import { BarsLoader } from "../loader/Loader";
import OrderStatus from "../orderStatus/OrderStatus";
import SingleDatePickerComp from "../single-date-picker/single-datepicker";

interface Prop {
  filter: string;
  setFilter: Function;
  getAction: Function;
}

const ViewVendorFuelDeliveryList: React.FC<Prop> = ({
  filter,
  setFilter,
  getAction,
}) => {
  const dispatch = useDispatch();

  const { vendorId } = useParams<{ vendorId: string }>();

  const loading = useSelector((state: TRootState) => state?.vendor?.loading);

  const { orders } = useSelector(
    (state: TRootState) => state?.vendor?.vendorOrders
  );
  const rescheduleTimeSlots = useSelector(
    (state: TRootState) => state.orders.rescheduleTimeSlots
  );

  const [sweetAlert, setSweetAlert] = useState(false);
  const [orderId, setOrderId] = useState<string | number>("");
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<
    moment.Moment | undefined
  >();
  const [rescheduleError, setRescheduleError] = useState("");
  const [rescheduleTimeSlotError, setRescheduleTimeSlotError] = useState("");
  const [timeSlot, setTimeSlot] = useState<string | number>("");

  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };

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
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Order Id</th>
            <th className="table-field-status text-left">Status</th>
            <th className="text-nowrap">Created On</th>
            <th className="sorting">
              <span
                onClick={() => {
                  setFilter((prev: { sort: string; sortBy: string }) => ({
                    sort:
                      prev.sort === "ASC" && prev.sortBy === "customer"
                        ? "DESC"
                        : "ASC",
                    sortBy: "customer",
                  }));
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
                  setFilter((prev: { sort: string; sortBy: string }) => ({
                    sort:
                      prev.sort === "ASC" && prev.sortBy === "driver"
                        ? "DESC"
                        : "ASC",
                    sortBy: "driver",
                  }));
                }}
              >
                Driver Name
              </span>
            </th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <BarsLoader />
          ) : orders?.length ? (
            orders.map((order) => (
              <tr key={order?.id}>
                <td>{order?.id}</td>
                <td className="table-field-status text-left">
                  <OrderStatus status={order?.status} />
                </td>
                <td>
                  {order.createdAt
                    ? moment(order.createdAt).format("DD/MM/YYYY")
                    : "-"}
                </td>
                <td className="text-nowrap">{order?.userName}</td>
                <td>
                  {order.scheduleDate
                    ? moment(order.scheduleDate).format("DD/MM/YYYY")
                    : "-"}{" "}
                  <br />{" "}
                  {order?.startTime && order?.endTime
                    ? moment(order?.startTime, "hh:mm A").format("hh:mm A") +
                      " - " +
                      moment(order?.endTime, "hh:mm A").format("hh:mm A")
                    : "-"}
                </td>
                <td className={!order?.address ? "text-center" : ""}>
                  {order?.address || "-"}{" "}
                </td>
                <td className={`text-nowrap`}>{order?.driverName || "-"}</td>
                <td className="table-field-actions">
                  <Dropdown className="btn-group">
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="btn btn-sm btn-icon-only"
                    >
                      <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                    </Dropdown.Toggle>
                    <AppendedMyComponent>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={{
                            pathname: `/orders/view-fuel-delivery/${order.id}/basic-details`,
                          }}
                        >
                          <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                          View
                        </Dropdown.Item>
                        <Dropdown.Item href="#" onClick={() => showAlert()}>
                          <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                          Delete
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
                              setOrderId(order?.id);
                            }}
                          >
                            <i className="fa fa-check fa-fw text-accent-custom"></i>{" "}
                            Reschedule
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
              <td colSpan={8} style={{ textAlign: "center" }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {sweetAlert && (
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
              <button className="btn btn-danger min-w-100" onClick={hideAlert}>
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
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
    </div>
  );
};

export default ViewVendorFuelDeliveryList;

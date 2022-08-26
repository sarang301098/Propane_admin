import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "react-bootstrap-sweetalert";

import TRootState from "../../../store/root.types";
import { BarsLoader } from "../../../components/loader/Loader";
import { getOrderIdAction } from "../../../store/orders/orders.action";
import OrderStatus from "../../../components/orderStatus/OrderStatus";
import moment from "moment";
import { AppendedMyComponent } from "../../../components/appendToBody/appendToBody";

interface Prop {
  setFilter: Function;
}

const DriverViewOrdersDetailsFuelList: React.FC<Prop> = ({ setFilter }) => {
  const dispatch = useDispatch();

  const [deleteOrder, setDeleteOrder] = useState(false);
  const [driverOrderId, setDriverOrderId] = useState("");

  const driverOrdersFuelList = useSelector(
    (state: TRootState) => state.drivers.driverOrdersList
  );
  const loading = useSelector((state: TRootState) => state.drivers.loading);

  const deleteOrderHandler = () => {
    setDeleteOrder(false);
  };

  useEffect(() => {
    dispatch(getOrderIdAction(driverOrderId));
  }, [dispatch, driverOrderId]);

  return (
    <>
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
                        prev.sort === "ASC" && prev.sortBy === "vendor"
                          ? "DESC"
                          : "ASC",
                      sortBy: "vendor",
                    }));
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
                <td colSpan={8} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : driverOrdersFuelList.orders &&
              driverOrdersFuelList.orders.length > 0 ? (
              driverOrdersFuelList.orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderId}</td>
                  <td className="table-field-status text-left">
                    <OrderStatus status={order?.status} />
                  </td>
                  <td>
                    {order.createdAt
                      ? moment(order.createdAt).format("DD/MM/YYYY")
                      : "-"}
                  </td>
                  <td className="text-nowrap">{order.userName}</td>
                  <td>
                    {order.scheduleDate
                      ? moment(order.scheduleDate).format("DD/MM/YYYY")
                      : "-"}{" "}
                    <br />{" "}
                    {order?.startTime && order?.endTime
                      ? moment(order?.startTime, "hh:mm A").format("hh:mm A") +
                        "- " +
                        moment(order?.startTime, "hh:mm A").format("hh:mm A")
                      : "-"}
                  </td>
                  <td>{order.address || "-"}</td>

                  <td className="text-nowrap">{order.vendorName || "-"}</td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          onClick={() =>
                            setDriverOrderId(order.orderId?.toString())
                          }
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            href={`/orders/view-fuel-delivery/${driverOrderId}/basic-details`}
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => setDeleteOrder(true)}
                          >
                            <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item href="#">
                            <i className="fa fa-check fa-fw text-accent-custom"></i>{" "}
                            Reschedule
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </AppendedMyComponent>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No Orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <React.Fragment>
        {deleteOrder && (
          <SweetAlert
            danger
            showCancel
            title="Are you sure want to delete?"
            onConfirm={() => setDeleteOrder(false)}
            onCancel={() => setDeleteOrder(false)}
            customButtons={
              <React.Fragment>
                <button
                  className="btn btn-dark min-w-100 mr-3"
                  onClick={() => setDeleteOrder(false)}
                >
                  No
                </button>
                <button
                  className="btn btn-danger min-w-100"
                  onClick={deleteOrderHandler}
                >
                  Yes
                </button>
              </React.Fragment>
            }
          ></SweetAlert>
        )}
      </React.Fragment>
    </>
  );
};

export default DriverViewOrdersDetailsFuelList;

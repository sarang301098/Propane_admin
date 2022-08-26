import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { BarsLoader } from "../../components/loader/Loader";
import OrderStatus from "../../components/orderStatus/OrderStatus";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
}

const OrderReportsList: React.FC<Prop> = ({
  setFilter,
  filter,
  setFilterBy,
}) => {
  const orderReports = useSelector(
    (state: TRootState) => state?.reports?.orderData
  );
  const loading = useSelector((state: TRootState) => state?.reports?.loading);
  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Order Id</th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("customer");
                }}
              >
                Customer Name
              </span>
            </th>
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
            <th>Order Booked Date & Time</th>
            <th>Delivered Date & Time</th>
            <th className="text-center">Order Status</th>
            <th className="text-center">Payment Status</th>
            <th>Order Type</th>
            <th className="text-right">Admin Commission</th>
            <th className="text-right">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={11} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : orderReports?.ordersReports &&
            orderReports?.ordersReports?.length > 0 ? (
            orderReports?.ordersReports?.map((order) => (
              <tr key={order?.orderDetails_id}>
                <td>{order?.orderDetails_id ? order?.orderDetails_id : "-"}</td>
                <td>{order?.user_full_name ? order?.user_full_name : "-"}</td>
                <td>
                  {order?.vendor_full_name ? order?.vendor_full_name : "-"}
                </td>
                <td className="text-nowrap">
                  {order?.driver_full_name ? order?.driver_full_name : "-"}{" "}
                  <br />{" "}
                  {order?.driver_full_name && +order?.vendorsDriver === 0 && (
                    <small className="text-success">(Freelance)</small>
                  )}{" "}
                </td>
                <td>
                  {order?.orderDetails_created_at
                    ? moment(order?.orderDetails_created_at).format(
                        "DD/MM/YYYY"
                      )
                    : "-"}
                  <br />
                  {order?.orderDetails_created_at
                    ? moment(order?.orderDetails_created_at).format("hh:mm A")
                    : "-"}
                </td>
                <td>
                  {" "}
                  {order?.orderDetails_schedule_date
                    ? moment(order?.orderDetails_schedule_date).format(
                        "DD/MM/YYYY"
                      )
                    : "-"}
                  <br />
                  {order?.orderDetails_schedule_date
                    ? moment(order?.orderDetails_schedule_date).format(
                        "hh:mm A"
                      )
                    : "-"}
                </td>
                <td className="text-center">
                  <OrderStatus status={order?.orderDetails_status} />
                </td>
                <td className="text-center">
                  <span
                    className={
                      order?.order_is_paid ? "text-success" : "text-info"
                    }
                  >
                    {order?.order_is_paid ? "Paid" : "Pending"}
                  </span>
                </td>
                <td>
                  {order?.orderDetails_order_type === 1
                    ? "Fuel Delivery"
                    : "Propane Tank Exchange Delivery"}
                </td>
                <td className="text-center">
                  {order?.orderDetails_admin_received_amount
                    ? "$" + fixPrice(order?.orderDetails_admin_received_amount)
                    : "-"}
                </td>
                <td className="text-right">
                  {order?.orderDetails_grand_total
                    ? "$" + fixPrice(order?.orderDetails_grand_total)
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={11} style={{ textAlign: "center" }}>
                No Order reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderReportsList;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import TRootState from "../../../store/root.types";
import { BarsLoader } from "../../../components/loader/Loader";
import OrderStatus from "../../../components/orderStatus/OrderStatus";
import moment from "moment";
import { convertTo12 } from "../../../utils/helpers/timeConvert";
import { AppendedMyComponent } from "../../../components/appendToBody/appendToBody";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
}

const OrderHistoryTankList: React.FC<Prop> = ({ setFilter, filter, setFilterBy }) => {
  const ordersTank = useSelector((state: TRootState) => state.orders.orderTankData);
  const loading = useSelector((state: TRootState) => state.orders.loading);

  return (
    <>
      <div className="table-responsive table-th-td-fix propane-tank">
        <table className="table table-hover nowrap m-0">
          <thead>
            <tr>
              <th className="sticky-col first-col">Order Id</th>
              <th className="sticky-col second-col table-field-status text-left">Status</th>
              <th className="sticky-col third-col">Created On</th>
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
              <th className="sticky-col fifth-col">Category</th>
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
            ) : ordersTank.orders && ordersTank.orders.length > 0 ? (
              ordersTank.orders.map((order) => (
                <tr key={order?.id}>
                  <td className="sticky-col first-col">{order?.id}</td>
                  <td className="sticky-col second-col table-field-status text-left">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="sticky-col third-col">{moment(order?.createdAt).format("DD/MM/YYYY")}</td>
                  <td className="sticky-col fourth-col">{order?.customerName}</td>
                  <td className="sticky-col fifth-col">{order?.categoryName}</td>
                  <td>
                    {" "}
                    {moment(order?.scheduleDate).format("DD/MM/YYYY")}{" "}
                    {order?.startTime ? convertTo12(order?.startTime) : null} -{" "}
                    {order?.endTime ? convertTo12(order?.endTime) : null}
                  </td>
                  <td>{order?.address}</td>
                  {order?.driverName ? (
                    <td>
                      {order?.driverName}{" "}
                      {order.isVendorsDriver < 1 ? <small className="text-success">(Freelance)</small> : null}
                    </td>
                  ) : (
                    <td className="text-center">-</td>
                  )}

                  {order?.vendorName ? <td>{order?.vendorName}</td> : <td className="text-center">-</td>}
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle id="dropdown-basic" className="btn btn-sm btn-icon-only">
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          // onClick={() => setOrderId(tank.OrderId)}
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to={`/orders/view-propane-tank/${order?.id}/basic-details`}
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i> View
                          </Dropdown.Item>
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
    </>
  );
};

export default OrderHistoryTankList;

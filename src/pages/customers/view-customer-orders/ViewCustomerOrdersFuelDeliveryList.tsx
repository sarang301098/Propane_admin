import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

import TRootState from "../../../store/root.types";
import { BarsLoader } from "../../../components/loader/Loader";
import { AppendedMyComponent } from "../../../components/appendToBody/appendToBody";
import { convertTo12 } from "../../../utils/helpers/timeConvert";
import OrderStatus from "../../../components/orderStatus/OrderStatus";
interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
}

const ViewCustomerOrdersFuelDeliveryList: React.FC<Prop> = ({ setFilter, filter, setFilterBy }) => {
  const customerOrders = useSelector((state: TRootState) => state.customer.customerOrderFuelData);
  const loading = useSelector((state: TRootState) => state.customer.loading);

  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Order Id</th>
            <th className="table-field-status text-left">Status</th>
            <th className="text-nowrap">Created On</th>
            {/* <th className="sorting text-nowrap"><span>Customer Name</span></th> */}
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
            {/* <th className="text-center">Truck Location</th> */}
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
              <td colSpan={8} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : customerOrders.orders && customerOrders.orders.length > 0 ? (
            customerOrders.orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td className="table-field-status text-left">
                  <OrderStatus status={order.status} />
                </td>
                <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                <td>
                  {moment(order.scheduleDate).format("DD/MM/YYYY")} <br />{" "}
                  {order?.startTime ? convertTo12(order?.startTime) : null} -{" "}
                  {order?.endTime ? convertTo12(order?.endTime) : null}
                </td>
                <td>{order.address}</td>
                {order?.driverName ? (
                  <td className="text-nowrap">{order.driverName}</td>
                ) : (
                  <td className="text-center">-</td>
                )}
                {order?.vendorName ? (
                  <td className="text-nowrap">{order?.vendorName}</td>
                ) : (
                  <td className="text-nowrap text-center">-</td>
                )}
                <td className="table-field-actions">
                  <Dropdown className="btn-group">
                    <Dropdown.Toggle id="dropdown-basic" className="btn btn-sm btn-icon-only">
                      <i
                        className="icon dripicons-dots-3 zmdi-hc-fw"
                        // onClick={() => setOrderId(order.id)}
                      ></i>
                    </Dropdown.Toggle>
                    <AppendedMyComponent>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/orders/view-fuel-delivery/${order.id}/basic-details`}>
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
              <td colSpan={8} style={{ textAlign: "center" }}>
                No Customer orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomerOrdersFuelDeliveryList;

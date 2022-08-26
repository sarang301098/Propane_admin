import moment from "moment";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";

import { BarsLoader } from "../../components/loader/Loader";
import OrderStatus from "../../components/orderStatus/OrderStatus";
import TRootState from "../../store/root.types";
import { convertTo12 } from "../../utils/helpers/timeConvert";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
  getAction: Function;
}

const CompletedOrdersList: React.FC<Prop> = ({ setFilter, filter, setFilterBy, getAction }) => {
  const completedOrdersList = useSelector((state: TRootState) => state?.drivers?.completedOrdersList);
  const loading = useSelector((state: TRootState) => state?.drivers?.loading);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th>Order Id</th>
              <th className="text-nowrap">Created On</th>
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
              <th>Order Delivery Date & Time Slot</th>
              <th>Delivery Location</th>
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
              <th className="table-field-status">Status</th>
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
            ) : completedOrdersList?.orders && completedOrdersList?.orders?.length > 0 ? (
              completedOrdersList?.orders?.map((order) => (
                <tr key={order?.id}>
                  <td>{order?.id}</td>
                  <td>{moment(order?.createdAt).format("DD/MM/YYYY")}</td>
                  <td>{order?.customerName}</td>
                  <td>
                    {moment(order?.scheduleDate).format("DD/MM/YYYY")}{" "}
                    {order?.startTime ? convertTo12(order?.startTime) : null} -{" "}
                    {order?.endTime ? convertTo12(order?.endTime) : null}
                  </td>
                  <td>{order?.address}</td>
                  {order?.vendorName ? <td>{order?.vendorName}</td> : <td className="text-center">-</td>}
                  <td className="table-field-status">
                    <OrderStatus status={order?.status} />
                  </td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle id="dropdown-basic" className="btn btn-sm btn-icon-only">
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          // onClick={() => setDriverOrderId(order.orderId)}
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to={
                              order?.orderType === 1
                                ? `/orders/view-fuel-delivery/${order?.id}/basic-details`
                                : `/orders/view-propane-tank/${order?.id}/basic-details`
                            }
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i> View
                          </Dropdown.Item>
                          {/* <Dropdown.Item href="#" onClick={() => setDeleteOrder(true)}>
                          <i className="fa fa-trash-alt fa-fw text-accent-custom"></i> Delete
                        </Dropdown.Item> */}
                        </Dropdown.Menu>
                      </AppendedMyComponent>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No Drivers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CompletedOrdersList;

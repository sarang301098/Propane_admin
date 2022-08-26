import React, { useState } from "react";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import User from "../../../assets/img/user.jpg";
import { BarsLoader } from "../../../components/loader/Loader";
import TRootState from "../../../store/root.types";
import ViewOrderFuelDelivery from "./view-order-fuel-delivery";
import { useParams } from "react-router-dom";
import { getOrderByIdActionThunk } from "../../../store/orders/orders.actions.async";

const ViewOrderFuelDeliveryDriverDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams<{ orderId: string }>();

  const drivers = useSelector(
    (state: TRootState) => state?.orders?.orderById?.drivers
  );
  const loading = useSelector((state: TRootState) => state?.orders?.loading);

  const [filter, setFilter] = useState("ASC");

  return (
    <ViewOrderFuelDelivery>
      <div className="tab-pane fadeIn active" id="tab-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover m-0">
              <thead>
                <tr>
                  <th className="sorting">
                    <span
                      onClick={() => {
                        setFilter(filter === "ASC" ? "DESC" : "ASC");
                        dispatch(
                          getOrderByIdActionThunk(
                            orderId,
                            filter === "ASC" ? "DESC" : "ASC"
                          )
                        );
                      }}
                    >
                      Full Name{" "}
                    </span>
                  </th>
                  <th>License Number</th>
                  <th>Vehicle Name</th>
                  <th>Vehicle Plate No.</th>
                  <th>Vehicle Capacity</th>
                  <th>Order Type</th>
                  <th className="text-center">Completed Orders</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <BarsLoader />
                ) : drivers && drivers?.length ? (
                  drivers?.map((driver) => (
                    <tr key={driver?.id}>
                      <td>
                        <div className="media">
                          <img
                            className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                            src={User}
                            alt=""
                          />
                          <div className="media-body">
                            <h6 className="mt-1 mb-0">
                              {driver?.fullName || "-"}
                            </h6>
                            <span className="text-muted">
                              {driver?.countryCode && driver?.mobileNumber
                                ? `${driver?.countryCode} ${driver?.mobileNumber}`
                                : "-"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{driver?.driver?.licenceNo || "-"}</td>
                      <td>{driver?.driver?.driverVehicle || "-"}</td>
                      <td>{driver?.driver?.vehicalNo || "-"}</td>
                      <td>
                        {driver?.driver?.orderCapacity
                          ? `${driver?.driver?.orderCapacity} Bottles/Gallons`
                          : "-"}
                      </td>
                      <td>
                        {driver?.driver?.orderType === 1 && "Fuel Delivery"}
                        {driver?.driver?.orderType === 2 &&
                          "Propane Tank Exchange Delivery"}
                      </td>
                      <td className="text-center">
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            Object.keys(driver?.orders || {}).length ? (
                              <Tooltip id={`tooltip01`}>
                                {driver?.orders?.["1"] &&
                                  `Fuel Order - ${driver?.orders?.["1"]}`}
                                {driver?.orders?.["2"] &&
                                  `Fuel Order - ${driver?.orders?.["2"]}`}
                              </Tooltip>
                            ) : (
                              <div />
                            )
                          }
                        >
                          <span className="badge badge-light">
                            {driver?.completedOrderCount}
                          </span>
                        </OverlayTrigger>
                      </td>
                      <td>
                        {driver?.createdAt
                          ? moment(driver?.createdAt)?.format("DD/MM/YYYY")
                          : "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ViewOrderFuelDelivery>
  );
};

export default ViewOrderFuelDeliveryDriverDetails;

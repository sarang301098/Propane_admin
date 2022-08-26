import moment from "moment";
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

import User from "../../../assets/img/user.jpg";
import { BarsLoader } from "../../../components/loader/Loader";
import TRootState from "../../../store/root.types";
import ViewOrderPropaneTank from "./view-order-propane-tank";

const ViewOrderPropaneTankDriverDetails = () => {
  const drivers = useSelector(
    (state: TRootState) => state?.orders?.orderById?.drivers
  );
  const loading = useSelector((state: TRootState) => state?.orders?.loading);
  return (
    <ViewOrderPropaneTank>
      <div className="tab-pane fadeIn active" id="tab-3">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover m-0">
              <thead>
                <tr>
                  <th className="sorting">
                    <span>Full Name </span>
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
                            <h6 className="mt-1 mb-0">{driver?.fullName}</h6>
                            <span className="text-muted">
                              {" "}
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
                      <td>Fuel Delivery</td>
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
    </ViewOrderPropaneTank>
  );
};

export default ViewOrderPropaneTankDriverDetails;

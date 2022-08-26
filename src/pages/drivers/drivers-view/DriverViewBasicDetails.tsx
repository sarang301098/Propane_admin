import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import User from "../../../assets/img/user.jpg";
import DriversView from "./view";
import { useSelector } from "react-redux";
import TRootState from "../../../store/root.types";
import { BarsLoader } from "../../../components/loader/Loader";
import moment from "moment";

const DriverViewBasicDetails = () => {
  const singleDriverData = useSelector(
    (state: TRootState) => state?.drivers?.singleDriverData
  );
  const loading = useSelector((state: TRootState) => state.drivers.loading);
  return (
    <DriversView>
      {loading ? (
        <BarsLoader />
      ) : (
        <div className="tab-pane fadeIn active" id="tab-1">
          <div className="card-body">
            <div className="media">
              <img
                src={singleDriverData?.profileImage || User}
                className="align-self-start mr-5 ml-3 rounded-circle img-thumbnail o-cover"
                alt="profile"
                width="130"
                height="130"
              />
              <div className="media-body">
                <div className="row">
                  <div className="col-lg-12 col-xl-10">
                    <h2 className="mt-0 mb-3 text-info">
                      {singleDriverData?.fullName}
                    </h2>
                    <ul className="list-unstyled text-left row mb-0">
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Mobile Number</label>
                        <br /> +1 {singleDriverData?.mobileNumber}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">
                          License Number{" "}
                        </label>
                        <br /> {singleDriverData?.driver?.licenceNo || "-"}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Vehicle Name </label>
                        <br /> {singleDriverData?.driver?.driverVehicle || "-"}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">
                          Vehicle Plate No.{" "}
                        </label>
                        <br /> {singleDriverData?.driver?.vehicalNo || "-"}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">
                          Vehicle Capacity{" "}
                        </label>
                        <br /> {singleDriverData?.driver?.orderCapacity || "-"}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Order Type </label>
                        <br />
                        {singleDriverData?.driver?.orderType === 2
                          ? "Propane tank exchange"
                          : "Fuel delivery"}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">
                          Registration Date{" "}
                        </label>
                        <br />{" "}
                        {moment(singleDriverData?.driver?.createdAt).format(
                          "MM/DD/YYYY"
                        )}{" "}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">
                          Completed Orders{" "}
                        </label>
                        <br />
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip01`}>
                              Fuel Order:{" "}
                              {(singleDriverData?.orders["1"] || [])?.filter(
                                ({ status }) => status === "delivered"
                              ).length +
                                (singleDriverData?.orders["2"] || [])?.filter(
                                  ({ status }) => status === "delivered"
                                ).length}
                            </Tooltip>
                          }
                        >
                          <span className="badge badge-light">
                            {(singleDriverData?.orders["1"] || [])?.filter(
                              ({ status }) => status === "delivered"
                            ).length +
                              (singleDriverData?.orders["2"] || [])?.filter(
                                ({ status }) => status === "delivered"
                              ).length}
                          </span>
                        </OverlayTrigger>
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">License </label>
                        <br />
                        {singleDriverData?.documents?.find(
                          (document) => document.documentType === 2
                        )?.documentUrl ? (
                          <img
                            src={
                              singleDriverData?.documents?.find(
                                (document) => document.documentType === 2
                              )?.documentUrl || "-"
                            }
                            className="rounded o-cover h-125 w-225"
                            alt="License"
                          />
                        ) : (
                          "-"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DriversView>
  );
};

export default DriverViewBasicDetails;

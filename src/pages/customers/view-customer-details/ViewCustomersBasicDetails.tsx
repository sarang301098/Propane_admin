import React from "react";
import moment from "moment";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

// import User from "../../../assets/img/user.jpg";
import TRootState from "../../../store/root.types";
import CustomersView from "./view";
import NoImage from "../../../assets/img/image.png";
import { BarsLoader } from "../../../components/loader/Loader";

const ViewCustomersBasicDetails = () => {
  const customersById = useSelector((state: TRootState) => state.customer.customerById);
  const loading = useSelector((state: TRootState) => state.customer.loading);

  return (
    <CustomersView>
      {loading ? (
        <BarsLoader />
      ) : (
        <div className="tab-pane fadeIn active" id="tab-1">
          <div className="card-body">
            <div className="media">
              <img
                // src={(customersById && customersById?.profileImage) || NoImage}
                src={NoImage}
                className="align-self-start mr-5 ml-3 rounded-circle img-thumbnail o-cover"
                alt="profile"
                width="130"
                height="130"
              />
              <div className="media-body">
                <div className="row">
                  <div className="col-lg-12 col-xl-10">
                    <h2 className="mt-0 mb-3 text-info">{customersById && customersById?.fullName}</h2>
                    <ul className="list-unstyled text-left row mb-0">
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Mobile Number</label>
                        <br /> {customersById && customersById?.countryCode}{" "}
                        {customersById && customersById?.mobileNumber}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Email </label>
                        <br /> {customersById && customersById?.email}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Registration Date </label>
                        <br />
                        {moment(customersById && customersById?.createdAt).format("DD/MM/YYYY")}
                      </li>
                      <li className="mb-3 col-md-6">
                        <label className="text-muted mb-1">Total Orders </label>
                        <br />
                        {/* <OverlayTrigger 
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip02`}>
                            Propane Tank Exchange Order: Spare Tank - 10, Exchange - 5, Accessories - 5
                          </Tooltip>
                          
                        }
                      > */}
                        <span className="badge badge-light">{customersById && customersById?.orders}</span>
                        {/* </OverlayTrigger> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomersView>
  );
};

export default ViewCustomersBasicDetails;

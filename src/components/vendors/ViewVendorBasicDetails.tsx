import React, { useEffect } from "react";
import moment from "moment";
import User from "../../assets/img/user.jpg";
import VendorsView from "../../pages/vendors/view";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";
import { getZipcodesActioThunk } from "../../store/salesTax/salesTax.action.async";

const ViewBasicDetails = () => {
  const dispatch = useDispatch();
  const { zipcodes } = useSelector(
    (state: TRootState) => state?.salesTax?.zipcodeData
  );
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);

  useEffect(() => {
    dispatch(getZipcodesActioThunk(false, 0, 0, "", "", "", "ASC"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VendorsView>
      {(singleVendorData) =>
        loading ? (
          <BarsLoader />
        ) : (
          <div className="tab-pane fadeIn active" id="tab-1">
            <div className="card-body">
              <div className="media">
                <img
                  src={singleVendorData?.profileImage || User}
                  className="align-self-start mr-5 ml-3 rounded-circle img-thumbnail o-cover"
                  alt="profile"
                  width="130"
                  height="130"
                />
                <div className="media-body">
                  <div className="row">
                    <div className="col-lg-12 col-xl-10">
                      <h2 className="mt-0 mb-3 text-info">
                        {singleVendorData?.fullName || "-"}
                      </h2>
                      <ul className="list-unstyled text-left row mb-0">
                        <li className="mb-3 col-md-6">
                          <label className="text-muted mb-1">
                            Mobile Number
                          </label>
                          <br />
                          {singleVendorData?.mobileNumber
                            ? "+1 " + singleVendorData?.mobileNumber
                            : "-"}
                        </li>
                        <li className="mb-3 col-md-6">
                          <label className="text-muted mb-1">Email Id</label>
                          <br /> {singleVendorData?.email || "-"}
                        </li>
                        <li className="mb-3 col-md-6">
                          <label className="text-muted mb-1">
                            Registration Date{" "}
                          </label>
                          <br />{" "}
                          {singleVendorData?.createdAt
                            ? moment(singleVendorData?.createdAt).format(
                                "DD/MM/YYYY"
                              )
                            : "-"}{" "}
                        </li>
                        <li className="mb-3 col-md-6">
                          <label className="text-muted mb-1">
                            Assigned Zipcode{" "}
                          </label>
                          <br />{" "}
                          {zipcodes?.length
                            ? (zipcodes || [])
                                ?.filter((zipcode) =>
                                  (
                                    singleVendorData?.vendor?.zipcodeIds || []
                                  )?.includes(zipcode?.id?.toString())
                                )
                                .map((zipcode) => zipcode?.zipcode)
                                .join(", ")
                            : "-"}
                        </li>
                        <li className="mb-3 col-md-6">
                          <label className="text-muted mb-1">
                            Vendor Commission{" "}
                          </label>
                          <br />{" "}
                          {singleVendorData?.vendor?.comissionFee
                            ? singleVendorData?.vendor?.comissionFee + "%"
                            : "-"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </VendorsView>
  );
};

export default ViewBasicDetails;

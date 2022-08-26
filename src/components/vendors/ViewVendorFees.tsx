import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import VendorsView from "../../pages/vendors/view";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";
import { BarsLoader } from "../loader/Loader";

const VIewVendorFees = () => {
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);

  return (
    <VendorsView>
      {(singleVendorData) =>
        loading ? (
          <BarsLoader />
        ) : (
          <div className="tab-pane fadeIn active" id="tab-6">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 col-xl-8">
                  <ul className="list-unstyled text-left row mb-0">
                    <li className="mb-3 col-md-6">
                      <label className="text-muted mb-1">
                        Vendor Commission Fee
                      </label>
                      <br />{" "}
                      {singleVendorData?.vendor?.comissionFee
                        ? singleVendorData?.vendor?.comissionFee + "%"
                        : "-"}
                    </li>
                    <li className="mb-3 col-md-6">
                      <label className="text-muted mb-1">
                        Leak Check
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip01`}>
                              Additional services – Leakage, Valve check
                            </Tooltip>
                          }
                        >
                          <i className="fa fa-info-circle top-1 m-l-5"></i>
                        </OverlayTrigger>
                      </label>
                      <br />{" "}
                      {singleVendorData?.vendor?.leakageFee
                        ? "$" + fixPrice(singleVendorData?.vendor?.leakageFee)
                        : "-"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </VendorsView>
  );
};

export default VIewVendorFees;

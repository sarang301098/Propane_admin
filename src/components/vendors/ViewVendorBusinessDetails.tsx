import React from "react";
import VendorsView from "../../pages/vendors/view";
import BusinessProof from "../../assets/img/business-proof.jpg";
import { useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";

const ViewBusinessDetails = () => {
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);

  return (
    <VendorsView>
      {(singleVendorData) =>
        loading ? (
          <BarsLoader />
        ) : (
          <div className="tab-pane fadeIn active" id="tab-2">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12 col-xl-8">
                  <ul className="list-unstyled text-left row mb-0">
                    <li className="mb-3 col-md-6">
                      <label className="text-muted mb-1">Business Name</label>
                      <br /> {singleVendorData?.vendor?.businessName || "-"}
                    </li>
                    <li className="mb-3 col-md-6">
                      <label className="text-muted mb-1">
                        Business Address{" "}
                      </label>
                      <br /> {singleVendorData?.vendor?.businessAddress || "-"}{" "}
                    </li>
                    <li className="mb-3 col-md-6">
                      <label className="text-muted mb-1">
                        Business Proof Attachment{" "}
                      </label>
                      <br />
                      <img
                        src={BusinessProof}
                        alt="Business Proof"
                        className="h-125 w-125"
                      />
                    </li>
                    <li className="mb-3 col-md-6">
                      <label className="text-muted mb-1">
                        Business Proof Attachment{" "}
                      </label>
                      <br />
                      <img
                        src={BusinessProof}
                        alt="Business Proof"
                        className="h-125 w-125"
                      />
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

export default ViewBusinessDetails;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import VendorsView from "../../pages/vendors/view";
import { TAddVendorPayload } from "../../store/vendor/vendor.types";

interface Prop {
  children?(singleVendorData: TAddVendorPayload | null): React.ReactNode;
}

const ViewProductPricing: React.FC<Prop> = ({ children }) => {
  return (
    <VendorsView>
      {(singleVendorData) => (
        <div className="tab-pane fadeIn active" id="tab-4">
          <div className="card-header clearfix ">
            <ul className="nav nav-tabs primary-tabs">
              <li className="nav-item" role="presentation">
                <NavLink
                  to={`/vendors/view/${singleVendorData?.id}/product-pricing/fuel-delivery`}
                  className={"nav-link"}
                  activeClassName={"nav-link active show"}
                >
                  Fuel delivery
                </NavLink>
              </li>
              <li className="nav-item" role="presentation">
                <NavLink
                  to={`/vendors/view/${singleVendorData?.id}/product-pricing/tank-exchange`}
                  className={"nav-link"}
                  activeClassName={"nav-link active show"}
                >
                  Propane Tank Exchange
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="tab-content">
            {children && children(singleVendorData)}
          </div>
        </div>
      )}
    </VendorsView>
  );
};

export default ViewProductPricing;

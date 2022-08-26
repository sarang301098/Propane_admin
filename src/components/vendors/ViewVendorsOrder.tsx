import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import VendorsView from "../../pages/vendors/view";
import {
  getAllFreelanceDriversActionThunk,
  getAllVendorDriversActionThunk,
} from "../../store/drivers/drivers.actions.async";
import { TAddVendorPayload } from "../../store/vendor/vendor.types";

interface Prop {
  children?(singleVendorData: TAddVendorPayload | null): React.ReactNode;
}

const ViewVendorsOrder: React.FC<Prop> = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllVendorDriversActionThunk(false, true));
    dispatch(getAllFreelanceDriversActionThunk(true, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <VendorsView>
      {(singleVendorData) => (
        <div className="tab-pane fadeIn active" id="tab-7">
          <div className="card-header clearfix ">
            <ul className="nav nav-tabs primary-tabs">
              <li className="nav-item" role="presentation">
                <NavLink
                  to={`/vendors/view/${singleVendorData?.id}/orders/fuel-delivery`}
                  className="nav-link"
                  activeClassName={"nav-link active show"}
                  isActive={() =>
                    (history?.location.pathname || "")?.includes(
                      `/vendors/view/${singleVendorData?.id}/orders/fuel-delivery`
                    )
                  }
                >
                  Fuel delivery
                </NavLink>
              </li>
              <li className="nav-item" role="presentation">
                <NavLink
                  to={`/vendors/view/${singleVendorData?.id}/orders/tank-exchange`}
                  className="nav-link"
                  activeClassName={"nav-link active show"}
                  isActive={() =>
                    (history?.location.pathname || "")?.includes(
                      `/vendors/view/${singleVendorData?.id}/orders/tank-exchange`
                    )
                  }
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

export default ViewVendorsOrder;

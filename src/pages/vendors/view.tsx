/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Modal } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { getVendorByIdActionThunk } from "../../store/vendor/vendor.action.async";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { TAddVendorPayload } from "../../store/vendor/vendor.types";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";

interface Prop {
  children?(singleVendorData: TAddVendorPayload | null): React.ReactNode;
}

const VendorsView: React.FC<Prop> = ({ children }) => {
  const dispatch = useDispatch();
  const { vendorId } = useParams<{ vendorId: string }>();
  const history = useHistory();

  const { singleVendorData } = useSelector(
    (state: TRootState) => state?.vendor
  );
  const vendorByIdLoading = useSelector(
    (state: TRootState) => state?.vendor?.vendorByIdLoading
  );

  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const hideAlert = () => {
    setSweetAlert(false);
  };

  useEffect(() => {
    if (!singleVendorData) {
      dispatch(getVendorByIdActionThunk(vendorId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleVendorData]);

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>
                    Vendor Details
                    {singleVendorData &&
                      (singleVendorData?.vendor?.status ? (
                        <i className="icon dripicons-checkmark text-success font-size-24 ml-3 align-middle"></i>
                      ) : (
                        <i className="icon dripicons-cross text-danger font-size-24 ml-3 align-middle"></i>
                      ))}
                  </h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() => history.push("/vendors/list")}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs m-0">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/basic-details`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                      >
                        Basic Details
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/business-details`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                      >
                        Business Details
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/product-pricing/fuel-delivery`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                        isActive={() =>
                          history?.location?.pathname?.startsWith(
                            `/vendors/view/${vendorId}/product-pricing`
                          )
                        }
                      >
                        Product Pricing
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/accessories`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                      >
                        Accessories
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/schedule`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                      >
                        Schedule
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/fees-settings`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                      >
                        Fees Settings
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/orders/fuel-delivery`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                        isActive={() =>
                          history?.location?.pathname?.startsWith(
                            `/vendors/view/${vendorId}/orders`
                          )
                        }
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={`/vendors/view/${vendorId}/stock-history`}
                        activeClassName={"nav-link active show"}
                        className="nav-link"
                      >
                        Stock History
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    {children && !vendorByIdLoading ? (
                      children(singleVendorData)
                    ) : (
                      <BarsLoader />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal centered size="lg" show={show} onHide={() => handleClose()}>
        <Modal.Header>
          <h4 className="modal-title">Truck Location</h4>
          <button className="close" onClick={() => handleClose()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8219652911444!2d72.49649711496726!3d22.993573384967775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84576f8f3c2d%3A0x43df72e8efb0b1ac!2sPeerbits!5e0!3m2!1sen!2sin!4v1635418479463!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: "0" }}
            loading="lazy"
            title="map"
          ></iframe>
        </Modal.Body>
      </Modal>
      <React.Fragment>
        {sweetAlert && (
          <SweetAlert
            danger
            showCancel
            title="Are you sure want to change status?"
            onConfirm={hideAlert}
            onCancel={hideAlert}
            customButtons={
              <React.Fragment>
                <button
                  className="btn btn-dark min-w-100 mr-3"
                  onClick={hideAlert}
                >
                  No
                </button>
                <button
                  className="btn btn-danger min-w-100"
                  onClick={hideAlert}
                >
                  Yes
                </button>
              </React.Fragment>
            }
          ></SweetAlert>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default VendorsView;

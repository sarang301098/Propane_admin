/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Modal } from "react-bootstrap";
import { DatePicker } from "../../components";
import ProductPricing from "../../components/vendors/ProductPricing";
import BasicDetails from "../../components/vendors/BasicDetails";
import BusinessDetails from "../../components/vendors/BusinessDetails";
import VendorAccessories from "../../components/vendors/VendorAccessories";
import VendorSchedule from "../../components/vendors/VendorSchedule";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { getZipcodesActioThunk } from "../../store/salesTax/salesTax.action.async";
import { getVendorByIdActionThunk } from "../../store/vendor/vendor.action.async";
import { getAccessoriesActionThunk } from "../../store/accessories/accessories.action.async";
import { getTimeSlotActionThunk } from "../../store/timesSlot/timeSlot.actions.async";
import FeesSettings from "../../components/vendors/FeesSettings";
import { BarsLoader } from "../../components/loader/Loader";

const VendorsAdd = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = history?.location?.state as { tab: string };
  const { vendorId } = useParams<{ vendorId: string }>();

  const newVendor = useSelector(
    (state: TRootState) => state.vendor.singleVendorData
  );
  const loading = useSelector((state: TRootState) => state.vendor.vendorByIdLoading)

  const [show, setShow] = useState(false);
  const [firstTime, setFirstTime] = useState("");
  const [secondTime, setSecondTime] = useState("");
  const [tabValue, setTabValue] = useState(Number(state?.tab) || 1);
  const [ScheduleTimePrice, setScheduleTimePrice] = useState(false);
  const [showGallonsModal, setShowGallonsModal] = useState(false);
  const [showTanksModal, setShowTanksModal] = useState(false);

  useEffect(() => {
    dispatch(getZipcodesActioThunk(false, 0, 0, "", "", "", "ASC"));
    dispatch(getAccessoriesActionThunk("", 0, 0, false));
    dispatch(getTimeSlotActionThunk(null, 0, 0, false));
    if (vendorId !== "new") {
      dispatch(
        getVendorByIdActionThunk(
          vendorId,
          () => {
            setTabValue(1);
            history.push(history?.location?.pathname, { tab: 1 });
          },
          () => {
            setTabValue(Number(state?.tab));
          }
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTabValue(!newVendor?.id ? 1 : Number(state?.tab) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVendor, state?.tab]);

  const handleActive = (tab: number) => {
    if (newVendor && tab <= newVendor?.vendor?.profileCompletedStatus + 1) {
      if (tabValue === tab) {
        return "nav-link active show";
      } else {
        return "nav-link";
      }
    } else {
      return tab === 1 ? "nav-link active show" : "nav-link deactive";
    }
  };

  const handleTabs = (e: React.MouseEvent<HTMLElement>, tab: number) => {
    if (vendorId !== "new" && newVendor?.id) {
      if (newVendor && tab > newVendor?.vendor?.profileCompletedStatus + 1) {
        e?.preventDefault();
        return;
      }
      setTabValue(tab);
      history.push(history?.location?.pathname, { tab: tab });
    } else {
      e?.preventDefault();
    }
  };

  function handleClose() {
    setShow(false);
  }

  function handleCloseGallons() {
    setShowGallonsModal(false);
  }
  function handleCloseTanks() {
    setShowTanksModal(false);
  }

  const handleRedirectToVendorsList = () => {
    history.push("/vendors/list");
  };

  return (
    <React.Fragment>
      {loading ? <BarsLoader/> : 
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>{vendorId === "new" ? "Add New" : "Update"} Vendor</h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRedirectToVendorsList()}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>

            <section className="page-content container-fluid">
              <div className="card card-tabs">
                <div className="card-header clearfix">
                  <ul className="nav nav-tabs primary-tabs m-0">
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={(e) => handleTabs(e, 1)}
                        className={handleActive(1)}
                      >
                        Basic Details
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={(e) => handleTabs(e, 2)}
                        className={handleActive(2)}
                      >
                        Business Details
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={(e) => handleTabs(e, 3)}
                        className={handleActive(3)}
                      >
                        Product Pricing
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={(e) => handleTabs(e, 4)}
                        className={handleActive(4)}
                      >
                        Accessories
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={(e) => handleTabs(e, 5)}
                        className={handleActive(5)}
                      >
                        Schedule
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        onClick={(e) => handleTabs(e, 6)}
                        className={handleActive(6)}
                      >
                        Fees Settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    {tabValue === 1 ? (
                      <BasicDetails setTabValue={setTabValue} />
                    ) : null}
                    {tabValue === 2 ? (
                      <BusinessDetails
                        setTabValue={setTabValue}
                        tabValue={tabValue}
                      />
                    ) : null}
                    {tabValue === 3 ? (
                      <ProductPricing
                        setTabValue={setTabValue}
                        tabValue={tabValue}
                      />
                    ) : null}
                    {tabValue === 4 ? (
                      <VendorAccessories setTabValue={setTabValue} />
                    ) : null}
                    {tabValue === 5 ? (
                      <VendorSchedule
                        tabValue={tabValue}
                        setTabValue={setTabValue}
                      />
                    ) : null}
                    {tabValue === 6 ? (
                      <FeesSettings
                        setTabValue={setTabValue}
                        tabValue={tabValue}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      }
      <Modal centered show={show} onHide={() => handleClose()}>
        <Modal.Header>
          <h4 className="modal-title">Add New Schedule</h4>
          <button className="close" onClick={() => handleClose()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="col-md-12">
              <div className="form-group">
                <label className="control-label">
                  Date Range <span className="text-danger">*</span>
                </label>
                <div className="input-group d-flex w-100p inner-page-date">
                  <DatePicker />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="icon dripicons-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Timeslot (From) <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="time"
                    value={firstTime}
                    className="form-control"
                    onChange={(e) => setFirstTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Timeslot (To) <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="time"
                    value={secondTime}
                    className="form-control"
                    onChange={(e) => setSecondTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Price <span className="text-danger">*</span>
                </label>
                <div className="d-flex align-items-center font-size-14">
                  <input
                    className="tgl tgl-light tgl-primary"
                    id="cb1"
                    type="checkbox"
                    checked={ScheduleTimePrice}
                    onChange={(e) => {
                      setScheduleTimePrice(e.target.checked);
                    }}
                  />
                  <label className="tgl-btn m-0 m-r-10" htmlFor="cb1"></label>
                  Free
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Price <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input type="text" className="form-control" value="" />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => handleClose()}>
            Close
          </button>
          <button className="btn btn-primary" onClick={() => handleClose()}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        centered
        show={showGallonsModal}
        onHide={() => handleCloseGallons()}
      >
        <Modal.Header>
          <h4 className="modal-title">Edit Gallons</h4>
          <button className="close" onClick={() => handleCloseGallons()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  From <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" value="0" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  To <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" value="99" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => handleCloseGallons()}
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleCloseGallons()}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={showTanksModal} onHide={() => handleCloseTanks()}>
        <Modal.Header>
          <h4 className="modal-title">Edit Tanks</h4>
          <button className="close" onClick={() => handleCloseTanks()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  From <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" value="0" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  To <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" value="3" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => handleCloseTanks()}
          >
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleCloseTanks()}
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
export default VendorsAdd;

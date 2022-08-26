/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import User from "../../assets/img/user.jpg";
import Select from "react-select";
import CustomMap from "../../components/Map/Map";
import { getAllVendorActionThunk } from "../../store/vendor/vendor.action.async";
import {
  getAllFreelanceDriversActionThunk,
  getAllVendorDriversActionThunk,
} from "../../store/drivers/drivers.actions.async";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";

const SelectOrderType = [
  { value: "All", label: "All" },
  { value: "Fuel Delivery", label: "Fuel Delivery" },
  {
    value: "Propane Tank Exchange Delivery",
    label: "Propane Tank Exchange Delivery",
  },
];

const OrdersMap = () => {
  const dispatch = useDispatch();

  const vendors = useSelector((state: TRootState) => state?.vendor?.allVendors);
  const vendorDrivers = useSelector(
    (state: TRootState) => state?.drivers?.allVendorDrivers
  );
  const freelanceDrivers = useSelector(
    (state: TRootState) => state?.drivers?.allFreelanceDrivers
  );
  const [mapShow, setMapShow] = useState(false);
  // const [mapFilterShow, setMapFilterShow] = useState(false);
  const [selectOrderType, setSelectOrderType] = useState("");

  const [selectVendor, setSelectVendor] = useState("");
  const [selectVendorDriver, setSelectVendorDriver] = useState("");
  const [selectFreelanceDriver, setSelectFreelanceDriver] = useState("");

  const SelectVendor = vendors?.map((vendor) => ({
    label: vendor?.fullName,
    value: vendor?.id?.toString(),
  }));
  const SelectDriver = vendorDrivers?.map((driver) => ({
    label: driver?.fullName,
    value: driver?.id?.toString(),
  }));
  const SelectFreelanceDriver = freelanceDrivers?.map((driver) => ({
    label: driver?.fullName,
    value: driver?.id?.toString(),
  }));

  useEffect(() => {
    dispatch(getAllVendorActionThunk());
    dispatch(getAllVendorDriversActionThunk(false, true));
    dispatch(getAllFreelanceDriversActionThunk(true, true));
  }, [dispatch]);

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <div className="page-header bg-white py-3">
              <div className="d-flex align-items-center">
                <h1>Map</h1>
                <div className="form-row justify-content-end ml-auto">
                  <div className="col-md-auto">
                    <div className="form-group w-200 m-0">
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectVendor
                            ? (SelectVendor || []).find(
                                (prod) => prod.value === selectVendor
                              ) || null
                            : null
                        }
                        onChange={(val) => {
                          setSelectVendor((val && val.value) || "");
                          dispatch(
                            getAllVendorDriversActionThunk(
                              false,
                              true,
                              val?.value || ""
                            )
                          );
                        }}
                        placeholder="-- Select Vendor --"
                        options={SelectVendor || []}
                      />
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="form-group w-200 m-0">
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectVendorDriver
                            ? (SelectDriver || []).find(
                                (prod) => prod.value === selectVendorDriver
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setSelectVendorDriver((val && val.value) || "")
                        }
                        placeholder="-- Select Driver --"
                        options={SelectDriver || []}
                      />
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="form-group w-225 m-0">
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectFreelanceDriver
                            ? (SelectFreelanceDriver || []).find(
                                (prod) => prod.value === selectFreelanceDriver
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setSelectFreelanceDriver((val && val.value) || "")
                        }
                        placeholder="-- Select Freelance Driver --"
                        options={SelectFreelanceDriver || []}
                      />
                    </div>
                  </div>

                  <div className="col-md-auto">
                    <div className="form-group w-200 m-0">
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectOrderType
                            ? (SelectOrderType || []).find(
                                (prod) => prod.value === selectOrderType
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setSelectOrderType((val && val.value) || "")
                        }
                        placeholder="-- Select Order Type --"
                        options={SelectOrderType || []}
                      />
                    </div>
                  </div>
                  <div className="col-md-auto">
                    <div className="d-flex">
                      <div className="m-l-0">
                        <button type="button" className="btn btn-dark">
                          Submit
                        </button>
                      </div>
                      <div className="m-l-10">
                        <button type="button" className="btn btn-secondary">
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center map-page">
              <a
                href="#"
                onClick={() => setMapShow((mapShowValue) => !mapShowValue)}
                className={
                  mapShow ? "map-sidebar-btn active" : "map-sidebar-btn"
                }
              >
                <i className="fa fa-chevron-right text-white"></i>
              </a>
              <div className="card map-sidebar shadow-none border-top m-0">
                <div className="card-header d-flex align-items-center">
                  <h4 className="font-weight-600 m-0">
                    {" "}
                    Out for Delivery Orders{" "}
                  </h4>
                  <div className="ml-auto">
                    <a href="#">
                      <i className="fa fa-redo"></i>
                    </a>
                    <a
                      href="#"
                      className="m-l-15"
                      onClick={() =>
                        setMapShow((mapShowValue) => !mapShowValue)
                      }
                    >
                      <i className="fa fa-chevron-left"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body overflow-auto p-0">
                  <ul className="list-unstyled map-list m-0">
                    <li className="active">
                      <a className="d-block" href="#">
                        <div className="d-flex mb-2">
                          <div className="media">
                            <img
                              className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                              src={User}
                              alt="User"
                            />
                            <div className="media-body">
                              <h6 className="mt-1 mb-0">John Smith</h6>
                              <span className="text-muted d-block">
                                DA 665 QL
                              </span>
                              <span className="text-muted">
                                +1 987 654 3210
                              </span>
                            </div>
                          </div>
                        </div>
                        <label className="text-muted font-size-12 m-0">
                          Delivery Location:{" "}
                        </label>
                        <p className="m-0 font-size-13">
                          656 Chatham Way, Washington, MD, Maryland, 20008, USA
                        </p>
                      </a>
                    </li>
                    <li>
                      <a className="d-block" href="#">
                        <div className="d-flex mb-2">
                          <div className="media">
                            <img
                              className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                              src={User}
                              alt="User"
                            />
                            <div className="media-body">
                              <h6 className="mt-1 mb-0">John Smith</h6>
                              <span className="text-muted d-block">
                                DA 665 QL
                              </span>
                              <span className="text-muted">
                                +1 987 654 3210
                              </span>
                            </div>
                          </div>
                        </div>
                        <label className="text-muted font-size-12 m-0">
                          Delivery Location:{" "}
                        </label>
                        <p className="m-0 font-size-13">
                          656 Chatham Way, Washington, MD, Maryland, 20008, USA
                        </p>
                      </a>
                    </li>
                    <li>
                      <a className="d-block" href="#">
                        <div className="d-flex mb-2">
                          <div className="media">
                            <img
                              className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                              src={User}
                              alt="User"
                            />
                            <div className="media-body">
                              <h6 className="mt-1 mb-0">John Smith</h6>
                              <span className="text-muted d-block">
                                DA 665 QL
                              </span>
                              <span className="text-muted">
                                +1 987 654 3210
                              </span>
                            </div>
                          </div>
                        </div>
                        <label className="text-muted font-size-12 m-0">
                          Delivery Location:{" "}
                        </label>
                        <p className="m-0 font-size-13">
                          656 Chatham Way, Washington, MD, Maryland, 20008, USA
                        </p>
                      </a>
                    </li>
                    <li>
                      <a className="d-block" href="#">
                        <div className="d-flex mb-2">
                          <div className="media">
                            <img
                              className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                              src={User}
                              alt="User"
                            />
                            <div className="media-body">
                              <h6 className="mt-1 mb-0">John Smith</h6>
                              <span className="text-muted d-block">
                                DA 665 QL
                              </span>
                              <span className="text-muted">
                                +1 987 654 3210
                              </span>
                            </div>
                          </div>
                        </div>
                        <label className="text-muted font-size-12 m-0">
                          Delivery Location:{" "}
                        </label>
                        <p className="m-0 font-size-13">
                          656 Chatham Way, Washington, MD, Maryland, 20008, USA
                        </p>
                      </a>
                    </li>
                    <li>
                      <a className="d-block" href="#">
                        <div className="d-flex mb-2">
                          <div className="media">
                            <img
                              className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                              src={User}
                              alt="User"
                            />
                            <div className="media-body">
                              <h6 className="mt-1 mb-0">John Smith</h6>
                              <span className="text-muted d-block">
                                DA 665 QL
                              </span>
                              <span className="text-muted">
                                +1 987 654 3210
                              </span>
                            </div>
                          </div>
                        </div>
                        <label className="text-muted font-size-12 m-0">
                          Delivery Location:{" "}
                        </label>
                        <p className="m-0 font-size-13">
                          656 Chatham Way, Washington, MD, Maryland, 20008, USA
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-100p" style={{ height: "calc(100vh - 140px)" }}>
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d58763.84176544513!2d72.5057536!3d22.9965824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spaldi%20to%20peerbits!5e0!3m2!1sen!2sin!4v1623930155265!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: "0" }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="map"
                ></iframe> */}
                <CustomMap
                  markers={[{ lat: 22.9937, lng: 72.5016 }]}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </div>
              <div className="card filter-sidebar m-0">
                <div className="card-header d-flex align-items-center">
                  <h4 className="font-weight-600 m-0"> Filter </h4>
                  <div className="ml-auto">
                    {/* TODO:Remove an anchor tag and set button */}
                    <button
                      className="m-l-15"
                      // onClick={() => setMapFilterShow((mapFilterShowValue) => !mapFilterShowValue)}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body overflow-auto">
                  <div className="form-group">
                    <label>Vendor</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        selectVendor
                          ? (SelectVendor || []).find(
                              (prod) => prod.value === selectVendor
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setSelectVendor((val && val.value) || "")
                      }
                      placeholder="-- Select --"
                      options={SelectVendor || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Driver</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        selectVendorDriver
                          ? (SelectDriver || []).find(
                              (prod) => prod.value === selectVendorDriver
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setSelectVendorDriver((val && val.value) || "")
                      }
                      placeholder="-- Select --"
                      options={SelectDriver || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Order Type</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        selectOrderType
                          ? (SelectOrderType || []).find(
                              (prod) => prod.value === selectOrderType
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setSelectOrderType((val && val.value) || "")
                      }
                      placeholder="-- Select --"
                      options={SelectOrderType || []}
                    />
                  </div>
                </div>
                <div className="card-footer bg-light text-right">
                  <button
                    type="button"
                    className="btn btn-secondary clear-form mr-2"
                    // onClick={() => setMapFilterShow((mapFilterShowValue) => !mapFilterShowValue)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    // onClick={() => setMapFilterShow((mapFilterShowValue) => !mapFilterShowValue)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrdersMap;

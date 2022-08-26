/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Header } from "../../components/header/header";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "react-bootstrap-sweetalert";

const Schedule = () => {
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [scheduleSearch, setScheduleSearch] = useState("");
  const [schedulePrice, setSchedulePrice] = useState("");
  const [ScheduleTimePrice, setScheduleTimePrice] = useState(false);
  const [value, setValue] = useState(["10:00", "11:00"]);
  const [firstTime, setFirstTime] = useState("");
  const [secondTime, setSecondTime] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const showAlert = () => {
    setSweetAlert(true);
  };

  const hideAlert = () => {
    setSweetAlert(false);
  };

  const changeTimeRange = (timeRange: any) => {
    setValue([...timeRange]);
  };
  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Schedules</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={scheduleSearch}
                      onChange={(e) => setScheduleSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleShow()}
                  >
                    Add New Schedule
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover m-0">
                      <thead>
                        <tr>
                          <th className="w-300">Time Slot</th>
                          <th>Free</th>
                          <th>Price</th>
                          <th className="table-field-actions">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(1)].map((elementInArray, index) => (
                          <React.Fragment>
                            <tr key={index}>
                              <td>10 AM - 2 PM</td>
                              <td>Yes</td>
                              <td>$10.00</td>
                              <td className="table-field-actions">
                                <Dropdown className="btn-group">
                                  <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="btn btn-sm btn-icon-only"
                                  >
                                    <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => handleShow()}
                                    >
                                      <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => showAlert()}
                                    >
                                      <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                            <tr key={index + 1}>
                              <td>3 PM - 6 PM</td>
                              <td>No</td>
                              <td>-</td>
                              <td className="table-field-actions">
                                <Dropdown className="btn-group">
                                  <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="btn btn-sm btn-icon-only"
                                  >
                                    <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => handleShow()}
                                    >
                                      <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => showAlert()}
                                    >
                                      <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                            <tr key={index + 2}>
                              <td>6 PM - 10 PM</td>
                              <td>Yes</td>
                              <td>$10.00</td>
                              <td className="table-field-actions">
                                <Dropdown className="btn-group">
                                  <Dropdown.Toggle
                                    id="dropdown-basic"
                                    className="btn btn-sm btn-icon-only"
                                  >
                                    <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => handleShow()}
                                    >
                                      <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                      Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      href="#"
                                      onClick={() => showAlert()}
                                    >
                                      <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* <Pagination /> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal centered show={show} onHide={() => handleClose()}>
        <Modal.Header>
          <h4 className="modal-title">Add New Schedule</h4>
          <button className="close" onClick={() => handleClose()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-3">Timeslot</h5>
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  From <span className="text-danger">*</span>
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
                  To <span className="text-danger">*</span>
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
          </div>
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
                  console.log("is checked", e.target.checked);
                  setScheduleTimePrice(e.target.checked);
                }}
              />
              <label className="tgl-btn m-0 m-r-10" htmlFor="cb1"></label>
              Free
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">
              Price <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                className="form-control"
                value={schedulePrice}
                onChange={(e) => setSchedulePrice(e.target.value)}
              />
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

export default Schedule;

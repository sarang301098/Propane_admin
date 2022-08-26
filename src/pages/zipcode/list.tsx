import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Pagination } from "../../components/pagination/testPage";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "react-bootstrap-sweetalert";

const Zipcode: React.FC = () => {
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [search, setSearch] = useState("");
  const [areaName, setAreaName] = useState("");
  const [zipCode, setZipCode] = useState("");

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
  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Zipcode</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                    Add New Zipcode
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
                          <th className="sorting w-300">
                            <span> Area Name </span>
                          </th>
                          <th>Zipcode</th>
                          <th className="table-field-status">Status</th>
                          <th className="table-field-actions">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...Array(10)].map((elementInArray, index) => (
                          <React.Fragment>
                            <tr key={index}>
                              <td>Alabama</td>
                              <td>35242</td>
                              <td className="table-field-status">
                                <i className="icon dripicons-checkmark text-success font-size-20"></i>
                              </td>
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
                  <Pagination />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal centered show={show} onHide={() => handleClose()}>
        <Modal.Header>
          <h4 className="modal-title">Add New Zipcode</h4>
          <button className="close" onClick={() => handleClose()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">Area Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Area Name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="control-label">Zipcode</label>
            <input
              type="text"
              className="form-control"
              placeholder="Zipcode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
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

export default Zipcode;

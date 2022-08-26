import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Modal } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  deliveryLocationActionThunk,
  updateDeliveryLocationActionThunk,
} from "../../store/deliveryLocation/deliveryLocation.action.async";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";
import { useFormik } from "formik";
import * as yup from "yup";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";

const LocationWhereToDeliver = () => {
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);

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
  const { deliveryLocations } = useSelector(
    (state: TRootState) => state.deliveryLocation.deliveryLocationData
  );
  const loading = useSelector(
    (state: TRootState) => state?.deliveryLocation?.loading
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deliveryLocationActionThunk(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deliveryLocationSchema = yup.object().shape({
    name: yup.string().required("Location is required"),
    price: yup
      .number()
      .required("Price is required")
      .min(1, "Price must be greater than zero"),
    description: yup
      .string()
      .required("Description is required")
      .max(255, "Description must be less than 255 character"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: deliveryLocationSchema,
    initialValues: {
      name: name || "",
      price: price,
      description: description || "",
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        updateDeliveryLocationActionThunk(
          id,
          values.name,
          values.description,
          Number(values.price)
        )
      );
      resetForm();
      handleClose();
    },
  });
  const { errors, touched } = formik;

  const reset = () => {
    setSearch(() => "");
    dispatch(deliveryLocationActionThunk(""));
  };

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
                  <h1>Location of Where to Deliver</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      value={search}
                      placeholder="Search"
                      title="Search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => {
                          dispatch(deliveryLocationActionThunk(search));
                        }}
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={reset}
                  >
                    Reset
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
                          <th className="w-200">Location</th>
                          <th>Price</th>
                          <th className="w-500">Description</th>
                          <th className="table-field-actions">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading ? (
                          deliveryLocations?.length > 0 ? (
                            deliveryLocations?.map((i: any, id: any) => (
                              <tr key={id}>
                                <td>{i?.name || "-"}</td>
                                <td>{"$" + i?.price ?? "-"}</td>
                                <td>{i?.description || "-"}</td>
                                <td className="table-field-actions">
                                  <Dropdown className="btn-group">
                                    <Dropdown.Toggle
                                      id="dropdown-basic"
                                      className="btn btn-sm btn-icon-only"
                                    >
                                      <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                                    </Dropdown.Toggle>
                                    <AppendedMyComponent>
                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          href="#"
                                          onClick={() => {
                                            setId(i.id);
                                            setDescription(i.description);
                                            setName(i.name);
                                            setPrice(i.price);
                                            formik.setValues({
                                              name: i.name,
                                              description: i.description,
                                              price: i.price,
                                            });
                                            handleShow();
                                          }}
                                        >
                                          <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                          Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          href="#"
                                          onClick={showAlert}
                                        >
                                          <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                                          Delete
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </AppendedMyComponent>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} style={{ textAlign: "center" }}>
                                No records availabel
                              </td>
                            </tr>
                          )
                        ) : (
                          <tr>
                            <td colSpan={4} style={{ textAlign: "center" }}>
                              <BarsLoader />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal centered show={show}>
        <Modal.Header>
          <h4 className="modal-title">Edit Location of Where to Deliver</h4>
          <button className="close" onClick={handleClose}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label className="control-label">
                Location <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={formik.values.name}
                onChange={(e) => {
                  setName(e.target.value);
                  formik.handleChange(e);
                }}
              />
              {errors.name && touched.name && (
                <div className="text-danger">{errors.name}</div>
              )}
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
                  type="number"
                  className="form-control"
                  value={formik.values.price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    formik.handleChange(e);
                  }}
                />
              </div>
              {errors.price && touched.price && (
                <div className="text-danger">{errors.price}</div>
              )}
            </div>
            <div className="form-group">
              <label className="control-label">
                Description
                <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                placeholder=""
                // maxLength={255}
                value={formik.values.description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  formik.handleChange(e);
                }}
              />
              {errors.description && touched.description && (
                <div className="text-danger">{errors.description}</div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
            <button className="btn btn-primary">Submit</button>
          </Modal.Footer>
        </form>
      </Modal>
      {sweetAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to delete?"
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
              <button className="btn btn-danger min-w-100" onClick={hideAlert}>
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </React.Fragment>
  );
};

export default LocationWhereToDeliver;

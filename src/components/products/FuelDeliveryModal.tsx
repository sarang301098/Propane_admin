import React from "react";
import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import {
  addProductsActionThunk,
  updateProductActionThunk,
} from "../../store/products/products.action.async";

interface Prop {
  show: boolean;
  setShow: Function;
  productId: string;
  editFuelProduct?: {
    id?: number;
    name: string;
    logo: string;
    discount: number;
    status: number;
    indexPrice: number;
  } | null;
}

const FuelDeliveryModal: React.FC<Prop> = ({
  show,
  setShow,
  editFuelProduct,
  productId,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const FuelProductSchema = Yup.object().shape({
    status: Yup.number().required().oneOf([0, 1], "Status is required"),
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .min(1, "Price must be greater than 0")
      .required("Product price is required"),
    discount: Yup.number()
      .min(0, "Percentage must be greater than 0")
      .max(100, "Percentage must be less than 100")
      .required("Product discount is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: FuelProductSchema,
    initialValues: {
      name: (editFuelProduct && editFuelProduct?.name) || "",
      price: (editFuelProduct && editFuelProduct?.indexPrice) || "",
      logo: (editFuelProduct && editFuelProduct?.logo) || "",
      discount: (editFuelProduct && editFuelProduct?.discount) || "",
      status:
        editFuelProduct && editFuelProduct?.status?.toString() === "0" ? 0 : 1,
    },
    onSubmit: (values, { resetForm }) => {
      if (editFuelProduct) {
        dispatch(
          updateProductActionThunk(
            productId,
            values.name,
            1,
            values.status,
            "https://blog.hubspot.com/hubfs/parts-url.jpg",
            [
              {
                indexPrice: Number(values.price),
                discount: Number(values.discount),
                id: editFuelProduct.id,
              },
            ]
          )
        );
      } else {
        dispatch(
          addProductsActionThunk(
            values.name,
            1,
            values.status,
            "https://blog.hubspot.com/hubfs/parts-url.jpg",
            [
              {
                indexPrice: Number(values.price),
                discount: Number(values.discount),
              },
            ]
          )
        );
      }
      handleClose();
      resetForm();
    },
  });
  const { errors, touched } = formik;

  return (
    <Modal size="lg" className="modal-custom" centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">
          {editFuelProduct ? "Update " : "Add New "} Product
        </h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {errors.name && touched.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Product Logo <span className="text-danger">*</span>
                </label>
                <div
                  className="fileinput fileinput-new w-100p m-0"
                  data-provides="fileinput"
                >
                  <div className="input-group input-large">
                    <div className="form-control" data-trigger="fileinput">
                      <i className="fa fa-file fileinput-exists0"></i>&nbsp;
                      <span className="fileinput-filename"> </span>
                    </div>
                    <span className="input-group-addon btn btn-file fileinput-new">
                      <span className="fileinput-new"> Upload </span>

                      <input type="file" name="..." />
                    </span>
                    <button
                      className="input-group-addon btn fileinput-exists"
                      data-dismiss="fileinput"
                    >
                      {" "}
                      Remove{" "}
                    </button>
                  </div>
                  <div
                    className="fileinput-preview fileinput-exists mt-2"
                    data-trigger="fileinput"
                  ></div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Index Price <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="number"
                    step={"0.01"}
                    className="form-control"
                    value={formik.values.price}
                    name="price"
                    onChange={formik.handleChange}
                  />
                </div>
                {errors.price && touched.price && (
                  <div className="text-danger">{errors.price}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Product Discount <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={"0.01"}
                    className="form-control"
                    value={formik.values.discount}
                    name="discount"
                    onChange={formik.handleChange}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                {errors.discount && touched.discount && (
                  <div className="text-danger">{errors.discount}</div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Status <span className="text-danger">*</span>
                </label>
                <div>
                  <label
                    className="control control-outline d-inline-block control-primary control--radio mb-0 mr-3"
                    htmlFor="status1"
                  >
                    {" "}
                    Active
                    <input
                      type="radio"
                      value={1}
                      name="status"
                      id="status1"
                      checked={Number(formik.values.status) === 1}
                      onChange={formik.handleChange}
                    />
                    <div className="control__indicator"></div>
                  </label>
                  <label
                    className="control control-outline d-inline-block control-primary control--radio mb-0"
                    htmlFor="status2"
                  >
                    {" "}
                    Inactive
                    <input
                      type="radio"
                      value={0}
                      name="status"
                      id="status2"
                      checked={Number(formik.values.status) === 0}
                      onChange={formik.handleChange}
                    />
                    <div className="control__indicator"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => handleClose()}
          >
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FuelDeliveryModal;

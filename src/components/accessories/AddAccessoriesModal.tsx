import { useFormik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as yup from "yup";

interface Prop {
  show: boolean;
  setShow: Function;
  submitAction: Function;
  editAccessories?: {
    accesoryName: string;
    accesoryPrice: number;
    accessoryImage: string;
    accessoryDescription: string;
  } | null;
}

const AddAccessoriesModal: React.FC<Prop> = ({
  show,
  setShow,
  submitAction,
  editAccessories,
}) => {
  const accessoriesSchema = yup.object().shape({
    accessoryName: yup.string().required("Name is required"),
    accessoryPrice: yup
      .number()
      .required("Price is required")
      .min(1, "Price must be greater than 0"),
    accessoryImage: yup.string(),
    accessoryDescription: yup
      .string()
      .required("Description is required")
      .max(255, "Description must be less than 255 characters."),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: accessoriesSchema,
    initialValues: {
      accessoryName: (editAccessories && editAccessories?.accesoryName) || "",
      accessoryPrice: (editAccessories && editAccessories?.accesoryPrice) || "",
      accessoryImage:
        (editAccessories && editAccessories?.accessoryImage) || "",
      accessoryDescription:
        (editAccessories && editAccessories?.accessoryDescription) || "",
    },
    onSubmit: (values, { resetForm }) => {
      submitAction &&
        submitAction(
          values.accessoryName,
          "	https://blog.hubspot.com/hubfs/parts-url.jpg",
          Number(values.accessoryPrice),
          values.accessoryDescription
        );
      resetForm();
      handleClose();
    },
  });

  const handleClose = () => setShow(false);

  const { errors, touched } = formik;

  return (
    <Modal centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">
          {editAccessories ? "Update " : "Add New "} Accessories
        </h4>
        <button className="close" onClick={handleClose}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Accessories Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Accessories Name"
              value={formik.values.accessoryName}
              onChange={formik.handleChange}
              name="accessoryName"
            />
            {errors.accessoryName && touched.accessoryName && (
              <div className="text-danger">{errors.accessoryName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Accessories Image <span className="text-danger">*</span>
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
                  <input type="file" name="..." multiple={true} />
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
                step={"0.01"}
                className="form-control"
                name="accessoryPrice"
                value={formik.values.accessoryPrice}
                onChange={formik.handleChange}
              />
            </div>
            {errors.accessoryPrice && touched.accessoryPrice && (
              <div className="text-danger">{errors.accessoryPrice}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              value={formik.values.accessoryDescription}
              onChange={formik.handleChange}
              name="accessoryDescription"
            ></textarea>
            {errors.accessoryDescription && touched.accessoryDescription && (
              <div className="text-danger">{errors.accessoryDescription}</div>
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
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddAccessoriesModal;

import { useFormik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

interface Prop {
  show: boolean;
  setShow: Function;
  submitAction: Function;
  county: string;
  editZipcode?: {
    areaName: string;
    zipcode: number;
    status: number;
  } | null;
}

const ZipcodeModal: React.FC<Prop> = ({
  show,
  setShow,
  editZipcode,
  submitAction,
  county,
}) => {
  const handleClose = () => {
    setShow(false);
  };

  const ZipcodeSchema = Yup.object().shape({
    status: Yup.number().required().oneOf([0, 1], "Status is required"),
    areaName: Yup.string().required("Area name is required"),
    zipcode: Yup.number()
      .required("Zipcode is required")
      .min(1, "Zipcode must be greater than 0")
      .max(9999999999, "Zipcode must be less than 10 digits"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: ZipcodeSchema,
    initialValues: {
      areaName: (editZipcode && editZipcode?.areaName) || "",
      zipcode: (editZipcode && editZipcode?.zipcode) || "",
      status: editZipcode && editZipcode?.status?.toString() === "0" ? 0 : 1,
    },
    onSubmit: (values, { resetForm }) => {
      submitAction &&
        submitAction(values.areaName, values.zipcode, values.status);
      resetForm();
      setShow(false);
    },
  });

  const { errors, touched } = formik;

  return (
    <Modal centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">Add New Zipcode ({county})</h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Area Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Area Name"
              name="areaName"
              value={formik.values.areaName}
              onChange={formik.handleChange}
            />
            {errors.areaName && touched.areaName && (
              <div className="text-danger">{errors.areaName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Zipcode <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Zipcode"
              name="zipcode"
              value={formik.values.zipcode}
              onChange={formik.handleChange}
            />
            {errors.zipcode && touched.zipcode && (
              <div className="text-danger">{errors.zipcode}</div>
            )}
          </div>
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
                  defaultChecked={Number(formik.values.status) === 1}
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
                  defaultChecked={Number(formik.values.status) === 0}
                  onChange={formik.handleChange}
                />
                <div className="control__indicator"></div>
              </label>
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

export default ZipcodeModal;

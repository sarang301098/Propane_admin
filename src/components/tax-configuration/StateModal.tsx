import { useFormik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

interface Prop {
  show: boolean;
  setShow: Function;
  submitAction: Function;
  editState?: { name: string; salesTax: number; status: number } | null;
}
const StateModal: React.FC<Prop> = ({
  show,
  setShow,
  submitAction,
  editState,
}) => {
  const StateSchema = Yup.object().shape({
    Status: Yup.number().required().oneOf([0, 1], "Status is required"),
    stateName: Yup.string().required("State name is required"),
    stateTax: Yup.number()
      .required("State tax is required")
      .min(1, "Tax must be greater than 0"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: StateSchema,
    initialValues: {
      Status: editState && editState.status.toString() === "0" ? 0 : 1,
      stateName: (editState && editState?.name) || "",
      stateTax: (editState && editState?.salesTax) || "",
    },
    onSubmit: (values, { resetForm }) => {
      submitAction &&
        submitAction(values.stateName, values.stateTax, values.Status);
      setShow(false);
      resetForm();
    },
  });

  const handleClose = () => {
    setShow(false);
  };
  const { errors, touched } = formik;
  return (
    <Modal centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">
          {editState ? "Update " : "Add New"} State
        </h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              State Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="State"
              name="stateName"
              value={formik.values.stateName}
              onChange={formik.handleChange}
            />
            {errors.stateName && touched.stateName && (
              <div className="text-danger">{errors.stateName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Sales Tax <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="number"
                step={"0.01"}
                className="form-control"
                value={formik.values.stateTax}
                placeholder="Sales Tax"
                name="stateTax"
                onChange={formik.handleChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
            {errors.stateTax && touched.stateTax && (
              <div className="text-danger">{errors.stateTax}</div>
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
                  defaultChecked={Number(formik.values.Status) === 1}
                  id="status1"
                  name="Status"
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
                  name="Status"
                  id="status2"
                  defaultChecked={Number(formik.values.Status) === 0}
                  onChange={formik.handleChange}
                />
                <div className="control__indicator"></div>
              </label>
            </div>
            {errors.Status && touched.Status && (
              <div className="text-danger">{errors.Status}</div>
            )}
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

export default StateModal;

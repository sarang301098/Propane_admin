import { useFormik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addCylinderSizeActionThunk,
  updateCylinderSizeActionThunk,
} from "../../store/cylinderSize/cylinderSize.action.async";
import TRootState from "../../store/root.types";

interface Prop {
  show: boolean;
  setShow: Function;
  submitAction: Function;
  id?: number | string;
  isUpdate?: boolean;
  cylinderSize?: string | number;
}

const CylinderSizeModal: React.FC<Prop> = ({
  show,
  setShow,
  submitAction,
  cylinderSize,
  id,
  isUpdate,
}) => {
  const handleClose = () => {
    setShow(false);
  };
  const perPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const cylinderSizeSchema = yup.object().shape({
    cylinderSize: yup
      .number()
      .required("Cylinder size is required")
      .min(1, "Cylinder size must be greater than 0")
      .max(9999, "Cylinder size must be less than 4 digits"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: cylinderSizeSchema,
    initialValues: {
      cylinderSize: cylinderSize || "",
    },
    onSubmit: (values, { resetForm }) => {
      isUpdate
        ? dispatch(
            updateCylinderSizeActionThunk(
              Number(id),
              Number(values.cylinderSize)
            )
          )
        : dispatch(
            addCylinderSizeActionThunk(Number(values.cylinderSize), perPage)
          );
      setShow(false);
      resetForm();
      setShow(false);
    },
  });
  const dispatch = useDispatch();
  const { errors, touched } = formik;
  return (
    <Modal centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">Add New Cylinder Size</h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Size <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="number"
                step="0.1"
                name="cylinderSize"
                className="form-control"
                value={formik.values.cylinderSize}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text">lbs</span>
              </div>
            </div>
            {errors.cylinderSize && touched.cylinderSize && (
              <div className="text-danger">{errors.cylinderSize}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            type="button"
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
export default CylinderSizeModal;

import { useFormik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

interface Prop {
  show: boolean;
  setShow: Function;
  submitAction: Function;
  setEditCounty?: Function;
  state: string;
  editCounty?: {
    countyName: string;
    salesTaxOne: number;
    salesTaxTwo: number;
    status: number;
  } | null;
}

const CountyModal: React.FC<Prop> = ({
  show,
  setShow,
  editCounty,
  submitAction,
  setEditCounty,
  state,
}) => {
  const CountySchema = Yup.object().shape({
    status: Yup.number().required().oneOf([0, 1], "Status is required"),
    countyName: Yup.string().required("County name is required"),
    salesTaxOne: Yup.number()
      .required("State tax is required")
      .min(1, "Tax value must be greater than 0"),
    salesTaxTwo: Yup.number()
      .required("State tax is required")
      .min(1, "Tax value must be greater than 0"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: CountySchema,
    initialValues: {
      countyName: (editCounty && editCounty?.countyName) || "",
      salesTaxOne: (editCounty && editCounty?.salesTaxOne) || "",
      salesTaxTwo: (editCounty && editCounty?.salesTaxTwo) || "",
      status: editCounty && editCounty.status.toString() === "0" ? 0 : 1,
    },
    onSubmit: (values, { resetForm }) => {
      submitAction &&
        submitAction(
          values.countyName,
          values.salesTaxOne,
          values.salesTaxTwo,
          values.status
        );
      setShow(false);
      resetForm();
    },
  });
  const handleClose = () => {
    setShow(false);
    setEditCounty && setEditCounty(null);
  };
  const { errors, touched } = formik;

  return (
    <Modal centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">
          {editCounty ? "Update " : "Add New"} County ({state})
        </h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              County Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="countyName"
              placeholder="County"
              value={formik.values.countyName}
              onChange={formik.handleChange}
            />
            {errors.countyName && touched.countyName && (
              <div className="text-danger">{errors.countyName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Sales Tax (1) <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={formik.values.salesTaxOne}
                name="salesTaxOne"
                onChange={formik.handleChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
            {errors.salesTaxOne && touched.salesTaxOne && (
              <div className="text-danger">{errors.salesTaxOne}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Sales Tax (2) <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={formik.values.salesTaxTwo}
                name="salesTaxTwo"
                onChange={formik.handleChange}
              />
              <div className="input-group-append">
                <span className="input-group-text">%</span>
              </div>
            </div>
            {errors.salesTaxOne && touched.salesTaxTwo && (
              <div className="text-danger">{errors.salesTaxTwo}</div>
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

export default CountyModal;

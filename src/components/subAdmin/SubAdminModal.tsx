import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import TRootState from "../../store/root.types";
import { useFormik } from "formik";
import * as Yup from "yup";
interface Prop {
  show: boolean;
  setShow: Function;
  submitAction: Function;
  editSubAdmin?: {
    countryCode: string;
    email: string;
    fullName: string;
    roleName: { label: string; value: string | number } | null;
    isActive: boolean;
    mobileNumber: number;
    id: number | string;
  } | null;
}

const SubAdminModal: React.FC<Prop> = ({
  show,
  setShow,
  submitAction,
  editSubAdmin,
}) => {
  const phoneRegExp = /^\d{10}$/;

  const SubAdminSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter valid email"),
    fullName: Yup.string()
      .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
      .max(40)
      .required("Name is required"),
    mobileNumber: Yup.string()
      .matches(phoneRegExp, "Mobile number must be of 10 digit")
      .required("Contact number is required"),
    roleName: Yup.object()
      .shape({
        label: Yup.string(),
        value: Yup.string(),
      })
      .nullable()
      .required("Role name is required"),
    isActive: Yup.number().required("Status is required"),
  });

  const rolesData = useSelector(
    (state: TRootState) => state.subAdmin?.allRoles?.roles
  );
  const roleId = useSelector(
    (state: TRootState) => state.subAdmin?.singleSubAdminData?.roleId
  );
  const rolesOption = rolesData.map((roles) => ({
    value: roles?.id.toString(),
    label: roles?.name,
  }));
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: SubAdminSchema,
    initialValues: {
      isActive: editSubAdmin ? (editSubAdmin?.isActive ? 1 : 0) : 1,
      mobileNumber: (editSubAdmin && editSubAdmin?.mobileNumber) || "",
      email: (editSubAdmin && editSubAdmin?.email) || "",
      fullName: (editSubAdmin && editSubAdmin?.fullName) || "",
      roleName: roleId
        ? rolesOption.find((role) => Number(role.value) === Number(roleId))
        : null,
    },
    onSubmit: (values, { resetForm }) => {
      submitAction &&
        submitAction(
          values?.isActive,
          values?.mobileNumber,
          values?.email,
          values?.fullName,
          values.roleName?.value
        );

      setShow(false);
      resetForm();
    },
  });
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (roleId) {
      formik.setValues({
        ...formik.values,
        roleName: roleId
          ? rolesOption.find((role) => Number(role.value) === Number(roleId))
          : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { errors, touched } = formik;
  return (
    <Modal centered scrollable show={show} className={"custom-modal"}>
      <Modal.Header>
        <h4 className="modal-title">
          {editSubAdmin ? "Update " : "Add New "}
          Sub Admin
        </h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              placeholder="Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
            {errors.fullName && touched.fullName && (
              <div className="text-danger">{errors.fullName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {errors.email && touched.email && (
              <div className="text-danger">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Contact Number <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">+1</div>
              </div>
              <input
                type="text"
                name="mobileNumber"
                className="form-control"
                placeholder="Contact Number"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
              />
            </div>
            {errors.mobileNumber && touched.mobileNumber && (
              <div className="text-danger">{errors.mobileNumber}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Role Name <span className="text-danger">*</span>
            </label>
            <Select
              className="custom-select-dropdown"
              classNamePrefix="react-select-dropdown"
              value={formik.values.roleName}
              options={rolesOption || []}
              onChange={(val) => {
                formik.setValues({
                  ...formik.values,
                  roleName: val,
                });
              }}
              placeholder="-- Select --"
            />
            {errors.roleName && touched.roleName && (
              <div className="text-danger">{errors.roleName}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Status <span className="text-danger">*</span>
            </label>
            <div className="mt-1">
              <label
                className="control control-outline d-inline-block control-primary control--radio mb-0 mr-3"
                htmlFor="status1"
              >
                {" "}
                Active
                <input
                  type="radio"
                  value={1}
                  name="isActive"
                  id="status1"
                  defaultChecked={Number(formik.values.isActive) === 1}
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
                  name="isActive"
                  id="status2"
                  defaultChecked={Number(formik.values.isActive) === 0}
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
            onClick={() => handleClose()}
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
export default SubAdminModal;

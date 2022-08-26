import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Sidebar } from "../../components/sidebar/sidebar";
import { changePasswordActionThunk } from "../../store/auth/auth.actions.async";
import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state: TRootState) => state.auth.loading);

  /**
   * change password validation schema
   */
  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Password required"),
    newPassword: Yup.string()
      .min(6, "Too short")
      .max(128, "Too long")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password required"),
  });

  /**
   * change password submit handler
   */
  const formikChangePassword = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(
        changePasswordActionThunk({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      );
      resetForm();
    },
  });

  const { errors, touched } = formikChangePassword;

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Change Password</h1>
                </div>
              </div>
            </header>
            {loading ? (
              <BarsLoader />
            ) : (
              <section className="page-content container-fluid">
                <div className="card">
                  <form className="form-horizontal">
                    <div className="card-body">
                      <div className="mt-3">
                        <div className="form-group row">
                          <label className="control-label text-md-right col-md-3">
                            Old Password
                          </label>
                          <div className="col-md-5">
                            <input
                              type="password"
                              name="oldPassword"
                              placeholder="Old password"
                              className="form-control"
                              onChange={formikChangePassword.handleChange}
                              onBlur={formikChangePassword.handleBlur}
                              value={formikChangePassword.values.oldPassword}
                            />
                            {errors.oldPassword && touched.oldPassword && (
                              <div className="text-danger">
                                {errors.oldPassword}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label text-md-right col-md-3">
                            New Password
                          </label>
                          <div className="col-md-5">
                            <input
                              type="password"
                              name="newPassword"
                              placeholder="New password"
                              className="form-control"
                              onChange={formikChangePassword.handleChange}
                              onBlur={formikChangePassword.handleBlur}
                              value={formikChangePassword.values.newPassword}
                            />
                            {errors.newPassword && touched.newPassword && (
                              <div className="text-danger">
                                {errors.newPassword}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label text-md-right col-md-3">
                            Confirm New Password
                          </label>
                          <div className="col-md-5">
                            <input
                              type="password"
                              name="confirmPassword"
                              placeholder="Confirm password"
                              className="form-control"
                              onChange={formikChangePassword.handleChange}
                              onBlur={formikChangePassword.handleBlur}
                              value={
                                formikChangePassword.values.confirmPassword
                              }
                            />
                            {errors.confirmPassword &&
                              touched.confirmPassword && (
                                <div className="text-danger">
                                  {errors.confirmPassword}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-light text-right">
                      <button
                        type="button"
                        className="btn btn-secondary clear-form mr-2"
                        onClick={() => history.goBack()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => formikChangePassword.handleSubmit()}
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;

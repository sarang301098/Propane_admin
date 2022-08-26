import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import LogoColor from "../../assets/img/logo-big.png";
import { ResetForgotPasswordActionThunk } from "../../store/auth/auth.actions.async";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const loading = useSelector((state: TRootState) => state.auth.loading);

  /**
   * reset password validation schema
   */
  const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, "Too short").max(128, "Too long").required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password required"),
  });

  const query = new URLSearchParams(location.search);
  const token = query.get("token");

  /**
   * reset password submit handler
   */
  const formikResetPassword = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      dispatch(
        ResetForgotPasswordActionThunk(
          {
            token,
            newPassword: values.newPassword,
            userType: "admin",
          },
          history
        )
      );
    },
  });

  const { errors, touched } = formikResetPassword;

  return (
    <React.Fragment>
      {loading ? (
        <BarsLoader />
      ) : (
        <div className="main-container d-flex align-items-center justify-content-center">
          <div className="login-box">
            <div className="login-logo">
              <img src={LogoColor} alt="Logo" />
            </div>
            <div className="login-box-body">
              <h1 className="text-center mb-3 font-weight-500">Reset Password</h1>
              <p className="text-center mb-4">Enter your new password</p>
              <form>
                <div className="form-group">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Password"
                    className="form-control"
                    onChange={formikResetPassword.handleChange}
                    onBlur={formikResetPassword.handleBlur}
                    value={formikResetPassword.values.newPassword}
                  />
                  {errors.newPassword && touched.newPassword && (
                    <div className="text-danger">{errors.newPassword}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="form-control"
                    onChange={formikResetPassword.handleChange}
                    onBlur={formikResetPassword.handleBlur}
                    value={formikResetPassword.values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-danger">{errors.confirmPassword}</div>
                  )}
                </div>
                <button
                  onClick={() => formikResetPassword.handleSubmit()}
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ResetPassword;

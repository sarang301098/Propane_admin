import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getWithExpiry } from "../../utils/helpers/password";
import LogoColor from "../../assets/img/logo-big.png";
import { loginActionThunk } from "../../store/auth/auth.actions.async";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const getCredentialsData = getWithExpiry("rememberMe");
  const getRememberMe = localStorage.getItem("rememberMe");

  const loading = useSelector((state: TRootState) => state.auth.loading);

  const [rememberMe, setRememberMe] = useState(Boolean(getRememberMe));

  /**
   * login validation schema
   */
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("The email must be a valid email address.")
      .required("The email field is required."),
    password: Yup.string().required("The password field is required."),
  });

  /**
   * login submit handler
   */
  const formikLogin = useFormik({
    initialValues: {
      email: getCredentialsData?.email || "",
      password: getCredentialsData?.password || "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(
        loginActionThunk(
          {
            email: values.email,
            password: values.password,
            userType: "admin",
          },
          rememberMe
        )
      );
    },
  });

  const { errors, touched } = formikLogin;

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
              <h1 className="text-center mb-3 font-weight-500">Login</h1>
              <p className="text-center mb-4">
                Enter your credentials to access the panel
              </p>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Id"
                    className="form-control"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.email}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        formikLogin.handleSubmit();
                      }
                    }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email as string}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.password}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        formikLogin.handleSubmit();
                      }
                    }}
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <button
                  onClick={() => formikLogin.handleSubmit()}
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      formikLogin.handleSubmit();
                    }
                  }}
                >
                  Login
                </button>
              </form>
            </div>
            <div className="login-box-footer d-flex justify-content-between">
              <div className="form-group m-0">
                <label
                  className="control control-outline control-primary control--checkbox m-0"
                  htmlFor="as"
                >
                  Remember Me
                  <input
                    type="checkbox"
                    id="as"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        formikLogin.handleSubmit();
                      }
                    }}
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>
              <div className="password-reset-link">
                <Link className="text-accent-custom" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;

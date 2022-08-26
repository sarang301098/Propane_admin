import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import LogoColor from "../../assets/img/logo-big.png";
import { forgotPasswordActionThunk } from "../../store/auth/auth.actions.async";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";

const ForgotPassword = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state: TRootState) => state.auth.loading);

  /**
   * model close and redirect to login page
   */
  const handleClose = () => {
    setShow(false);
    history.push("/login");
  };

  /**
   * model show after forgot password link send to user email
   */
  const handleShow = () => {
    setShow(true);
  };

  /**
   * forgot password validation schema
   */
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Email required"),
  });

  /**
   * forgot password submit handler
   */
  const formikForgotPassword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordActionThunk({ email: values.email, userType: "admin" }, handleShow));
    },
  });

  const { errors, touched } = formikForgotPassword;

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
              <h1 className="text-center mb-3 font-weight-500">Forgot Password</h1>
              <p className="text-center mb-4">Enter your registered email Id</p>
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Id"
                    className="form-control"
                    onChange={formikForgotPassword.handleChange}
                    onBlur={formikForgotPassword.handleBlur}
                    value={formikForgotPassword.values.email}
                  />
                  {errors.email && touched.email && <div className="text-danger">{errors.email}</div>}
                </div>
                <button
                  onClick={() => formikForgotPassword.handleSubmit()}
                  type="button"
                  className="btn btn-primary btn-block btn-lg"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="login-box-footer clearfix">
              <div className="form-group text-center mb-2">
                Remember Password?
                <Link className="text-accent-custom" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Body className="text-center p-4">
          <h2 className="font-weight-500">Password Recovery</h2>
          <p className="font-size-15 mt-3">
            An email has been sent to your registered email ID containg the password reset link along with a
            list of instructions. Please follow the steps mentioned in the email to reset your password.
          </p>
          <div className="form-row mt-4 px-4">
            <div className="col">
              <button type="button" className="btn btn-primary btn-block w-100" onClick={handleClose}>
                Okay
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ForgotPassword;

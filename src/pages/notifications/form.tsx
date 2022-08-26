import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { useFormik } from "formik";
import * as yup from "yup";
import { Sidebar } from "../../components/sidebar/sidebar";
import CKEditor from "../../components/CKeditor/CKEditor";
import makeAnimated from "react-select/animated";
import MultiSelectCheckbox from "../../components/multi-group-select/MultiGroupSelect";
// import {
//   getDriversActionThunk,
//   getFreelanceDriversActionThunk,
// } from "../../store/drivers/drivers.actions.async";
// import { getCustomersActionThunk } from "../../store/customer/customer.actions.async";
import TRootState from "../../store/root.types";
import { sendNotificationActionThunk } from "../../store/notification/notification.action.async";
import { getAllCustomersActionThunk } from "../../store/customer/customer.actions.async";
import { BarsLoader } from "../../components/loader/Loader";
import { getAllDriversActionThunk } from "../../store/drivers/drivers.actions.async";

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <label className="m-0 ml-2">{props.label}</label>
        </div>
      </components.Option>
    </div>
  );
};

const animatedComponents = makeAnimated();

const NotificationsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { customers } = useSelector(
    (state: TRootState) => state?.customer?.allCustomers
  );
  const loading = useSelector((state: TRootState) => state?.customer?.loading);
  const driversLoading = useSelector(
    (state: TRootState) => state?.drivers?.loading
  );
  const drivers = useSelector(
    (state: TRootState) => state?.drivers?.allVendorDrivers
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const [pageData, setPageData] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const handleRedirectToNotifications = () => {
    history.push("/settings/notifications/received");
  };

  const handleChange = (selected: any) => {
    formik?.setValues({ ...formik?.values, customerId: selected });
  };
  const initialValues: {
    notifyTo: string;
    customerId: { value: string; label: string }[];
  } = {
    notifyTo: "",
    customerId: [],
  };

  let notificationSchema = yup.object().shape({
    notifyTo: yup.string().required("Notify to is required."),
    customerId: yup.array().when(["selectedDrivers", "selectedCustomers"], {
      is: () => {
        return (
          formik?.values?.notifyTo === "selectedCustomers" ||
          formik?.values?.notifyTo === "selectedDrivers"
        );
      },
      then: (schema: any) =>
        schema
          .of(
            yup.object().shape({
              value: yup.string(),
              label: yup.string(),
            })
          )
          .min(1, "Please select atleast one customer"),
      otherwise: (schema: any) => schema.nullable(),
    }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: notificationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!pageData) {
        setDescriptionError(true);
      } else {
        dispatch(
          sendNotificationActionThunk(
            values?.customerId?.map((id) => id?.value),
            pageData,
            formik?.values?.notifyTo,
            itemsPerPage,
            () => {
              setPageData("");
              history.push("/settings/notifications/sent");
            }
          )
        );
        resetForm();
      }
    },
  });

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          {loading || driversLoading ? (
            <BarsLoader />
          ) : (
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>Send New Notification</h1>
                  </div>
                  <div className="m-l-10">
                    <button
                      className="btn btn-secondary"
                      onClick={handleRedirectToNotifications}
                    >
                      <i className="fa fa-angle-left">&nbsp;</i> Back
                    </button>
                  </div>
                </div>
              </header>
              <section className="page-content container-fluid">
                <div className="card">
                  <form onSubmit={formik?.handleSubmit}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-8">
                          <div className="form-row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">
                                  Notify to{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  className="custom-select form-control"
                                  value={formik?.values?.notifyTo}
                                  onChange={(e) => {
                                    formik.setValues({
                                      ...formik?.values,
                                      notifyTo: e?.target?.value,
                                      customerId: [],
                                    });
                                    if (
                                      e?.target?.value === "selectedCustomers"
                                    ) {
                                      dispatch(getAllCustomersActionThunk());
                                      formik.setValues({
                                        ...formik?.values,
                                        notifyTo: e?.target?.value,
                                      });
                                    }
                                    if (
                                      e?.target?.value === "selectedDrivers"
                                    ) {
                                      dispatch(getAllDriversActionThunk());
                                      formik.setValues({
                                        ...formik?.values,
                                        notifyTo: e?.target?.value,
                                      });
                                    }
                                  }}
                                >
                                  <option>-- Select --</option>
                                  <option value="allCustomers">
                                    All Customers
                                  </option>
                                  <option value="allDrivers">
                                    All Drivers
                                  </option>
                                  <option value="selectedCustomers">
                                    Selected Customers
                                  </option>
                                  <option value="selectedDrivers">
                                    Selected Drivers
                                  </option>
                                </select>
                                {errors?.notifyTo && touched?.notifyTo && (
                                  <div className="text-danger">
                                    {errors?.notifyTo}
                                  </div>
                                )}
                              </div>
                            </div>
                            {(formik?.values?.notifyTo ===
                              "selectedCustomers" ||
                              formik?.values?.notifyTo ===
                                "selectedDrivers") && (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label">
                                    Select Customer's Name{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <div
                                    data-toggle="popover"
                                    data-trigger="focus"
                                  >
                                    <MultiSelectCheckbox
                                      className="custom-select-dropdown"
                                      options={
                                        formik?.values?.notifyTo ===
                                        "selectedCustomers"
                                          ? customers?.map((customer) => ({
                                              value: customer?.id,
                                              label: customer?.fullName,
                                            }))
                                          : drivers?.map((driver) => ({
                                              label: driver?.fullName,
                                              value: driver?.id,
                                            }))
                                      }
                                      isMulti
                                      closeMenuOnSelect={false}
                                      hideSelectedOptions={false}
                                      components={{
                                        Option,
                                        animatedComponents,
                                      }}
                                      onChange={handleChange}
                                      value={formik?.values?.customerId}
                                    />
                                    {errors?.customerId &&
                                      touched?.customerId && (
                                        <div className="text-danger">
                                          {
                                            (errors as { customerId: string })
                                              .customerId
                                          }
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="control-label">
                                  Notification Message{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <CKEditor
                                  setPageData={setPageData}
                                  data={pageData || ""}
                                  setDescriptionError={setDescriptionError}
                                />
                                {descriptionError && (
                                  <div className="text-danger">
                                    Description is required
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-light text-right">
                      <button
                        type="button"
                        className="btn btn-secondary clear-form mr-2"
                        onClick={handleRedirectToNotifications}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotificationsForm;

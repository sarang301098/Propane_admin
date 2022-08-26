/* eslint-disable jsx-a11y/img-redundant-alt */
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import NoImage from "../../assets/img/image.png";
import TRootState from "../../store/root.types";
import {
  addVendorActionThunk,
  updateVendorActionThunk,
} from "../../store/vendor/vendor.action.async";
import { BarsLoader } from "../loader/Loader";

interface Prop {
  setTabValue: Function;
}

const BasicDetails: React.FC<Prop> = ({ setTabValue }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { tab: string };
  const phoneRegExp = /^\d{10}$/;
  const newVendor = useSelector(
    (state: TRootState) => state?.vendor?.singleVendorData
  );
  const loading = useSelector((state: TRootState) => state?.vendor.loading);
  const zipCodes = useSelector(
    (state: TRootState) => state.salesTax.zipcodeData.zipcodes
  );
  const { vendorId } = useParams<{ vendorId: string }>();
  useEffect(() => {
    if (newVendor?.id && vendorId === "new") {
      setTabValue(2);
      history.push("/vendors/" + newVendor?.id, { tab: 2 });
    }
    if (newVendor?.id && !state?.tab) {
      setTabValue(1);
      history.push("/vendors/" + newVendor?.id, { tab: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVendor, vendorId]);

  const vendorBasicDetailSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    number: yup
      .string()
      .matches(phoneRegExp, "Mobile number must be of 10 digit")
      .required("Number is required"),
    status: yup.number().required().oneOf([0, 1], "Status is required"),
    zipcode: yup
      .array()
      .required("Zipcode is required")
      .min(1, "Select atleast one zipcode"),
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    image: yup.string().required("Image is required"),
  });

  const multiZipOptions = zipCodes
    ? zipCodes?.map((zipcode) => ({
        value: zipcode.id,
        label: zipcode.zipcode,
      }))
    : [];

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: vendorBasicDetailSchema,
    initialValues: {
      name: (newVendor && newVendor?.fullName) || "",
      number: (newVendor && newVendor?.mobileNumber) || "",
      email: (newVendor && newVendor?.email) || "",
      zipcode:
        (newVendor && newVendor?.vendor?.zipcodeIds) ||
        ([] as (number | null)[]),
      status: (newVendor && newVendor?.vendor?.status.toString()) || "1",
      image: (newVendor && newVendor?.profileImage) || "",
    },
    onSubmit: (values, { resetForm }) => {
      if (vendorId !== "new" && newVendor?.id) {
        dispatch(
          updateVendorActionThunk(
            {
              fullName: values.name,
              email: values.email,
              countryCode: "+1",
              mobileNumber: values.number,
              userType: "vendor",
              zipcodeIds: values.zipcode,
              status: values.status,
              currentTab: 1,
            },
            vendorId,
            function () {
              setTabValue(2);
              history.push(history?.location?.pathname, { tab: 2 });
            }
          )
        );
      } else {
        dispatch(
          addVendorActionThunk({
            fullName: values.name,
            email: values.email,
            countryCode: "+1",
            mobileNumber: values.number,
            zipcodeIds: values.zipcode,
            userType: "vendor",
            status: values.status,
          })
        );
      }
    },
  });

  const { errors, touched } = formik;

  return (
    <div className="tab-pane fadeIn active" id="tab-1">
      {!loading && Number(state?.tab) === 1 ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="card-body">
            <div className="d-flex flex-wrap">
              <div className="left-form-content">
                <div
                  className="fileinput text-center fileinput-new"
                  data-provides="fileinput"
                >
                  <div className="btn-file mt-3">
                    <div
                      className="thumbnail fileinput-new uploaded-user-image rounded-circle"
                      style={{
                        height: "150px",
                        width: "150px",
                      }}
                    >
                      <img
                        src={
                          formik.values?.image
                            ? formik?.values?.image?.toString()
                            : NoImage
                        }
                        alt="Image"
                      />
                    </div>
                    <div className="clearfix"></div>
                    <button className="fileinput-new btn btn-primary2 btn-sm btn-file mt-3">
                      {" "}
                      Browse Image{" "}
                    </button>
                    <input type="hidden" value="" name="..." />
                    <input type="hidden" value="" name="Users[image]" />
                    <input
                      type="file"
                      onChange={(e) => {
                        const reader = new FileReader();
                        const file = e.target.files && e.target.files[0];
                        if (file) {
                          reader.readAsDataURL(file);
                          reader.onload = () =>
                            formik.setValues({
                              ...formik.values,
                              image: reader ? (reader?.result as string) : "",
                            });
                        }
                      }}
                      file-model="myFile"
                      name=""
                    />
                    <div
                      className="fileinput-preview fileinput-exists thumbnail uploaded-user-image rounded-circle"
                      style={{
                        height: "150px",
                        width: "150px",
                      }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() =>
                        formik.setValues({ ...formik.values, image: "" })
                      }
                      className="btn btn-link btn-sm fileinput-exists mt-3"
                      data-dismiss="fileinput"
                    >
                      {" "}
                      Remove{" "}
                    </button>
                  </div>
                  <div className="clearfix mt-3">
                    <p className="upload-img-label text-muted">
                      *Recommended Size:
                      <br />
                      Minimum 250 * 250
                    </p>
                  </div>
                  {errors.image && touched.image && (
                    <div className="text-danger">{errors.image}</div>
                  )}
                </div>
              </div>
              <div className="row flex">
                <div className="col-xl-8">
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formik.values.name}
                          placeholder="Full Name"
                          className="form-control"
                          onChange={formik.handleChange}
                        />
                        {errors.name && touched.name && (
                          <div className="text-danger">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          Mobile Number <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <div className="input-group-text">+1</div>
                          </div>
                          <input
                            onChange={formik.handleChange}
                            value={formik.values.number}
                            name="number"
                            type="number"
                            className="form-control"
                            placeholder="Mobile Number"
                          />
                        </div>
                        {errors.number && touched.number && (
                          <div className="text-danger">{errors.number}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          Email Id <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          className="form-control"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                        />
                        {errors.email && touched.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label">
                          Zipcode <span className="text-danger">*</span>
                        </label>
                        <Select
                          className="custom-select-dropdown"
                          value={(formik.values.zipcode || [])
                            ?.map((values) =>
                              (multiZipOptions || []).find(
                                (prod) => prod.value === Number(values)
                              )
                            )
                            .filter((prod) => prod && prod.value && prod.label)
                            .map((prod) => ({
                              label: prod?.label,
                              value: prod?.value,
                            }))}
                          closeMenuOnSelect={false}
                          options={multiZipOptions || []}
                          onChange={(value) => {
                            formik.setValues({
                              ...formik.values,
                              zipcode: value?.map((val) => val.value || null),
                            });
                          }}
                          placeholder="-- Select --"
                          isMulti
                        />
                        {errors.zipcode && touched.zipcode && (
                          <div className="text-danger">{errors.zipcode}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
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
                              name="status"
                              value={"1"}
                              id="status1"
                              checked={formik.values.status === "1"}
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
                              value={"0"}
                              name="status"
                              id="status2"
                              checked={formik.values.status === "0"}
                              onChange={formik.handleChange}
                            />
                            <div className="control__indicator"></div>
                          </label>
                        </div>
                      </div>
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
              onClick={() => history.push("/vendors/list")}
            >
              Cancel
            </button>
            <button type="submit" className={`btn btn-primary`}>
              Next
            </button>
          </div>
        </form>
      ) : (
        <BarsLoader />
      )}
    </div>
  );
};

export default BasicDetails;

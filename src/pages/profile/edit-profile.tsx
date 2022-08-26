import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Sidebar } from "../../components/sidebar/sidebar";
import NoImage from "../../assets/img/image.png";
import TRootState from "../../store/root.types";
import { editProfileActionThunk } from "../../store/profile/profile.actions.async";

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const adminProfile: any = useSelector((state: TRootState) => state.profile.profileData);

  /**
   * Validation for profile values
   */
  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name required"),
    mobileNo: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Mobile Number required"),
    email: Yup.string().email("Enter valid email").required("Email required"),
    address: Yup.string().required("Address required"),
  });

  /**
   * Submit handler for profile update
   */
  /**
   * TODO: Address and image update
   */
  const formikProfile = useFormik({
    initialValues: {
      image: adminProfile?.profileImage || "",
      fullName: adminProfile?.fullName || "",
      mobileNo: adminProfile?.mobileNumber || "",
      email: adminProfile?.email || "",
      address: "656 Chatham Way, Washington, MD, Maryland, 20008, USA",
    },

    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      dispatch(
        editProfileActionThunk(adminProfile?.id || "", {
          profileImage: "https://via.placeholder.com/600/45601a",
          fullName: values.fullName,
          countryCode: "+1",
          mobileNumber: values.mobileNo,
          email: values.email,
        })
      );
    },
  });

  const { errors, touched } = formikProfile;

  /**
   * Get image file from input
   * Read through as data url using file reader
   * And set result values as string to profile image
   * @param e
   */
  const imageSelectOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        formikProfile.setValues({
          ...formikProfile.values,
          image: reader ? (reader?.result as string) : "",
        });
      };
    }
  };

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Edit Profile</h1>
                </div>
                <div className="m-l-10">
                  <button className="btn btn-secondary" onClick={() => history.push("/settings/profile")}>
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <form
                  className="form-horizontal"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formikProfile.handleSubmit();
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex flex-wrap">
                      <div className="left-form-content">
                        <div className="fileinput text-center fileinput-new" data-provides="fileinput">
                          <div className="btn-file mt-3">
                            <div
                              className="thumbnail fileinput-new uploaded-user-image rounded-circle"
                              style={{ height: "150px", width: "150px" }}
                            >
                              <img
                                src={formikProfile.values.image || NoImage}
                                alt="uploaded user thumbnail"
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
                              file-model="myFile"
                              name=""
                              accept="image/*"
                              onChange={(e) => imageSelectOnChangeHandler(e)}
                            />
                            <div
                              className="fileinput-preview fileinput-exists thumbnail uploaded-user-image rounded-circle"
                              style={{ height: "150px", width: "150px" }}
                            ></div>
                          </div>
                          <div className="text-center">
                            <button
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
                        </div>
                      </div>
                      <div className="row flex">
                        <div className="col-xl-8">
                          <div className="form-group">
                            <label>Full name</label>

                            <input
                              type="text"
                              name="fullName"
                              placeholder="Full name"
                              className="form-control"
                              onChange={formikProfile.handleChange}
                              onBlur={formikProfile.handleBlur}
                              value={formikProfile.values.fullName}
                            />
                            {errors.fullName && touched.fullName && (
                              <div className="text-danger">{errors.fullName as string}</div>
                            )}
                          </div>
                          <div className="form-row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">Mobile Number</label>
                                <div className="input-group remove-arrow">
                                  <div className="input-group-prepend">
                                    <div className="input-group-text">+1</div>
                                  </div>
                                  <input
                                    type="text"
                                    name="mobileNo"
                                    placeholder="Mobile number"
                                    className="form-control"
                                    onChange={formikProfile.handleChange}
                                    onBlur={formikProfile.handleBlur}
                                    value={formikProfile.values.mobileNo}
                                  />
                                </div>
                                {errors.mobileNo && touched.mobileNo && (
                                  <div className="text-danger">{errors.mobileNo as string}</div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">Email</label>
                                <input
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  className="form-control"
                                  onChange={formikProfile.handleChange}
                                  onBlur={formikProfile.handleBlur}
                                  value={formikProfile.values.email}
                                />
                                {errors.email && touched.email && (
                                  <div className="text-danger">{errors.email as string}</div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="control-label">Address</label>
                            <textarea
                              name="address"
                              placeholder="Address"
                              className="form-control"
                              onChange={formikProfile.handleChange}
                              onBlur={formikProfile.handleBlur}
                              value={formikProfile.values.address}
                            />
                            {errors.address && touched.address && (
                              <div className="text-danger">{errors.address}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-light text-right">
                    <button
                      type="button"
                      className="btn btn-secondary clear-form mr-2"
                      onClick={() => history.push("/settings/profile")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditProfile;

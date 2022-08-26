import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import TRootState from "../../store/root.types";
import { updateVendorActionThunk } from "../../store/vendor/vendor.action.async";
import { BarsLoader } from "../loader/Loader";

// interface BusinessProof {
//   file: string | null;
// }

interface Prop {
  tabValue: number;
  setTabValue: Function;
}

const BusinessDetails: React.FC<Prop> = ({ setTabValue, tabValue }) => {
  const history = useHistory();

  const { vendorId } = useParams<{ vendorId: string }>();
  const vendor = useSelector(
    (state: TRootState) => state?.vendor?.singleVendorData?.vendor
  );
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);
  const dispatch = useDispatch();
  const vendorBusinessDetailSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    image: yup.array().of(
      yup.object().shape({
        file: yup.mixed().required("Document is required").nullable(true),
        url: yup.string(),
      })
    ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: vendorBusinessDetailSchema,
    initialValues: {
      name: (vendor && vendor?.businessName) || "",
      address: (vendor && vendor?.businessAddress) || "",
      image: [{}],
    },
    onSubmit: (values) => {
      dispatch(
        updateVendorActionThunk(
          {
            businessName: values.name,
            businessAddress: values.address,
            businessProof: [
              {
                documentType: 1,
                documentUrl: "https://blog.hubspot.com/hubfs/parts-url.jpg",
              },
            ],
            currentTab: tabValue,
          },
          vendorId,
          function () {
            setTabValue(3);
            history.push(history?.location?.pathname, {
              tab: 3,
            });
          }
        )
      );
    },
  });
  // const [newVendorBusinessProof, setNewVendorBusinessProof] = useState<
  //   BusinessProof[]
  // >([{ file: null }]);

  const handleBusiness = (
    index: number,
    file: File | null | string,
    url?: string
  ) => {
    const documents = [...formik.values?.image];
    documents[index] = { file: file, url };
    formik.setValues({
      ...formik.values,
      image: documents,
    });
  };
  const deleteBusinessProof = (index: number) => {
    const updatedProofs = [...formik.values.image];
    updatedProofs.splice(index, 1);
    formik.setValues({ ...formik.values, image: updatedProofs });
  };

  const { errors, touched } = formik;
  return (
    <div className="tab-pane fadeIn active" id="tab-2">
      {loading ? (
        <BarsLoader />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="card-body">
            <div className="row flex">
              <div className="col-xl-7">
                <div className="form-row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label">
                        Business Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Business Name"
                        className="form-control"
                        value={formik.values.name}
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
                        Business Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Business Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      {errors.address && touched.address && (
                        <div className="text-danger">{errors.address}</div>
                      )}
                    </div>
                  </div>
                  {formik.values.image?.map((proof: any, index) => (
                    <div className="col-md-12" key={index}>
                      <div className="form-group m-b-0">
                        <label className="control-label">
                          Business Proof Attachment{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div
                          className="fileinput fileinput-new w-350 m-0 d-flex"
                          data-provides="fileinput"
                        >
                          <div className="input-group input-large">
                            <div
                              className="form-control"
                              data-trigger="fileinput"
                            >
                              <i className="fa fa-file fileinput-exists0"></i>
                              &nbsp;
                              <span className="fileinput-filename"> </span>
                            </div>
                            <span className="input-group-addon btn btn-file fileinput-new">
                              <span className="fileinput-new"> Upload </span>
                              <input
                                type="file"
                                name="image"
                                onChange={(e) => {
                                  const reader = new FileReader();
                                  reader.readAsDataURL(
                                    e.target.files
                                      ? e.target.files[0]
                                      : new Blob()
                                  );
                                  reader.onload = () =>
                                    handleBusiness(
                                      index,
                                      e.target.files ? e.target.files[0] : null,
                                      reader ? (reader?.result as string) : ""
                                    );
                                }}
                              />
                            </span>
                            <button
                              className="input-group-addon btn fileinput-exists"
                              data-dismiss="fileinput"
                            >
                              {" "}
                              Remove{" "}
                            </button>
                          </div>
                          <div
                            className="fileinput-preview fileinput-exists mt-2"
                            data-trigger="fileinput"
                          ></div>
                          {formik.values?.image?.length > 1 && (
                            <div className="form-group ml-2">
                              <button
                                type="button"
                                className="btn btn-danger px-3"
                                onClick={() => deleteBusinessProof(index)}
                              >
                                <i className="fa fa-trash-alt font-size-12 text-white"></i>
                              </button>
                            </div>
                          )}
                          {/* {proof?.url && (
                            <img
                              height={50}
                              width={50}
                              src={proof?.url || ""}
                              alt="business document"
                            />
                          )} */}
                        </div>
                        {errors?.image &&
                          errors.image[index] &&
                          touched.image &&
                          touched.image[index] && (
                            <div
                              className="text-danger"
                              style={{
                                marginTop:
                                  formik.values?.image?.length === 1
                                    ? "0rem"
                                    : "-0.9rem",
                              }}
                            >
                              {(errors.image[index] as { file: string })?.file}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label d-block">&nbsp;</label>
                      <button
                        type="button"
                        className="btn btn-dark h-35 lh-18 px-3"
                        onClick={() =>
                          formik.setValues({
                            ...formik?.values,
                            image: [...formik.values.image, { file: "" }],
                          })
                        }
                      >
                        <i className="fa fa-plus font-size-12 ml-0 text-white"></i>{" "}
                        Add More
                      </button>
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
              onClick={() => {
                setTabValue(1);
                history.push(history?.location?.pathname, { tab: 1 });
              }}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BusinessDetails;

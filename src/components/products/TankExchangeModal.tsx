import React from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import Select from "react-select";
import _ from "lodash";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addProductsActionThunk,
  updateProductActionThunk,
} from "../../store/products/products.action.async";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";

interface Prop {
  show: boolean;
  setShow: Function;
  setProductDetails: Function;
  categories: { value: string; label: string }[];
  productId: string;
  addNew: boolean;
}

const TankExchangeModal: React.FC<Prop> = ({
  show,
  setShow,
  categories,
  addNew,
  setProductDetails,
}) => {
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);

  const { singleProductData } = useSelector(
    (state: TRootState) => state?.products
  );

  const loading = useSelector((state: TRootState) => state?.products?.loading);

  const tankExchangeProductSchema = yup.object().shape({
    name: yup.string().required("Please enter the name"),
    logo: yup.string(),
    details: yup.array().of(
      yup.object().shape({
        category: yup.object().shape({
          id: yup.string(),
          name: yup.string().required("Category is required"),
        }),
        indexPrice: yup
          .number()
          .min(1, "Price must be greater than 0")
          .required("Index price is required"),
        discount: yup
          .number()
          .min(0, "Percentage must be greater than 0")
          .max(100, "Percentage must be less than 100")
          .required("Discount is required"),
        isDeleted: yup.boolean(),
      })
    ),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: tankExchangeProductSchema,
    initialValues: {
      name: (singleProductData && !addNew && singleProductData?.name) || "",
      logo: (singleProductData && !addNew && singleProductData?.logo) || "",
      status:
        singleProductData &&
        !addNew &&
        singleProductData?.status?.toString() === "0"
          ? 0
          : 1,
      details:
        singleProductData && !addNew && singleProductData?.details?.length > 0
          ? singleProductData?.details
          : [
              {
                category: { id: "", name: "" },
                indexPrice: "",
                discount: "",
              },
            ],
    },
    onSubmit: (values, { resetForm }) => {
      if (!addNew && singleProductData) {
        dispatch(
          updateProductActionThunk(
            singleProductData?.id,
            values?.name,
            2,
            values?.status,
            values?.logo,
            values?.details
          )
        );
      } else {
        dispatch(
          addProductsActionThunk(
            values?.name,
            2,
            values?.status,
            "https://blog.hubspot.com/hubfs/parts-url.jpg",
            values?.details
          )
        );
        resetForm();
      }
      handleClose();
    },
  });

  const addMore = () => {
    if (
      formik.values?.details?.filter((detail) => !detail?.isDeleted).length <
      categories?.length
    ) {
      formik.setValues({
        ...formik?.values,
        details: [
          ...formik?.values?.details,
          {
            category: { id: "", name: "" },
            indexPrice: "",
            discount: "",
          },
        ],
      });
    }
  };

  const updateChange = (
    index: number,
    name: string,
    value: { id: string; name: string } | string
  ) => {
    const updateChange = JSON.parse(JSON.stringify(formik.values?.details));
    updateChange[index][name] = value;
    formik.setValues(() => ({ ...formik.values, details: updateChange }));
    setProductDetails(updateChange);
  };

  const deleteNode = (id: number) => {
    if (
      formik?.values?.details?.filter((detail) => !detail?.isDeleted).length <
      categories?.length
    ) {
      return;
    }
    const deleteDetails = _.cloneDeep(formik.values?.details);
    if (addNew || !deleteDetails[id].id) {
      deleteDetails?.splice(id, 1);
    } else {
      deleteDetails[id] = { ...deleteDetails[id], isDeleted: true };
    }
    formik.setValues({ ...formik.values, details: deleteDetails });
    setProductDetails(deleteDetails);
  };

  const { errors, touched } = formik;

  return (
    <Modal size="lg" className="modal-custom" centered show={show}>
      <Modal.Header>
        <h4 className="modal-title">
          {addNew ? "Add New " : "Update "} Product
        </h4>
        <button className="close" onClick={() => handleClose()}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          {!loading ? (
            <>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label">
                      Product Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Product Name"
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
                      Product Logo <span className="text-danger">*</span>
                    </label>
                    <div
                      className="fileinput fileinput-new w-100p m-0"
                      data-provides="fileinput"
                    >
                      <div className="input-group input-large">
                        <div className="form-control" data-trigger="fileinput">
                          <i className="fa fa-file fileinput-exists0"></i>&nbsp;
                          <span className="fileinput-filename"> </span>
                        </div>
                        <span className="input-group-addon btn btn-file fileinput-new">
                          <span className="fileinput-new"> Upload </span>
                          <input type="file" name="..." />
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
                    </div>
                    {errors.logo && touched.logo && (
                      <div className="text-danger">{errors.logo}</div>
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
                          value={1}
                          name="status"
                          id="status1"
                          checked={Number(formik.values?.status) === 1}
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
                          checked={Number(formik.values?.status) === 0}
                          onChange={formik.handleChange}
                        />
                        <div className="control__indicator"></div>
                      </label>
                      <label>
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip01`}>
                              You can add {categories?.length}{" "}
                              {categories?.length > 1
                                ? "categories"
                                : "category"}
                            </Tooltip>
                          }
                        >
                          <i className="fa fa-info-circle ml-2"></i>
                        </OverlayTrigger>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {formik.values.details?.map(
                (product, id) =>
                  !product?.isDeleted && (
                    <div className="form-row" key={product.id || id}>
                      <div className="col-md-10">
                        <div className="form-row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="control-label">
                                Category <span className="text-danger">*</span>
                              </label>
                              <Select
                                className="custom-select-dropdown"
                                value={
                                  product?.category?.name
                                    ? (categories || []).find(
                                        (prod) =>
                                          Number(prod?.value) ===
                                          Number(product?.category?.id)
                                      ) || null
                                    : null
                                }
                                onChange={(val) => {
                                  updateChange(id, "category", {
                                    id: val?.value || "",
                                    name: val?.label || "",
                                  });
                                }}
                                placeholder="-- Select --"
                                options={
                                  categories.filter(
                                    (category) =>
                                      !(formik.values?.details || [])
                                        ?.filter((detail) => !detail?.isDeleted)
                                        ?.map((detail) =>
                                          Number(detail?.category?.id)
                                        )
                                        ?.includes(Number(category?.value))
                                  ) || []
                                }
                              />
                              {errors?.details &&
                                errors?.details[id] &&
                                touched?.details &&
                                touched?.details[id] && (
                                  <div className="text-danger">
                                    {
                                      (errors.details[id] as {
                                        category?:
                                          | { id: string; name: string }
                                          | undefined;
                                      })?.category?.name
                                    }
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="control-label">
                                Index Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                <input
                                  type="number"
                                  step={0.01}
                                  className="form-control"
                                  name="indexPrice"
                                  value={product?.indexPrice}
                                  onChange={(e) =>
                                    updateChange(
                                      id,
                                      "indexPrice",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              {errors?.details &&
                                errors?.details[id] &&
                                touched?.details &&
                                touched?.details[id] && (
                                  <div className="text-danger">
                                    {
                                      (errors.details[id] as {
                                        indexPrice: string;
                                      })?.indexPrice
                                    }
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="form-group">
                              <label className="control-label">
                                Product Discount{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  step={0.01}
                                  className="form-control"
                                  value={product?.discount}
                                  onChange={(e) =>
                                    updateChange(id, "discount", e.target.value)
                                  }
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text">%</span>
                                </div>
                              </div>
                              {errors?.details &&
                                errors?.details[id] &&
                                touched?.details &&
                                touched?.details[id] && (
                                  <div className="text-danger">
                                    {
                                      (errors.details[id] as {
                                        discount: string;
                                      })?.discount
                                    }
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {formik?.values?.details?.filter(
                        (detail) => !detail?.isDeleted
                      ).length < categories?.length ? (
                        <div className="col-md-2">
                          <div className="form-group">
                            <label className="control-label d-block">
                              &nbsp;
                            </label>
                            <button
                              type="button"
                              className="btn btn-dark px-3"
                              onClick={addMore}
                            >
                              <i className="fa fa-plus font-size-12 text-white"></i>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-2">
                          <div className="form-group">
                            <label className="control-label d-block">
                              &nbsp;
                            </label>

                            <button
                              type="button"
                              className="btn btn-danger px-3"
                              onClick={() => deleteNode(id)}
                            >
                              <i className="fa fa-trash-alt font-size-12 text-white"></i>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
              )}
            </>
          ) : (
            <BarsLoader />
          )}
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

export default TankExchangeModal;

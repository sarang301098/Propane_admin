import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { components } from "react-select";
import makeAnimated from "react-select/animated";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Sidebar } from "../../components/sidebar/sidebar";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import TRootState from "../../store/root.types";
import { MultiSelectCheckbox } from "../../components";
import { editMembershipPlansActionThunk } from "../../store/membershipPlan/membershipPlans.actions.async";
import { replaceJSX } from "../../utils/helpers/replaceJsx";

const allOption = {
  label: "Select all",
  value: "*",
};

const ValueContainer = ({ children, ...props }: any) => {
  const currentValues = props.getValue();
  let toBeRendered = children;
  if (currentValues.some((val: any) => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

const MultiValue = (props: any) => {
  let labelToBeDisplayed = `${props.data.label}`;
  if (props.data.value === allOption.value) {
    labelToBeDisplayed = "All is selected";
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};
const animatedComponents = makeAnimated();

const MemberShipPlanFuelForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const productList = useSelector((state: TRootState) =>
    state.products.productsData.products.fuelDeliveryProducts.map((prod) => ({
      label: prod.name,
      value: prod.id.toString(),
    }))
  );

  const fuelMembershipById = useSelector(
    (state: TRootState) => state.membershipPlans.membershipPlansById
  );

  const monthlyPeriod1 = fuelMembershipById?.prices.filter(
    (month) => month.period === 1
  );
  const yearlyPeriod2 = fuelMembershipById?.prices.filter(
    (year) => year.period === 2
  );
  const monthlyDetailsKey1 = monthlyPeriod1[0]?.details?.filter(
    (detail) => detail.key === 1
  );
  const monthlyDetailsKey2 = monthlyPeriod1[0]?.details?.filter(
    (detail) => detail.key === 2
  );
  const yearlyDetailsKey1 = yearlyPeriod2[0]?.details?.filter(
    (detail) => detail.key === 1
  );
  const yearlyDetailsKey2 = yearlyPeriod2[0]?.details?.filter(
    (detail) => detail.key === 2
  );

  // const [planName, setPlanName] = useState(fuelMembershipById?.name);
  // const [selectedProduct, setSelectedProduct] = useState(
  //   fuelMembershipById?.productIds?.length > 0
  //     ? productList?.filter((show) => fuelMembershipById?.productIds?.includes(show.value)) || null
  //     : null
  // );

  // const [monthlyPriceCheckbox, setMonthlyPriceCheckbox] = useState(monthlyPeriod1[0]?.isActive);
  // const [monthlyPrice, setMonthlyPrice] = useState(monthlyPeriod1[0]?.price);
  // const [monthlyPriceOff, setMonthlyPriceOff] = useState(monthlyDetailsKey2[0]?.value);
  // const [yearlyPriceCheckbox, setYearlyPriceCheckbox] = useState(yearlyPeriod2[0]?.isActive);
  // const [yearlyPrice, setYearlyPrice] = useState(yearlyPeriod2[0]?.price);
  // const [yearlyPriceOff, setYearlyPriceOff] = useState(yearlyDetailsKey2[0]?.value);
  // const [planStatus, setPlanStatus] = useState(fuelMembershipById?.isActive ? "active" : "inactive");

  /**
   * edit fuel membership plan submit handler
   */
  // const editFuelMembershipPlanHandler = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (planName === "") {
  //     warningToast("Please enter plan name");
  //   } else if ((selectedProduct || []).length < 1) {
  //     warningToast("Please select product");
  //   } else {
  //     dispatch(
  //       editMembershipPlansActionThunk(
  //         {
  //           membershipPlan: {
  //             id: fuelMembershipById?.id,
  //             name: planName,
  //             productIds:
  //               (selectedProduct || []).length > 0
  //                 ? selectedProduct?.map((list) => list.value)?.filter((all) => all !== "*") || null
  //                 : null,
  //             isActive: planStatus === "active" ? true : false,
  //           },

  //           prices: [
  //             {
  //               id: monthlyPeriod1[0]?.id,
  //               price: monthlyPrice,
  //               isActive: monthlyPriceCheckbox,
  //             },
  //             {
  //               id: yearlyPeriod2[0]?.id,
  //               price: yearlyPrice,
  //               isActive: yearlyPriceCheckbox,
  //             },
  //           ],

  //           details: [
  //             {
  //               id: monthlyDetailsKey2[0]?.id,
  //               value: monthlyPriceOff,
  //             },
  //             {
  //               id: yearlyDetailsKey2[0]?.id,
  //               value: yearlyPriceOff,
  //             },
  //           ],
  //         },
  //         history,
  //         "fuel-delivery"
  //       )
  //     );
  //   }
  // };

  /**
   * Validation for fuel plan
   */
  const planFuelSchema = Yup.object().shape({
    planName: Yup.string()
      .required("This field is required")
      .max(255, "Name is too large (maximum is 255 characters)"),
    selectedProduct: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string(),
          label: Yup.string(),
        })
      )
      .min(1, "Please select product"),
    monthlyPriceCheckbox: Yup.boolean(),
    monthlyPrice: Yup.number()
      .min(0, "Value must be positive")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    monthlyPriceOff: Yup.number()
      .min(0, "Value must be positive")
      .max(100, "Value must be less than or equal to 100")
      .required("This field is required"),
    yearlyPriceCheckbox: Yup.boolean(),
    yearlyPrice: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    yearlyPriceOff: Yup.number()
      .min(0, "Value must be positive.")
      .max(100, "Value must be less than or equal to 100")
      .required("This field is required"),
  });

  /**
   * Submit handler for fuel plan update
   */
  const formikPlanfuel = useFormik({
    initialValues: {
      planName: fuelMembershipById?.name || "",
      selectedProduct:
        fuelMembershipById?.productIds?.length > 0
          ? productList?.filter((show) =>
              (fuelMembershipById?.productIds || [])?.includes(show.value)
            ) || null
          : null,
      monthlyPriceCheckbox: monthlyPeriod1[0]?.isActive || false,
      monthlyPrice: monthlyPeriod1[0]?.price || 0,
      monthlyPriceOff: monthlyDetailsKey2[0]?.value || 0,
      yearlyPriceCheckbox: yearlyPeriod2[0]?.isActive || false,
      yearlyPrice: yearlyPeriod2[0]?.price || 0,
      yearlyPriceOff: yearlyDetailsKey2[0]?.value || 0,
      planStatus:
        (fuelMembershipById?.isActive ? "active" : "inactive") || "inactive",
    },

    validationSchema: planFuelSchema,
    onSubmit: (values) => {
      dispatch(
        editMembershipPlansActionThunk(
          {
            membershipPlan: {
              id: fuelMembershipById?.id,
              name: values.planName,
              productIds:
                (values.selectedProduct || []).length > 0
                  ? values.selectedProduct
                      ?.map((list) => list.value)
                      ?.filter((all) => all !== "*") || null
                  : null,
              isActive: values.planStatus === "active" ? true : false,
            },

            prices: [
              {
                id: monthlyPeriod1[0]?.id,
                isActive: values.monthlyPriceCheckbox,
                price: values.monthlyPrice,
              },
              {
                id: yearlyPeriod2[0]?.id,
                isActive: values.yearlyPriceCheckbox,
                price: values.yearlyPrice,
              },
            ],

            details: [
              {
                id: monthlyDetailsKey2[0]?.id,
                value: values.monthlyPriceOff,
              },
              {
                id: yearlyDetailsKey2[0]?.id,
                value: values.yearlyPriceOff,
              },
            ],
          },
          history,
          "fuel-delivery"
        )
      );
    },
  });

  const { errors, touched } = formikPlanfuel;

  /**
   * getting latest data of products
   */
  useEffect(() => {
    dispatch(getProductsActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Edit Membership Plan</h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      history.push("/settings/membership-plans/fuel-delivery")
                    }
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <form>
                  <div className="card-body pb-0">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="form-row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Plan Name <span className="text-danger">*</span>
                              </label>
                              {/* <input
                                type="text"
                                className="form-control"
                                placeholder="Plan name"
                                value={planName}
                                onChange={(e) => setPlanName(e.target.value)}
                              /> */}
                              <input
                                type="text"
                                name="planName"
                                placeholder="Plan name"
                                className="form-control"
                                onChange={formikPlanfuel.handleChange}
                                onBlur={formikPlanfuel.handleBlur}
                                value={formikPlanfuel.values.planName}
                              />

                              {errors.planName && touched.planName && (
                                <span className="text-danger">
                                  {errors.planName}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Product <span className="text-danger">*</span>
                              </label>
                              <div data-toggle="popover" data-trigger="focus">
                                <MultiSelectCheckbox
                                  className="custom-select-dropdown"
                                  options={productList || []}
                                  isMulti
                                  closeMenuOnSelect={false}
                                  hideSelectedOptions={true}
                                  components={{
                                    // Option,
                                    MultiValue,
                                    ValueContainer,
                                    animatedComponents,
                                  }}
                                  allowSelectAll={true}
                                  // onChange={(selected: { label: string; value: string }[]) =>
                                  //   setSelectedProduct(selected)
                                  // }

                                  onChange={(
                                    selected: { label: string; value: string }[]
                                  ) => {
                                    formikPlanfuel.setValues({
                                      ...formikPlanfuel.values,
                                      selectedProduct: selected,
                                    });
                                  }}
                                  value={formikPlanfuel.values.selectedProduct}
                                  placeholder="-- Select --"
                                />
                                {errors.selectedProduct &&
                                  touched.selectedProduct && (
                                    <span className="text-danger">
                                      {errors.selectedProduct}
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label d-block">
                                <div className="d-flex align-items-center">
                                  Price (Monthly){" "}
                                  <span className="text-danger">*</span>
                                  <div className="align-self-center ml-auto">
                                    {/* <input
                                      className="tgl tgl-light tgl-primary"
                                      id="cb4"
                                      type="checkbox"
                                      checked={monthlyPriceCheckbox}
                                      onChange={(e) => {
                                        setMonthlyPriceCheckbox(e.target.checked);
                                      }}
                                    /> */}
                                    <input
                                      id="cb4"
                                      type="checkbox"
                                      name="monthlyPriceCheckbox"
                                      className="tgl tgl-light tgl-primary"
                                      onChange={formikPlanfuel.handleChange}
                                      onBlur={formikPlanfuel.handleBlur}
                                      checked={
                                        formikPlanfuel.values
                                          .monthlyPriceCheckbox
                                      }
                                    />
                                    <label
                                      className="tgl-btn m-0"
                                      htmlFor="cb4"
                                    ></label>
                                  </div>
                                </div>
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                {/* <input
                                  type="number"
                                  className="form-control"
                                  value={monthlyPrice}
                                  onChange={(e) => setMonthlyPrice(+e.target.value)}
                                  min={0}
                                  step="0.01"
                                  required
                                /> */}
                                <input
                                  type="number"
                                  name="monthlyPrice"
                                  className="form-control"
                                  onChange={formikPlanfuel.handleChange}
                                  onBlur={formikPlanfuel.handleBlur}
                                  value={formikPlanfuel.values.monthlyPrice}
                                />
                              </div>
                              {errors.monthlyPrice && touched.monthlyPrice && (
                                <span className="text-danger">
                                  {errors.monthlyPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <h4 className="font-weight-600 mt-1 mb-3">
                              Description <span className="text-danger">*</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-bordered m-0">
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>{monthlyDetailsKey1[0]?.label}</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>
                              {replaceJSX(
                                monthlyDetailsKey2[0].label,
                                "{{VALUE}}",
                                <div className="d-inline-block w-100 mr-2">
                                  <div className="input-group">
                                    {/* <input
                                      type="number"
                                      className="form-control"
                                      value={monthlyPriceOff}
                                      onChange={(e) => setMonthlyPriceOff(+e.target.value)}
                                      min={0}
                                      step="0.01"
                                      required
                                    /> */}
                                    <input
                                      type="number"
                                      name="monthlyPriceOff"
                                      className="form-control"
                                      onChange={formikPlanfuel.handleChange}
                                      onBlur={formikPlanfuel.handleBlur}
                                      value={
                                        formikPlanfuel.values.monthlyPriceOff
                                      }
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <br />
                              {errors.monthlyPriceOff &&
                                touched.monthlyPriceOff && (
                                  <span className="text-danger">
                                    {errors.monthlyPriceOff as string}
                                  </span>
                                )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-body pb-0">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="form-row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label d-block">
                                <div className="d-flex align-items-center">
                                  Price (Yearly){" "}
                                  <span className="text-danger">*</span>
                                  <div className="align-self-center ml-auto">
                                    {/* <input
                                      className="tgl tgl-light tgl-primary"
                                      id="cb5"
                                      type="checkbox"
                                      checked={yearlyPriceCheckbox}
                                      onChange={(e) => {
                                        setYearlyPriceCheckbox(e.target.checked);
                                      }}
                                    /> */}
                                    <input
                                      id="cb5"
                                      type="checkbox"
                                      name="yearlyPriceCheckbox"
                                      className="tgl tgl-light tgl-primary"
                                      onChange={formikPlanfuel.handleChange}
                                      onBlur={formikPlanfuel.handleBlur}
                                      checked={
                                        formikPlanfuel.values
                                          .yearlyPriceCheckbox
                                      }
                                    />
                                    <label
                                      className="tgl-btn m-0"
                                      htmlFor="cb5"
                                    ></label>
                                  </div>
                                </div>
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">$</span>
                                </div>
                                {/* <input
                                  type="number"
                                  className="form-control"
                                  value={yearlyPrice}
                                  onChange={(e) => setYearlyPrice(+e.target.value)}
                                  min={0}
                                  step="0.01"
                                  required
                                /> */}
                                <input
                                  type="number"
                                  name="yearlyPrice"
                                  className="form-control"
                                  onChange={formikPlanfuel.handleChange}
                                  onBlur={formikPlanfuel.handleBlur}
                                  value={formikPlanfuel.values.yearlyPrice}
                                />
                              </div>
                              {errors.yearlyPrice && touched.yearlyPrice && (
                                <span className="text-danger">
                                  {errors.yearlyPrice}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12">
                            <h4 className="font-weight-600 mt-1 mb-3">
                              Description <span className="text-danger">*</span>
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table table-bordered m-0">
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>{yearlyDetailsKey1[0]?.label}</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>
                              {replaceJSX(
                                yearlyDetailsKey2[0]?.label,
                                "{{VALUE}}",
                                <div className="d-inline-block w-100 mr-2">
                                  <div className="input-group">
                                    {/* <input
                                      type="number"
                                      className="form-control"
                                      value={yearlyPriceOff}
                                      onChange={(e) => setYearlyPriceOff(+e.target.value)}
                                      min={0}
                                      step="0.01"
                                      required
                                    /> */}
                                    <input
                                      type="number"
                                      name="yearlyPriceOff"
                                      className="form-control"
                                      onChange={formikPlanfuel.handleChange}
                                      onBlur={formikPlanfuel.handleBlur}
                                      value={
                                        formikPlanfuel.values.yearlyPriceOff
                                      }
                                    />
                                    <div className="input-group-append">
                                      <span className="input-group-text">
                                        %
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}{" "}
                              <br />
                              {errors.yearlyPriceOff &&
                                touched.yearlyPriceOff && (
                                  <span className="text-danger">
                                    {errors.yearlyPriceOff as string}
                                  </span>
                                )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-8">
                        <div className="form-row">
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
                                  {/* <input
                                    type="radio"
                                    value="active"
                                    name="radio-1"
                                    id="status1"
                                    checked={planStatus === "active"}
                                    onChange={(e) => {
                                      setPlanStatus(e.target.value);
                                    }}
                                  /> */}
                                  <input
                                    id="status1"
                                    type="radio"
                                    name="planStatus"
                                    value="active"
                                    onChange={formikPlanfuel.handleChange}
                                    checked={
                                      formikPlanfuel.values.planStatus ===
                                      "active"
                                    }
                                  />
                                  <div className="control__indicator"></div>
                                </label>
                                <label
                                  className="control control-outline d-inline-block control-primary control--radio mb-0"
                                  htmlFor="status2"
                                >
                                  {" "}
                                  Inactive
                                  {/* <input
                                    type="radio"
                                    value="inactive"
                                    name="radio-1"
                                    id="status2"
                                    checked={planStatus === "inactive"}
                                    onChange={(e) => {
                                      setPlanStatus(e.target.value);
                                    }}
                                  /> */}
                                  <input
                                    id="status2"
                                    type="radio"
                                    name="planStatus"
                                    value="inactive"
                                    onChange={formikPlanfuel.handleChange}
                                    checked={
                                      formikPlanfuel.values.planStatus ===
                                      "inactive"
                                    }
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
                  <div className="card-footer bg-light text-right">
                    <button
                      type="button"
                      className="btn btn-secondary clear-form mr-2"
                      onClick={() =>
                        history.push("/settings/membership-plans/fuel-delivery")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => formikPlanfuel.handleSubmit()}
                    >
                      Submit
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

export default MemberShipPlanFuelForm;

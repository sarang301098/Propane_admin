import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import _ from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Sidebar } from "../../components/sidebar/sidebar";
import TRootState from "../../store/root.types";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import { editMembershipPlansActionThunk } from "../../store/membershipPlan/membershipPlans.actions.async";
import { replaceJSX } from "../../utils/helpers/replaceJsx";
import MultiSelectGroup from "../../components/multi-group-select/MultiGroupSelect";

const createGroup = (
  groupName: string,
  options: { categoryIds?: any; label: string; value: string }[],
  setValue: any
) => {
  return {
    label: (() => {
      return (
        <div
          style={{ fontSize: "15px" }}
          onClick={() =>
            setValue((value: any) =>
              _.uniqBy(
                (value || [])?.concat(
                  (options || [])?.filter(
                    (grpOpt) => !(value || [])?.includes(grpOpt)
                  )
                ),
                "value"
              )
            )
          }
        >
          {groupName}
        </div>
      );
    })(),
    options: options,
  };
};

const MemberShipPlanPropaneTankForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const productList = useSelector((state: TRootState) =>
    state.products.productsData.products.tankExchangeProducts.map((prod) => ({
      categoryIds: prod.details.map((detail) =>
        detail.category?.id?.toString()
      ),
      label: prod.name,
      value: prod.id.toString(),
    }))
  );

  const categoryList = useSelector((state: TRootState) =>
    state.category.categories.categories.map((prod) => ({
      label: prod.name,
      value: prod.id.toString(),
    }))
  );
  const tankMembershipById = useSelector(
    (state: TRootState) => state.membershipPlans.membershipPlansById
  );

  const monthlyPeriod1 = tankMembershipById?.prices.filter(
    (month) => month.period === 1
  );
  const yearlyPeriod2 = tankMembershipById?.prices.filter(
    (year) => year.period === 2
  );
  const monthlyDetailsKey1 = monthlyPeriod1[0]?.details?.filter(
    (detail) => detail.key === 1
  );
  const monthlyDetailsKey2 = monthlyPeriod1[0]?.details?.filter(
    (detail) => detail.key === 2
  );
  const monthlyDetailsKey3 = monthlyPeriod1[0]?.details?.filter(
    (detail) => detail.key === 3
  );
  const monthlyDetailsKey4 = monthlyPeriod1[0]?.details?.filter(
    (detail) => detail.key === 4
  );
  const yearlyDetailsKey1 = yearlyPeriod2[0]?.details?.filter(
    (detail) => detail.key === 1
  );
  const yearlyDetailsKey2 = yearlyPeriod2[0]?.details?.filter(
    (detail) => detail.key === 2
  );
  const yearlyDetailsKey3 = yearlyPeriod2[0]?.details?.filter(
    (detail) => detail.key === 3
  );
  const yearlyDetailsKey4 = yearlyPeriod2[0]?.details?.filter(
    (detail) => detail.key === 4
  );

  // const [planName, setPlanName] = useState(tankMembershipById?.name);
  const [selectedProduct, setSelectedProduct] = useState(
    tankMembershipById?.productIds.length > 0
      ? productList?.filter((show) =>
          (tankMembershipById?.productIds || [])?.includes(show.value)
        ) || null
      : null
  );

  const [selectedCategory, setSelectedCategory] = useState(
    tankMembershipById?.categoryIds
  );
  // const [monthlyPriceCheckbox, setMonthlyPriceCheckbox] = useState(monthlyPeriod1[0]?.isActive);
  // const [monthlyPrice, setMonthlyPrice] = useState(monthlyPeriod1[0]?.price);
  // const [monthlyPriceOff, setMonthlyPriceOff] = useState(monthlyDetailsKey1[0]?.value);
  // const [monthlyMinProductLimit, setMonthlyMinProductLimit] = useState(monthlyDetailsKey2[0]?.value);
  // const [monthlyMaxProductLimit, setMonthlyMaxProductLimit] = useState(monthlyDetailsKey3[0]?.value);
  // const [monthlySaving, setMonthlySaving] = useState(monthlyDetailsKey4[0]?.value);
  // const [yearlyPriceCheckbox, setYearlyPriceCheckbox] = useState(yearlyPeriod2[0]?.isActive);
  // const [yearlyPrice, setYearlyPrice] = useState(yearlyPeriod2[0]?.price);
  // const [yearlyPriceOff, setYearlyPriceOff] = useState(yearlyDetailsKey1[0]?.value);
  // const [yearlyMinProductLimit, setYearlyMinProductLimit] = useState(yearlyDetailsKey2[0]?.value);
  // const [yearlyMaxProductLimit, setYearlyMaxProductLimit] = useState(yearlyDetailsKey3[0]?.value);
  // const [yearlySaving, setYearlySaving] = useState(yearlyDetailsKey4[0]?.value);
  // const [planStatus, setPlanStatus] = useState(tankMembershipById?.isActive ? "active" : "inactive");
  const [isOpen, setIsOpen] = useState(false);

  const spareTankProd: {
    categoryIds?: any;
    label: string;
    value: string;
  }[] = [];
  const exchangeProd: {
    categoryIds?: any;
    label: string;
    value: string;
  }[] = [];

  productList.forEach((prod) => {
    if ((prod?.categoryIds || [])?.includes("1")) {
      spareTankProd.push({
        categoryIds: prod.categoryIds,
        label: prod.label,
        value: prod.value,
      });
    }
    if ((prod?.categoryIds || [])?.includes("2")) {
      exchangeProd.push({
        categoryIds: prod.categoryIds,
        label: prod.label,
        value: prod.value,
      });
    }
  });

  const options = [
    createGroup("Spare Tank", spareTankProd, setSelectedProduct),
    createGroup("Exchange", exchangeProd, setSelectedProduct),
  ];

  /**
   * edit fuel membership plan submit handler
   */
  // const editTankMembershipPlanHandler = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (planName === "") {
  //     warningToast("Please enter plan name");
  //   } else if ((selectedCategory || []).length < 1) {
  //     warningToast("Please select category");
  //   } else if ((selectedProduct || []).length < 1) {
  //     warningToast("Please select product");
  //   } else {
  //     dispatch(
  //       editMembershipPlansActionThunk(
  //         {
  //           membershipPlan: {
  //             id: tankMembershipById?.id,
  //             name: planName,
  //             productIds:
  //               (selectedProduct || []).length > 0
  //                 ? selectedProduct?.map((list) => list.value)?.filter((all) => all !== "*") || null
  //                 : null,
  //             categoryIds: selectedCategory,
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
  //               id: monthlyDetailsKey1[0]?.id,
  //               value: monthlyPriceOff,
  //             },
  //             {
  //               id: monthlyDetailsKey2[0]?.id,
  //               value: monthlyMinProductLimit,
  //             },
  //             {
  //               id: monthlyDetailsKey3[0]?.id,
  //               value: monthlyMaxProductLimit,
  //             },
  //             {
  //               id: monthlyDetailsKey4[0]?.id,
  //               value: monthlySaving,
  //             },
  //             {
  //               id: yearlyDetailsKey1[0]?.id,
  //               value: yearlyPriceOff,
  //             },
  //             {
  //               id: yearlyDetailsKey2[0]?.id,
  //               value: yearlyMinProductLimit,
  //             },
  //             {
  //               id: yearlyDetailsKey3[0]?.id,
  //               value: yearlyMaxProductLimit,
  //             },
  //             {
  //               id: yearlyDetailsKey4[0]?.id,
  //               value: yearlySaving,
  //             },
  //           ],
  //         },
  //         history,
  //         "tank-exchange"
  //       )
  //     );
  //   }
  // };
  /**
   * Validation for tank plan
   */
  const planTankSchema = Yup.object().shape({
    planName: Yup.string()
      .required("This field is required")
      .max(255, "Name is too large (maximum is 255 characters)"),
    monthlyPriceCheckbox: Yup.boolean(),
    monthlyPrice: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    monthlyPriceOff: Yup.number()
      .min(0, "Value must be positive.")
      .max(100, "Value must be less than or equal to 100")
      .required("This field is required"),
    monthlyMinProductLimit: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    monthlyMaxProductLimit: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    monthlySaving: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
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
    yearlyMinProductLimit: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    yearlyMaxProductLimit: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
    yearlySaving: Yup.number()
      .min(0, "Value must be positive.")
      .max(99999999999, "Value is too large")
      .required("This field is required"),
  });

  /**
   * Submit handler for tank plan update
   */
  const formikPlanTank = useFormik({
    initialValues: {
      planName: tankMembershipById?.name || "",
      monthlyPriceCheckbox: monthlyPeriod1[0]?.isActive || false,
      monthlyPrice: monthlyPeriod1[0]?.price || 0,
      monthlyPriceOff: monthlyDetailsKey1[0]?.value || 0,
      monthlyMinProductLimit: monthlyDetailsKey2[0]?.value || 0,
      monthlyMaxProductLimit: monthlyDetailsKey3[0]?.value || 0,
      monthlySaving: monthlyDetailsKey4[0]?.value || 0,
      yearlyPriceCheckbox: yearlyPeriod2[0]?.isActive || false,
      yearlyPrice: yearlyPeriod2[0]?.price || 0,
      yearlyPriceOff: yearlyDetailsKey1[0]?.value || 0,
      yearlyMinProductLimit: yearlyDetailsKey2[0]?.value || 0,
      yearlyMaxProductLimit: yearlyDetailsKey3[0]?.value || 0,
      yearlySaving: yearlyDetailsKey4[0]?.value || 0,
      planStatus:
        (tankMembershipById?.isActive ? "active" : "inactive") || "inactive",
    },

    validationSchema: planTankSchema,
    onSubmit: (values) => {
      if ((selectedCategory || []).length < 1) {
        return;
      } else if ((selectedProduct || []).length < 1) {
        return;
      } else {
        dispatch(
          editMembershipPlansActionThunk(
            {
              membershipPlan: {
                id: tankMembershipById?.id,
                name: values.planName,
                productIds:
                  (selectedProduct || []).length > 0
                    ? selectedProduct
                        ?.map((list) => list.value)
                        ?.filter((all) => all !== "*") || null
                    : null,
                categoryIds: selectedCategory,
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
                  id: monthlyDetailsKey1[0]?.id,
                  value: values.monthlyPriceOff,
                },
                {
                  id: monthlyDetailsKey2[0]?.id,
                  value: values.monthlyMinProductLimit,
                },
                {
                  id: monthlyDetailsKey3[0]?.id,
                  value: values.monthlyMaxProductLimit,
                },
                {
                  id: monthlyDetailsKey4[0]?.id,
                  value: values.monthlySaving,
                },
                {
                  id: yearlyDetailsKey1[0]?.id,
                  value: values.yearlyPriceOff,
                },
                {
                  id: yearlyDetailsKey2[0]?.id,
                  value: values.yearlyMinProductLimit,
                },
                {
                  id: yearlyDetailsKey3[0]?.id,
                  value: values.yearlyMaxProductLimit,
                },
                {
                  id: yearlyDetailsKey4[0]?.id,
                  value: values.yearlySaving,
                },
              ],
            },
            history,
            "tank-exchange"
          )
        );
      }
    },
  });

  const { errors, touched } = formikPlanTank;

  /**
   * getting latest category
   */
  useEffect(() => {
    dispatch(getCategoryActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * set product based on category selection
   */
  const productSelection = () => {
    setSelectedProduct(
      selectedProduct?.filter(
        (a) =>
          (
            (a?.categoryIds || []).filter(
              (n: any) => selectedCategory.indexOf(n) !== -1
            ) || []
          ).length > 0
      ) as any
    );
  };

  /**
   * getting latest product based on category
   */
  useEffect(() => {
    dispatch(getProductsActionThunk("", undefined, selectedCategory));
    productSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory.length]);

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
                      history.push("/settings/membership-plans/tank-exchange")
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
                          <div className="col-md-12">
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
                                onChange={formikPlanTank.handleChange}
                                onBlur={formikPlanTank.handleBlur}
                                value={formikPlanTank.values.planName}
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
                                Category <span className="text-danger">*</span>
                              </label>
                              <Select
                                className="custom-select-dropdown"
                                value={(selectedCategory || [])
                                  .map((values) =>
                                    (categoryList || []).find(
                                      (prod) => prod.value === values
                                    )
                                  )
                                  .filter(
                                    (prod) => prod && prod.value && prod.label
                                  )
                                  .map((prod) => ({
                                    label: prod?.label,
                                    value: prod?.value,
                                  }))}
                                closeMenuOnSelect={false}
                                options={categoryList || []}
                                onChange={(value) => {
                                  setSelectedCategory(
                                    value?.map((val: any) => val?.value)
                                  );

                                  // setSelectedProduct(
                                  //   selectedProduct?.filter(
                                  //     (a) =>
                                  //       (
                                  //         (a?.categoryIds || []).filter(
                                  //           (n: any) => selectedCategory.indexOf(n) !== -1
                                  //         ) || []
                                  //       ).length > 0
                                  //   ) as any
                                  // );
                                  productSelection();
                                }}
                                placeholder="-- Select --"
                                isMulti
                                classNamePrefix="react-select-dropdown-multi"
                              />
                              {(selectedCategory || []).length < 1 ? (
                                <span className="text-danger">
                                  Please select category
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Product <span className="text-danger">*</span>
                              </label>
                              <div
                                data-toggle="popover"
                                data-trigger="focus"
                                onClick={() => setIsOpen(!isOpen)}
                                className="custom-select-dropdown"
                              >
                                <MultiSelectGroup
                                  options={
                                    selectedCategory.length > 0 ? options : []
                                  }
                                  onChange={(option: any) => {
                                    setSelectedProduct(option);
                                  }}
                                  value={
                                    selectedProduct?.filter(
                                      (a) =>
                                        (
                                          (a?.categoryIds || []).filter(
                                            (n: any) =>
                                              selectedCategory.indexOf(n) !== -1
                                          ) || []
                                        ).length > 0
                                    ) as any
                                  }
                                />
                                {(selectedProduct || []).length < 1 ? (
                                  <span className="text-danger">
                                    Please select product
                                  </span>
                                ) : null}
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
                                      onChange={formikPlanTank.handleChange}
                                      onBlur={formikPlanTank.handleBlur}
                                      checked={
                                        formikPlanTank.values
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
                                  min="0"
                                  step="0.01"
                                /> */}
                                <input
                                  type="number"
                                  name="monthlyPrice"
                                  className="form-control"
                                  onChange={formikPlanTank.handleChange}
                                  onBlur={formikPlanTank.handleBlur}
                                  value={formikPlanTank.values.monthlyPrice}
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
                            <td>
                              {replaceJSX(
                                monthlyDetailsKey1[0]?.label,
                                "{{VALUE}}",
                                <div className="d-inline-block w-75 mr-2">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        $
                                      </span>
                                    </div>
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
                                      onChange={formikPlanTank.handleChange}
                                      onBlur={formikPlanTank.handleBlur}
                                      value={
                                        formikPlanTank.values.monthlyPriceOff
                                      }
                                    />
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

                          <tr>
                            <td>2</td>
                            <td>
                              {replaceJSX(
                                monthlyDetailsKey2[0]?.label,
                                "{{VALUE}}",
                                // <input
                                //   type="number"
                                //   className="form-control w-50 d-inline-block mx-2"
                                //   value={monthlyMinProductLimit}
                                //   onChange={(e) => setMonthlyMinProductLimit(+e.target.value)}
                                //   min={0}
                                //   step="0.01"
                                //   required
                                // />
                                <input
                                  type="number"
                                  name="monthlyMinProductLimit"
                                  className="form-control w-50 d-inline-block mx-2"
                                  onChange={formikPlanTank.handleChange}
                                  onBlur={formikPlanTank.handleBlur}
                                  value={
                                    formikPlanTank.values.monthlyMinProductLimit
                                  }
                                />
                              )}
                              <br />
                              {errors.monthlyMinProductLimit &&
                                touched.monthlyMinProductLimit && (
                                  <span className="text-danger">
                                    {errors.monthlyMinProductLimit as string}
                                  </span>
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>
                              {replaceJSX(
                                monthlyDetailsKey3[0]?.label,
                                "{{VALUE}}",
                                // <input
                                //   type="number"
                                //   className="form-control w-50 d-inline-block mx-2"
                                //   value={monthlyMaxProductLimit}
                                //   onChange={(e) => setMonthlyMaxProductLimit(+e.target.value)}
                                //   min={0}
                                //   step="0.01"
                                //   required
                                // />
                                <input
                                  type="number"
                                  name="monthlyMaxProductLimit"
                                  className="form-control w-50 d-inline-block mx-2"
                                  onChange={formikPlanTank.handleChange}
                                  onBlur={formikPlanTank.handleBlur}
                                  value={
                                    formikPlanTank.values.monthlyMaxProductLimit
                                  }
                                />
                              )}{" "}
                              <br />
                              {errors.monthlyMaxProductLimit &&
                                touched.monthlyMaxProductLimit && (
                                  <span className="text-danger">
                                    {errors.monthlyMaxProductLimit as string}
                                  </span>
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>
                              {replaceJSX(
                                monthlyDetailsKey4[0]?.label,
                                "{{VALUE}}",
                                <div className="d-inline-block w-75 mx-2">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        $
                                      </span>
                                    </div>
                                    {/* <input
                                      type="number"
                                      className="form-control"
                                      value={monthlySaving}
                                      onChange={(e) => setMonthlySaving(+e.target.value)}
                                      min={0}
                                      step="0.01"
                                      required
                                    /> */}
                                    <input
                                      type="number"
                                      name="monthlySaving"
                                      className="form-control"
                                      onChange={formikPlanTank.handleChange}
                                      onBlur={formikPlanTank.handleBlur}
                                      value={
                                        formikPlanTank.values.monthlySaving
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              <br />
                              {errors.monthlySaving &&
                                touched.monthlySaving && (
                                  <span className="text-danger">
                                    {errors.monthlySaving as string}
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
                                      onChange={formikPlanTank.handleChange}
                                      onBlur={formikPlanTank.handleBlur}
                                      checked={
                                        formikPlanTank.values
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
                                  onChange={formikPlanTank.handleChange}
                                  onBlur={formikPlanTank.handleBlur}
                                  value={formikPlanTank.values.yearlyPrice}
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
                              Description
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
                            <td>
                              {replaceJSX(
                                yearlyDetailsKey1[0]?.label,
                                "{{VALUE}}",
                                <div className="d-inline-block w-75 mr-2">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        $
                                      </span>
                                    </div>
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
                                      onChange={formikPlanTank.handleChange}
                                      onBlur={formikPlanTank.handleBlur}
                                      value={
                                        formikPlanTank.values.yearlyPriceOff
                                      }
                                    />
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
                          <tr>
                            <td>2</td>
                            <td>
                              {replaceJSX(
                                yearlyDetailsKey2[0]?.label,
                                "{{VALUE}}",
                                // <input
                                //   type="number"
                                //   className="form-control w-50 d-inline-block mx-2"
                                //   value={yearlyMinProductLimit}
                                //   onChange={(e) => setYearlyMinProductLimit(+e.target.value)}
                                //   min={0}
                                //   step="0.01"
                                //   required
                                // />
                                <input
                                  type="number"
                                  name="yearlyMinProductLimit"
                                  className="form-control w-50 d-inline-block mx-2"
                                  onChange={formikPlanTank.handleChange}
                                  onBlur={formikPlanTank.handleBlur}
                                  value={
                                    formikPlanTank.values.yearlyMinProductLimit
                                  }
                                />
                              )}{" "}
                              <br />
                              {errors.yearlyMinProductLimit &&
                                touched.yearlyMinProductLimit && (
                                  <span className="text-danger">
                                    {errors.yearlyMinProductLimit as string}
                                  </span>
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>
                              {replaceJSX(
                                yearlyDetailsKey3[0]?.label,
                                "{{VALUE}}",
                                // <input
                                //   type="number"
                                //   className="form-control w-50 d-inline-block mx-2"
                                //   value={yearlyMaxProductLimit}
                                //   onChange={(e) => setYearlyMaxProductLimit(+e.target.value)}
                                //   min={0}
                                //   step="0.01"
                                //   required
                                // />
                                <input
                                  type="number"
                                  name="yearlyMaxProductLimit"
                                  className="form-control w-50 d-inline-block mx-2"
                                  onChange={formikPlanTank.handleChange}
                                  onBlur={formikPlanTank.handleBlur}
                                  value={
                                    formikPlanTank.values.yearlyMaxProductLimit
                                  }
                                />
                              )}{" "}
                              <br />
                              {errors.yearlyMaxProductLimit &&
                                touched.yearlyMaxProductLimit && (
                                  <span className="text-danger">
                                    {errors.yearlyMaxProductLimit as string}
                                  </span>
                                )}
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>
                              {replaceJSX(
                                yearlyDetailsKey4[0]?.label,
                                "{{VALUE}}",
                                <div className="d-inline-block w-75 mx-2">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text">
                                        $
                                      </span>
                                    </div>
                                    {/* <input
                                      type="number"
                                      className="form-control"
                                      value={yearlySaving}
                                      onChange={(e) => setYearlySaving(+e.target.value)}
                                      min={0}
                                      step="0.01"
                                      required
                                    /> */}
                                    <input
                                      type="number"
                                      name="yearlySaving"
                                      className="form-control"
                                      onChange={formikPlanTank.handleChange}
                                      onBlur={formikPlanTank.handleBlur}
                                      value={formikPlanTank.values.yearlySaving}
                                    />
                                  </div>
                                </div>
                              )}
                              <br />
                              {errors.yearlySaving && touched.yearlySaving && (
                                <span className="text-danger">
                                  {errors.yearlySaving as string}
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
                                    onChange={formikPlanTank.handleChange}
                                    checked={
                                      formikPlanTank.values.planStatus ===
                                      "active"
                                    }
                                  />
                                  <div className="control__indicator"></div>
                                </label>
                                <label
                                  className="control control-outline d-inline-block control-primary control--radio mb-0"
                                  htmlFor="status2"
                                >
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
                                    onChange={formikPlanTank.handleChange}
                                    checked={
                                      formikPlanTank.values.planStatus ===
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
                        history.push("/settings/membership-plans/tank-exchange")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => formikPlanTank.handleSubmit()}
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

export default MemberShipPlanPropaneTankForm;

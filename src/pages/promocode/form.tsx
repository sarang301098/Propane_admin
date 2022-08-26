import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import Select from "react-select";
import { DatePicker } from "../../components";
import { components } from "react-select";
import { MultiSelectCheckbox } from "../../components";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import { getUsersActionThunk } from "../../store/user/user.actions.async";
import { useFormik } from "formik";
import moment from "moment";
import * as yup from "yup";
import { InitialValue } from "../../store/promocode/promocode.types";
import {
  addPromocodeActionThunk,
  getPromoByIdcodeActionThunk,
  updatePromocodeActionThunk,
} from "../../store/promocode/promocode.actions.async";

const animatedComponents = makeAnimated();

const Option = (props: any) => {
  let labelToBeDisplayed = `${props.data.label}`;
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} onChange={() => null} />{" "}
      <label className="m-0 ml-2">{labelToBeDisplayed}</label>
    </components.Option>
  );
};

const PromocodeForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { promocodeId } = useParams<{ promocodeId: string }>();

  const { singlePromocode } = useSelector(
    (state: TRootState) => state?.promocode
  );

  const promocodeSchema = yup.object().shape({
    productId: yup.number().required("Please select product"),
    title: yup.string().required("Title is required"),
    promocode: yup.string().required("Promocode is required"),
    discount: yup.string().required("Discount is required"),
    categoryIds: yup.array().of(yup.string()),
    customerIds: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        })
      )
      .min(1, "Please select customer"),
    isActive: yup.number().required().oneOf([0, 1], "Status is required"),
    startAt: yup.string().required("Please select start date"),
    endAt: yup.string().required("Please select end date"),
  });

  const { users } = useSelector((state: TRootState) => state?.user?.usersList);

  /**
   * Formatted users for React Select
   */
  const userOptions = users?.map((user) => ({
    value: user?.id,
    label: user?.fullName,
  }));

  const initialValues: InitialValue = {
    productId: singlePromocode?.product?.id || "",
    categoryIds: singlePromocode?.categoryIds || [],
    title: singlePromocode?.title || "",
    promocode: singlePromocode?.promocode || "",
    discount: singlePromocode?.discount || "",
    customerIds: singlePromocode?.customerIds
      ? userOptions?.filter((user) =>
          (singlePromocode?.customerIds || [])?.includes(user?.value)
        )
      : [],
    startAt: singlePromocode?.startAt || "",
    endAt: singlePromocode?.endAt || "",
    isActive: singlePromocode?.isActive === false ? "0" : "1",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: promocodeSchema,
    onSubmit: (values) => {
      if (promocodeId === "new") {
        dispatch(
          addPromocodeActionThunk(
            {
              ...values,
              customerIds: (values?.customerIds as {
                label: string;
                value: string;
              }[])?.map(
                (customer: { value: string; label: string }) => customer?.value
              ),
              orderType: productType,
            },
            () => history.push("/promo-codes/fuel-delivery")
          )
        );
      } else {
        dispatch(
          updatePromocodeActionThunk(
            {
              ...values,
              customerIds: (values?.customerIds as {
                label: string;
                value: string;
              }[])?.map(
                (customer: { value: string; label: string }) => customer?.value
              ),
            },
            promocodeId,
            () => history.push("/promo-codes/fuel-delivery")
          )
        );
      }
    },
  });
  const [productType, setProductType] = useState(1);

  const { categories } = useSelector(
    (state: TRootState) => state?.category?.categories
  );

  const { fuelDeliveryProducts, tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
  );

  const allProducts = [...fuelDeliveryProducts, ...tankExchangeProducts];

  /**
   * Formatted products for React Select
   */
  const products = allProducts.map((product) => ({
    value: Number(product?.id),
    label: product?.name,
  }));

  /**
   * Formatted categories for React Select
   */
  const categoryOptions = categories?.map((categories) => ({
    value: categories?.id,
    label: categories?.name,
  }));

  useEffect(() => {
    dispatch(getProductsActionThunk());
    dispatch(getUsersActionThunk());
    if (promocodeId !== "new") {
      dispatch(getPromoByIdcodeActionThunk(promocodeId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (singlePromocode) {
      setProductType(singlePromocode?.orderType);
      singlePromocode?.orderType === 2 && dispatch(getCategoryActionThunk("2"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singlePromocode]);

  /**
   * Redirecting to /promo-codes/fuel-delivery
   */
  const handleRedirectToPromocode = () => {
    history.push("/promo-codes/fuel-delivery");
  };

  /**
   *
   * steps
   *  1) Taking selected options as a parameter.
   *  2) Set options as customerIds.
   * @param selected
   */
  const handleChange = (selected: { label: string; value: string }[]) => {
    formik.setValues(() => ({
      ...formik.values,
      customerIds: selected,
    }));
  };

  const { errors, touched } = formik;

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>{singlePromocode ? "Update" : "Add New "} Promocode</h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRedirectToPromocode()}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-xl-7">
                        <div className="form-row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Product <span className="text-danger">*</span>
                              </label>
                              <Select
                                className="custom-select-dropdown"
                                value={
                                  formik.values?.productId
                                    ? (products || []).find(
                                        (prod) =>
                                          prod.value ===
                                          formik.values?.productId
                                      ) || null
                                    : null
                                }
                                onChange={(val) => {
                                  formik.setValues({
                                    ...formik.values,
                                    productId: val?.value || "",
                                  });
                                  const orderType = allProducts?.findIndex(
                                    (product) =>
                                      Number(product?.id) === val?.value
                                  );
                                  if (
                                    orderType > -1 &&
                                    allProducts[orderType].orderType === 2
                                  ) {
                                    dispatch(getCategoryActionThunk("2"));
                                    setProductType(2);
                                  } else {
                                    setProductType(1);
                                  }
                                }}
                                placeholder="-- Select --"
                                options={products || []}
                              />
                              {errors.productId && touched.productId && (
                                <div className="text-danger">
                                  {errors.productId}
                                </div>
                              )}
                            </div>
                          </div>
                          {productType === 2 && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label">
                                  Category{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <Select
                                  className="custom-select-dropdown"
                                  value={(formik.values.categoryIds || [])
                                    .map((values) =>
                                      (categoryOptions || []).find(
                                        (prod) =>
                                          prod?.value.toString() === values
                                      )
                                    )
                                    .filter(
                                      (prod) =>
                                        prod && prod?.value && prod?.label
                                    )
                                    .map((prod) => ({
                                      label: prod?.label,
                                      value: prod?.value,
                                    }))}
                                  closeMenuOnSelect={false}
                                  options={categoryOptions || []}
                                  onChange={(value) => {
                                    formik.setValues({
                                      ...formik.values,
                                      categoryIds: value.map((val) =>
                                        val.value?.toString()
                                      ),
                                    });
                                  }}
                                  placeholder="-- Select --"
                                  isMulti
                                />
                                {errors.categoryIds && touched.categoryIds && (
                                  <div className="text-danger">
                                    {errors.categoryIds}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Title <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Get 50% Flat Off"
                                value={formik.values.title}
                                name="title"
                                onChange={formik.handleChange}
                              />
                              {errors.title && touched.title && (
                                <div className="text-danger">
                                  {errors.title}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Promocode <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="GET50"
                                name="promocode"
                                value={formik.values.promocode}
                                onChange={formik.handleChange}
                              />
                              {errors.promocode && touched.promocode && (
                                <div className="text-danger">
                                  {errors.promocode}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Discount <span className="text-danger">*</span>
                              </label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="50"
                                  name="discount"
                                  value={formik.values.discount}
                                  onChange={formik.handleChange}
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text">%</span>
                                </div>
                              </div>
                              {errors.discount && touched.discount && (
                                <div className="text-danger">
                                  {errors.discount}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Customer <span className="text-danger">*</span>
                              </label>
                              <div data-toggle="popover" data-trigger="focus">
                                <MultiSelectCheckbox
                                  className="custom-select-dropdown"
                                  components={{ Option, animatedComponents }}
                                  options={userOptions}
                                  value={formik.values.customerIds}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.customerIds && touched.customerIds && (
                                <div className="text-danger">
                                  {errors.customerIds}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="control-label">
                                Promocode Validity{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-group d-flex w-100p inner-page-date">
                                <DatePicker
                                  setStartDate={(date: moment.Moment) =>
                                    formik.setValues({
                                      ...formik.values,
                                      startAt: date,
                                    })
                                  }
                                  setEndDate={(date: moment.Moment) =>
                                    formik.setValues({
                                      ...formik.values,
                                      endAt: date,
                                    })
                                  }
                                  startDate={formik?.values?.startAt}
                                  endDate={formik?.values?.endAt}
                                />
                                <div className="input-group-append">
                                  <span className="input-group-text">
                                    <i className="icon dripicons-calendar"></i>
                                  </span>
                                </div>
                              </div>
                              {errors.startAt && touched.startAt && (
                                <div className="text-danger">
                                  {errors.startAt}
                                </div>
                              )}
                              {errors.endAt &&
                              touched.endAt &&
                              !errors?.startAt ? (
                                <div className="text-danger">
                                  {errors.endAt}
                                </div>
                              ) : (
                                <div className="invisible"> error</div>
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
                                    value={"1"}
                                    id="status1"
                                    name="isActive"
                                    checked={
                                      Number(formik.values.isActive) === 1
                                    }
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
                                    id="status2"
                                    name="isActive"
                                    checked={
                                      Number(formik.values.isActive) === 0
                                    }
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
                  <div className="card-footer bg-light text-right">
                    <button
                      type="button"
                      className="btn btn-secondary clear-form mr-2"
                      onClick={handleRedirectToPromocode}
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default PromocodeForm;

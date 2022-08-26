/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getPromocodeActionThunk } from "../../store/promocode/promocode.actions.async";

const SelectStatus = [
  { value: "", label: "All" },
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

const Promocode = ({ ...props }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = history?.location?.state as {
    page: string;
    searchPromoCode: string;
    categoryId: string;
    productId: string;
    status: string;
  };

  const orderType = history.location.pathname.endsWith("tank-exchange") ? 2 : 1;

  const itemsPerpage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const { categories } = useSelector(
    (state: TRootState) => state?.category?.categories
  );

  const { count } = useSelector(
    (state: TRootState) => state?.promocode?.promocodeList
  );

  const { fuelDeliveryProducts, tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
  );

  /**
   * Formatted categories for React Select
   */
  const categoryOptions = categories?.map((categories) => ({
    value: categories?.id,
    label: categories?.name,
  }));

  const allProducts =
    orderType === 1 ? fuelDeliveryProducts : tankExchangeProducts;

  /**
   * Formatted products for React Select
   */
  const productOptions = allProducts.map((product) => ({
    value: product?.id,
    label: product?.name,
  }));

  const [searchPromoCode, setSearchPromoCode] = useState(
    state?.searchPromoCode || ""
  );
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [categoryId, setCategoryId] = useState(state?.categoryId || "");
  const [productId, setProductId] = useState(state?.productId || "");
  const [status, setStatus] = useState<string>(state?.status || "");
  const handleRedirectToPromocodeForm = () => {
    history.push("/promo-codes/new");
  };

  useEffect(() => {
    dispatch(getProductsActionThunk());
    dispatch(getCategoryActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setCategoryId(() => "");
    setProductId(() => "");
    setStatus(() => "");
    setSearchPromoCode(() => "");
    history.push(history?.location?.pathname, {
      searchPromoCode: "",
      categoryId: "",
      productId: "",
      status: "",
    });
    dispatch(
      getPromocodeActionThunk(page, itemsPerpage, "", "", "", "", orderType)
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      history?.push(history?.location?.pathname, { searchPromoCode: "" });
    }
    setSearchPromoCode(e.target.value);
  };

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
                  <h1>Promocode</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchPromoCode}
                      onChange={handleSearch}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() =>
                          dispatch(
                            getPromocodeActionThunk(
                              1,
                              itemsPerpage,
                              categoryId,
                              productId,
                              status,
                              searchPromoCode,
                              orderType
                            )
                          )
                        }
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="btn btn-secondary"
                      id="dropdown-basic"
                    >
                      <i className="fa fa-filter fa-fw"></i> Filter
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div className="p-3">
                        <b>Choose filters</b>
                      </div>
                      <form id="filter-form" className="px-3">
                        {orderType === 2 && (
                          <div className="form-group">
                            <label>Category</label>
                            <Select
                              className="custom-select-dropdown"
                              value={
                                categoryId
                                  ? (categoryOptions || []).find(
                                      (prod) =>
                                        prod.value === Number(categoryId)
                                    ) || null
                                  : null
                              }
                              onChange={(val) =>
                                setCategoryId(val?.value?.toString() || "")
                              }
                              placeholder="-- Select --"
                              options={categoryOptions || []}
                            />
                          </div>
                        )}
                        <div className="form-group">
                          <label>Product</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              productId
                                ? (productOptions || []).find(
                                    (prod) => prod.value === productId
                                  ) || null
                                : null
                            }
                            onChange={(val) => setProductId(val?.value || "")}
                            placeholder="-- Select --"
                            options={productOptions || []}
                          />
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              status
                                ? (SelectStatus || []).find(
                                    (prod) => prod.value === status
                                  ) || null
                                : { value: "", label: "All" }
                            }
                            onChange={(val) => setStatus(val?.value || "")}
                            placeholder="-- Select --"
                            options={SelectStatus || []}
                          />
                        </div>
                      </form>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() =>
                      dispatch(
                        getPromocodeActionThunk(
                          1,
                          itemsPerpage,
                          categoryId,
                          productId,
                          status,
                          searchPromoCode,
                          orderType
                        )
                      )
                    }
                  >
                    Submit
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRedirectToPromocodeForm}
                  >
                    Add New Promocode
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs">
                <div className="card-header clearfix ">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={{
                          pathname: "/promo-codes/fuel-delivery",
                          state: {
                            searchPromoCode,
                          },
                        }}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Bulk Fuel Delivery
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={{
                          pathname: "/promo-codes/tank-exchange",
                          state: {
                            searchPromoCode,
                          },
                        }}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Propane Tank Exchange
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    {props.children &&
                      props.children(
                        searchPromoCode,
                        categoryId,
                        productId,
                        status,
                        count,
                        itemsPerpage,
                        page,
                        setPage
                      )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Promocode;

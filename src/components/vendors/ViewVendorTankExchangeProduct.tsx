/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ViewProductPricing from "./ViewVendorProductPricing";
import { DatePicker } from "..";
import { Dropdown } from "react-bootstrap";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { useHistory, useParams } from "react-router-dom";
import { getVendorProductActionThunk } from "../../store/vendor/vendor.action.async";
import moment from "moment";
import ViewTankExchangePricingList from "./ViewTankExchangePricingList";
import { getCylinderSizeActionThunk } from "../../store/cylinderSize/cylinderSize.action.async";
import { getCategoryActionThunk } from "../../store/category/category.action.async";

// const SelectOrderType = [
//   { value: "All", label: "All" },
//   { value: "Fuel Delivery", label: "Fuel Delivery" },
//   {
//     value: "Propane Tank Exchange Delivery",
//     label: "Propane Tank Exchange Delivery",
//   },
// ];

const ViewTankExchangeProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { vendorId } = useParams<{ vendorId: string }>();
  const state = history.location?.state as { page: string };

  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
  );
  const count = useSelector(
    (state: TRootState) =>
      state?.vendor?.product?.vendorProducts?.filter(
        (product) => product?.pricing?.length
      )?.length
  );
  const { cylinderSizes } = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  // const [orderType, setOrderType] = useState("");
  const [product, setProduct] = useState<number | null>(null);
  const [cylinderSize, setCylinderSize] = useState("");
  const [priceSearch, setPriceSearch] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");

  const tankExchangeProductOptions = tankExchangeProducts?.map((product) => ({
    label: product?.name,
    value: product?.id,
  }));

  const fetchVendorProducts = (pageNumber?: number) => {
    dispatch(
      getVendorProductActionThunk(
        vendorId,
        2,
        pageNumber || page,
        itemsPerPage,
        startDate,
        endDate,
        product,
        Number(cylinderSize),
        priceSearch
      )
    );
  };

  useEffect(() => {
    dispatch(getCylinderSizeActionThunk(false, 0, 0));
    dispatch(getCategoryActionThunk());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CylinderSizesOption = cylinderSizes?.map((size) => ({
    label: size?.cylinderSize?.toString(),
    value: size?.id?.toString(),
  }));

  return (
    <ViewProductPricing>
      {(singleVendorData) => {
        return (
          <div className="tab-pane fadeIn active" id="tab-42">
            <div className="card-body p-0">
              <div className="p-3 d-flex justify-content-end inner-filter">
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      value={priceSearch}
                      onChange={(e) => setPriceSearch(e.target.value)}
                      placeholder="Search"
                      title="Search"
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <div className="input-group d-flex">
                    <DatePicker
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      startDate={startDate}
                      endDate={endDate}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="icon dripicons-calendar"></i>
                      </span>
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
                        {/* <div className="form-group">
                          <label>Order Type</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              orderType
                                ? (SelectOrderType || []).find(
                                    (prod) => prod.value === orderType
                                  ) || null
                                : null
                            }
                            onChange={(val) => setOrderType(val?.value || "")}
                            placeholder="-- Select --"
                            options={SelectOrderType || []}
                          />
                        </div> */}
                        <div className="form-group">
                          <label>Product</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              product
                                ? (tankExchangeProductOptions || []).find(
                                    (prod) => Number(prod.value) === product
                                  ) || null
                                : null
                            }
                            onChange={(val) =>
                              setProduct(Number(val?.value) || null)
                            }
                            placeholder="-- Select --"
                            options={tankExchangeProductOptions || []}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cylinder Size</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              cylinderSize
                                ? (CylinderSizesOption || []).find(
                                    (prod) => prod.value === cylinderSize
                                  ) || null
                                : null
                            }
                            onChange={(val) =>
                              setCylinderSize(val?.value || "")
                            }
                            placeholder="-- Select --"
                            options={CylinderSizesOption || []}
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
                    onClick={() => fetchVendorProducts()}
                  >
                    Submit
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                      setCylinderSize("");
                      setProduct(null);
                      setPriceSearch("");
                      dispatch(
                        getVendorProductActionThunk(
                          vendorId,
                          2,
                          1,
                          itemsPerPage,
                          "",
                          "",
                          null,
                          undefined,
                          ""
                        )
                      );
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <Pagination
                page={page}
                setPage={setPage}
                dispatchAction={fetchVendorProducts}
                ItemsComponent={ViewTankExchangePricingList}
                pageCount={count}
              />
            </div>
          </div>
        );
      }}
    </ViewProductPricing>
  );
};

export default ViewTankExchangeProduct;

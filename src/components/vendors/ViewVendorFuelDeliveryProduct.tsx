/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import TRootState from "../../store/root.types";
import { getVendorProductActionThunk } from "../../store/vendor/vendor.action.async";
import { DatePicker } from "../date-picker/datepicker";
import Pagination from "../pagination/Pagination";
import ViewFuelDeliveryPricingList from "./ViewFuelDeliveryPricingList";
import ViewProductPricing from "./ViewVendorProductPricing";

// const SelectOrderType = [
//   { value: "All", label: "All" },
//   { value: "Fuel Delivery", label: "Fuel Delivery" },
//   {
//     value: "Propane Tank Exchange Delivery",
//     label: "Propane Tank Exchange Delivery",
//   },
// ];

const ViewFuelDeliveryProduct = () => {
  const history = useHistory();
  const state = history.location?.state as { page: string };
  const defaultStartDate = moment().subtract(30, "days").startOf("day");
  const defaultEndDate = moment().endOf("day");
  const dispatch = useDispatch();
  const { vendorId } = useParams<{ vendorId: string }>();

  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const { fuelDeliveryProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
  );

  const count = useSelector(
    (state: TRootState) =>
      state?.vendor?.product?.vendorProducts?.filter(
        (product) => product?.pricing?.length
      )?.length
  );

  const [priceSearch, setPriceSearch] = useState("");
  const [page, setPage] = useState(Number(state?.page) || 1);
  // const [priceFilterOrderType, setPriceFilterOrderType] = useState("");
  const [priceFilterProduct, setPriceFilterProduct] = useState<null | number>(
    null
  );
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  // const [fuelProductData, setFuelProductData] = useState();

  const fetchVendorProducts = (pageNumber?: number) => {
    dispatch(
      getVendorProductActionThunk(
        vendorId,
        1,
        pageNumber || page,
        itemsPerPage,
        startDate,
        endDate,
        priceFilterProduct,
        undefined,
        priceSearch
      )
    );
  };

  useEffect(() => {
    dispatch(getProductsActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fuelProductOptions = fuelDeliveryProducts?.map((product) => ({
    label: product?.name,
    value: product?.id,
  }));

  const handleReset = () => {
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setPriceSearch("");
    setPriceFilterProduct(null);
    setStartDate("");
    setEndDate("");
    dispatch(
      getVendorProductActionThunk(
        vendorId,
        1,
        1,
        itemsPerPage,
        "",
        "",
        null,
        undefined,
        ""
      )
    );
  };

  return (
    <ViewProductPricing>
      {(singleVendorData) => {
        return (
          <div className="tab-pane fadeIn active" id="tab-41">
            <div className="card-body p-0">
              <div className="p-3 d-flex justify-content-end inner-filter">
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={priceSearch}
                      onChange={(e) => setPriceSearch(e.target.value)}
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
                              priceFilterOrderType
                                ? (SelectOrderType || []).find(
                                    (prod) =>
                                      prod.value === priceFilterOrderType
                                  ) || null
                                : null
                            }
                            onChange={(val) =>
                              setPriceFilterOrderType(val?.value || "")
                            }
                            placeholder="-- Select --"
                            options={SelectOrderType || []}
                          />
                        </div> */}
                        <div className="form-group">
                          <label>Product</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              priceFilterProduct
                                ? (fuelProductOptions || []).find(
                                    (prod) =>
                                      Number(prod.value) === priceFilterProduct
                                  ) || null
                                : null
                            }
                            onChange={(val) =>
                              setPriceFilterProduct(Number(val?.value) || null)
                            }
                            placeholder="-- Select --"
                            options={fuelProductOptions || []}
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
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <Pagination
                page={page}
                setPage={setPage}
                dispatchAction={fetchVendorProducts}
                ItemsComponent={ViewFuelDeliveryPricingList}
                pageCount={count}
              />
            </div>
          </div>
        );
      }}
    </ViewProductPricing>
  );
};

export default ViewFuelDeliveryProduct;

import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import VendorsView from "../../pages/vendors/view";
import { getAccessoriesActionThunk } from "../../store/accessories/accessories.action.async";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getCylinderSizeActionThunk } from "../../store/cylinderSize/cylinderSize.action.async";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import TRootState from "../../store/root.types";
import { getVendorStockHistoryActionThunk } from "../../store/vendor/vendor.action.async";
import { DatePicker } from "../date-picker/datepicker";
import Pagination from "../pagination/Pagination";
import VendorStockHistoryList from "./VendorStockHistoryList";

const ViewVendorsStockHistory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { vendorId } = useParams<{ vendorId: string }>();
  const state = history?.location?.state as { page: string };

  const perPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { count } = useSelector(
    (state: TRootState) => state?.vendor?.stockHistory
  );

  const [category, setCategory] = useState("all");
  const [product, setProduct] = useState("all");
  const [accessory, setAccessory] = useState("all");
  const [cylinderSize, setCylinderSize] = useState("all");
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [filter, setFilter] = useState({ sort: "ASC", sortBy: "categoryName" });
  const [startAt, setStartAt] = useState<moment.Moment | string>("");
  const [endAt, setEndAt] = useState<moment.Moment | string>("");
  const [stockSearch, setStockSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");

  const fetchStockHistory = (pageNumber?: number, search?: string) => {
    dispatch(
      getVendorStockHistoryActionThunk(
        vendorId,
        pageNumber || page,
        perPage,
        category,
        product,
        accessory,
        cylinderSize,
        startAt,
        endAt,
        filter?.sort,
        filter?.sortBy,
        search || stockSearch
      )
    );
  };

  useEffect(() => {
    dispatch(getCategoryActionThunk());
    dispatch(getAccessoriesActionThunk("", 0, 0, false));
    dispatch(getCylinderSizeActionThunk(false, 0, 0));
    dispatch(getProductsActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { categories } = useSelector(
    (state: TRootState) => state?.category?.categories
  );
  const { accessories } = useSelector(
    (state: TRootState) => state?.accessories?.accessoriesData
  );
  const { cylinderSizes } = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData
  );
  const { fuelDeliveryProducts, tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
  );

  const SelectCategory = [{ name: "All", id: "all" }, ...categories]?.map(
    (category) => ({
      value: category?.id?.toString(),
      label: category?.name,
    })
  );

  const SelectAccessory = [{ name: "All", id: "all" }, ...accessories]?.map(
    (accessory) => ({
      value: accessory?.id?.toString(),
      label: accessory?.name,
    })
  );

  const SelectCylinderSize = [
    { cylinderSize: "All", id: "all" },
    ...cylinderSizes,
  ]?.map((size) => ({
    value: size?.id?.toString(),
    label: !(size?.id === "all")
      ? size?.cylinderSize + " lbs"
      : size?.cylinderSize,
  }));

  const SelectPropaneTankProduct = [
    { name: "All", id: "all" },
    ...fuelDeliveryProducts,
    ...tankExchangeProducts,
  ]?.map((product) => ({
    label: product?.name,
    value: product?.id,
  }));

  return (
    <VendorsView>
      {(singleVendorData) => (
        <div className="tab-pane fadeIn active" id="tab-8">
          <div className="card-body p-0">
            <div className="p-3 d-flex justify-content-end inner-filter">
              <div className="m-l-10">
                <div className="input-group w-250">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    title="Search"
                    value={tempSearch}
                    onChange={(e) => setTempSearch(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button type="button" className="input-group-text pointer">
                      <span className="fa fa-search"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="m-l-10">
                <div className="input-group d-flex">
                  <DatePicker
                    setStartDate={setStartAt}
                    setEndDate={setEndAt}
                    startDate={startAt}
                    endDate={endAt}
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
                      <div className="form-group">
                        <label>Category</label>
                        <Select
                          className="custom-select-dropdown"
                          value={
                            category
                              ? (SelectCategory || []).find(
                                  (prod) => prod.value === category
                                ) || null
                              : null
                          }
                          onChange={(val) => setCategory(val?.value || "")}
                          placeholder="-- Select --"
                          options={SelectCategory || []}
                        />
                      </div>
                      <div className="form-group">
                        <label>Product</label>
                        <Select
                          className="custom-select-dropdown"
                          value={
                            product
                              ? (SelectPropaneTankProduct || []).find(
                                  (prod) => prod.value === product
                                ) || null
                              : null
                          }
                          onChange={(val) => setProduct(val?.value || "")}
                          placeholder="-- Select --"
                          options={SelectPropaneTankProduct || []}
                        />
                      </div>
                      <div className="form-group">
                        <label>Accessories</label>
                        <Select
                          className="custom-select-dropdown"
                          value={
                            accessory
                              ? (SelectAccessory || []).find(
                                  (prod) => prod.value === accessory
                                ) || null
                              : null
                          }
                          onChange={(val) => setAccessory(val?.value || "")}
                          placeholder="-- Select --"
                          options={SelectAccessory || []}
                        />
                      </div>
                      <div className="form-group">
                        <label>Cylinder Size</label>
                        <Select
                          className="custom-select-dropdown"
                          value={
                            cylinderSize
                              ? (SelectCylinderSize || []).find(
                                  (prod) => prod.value === cylinderSize
                                ) || null
                              : null
                          }
                          onChange={(val) => setCylinderSize(val?.value || "")}
                          placeholder="-- Select --"
                          options={SelectCylinderSize || []}
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
                  onClick={() => {
                    fetchStockHistory(1, tempSearch);
                    setStockSearch(tempSearch);
                  }}
                >
                  Submit
                </button>
              </div>
              <div className="m-l-10">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setStockSearch("");
                    setTempSearch("");
                    setStartAt("");
                    setEndAt("");
                    setCategory("all");
                    setProduct("all");
                    setPage(1);
                    setFilter({ sort: "ASC", sortBy: "categoryName" });
                    setAccessory("all");
                    setCylinderSize("all");
                    dispatch(
                      getVendorStockHistoryActionThunk(
                        vendorId,
                        1,
                        perPage,
                        "all",
                        "all",
                        "all",
                        "all",
                        "",
                        "",
                        "ASC",
                        "categoryName",
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
              ItemsComponent={VendorStockHistoryList}
              dispatchAction={fetchStockHistory}
              pageCount={count}
              page={page}
              setPage={setPage}
              setFilter={setFilter}
              filter={filter}
            />
          </div>
        </div>
      )}
    </VendorsView>
  );
};

export default ViewVendorsStockHistory;

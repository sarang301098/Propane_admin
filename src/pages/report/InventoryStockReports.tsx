import React, { useEffect, useState } from "react";
import Select from "react-select";
import moment from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import * as excel from "exceljs";
import { saveAs } from "file-saver";
import { useHistory } from "react-router-dom";

import { DatePicker } from "../../components";
import Pagination from "../../components/pagination/Pagination";
import Report from "./list";
import InventoryStockReportsList from "./InventoryStockReportsList";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { getInventoryStockReportsActionThunk } from "../../store/reports/reports.actions.async";
import { getAllVendorActionThunk } from "../../store/vendor/vendor.action.async";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getProductsActionThunk } from "../../store/products/products.action.async";
import { getAccessoriesActionThunk } from "../../store/accessories/accessories.action.async";
import { getCylinderSizeActionThunk } from "../../store/cylinderSize/cylinderSize.action.async";
import { TInventoryStockReportsPayload } from "../../store/reports/reports.types";
import { CSVLink } from "react-csv";

const InventoryStockReports = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchInventoryStock, setSearchInventoryStock] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [vendorName, setVendorName] = useState("all");
  const [categoryName, setCategoryName] = useState("all");
  const [productName, setProductName] = useState("all");
  const [accessoryName, setAccessoryName] = useState("all");
  const [cylinderSize, setCylinderSize] = useState("all");
  const [sort, setSort] = useState("ASC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  const inventoryReports = useSelector(
    (state: TRootState) => state?.reports?.inventoryStockData
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  useEffect(() => {
    dispatch(getAllVendorActionThunk());
    dispatch(getCategoryActionThunk());
    dispatch(getProductsActionThunk());
    dispatch(getAccessoriesActionThunk("", 0, 0, false));
    dispatch(getCylinderSizeActionThunk(false, 0, 0));
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
  const { allVendors } = useSelector((state: TRootState) => state?.vendor);

  const SelectVendor = [{ fullName: "All", id: "all" }, ...allVendors]?.map(
    (vendor) => ({
      value: vendor?.id?.toString(),
      label: vendor?.fullName,
    })
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

  /**
   * get inventory stock reports by filter
   */
  const inventoryStockReportsFilterSubmitHandler = () => {
    fetchInventoryStockReports();
  };

  /**
   * reset inventory stock reports filter
   */
  const resetInventoryStockReportsFilter = () => {
    setSearchInventoryStock("");
    setStartDate("");
    setEndDate("");
    setVendorName("all");
    setCategoryName("all");
    setProductName("all");
    setAccessoryName("all");
    setCylinderSize("all");
    setPage(1);
    page === 1 &&
      dispatch(
        getInventoryStockReportsActionThunk(
          null,
          1,
          itemsPerPage,
          "",
          "",
          "all",
          "all",
          "all",
          "all",
          "all",
          "ASC",
          ""
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };
  const fetchInventoryStockReports = (pages?: number) => {
    dispatch(
      getInventoryStockReportsActionThunk(
        searchInventoryStock || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        categoryName,
        productName,
        accessoryName,
        cylinderSize,
        vendorName,
        sort,
        sortBy
      )
    );
  };

  const headers = [
    { label: "Date", key: "date" },
    { label: "Vendor Name", key: "vendorName" },
    { label: "Category Name", key: "categoryName" },
    { label: "Product Name", key: "productName" },
    { label: "Cylinder Size", key: "cylinderSize" },
    { label: "Accessories Name", key: "accessoryName" },
    { label: "Opening Stock", key: "openingStock" },
    { label: "Added Stock", key: "adddedStock" },
    { label: "Stock Delivered", key: "stockDelivered" },
    { label: "Closing Stock", key: "closingStock" },
  ];

  function generateXLSX(
    data: TInventoryStockReportsPayload,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        date: moment(item?.addedAt).format("DD/MM/YYYY") || "-",
        vendorName: item?.vendor?.user?.fullName || "-",
        categoryName: item?.category?.name || "-",
        productName: item?.product?.name || "-",
        cylinderSize: item?.cylinderSize?.cylinderSize
          ? item?.cylinderSize?.cylinderSize + " lbs"
          : "-",
        accessoryName: item?.accessory?.name || "-",
        openingStock: item?.openingStock || "-",
        adddedStock: item?.addedStockQty || "-",
        stockDelivered: item?.soldOutStock || "-",
        closingStock: item?.remainingStock || "-",
      });
    }
    sheet.columns?.forEach((column: any) => {
      const lengths: any = column.values?.map(
        (v: any) => v.toString().length + 20
      );
      const maxLength = Math.max(
        ...lengths.filter((v: number) => typeof v === "number")
      );
      column.width = maxLength;
    });
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `${fileName}.xlsx`);
    });
  }

  return (
    <Report>
      <div className="tab-pane fadeIn active" id="tab-7">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchInventoryStock}
                onChange={(e) => setSearchInventoryStock(e.target.value)}
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
              <Dropdown.Toggle className="btn btn-secondary">
                <i className="fa fa-filter fa-fw"></i> Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="p-3">
                  <b>Choose filters</b>
                </div>
                <form id="filter-form" className="px-3">
                  <div className="form-group">
                    <label>Vendor</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        vendorName
                          ? (SelectVendor || []).find(
                              (prod) => prod.value === vendorName
                            ) || null
                          : null
                      }
                      onChange={(val) => setVendorName(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectVendor || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        categoryName
                          ? (SelectCategory || []).find(
                              (prod) => prod.value === categoryName
                            ) || null
                          : null
                      }
                      onChange={(val) => setCategoryName(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectCategory || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Product</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        productName
                          ? (SelectPropaneTankProduct || []).find(
                              (prod) => prod.value === productName
                            ) || null
                          : null
                      }
                      onChange={(val) => setProductName(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectPropaneTankProduct || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Accessories</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        accessoryName
                          ? (SelectAccessory || []).find(
                              (prod) => prod.value === accessoryName
                            ) || null
                          : null
                      }
                      onChange={(val) => setAccessoryName(val?.value || "")}
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
                      onChange={(val) => {
                        setCylinderSize(val?.value || "");
                      }}
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
                setPage(1);
                inventoryStockReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetInventoryStockReportsFilter}
            >
              Reset
            </button>
          </div>
          <div className="m-l-10">
            <Dropdown>
              <Dropdown.Toggle
                className="px-3 no-arrow"
                variant="dark"
                id="dropdown-basic"
              >
                <i className="fa fa-download text-white"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-150">
                <Dropdown.Item
                  href=""
                  onClick={() =>
                    generateXLSX(
                      inventoryReports?.inventoryReports,
                      `Inventory Stock Report`,
                      [
                        {
                          key: "date",
                          header: "Date",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "vendorName",
                          header: "Vendor Name",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "categoryName",
                          header: "Category Name",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "productName",
                          header: "Product Name",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "cylinderSize",
                          header: "Cylinder Size",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "accessoryName",
                          header: "Accessories Name",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "openingStock",
                          header: "Opening Stock",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "adddedStock",
                          header: "Added Stock",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "stockDelivered",
                          header: "Stock Delivered	",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "closingStock",
                          header: "Closing Stock",
                          style: { alignment: { horizontal: "left" } },
                        },
                      ]
                    )
                  }
                >
                  <i className="fa fa-file-excel fa-fw mr-1"></i> Excel
                </Dropdown.Item>
                <CSVLink
                  className="dropdown-item"
                  data={inventoryReports?.inventoryReports?.map((report) => ({
                    ...report,
                    date: moment(report?.addedAt).format("DD/MM/YYYY") || "-",
                    vendorName: report?.vendor?.user?.fullName || "-",
                    categoryName: report?.category?.name || "-",
                    productName: report?.product?.name || "-",
                    cylinderSize: report?.cylinderSize?.cylinderSize
                      ? report?.cylinderSize?.cylinderSize + " lbs"
                      : "-",
                    accessoryName: report?.accessory?.name || "-",
                    openingStock: report?.openingStock || "-",
                    adddedStock: report?.addedStockQty || "-",
                    stockDelivered: report?.soldOutStock || "-",
                    closingStock: report?.remainingStock,
                  }))}
                  headers={headers}
                  filename={`Inventory Stock Report`}
                >
                  <i className="fa fa-file-csv fa-fw mr-1"></i>
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Pagination
          ItemsComponent={InventoryStockReportsList}
          pageCount={inventoryReports?.count || 0}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          setFilterBy={setSortBy}
          dispatchAction={fetchInventoryStockReports}
        />
      </div>
    </Report>
  );
};

export default InventoryStockReports;

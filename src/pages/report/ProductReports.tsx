import React, { useEffect, useState } from "react";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import * as excel from "exceljs";
import { saveAs } from "file-saver";

import Pagination from "../../components/pagination/Pagination";
import { DatePicker } from "../../components";
import Report from "./list";
import { getProductReportsActionThunk } from "../../store/reports/reports.actions.async";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { useHistory } from "react-router-dom";
import ProductReportsList from "./ProductReportsList";
import { TProductReportsPayload } from "../../store/reports/reports.types";
import { CSVLink } from "react-csv";
import { getCylinderSizeActionThunk } from "../../store/cylinderSize/cylinderSize.action.async";

const SelectOrderType = [
  { value: "all", label: "All" },
  { value: "1", label: "Fuel Delivery" },
  {
    value: "2",
    label: "Propane Tank Exchange Delivery",
  },
];

const ProductReports = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchProduct, setSearchProduct] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [orderType, setOrderType] = useState("all");
  const [productName, setProductName] = useState("all");
  const [cylinderSize, setCylinderSize] = useState("all");

  const productReports = useSelector(
    (state: TRootState) => state?.reports?.productData
  );

  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { cylinderSizes } = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData
  );
  const { fuelDeliveryProducts, tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
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
  useEffect(() => {
    dispatch(getCylinderSizeActionThunk(false, 0, 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const SelectProduct = [
    { name: "All", id: "all" },
    ...fuelDeliveryProducts,
    ...tankExchangeProducts,
  ]?.map((product) => ({
    label: product?.name,
    value: product?.id,
  }));

  /**
   * get product reports by filter
   */
  const productReportsFilterSubmitHandler = () => {
    fetchProductsReports();
  };

  /**
   * reset product reports filter
   */
  const resetProductReportsFilter = () => {
    setSearchProduct("");
    setStartDate("");
    setEndDate("");
    setOrderType("all");
    setProductName("all");
    setCylinderSize("all");
    setPage(1);
    page === 1 &&
      dispatch(
        getProductReportsActionThunk(
          null,
          1,
          itemsPerPage,
          "",
          "",
          "all",
          "all",
          "all"
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };
  const fetchProductsReports = (pages?: number) => {
    dispatch(
      getProductReportsActionThunk(
        searchProduct || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        orderType,
        productName,
        cylinderSize
      )
    );
  };
  const headers = [
    { label: "Order Type", key: "orderType" },
    { label: "Product", key: "productName" },
    { label: "Cylinder Size", key: "cylinderSize" },
    { label: "No. of Orders", key: "noOfOrders" },
    { label: "Total Sales", key: "totalSales" },
  ];

  function generateXLSX(
    data: TProductReportsPayload,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        orderType:
          item?.orderdetails_order_type === 1
            ? "Fuel Delivery"
            : "Propane Tank Exchange Delivery",
        productName: item?.products_name ? item?.products_name : "-",
        cylinderSize: item?.cylinderSizes_cylinder_size
          ? item?.cylinderSizes_cylinder_size
          : "-",
        noOfOrders: item?.TotalOrder ? item?.TotalOrder : "-",
        totalSales: item?.TotalSales ? "$" + item?.TotalSales : "-",
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
  const separator = "\t";
  return (
    <Report>
      <div className="tab-pane fadeIn active" id="tab-5">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
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
                  </div>
                  <div className="form-group">
                    <label>Product</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        productName
                          ? (SelectProduct || []).find(
                              (prod) => prod.value === productName
                            ) || null
                          : null
                      }
                      onChange={(val) => setProductName(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectProduct || []}
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
                setPage(1);
                productReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetProductReportsFilter}
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
                      productReports?.productReports,
                      `Product Report`,
                      [
                        {
                          key: "orderType",
                          header: "Order Type",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "productName",
                          header: "Product",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "cylinderSize",
                          header: "Cylinder Size",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "noOfOrders",
                          header: "No. of Orders",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          key: "totalSales",
                          header: "Total Sales",
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
                  data={productReports?.productReports.map((report) => ({
                    ...report,
                    orderType:
                      report?.orderdetails_order_type === 1
                        ? "Fuel Delivery"
                        : "Propanhe Tank Exchange Delivery",
                    productName: report?.products_name
                      ? report?.products_name
                      : "-",
                    cylinderSize: report?.cylinderSizes_cylinder_size
                      ? report?.cylinderSizes_cylinder_size
                      : "-",
                    noOfOrders: report?.TotalOrder ? report?.TotalOrder : "-",
                    totalSales: report?.TotalSales
                      ? "$" + report?.TotalSales
                      : "-",
                  }))}
                  headers={headers}
                  filename={`Product Report`}
                  separator={separator}
                >
                  <i className="fa fa-file-csv fa-fw mr-1"></i>
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Pagination
          ItemsComponent={ProductReportsList}
          pageCount={productReports?.count || 0}
          page={page}
          setPage={setPage}
          dispatchAction={fetchProductsReports}
        />
      </div>
    </Report>
  );
};

export default ProductReports;

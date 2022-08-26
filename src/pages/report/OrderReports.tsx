import React, { useState } from "react";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
// import moment from "moment";
import * as excel from "exceljs";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

import { DatePicker } from "../../components";
import Report from "./list";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";
import OrderReportsList from "./OrderReportsList";
import { getOrderReportsActionThunk } from "../../store/reports/reports.actions.async";
import { TOrderReportsPayload } from "../../store/reports/reports.types";
import moment from "moment";

const SelectOrderType = [
  { value: "All", label: "All" },
  { value: "1", label: "Fuel Delivery" },
  {
    value: "2",
    label: "Propane Tank Exchange Delivery",
  },
];

const SelectPaymentStatus = [
  { value: "All", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
];

const SelectOrderStatus = [
  { value: "All", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Ongoing", label: "Ongoing" },
  { value: "Refilled", label: "Refilled" },
  { value: "Rescheduled", label: "Rescheduled" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Cancelled by Admin", label: "Cancelled by Admin" },
];

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const OrderReports = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchOrder, setSearchOrder] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [orderType, setOrderType] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [orderStatus, setOrderStatus] = useState("All");
  const [sort, setSort] = useState("ASC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const orderReports = useSelector(
    (state: TRootState) => state?.reports?.orderData
  );
  const fetchOrderReports = (pages?: number) => {
    dispatch(
      getOrderReportsActionThunk(
        searchOrder || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        orderType,
        paymentStatus,
        orderStatus,
        sort,
        sortBy
      )
    );
  };
  /**
   * get order reports by filter
   */
  const orderReportsFilterSubmitHandler = () => {
    fetchOrderReports();
  };

  /**
   * reset order reports filter
   */
  const resetOrderReportsFilter = () => {
    setSearchOrder("");
    setStartDate("");
    setEndDate("");
    setOrderType("All");
    setPaymentStatus("All");
    setOrderStatus("All");
    setPage(1);
    page === 1 &&
      dispatch(
        getOrderReportsActionThunk(
          null,
          1,
          itemsPerPage,
          "",
          "",
          "All",
          "All",
          "All",
          "ASC",
          ""
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };
  const headers = [
    { label: "Order Id", key: "orderId" },
    { label: "Customer Name", key: "customerName" },
    { label: "Vendor Name", key: "vendorName" },
    { label: "Driver Name", key: "driverName" },
    { label: "Driver Type", key: "driverType" },
    { label: "Order Booked Date & Time", key: "orderBookedTime" },
    { label: "Delivered Date & Time", key: "deliveredTime" },
    { label: "Order Status", key: "orderStatus" },
    { label: "Payment Status", key: "paymentStatus" },
    { label: "Order Type", key: "orderType" },
    { label: "Admin Commission", key: "adminCommisiion" },
    { label: "Total Amount", key: "totalAmount" },
  ];

  function generateXLSX(
    data: TOrderReportsPayload,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        orderId: item?.orderDetails_id ? item?.orderDetails_id : "-",
        customerName: item?.user_full_name ? item?.user_full_name : "-",
        vendorName: item?.vendor_full_name ? item?.vendor_full_name : "-",
        driverName: item?.driver_full_name ? item?.driver_full_name : "-",
        driverType:
          item?.driver_full_name && +item?.vendorsDriver === 0
            ? "Freelance"
            : "-",
        orderBookedTime: item?.orderDetails_created_at
          ? moment(item?.orderDetails_created_at).format("DD/MM/YYYY hh:mm A")
          : "-",
        deliveredTime: item?.orderDetails_schedule_date
          ? moment(item?.orderDetails_schedule_date).format(
              "DD/MM/YYYY hh:mm A"
            )
          : "-",
        orderStatus: item?.orderDetails_status
          ? item?.orderDetails_status
          : "-",
        paymentStatus: +item?.order_is_paid === 0 ? "Pending" : "Paid",
        orderType:
          item?.orderDetails_order_type === 1
            ? "Fuel Delivery"
            : "Propane Tank Exchange Delivery",
        adminCommisiion: item?.orderDetails_admin_received_amount
          ? "$" + item?.orderDetails_admin_received_amount
          : "-",
        totalAmount: item?.orderDetails_grand_total
          ? "$" + item?.orderDetails_grand_total
          : "-",
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
      <div className="tab-pane fadeIn active" id="tab-4">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchOrder}
                onChange={(e) => setSearchOrder(e.target.value)}
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
                    <label>Payment Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        paymentStatus
                          ? (SelectPaymentStatus || []).find(
                              (prod) => prod.value === paymentStatus
                            ) || null
                          : null
                      }
                      onChange={(val) => setPaymentStatus(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectPaymentStatus || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Order Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        orderStatus
                          ? (SelectOrderStatus || []).find(
                              (prod) => prod.value === orderStatus
                            ) || null
                          : null
                      }
                      onChange={(val) => setOrderStatus(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectOrderStatus || []}
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
                orderReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetOrderReportsFilter}
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
                    generateXLSX(orderReports?.ordersReports, `Order Report`, [
                      {
                        header: "Order Id",
                        key: "orderId",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Customer Name",
                        key: "customerName",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Vendor Name",
                        key: "vendorName",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Driver Name",
                        key: "driverName",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Driver Type",
                        key: "driverType",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Order Booked Date & Time",
                        key: "orderBookedTime",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Delivered Date & Time",
                        key: "deliveredTime",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Order Status",
                        key: "orderStatus",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Payment Status",
                        key: "paymentStatus",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Order Type",
                        key: "orderType",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Admin Commission",
                        key: "adminCommisiion",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        header: "Total Amount",
                        key: "totalAmount",
                        style: { alignment: { horizontal: "left" } },
                      },
                    ])
                  }
                >
                  <i className="fa fa-file-excel fa-fw mr-1"></i> Excel
                </Dropdown.Item>
                <CSVLink
                  className="dropdown-item"
                  data={orderReports?.ordersReports?.map((report) => ({
                    ...report,
                    orderId: report?.orderDetails_id
                      ? report?.orderDetails_id
                      : "-",
                    customerName: report?.user_full_name
                      ? report?.user_full_name
                      : "-",
                    vendorName: report?.vendor_full_name
                      ? report?.vendor_full_name
                      : "-",
                    driverName: report?.driver_full_name
                      ? report?.driver_full_name
                      : "-",
                    driverType:
                      report?.driver_full_name && +report?.vendorsDriver === 0
                        ? "Freelance"
                        : "-",
                    orderBookedTime: report?.orderDetails_created_at
                      ? moment(report?.orderDetails_created_at).format(
                          "DD/MM/YYYY hh:mm A"
                        )
                      : "-",
                    deliveredTime: report?.orderDetails_schedule_date
                      ? moment(report?.orderDetails_schedule_date).format(
                          "DD/MM/YYYY hh:mm A"
                        )
                      : "-",
                    orderStatus: report?.orderDetails_status
                      ? report?.orderDetails_status
                      : "-",
                    paymentStatus:
                      +report?.order_is_paid === 0 ? "Pending" : "Paid",
                    orderType:
                      report?.orderDetails_order_type === 1
                        ? "Fuel Delivery"
                        : "Propane Tank Exchange Delivery",
                    adminCommisiion: report?.orderDetails_admin_received_amount
                      ? "$" + report?.orderDetails_admin_received_amount
                      : "-",
                    totalAmount: report?.orderDetails_grand_total
                      ? "$" + report?.orderDetails_grand_total
                      : "-",
                    report,
                  }))}
                  headers={headers}
                  filename={`Order Report`}
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
          ItemsComponent={OrderReportsList}
          pageCount={orderReports?.count || 0}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          setFilterBy={setSortBy}
          dispatchAction={fetchOrderReports}
        />
      </div>
    </Report>
  );
};

export default OrderReports;

import React, { useState } from "react";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import * as excel from "exceljs";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

import Pagination from "../../components/pagination/Pagination";
import { DatePicker } from "../../components";
import Report from "./list";
import TransactionReportsList from "./TransactionReportsList";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";
import { getTransactionReportsActionThunk } from "../../store/reports/reports.actions.async";
import { TGetTransactionReportsPayload } from "../../store/reports/reports.types";

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

const TransactionReports = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const transactions = useSelector(
    (state: TRootState) => state?.reports?.transactionData
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  // const defaultStartDate = moment().subtract(30, "days").startOf("day");
  // const defaultEndDate = moment().endOf("day");
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [orderType, setOrderType] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState<string | boolean>("All");
  const [sort, setSort] = useState("ASC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  const fetchTransactionReports = (pages?: number) => {
    dispatch(
      getTransactionReportsActionThunk(
        searchTransaction || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        orderType,
        paymentStatus,
        sort,
        sortBy
      )
    );
  };

  /**
   * get transaction reports by filter
   */
  const transactionReportsFilterSubmitHandler = () => {
    fetchTransactionReports();
  };

  /**
   * reset transaction reports filter
   */
  const resetTransactionReportsFilter = () => {
    setSearchTransaction("");
    setStartDate("");
    setEndDate("");
    setOrderType("All");
    setPaymentStatus("All");
    setPage(1);
    page === 1 &&
      dispatch(
        getTransactionReportsActionThunk(
          null,
          1,
          itemsPerPage,
          "",
          "",
          "All",
          "All",
          "ASC",
          ""
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };

  const headers = [
    { label: "Customer Name", key: "customerName" },
    { label: "Customer Email", key: "customerEmail" },
    { label: "Customer Number", key: "customerNumber" },
    { label: "Driver Name", key: "driverName" },
    { label: "Driver Email", key: "driverEmail" },
    { label: "Driver Number", key: "driverNumber" },
    { label: "Vendor Name", key: "vendorName" },
    { label: "Created On", key: "createdOn" },
    { label: "Order Delivered Date & Time", key: "deliveredDateAndTime" },
    { label: "Total Amount", key: "totalAmount" },
    { label: "Payment Status", key: "paymenrStatus" },
    { label: "Order Type", key: "orderType" },
    { label: "Admin Commission ", key: "adminCommission" },
    { label: "Payment Mode", key: "paymentMode" },
  ];

  function generateXLSX(
    data: TGetTransactionReportsPayload,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        customerName: item?.order?.user?.fullName
          ? item?.order?.user?.fullName
          : "-",
        customerEmail: item?.order?.user?.email
          ? item?.order?.user?.email
          : "-",
        customerNumber:
          item?.order?.user?.countryCode && item?.order?.user?.mobileNumber
            ? item?.order?.user?.countryCode +
              " " +
              item?.order?.user?.mobileNumber
            : "-",
        driverName: item?.driver?.fullName ? item?.driver?.fullName : "-",
        driverEmail: item?.driver?.email ? item?.driver?.email : "-",
        driverNumber:
          item?.driver?.countryCode && item?.driver?.mobileNumber
            ? item?.driver?.countryCode + " " + item?.driver?.mobileNumber
            : "-",
        vendorName: item?.vendor?.fullName ? item?.vendor?.fullName : "-",
        createdOn: item?.createdAt
          ? moment(item?.createdAt).format("DD/MM/YYYY")
          : "-",
        deliveredDateAndTime: item?.scheduleDate
          ? moment(item?.scheduleDate).format("DD/MM/YYYY hh:mm A")
          : "-",
        totalAmount: item?.grandTotal ? "$" + item?.grandTotal : "-",
        paymenrStatus: item?.order?.isPaid === true ? "Paid" : "Pending",
        orderType:
          item?.orderType === 1
            ? "Fuel Delivery"
            : "Propane Tank Exchange Delivery",
        adminCommission: item?.adminReceivedAmount
          ? "$" + item?.adminReceivedAmount
          : "-",
        paymentMode: "Online",
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
      <div className="tab-pane fadeIn active" id="tab-6">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchTransaction}
                onChange={(e) => setSearchTransaction(e.target.value)}
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
                transactionReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetTransactionReportsFilter}
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
                      transactions?.transactions,
                      `Transaction Report`,
                      [
                        {
                          header: "Customer Name",
                          key: "customerName",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Customer Email",
                          key: "customerEmail",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Customer Number",
                          key: "customerNumber",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Driver Name",
                          key: "driverName",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Driver Email",
                          key: "driverEmail",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Driver Number",
                          key: "driverNumber",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Vendor Name",
                          key: "vendorName",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Created On",
                          key: "createdOn",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Order Delivered Date & Time",
                          key: "deliveredDateAndTime",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Total Amount",
                          key: "totalAmount",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Payment Status",
                          key: "paymenrStatus",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Order Type",
                          key: "orderType",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Admin Commission ",
                          key: "adminCommission",
                          style: { alignment: { horizontal: "left" } },
                        },
                        {
                          header: "Payment Mode",
                          key: "paymentMode",
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
                  data={transactions?.transactions?.map((report) => ({
                    ...report,
                    customerName: report?.order?.user?.fullName
                      ? report?.order?.user?.fullName
                      : "-",
                    customerEmail: report?.order?.user?.email
                      ? report?.order?.user?.email
                      : "-",
                    customerNumber:
                      report?.order?.user?.countryCode &&
                      report?.order?.user?.mobileNumber
                        ? report?.order?.user?.countryCode +
                          " " +
                          report?.order?.user?.mobileNumber
                        : "-",
                    driverName: report?.driver?.fullName
                      ? report?.driver?.fullName
                      : "-",
                    driverEmail: report?.driver?.email
                      ? report?.driver?.email
                      : "-",
                    driverNumber:
                      report?.driver?.countryCode &&
                      report?.driver?.mobileNumber
                        ? report?.driver?.countryCode +
                          " " +
                          report?.driver?.mobileNumber
                        : "-",
                    vendorName: report?.vendor?.fullName
                      ? report?.vendor?.fullName
                      : "-",
                    createdOn: report?.createdAt
                      ? moment(report?.createdAt).format("DD/MM/YYYY")
                      : "-",
                    deliveredDateAndTime: report?.scheduleDate
                      ? moment(report?.scheduleDate).format(
                          "DD/MM/YYYY hh:mm A"
                        )
                      : "-",
                    totalAmount: report?.grandTotal
                      ? "$" + report?.grandTotal
                      : "-",
                    paymenrStatus:
                      report?.order?.isPaid === true ? "Paid" : "Pending",
                    orderType:
                      report?.orderType === 1
                        ? "Fuel Delivery"
                        : "Propane Tank Exchange Delivery",
                    adminCommission: report?.adminReceivedAmount
                      ? "$" + report?.adminReceivedAmount
                      : "-",
                    paymentMode: "Online",
                  }))}
                  headers={headers}
                  filename={`Transaction Report`}
                >
                  <i className="fa fa-file-csv fa-fw mr-1"></i>
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Pagination
          ItemsComponent={TransactionReportsList}
          pageCount={transactions?.count || 0}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          setFilterBy={setSortBy}
          dispatchAction={fetchTransactionReports}
        />
      </div>
    </Report>
  );
};

export default TransactionReports;

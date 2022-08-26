import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import moment from "moment";
import { CSVLink } from "react-csv";
import * as excel from "exceljs";
import { saveAs } from "file-saver";

import { DatePicker } from "../../components";
import Pagination from "../../components/pagination/Pagination";
import Report from "./list";
import CustomerReportsList from "./CustomerReportsList";
import TRootState from "../../store/root.types";
import { getCustomerReportsActionThunk } from "../../store/reports/reports.actions.async";
import { TCustomerDetails } from "../../store/reports/reports.types";

const SelectMembershipStatus = [
  { value: "All", label: "All" },
  { value: "1", label: "Free" },
  { value: "2", label: "Paid" },
];

const SelectCustomerStatus = [
  { value: "All", label: "All" },
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

const CustomerReports = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const customers = useSelector(
    (state: TRootState) => state?.reports?.customerData
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  // const defaultStartDate = moment().subtract(30, "days").startOf("day");
  // const defaultEndDate = moment().endOf("day");
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [membershipStatus, setMembershipStatus] = useState("All");
  const [customerStatus, setCustomerStatus] = useState("All");
  const [sort, setSort] = useState("ASC");

  /**
   *  get customer reports thunk dispatch
   */
  const fetchCustomersReports = (pages?: number) => {
    dispatch(
      getCustomerReportsActionThunk(
        searchCustomer || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        membershipStatus,
        customerStatus,
        sort
      )
    );
  };

  /**
   * get customer reports by filter
   */
  const customerReportsFilterSubmitHandler = () => {
    fetchCustomersReports();
  };

  /**
   * reset customer reports filter
   */
  const resetCustomerReportsFilter = () => {
    setSearchCustomer("");
    setStartDate("");
    setEndDate("");
    setMembershipStatus("All");
    setCustomerStatus("All");
    setPage(1);
    page === 1 &&
      dispatch(
        getCustomerReportsActionThunk(
          null,
          1,
          itemsPerPage,
          "",
          "",
          "All",
          "All",
          "ASC"
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };

  /**
   * download csv and excel
   */
  const headers = [
    { label: "Customer Name", key: "user_full_name" },
    { label: "Mobile Number", key: "user_mobile_number" },
    { label: "Email Id", key: "user_email" },
    { label: "Registration Date", key: "user_created_at" },
    { label: "Membership Status", key: "subscription_status" },
    { label: "Customer Status", key: "user_is_active" },
    { label: "No. of Orders", key: "TotalOrders" },
    { label: "Total Amount Recived", key: "TotalAmountPaid" },
  ];

  /**
   * xlsx file generate functionality
   * @param data
   * @param fileName
   */
  function generateXLSX(
    data: TCustomerDetails,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        name: item?.user_full_name,
        number:
          item?.user_country_code && item?.user_mobile_number
            ? item?.user_country_code + " " + item?.user_mobile_number
            : "-",
        emailId: item?.user_email,
        regestrationDate: moment(item?.user_created_at?.toString()).format(
          "DD/MM/YYYY"
        ),
        membershipStatus:
          item?.user_user_subscription_count === 0 ? "Free" : "Paid",
        customerStatus: +item?.user_is_active === 1 ? "Active" : "Inactive",
        noOfOrders: item?.TotalOrders || "-",
        totalAmountReceived: item?.TotalAmountPaid
          ? "$" + item?.TotalAmountPaid
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

  return (
    <Report>
      <div className="tab-pane fadeIn active" id="tab-1">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchCustomer}
                onChange={(e) => setSearchCustomer(e.target.value)}
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
                    <label>Membership Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        membershipStatus
                          ? (SelectMembershipStatus || []).find(
                              (prod) => prod.value === membershipStatus
                            ) || null
                          : null
                      }
                      onChange={(val) => setMembershipStatus(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectMembershipStatus || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Customer Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        customerStatus
                          ? (SelectCustomerStatus || []).find(
                              (prod) => prod.value === customerStatus
                            ) || null
                          : null
                      }
                      onChange={(val) => setCustomerStatus(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectCustomerStatus || []}
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
                customerReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetCustomerReportsFilter}
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
                    generateXLSX(customers?.customers, `Customer Report`, [
                      {
                        key: "name",
                        header: "Customer Name",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "number",
                        header: "Mobile Number",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "emailId",
                        header: "Email Id",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "regestrationDate",
                        header: "Registration Date	",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "membershipStatus",
                        header: "Membership Status",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "customerStatus",
                        header: "Customer Status",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "noOfOrders",
                        header: "No. of Orders",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "totalAmountReceived",
                        header: "Total Amount Recived",
                        style: { alignment: { horizontal: "left" } },
                      },
                    ])
                  }
                >
                  <i className="fa fa-file-excel fa-fw mr-1"></i> Excel
                </Dropdown.Item>
                <CSVLink
                  className="dropdown-item"
                  data={customers?.customers?.map((report) => ({
                    ...report,
                    user_mobile_number:
                      report?.user_country_code && report?.user_mobile_number
                        ? report?.user_country_code +
                          " " +
                          report?.user_mobile_number
                        : "-",
                    user_created_at:
                      moment(report?.user_created_at).format("MM/DD/YYYY") ||
                      "-",
                    subscription_status:
                      report?.user_user_subscription_count === 0
                        ? "Free"
                        : "Paid",
                    TotalOrders: report?.TotalOrders.toString() || "-",
                    TotalAmountPaid: report?.TotalAmountPaid
                      ? "$" + report?.TotalAmountPaid
                      : "-",
                    user_is_active:
                      +report?.user_is_active === 1 ? "Active" : "Inactive",
                  }))}
                  headers={headers}
                  filename={`Customer Report`}
                >
                  <i className="fa fa-file-csv fa-fw mr-1"></i>
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Pagination
          ItemsComponent={CustomerReportsList}
          pageCount={customers?.count || 0}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          dispatchAction={fetchCustomersReports}
        />
      </div>
    </Report>
  );
};

export default CustomerReports;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";
import { CSVLink } from "react-csv";
import * as excel from "exceljs";
import { saveAs } from "file-saver";

import Pagination from "../../components/pagination/Pagination";
import { DatePicker } from "../../components";
import Report from "./list";
import VendorReportsList from "./VendorReportsList";
import TRootState from "../../store/root.types";
import { getVendorReportsActionThunk } from "../../store/reports/reports.actions.async";
import { TGetVendorReportsPayload } from "../../store/reports/reports.types";
import { fixPrice } from "../../utils/helpers/priceFixed";

const SelectVendorStatus = [
  { value: "All", label: "All" },
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

const VendorReports = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const state = history?.location?.state as { page: string };

  const vendor = useSelector((state: TRootState) => state?.reports?.vendorData);

  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchVendor, setSearchVendor] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [vendorStatus, setVendorStatus] = useState("All");
  const [sort, setSort] = useState("ASC");

  /**
   *  get vendor reports thunk dispatch
   */
  const fetchVendorsReports = (pages?: number) => {
    dispatch(
      getVendorReportsActionThunk(
        searchVendor || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        vendorStatus,
        sort
      )
    );
  };

  /**
   * get vendor reports by filter
   */
  const vendorReportsFilterSubmitHandler = () => {
    fetchVendorsReports();
  };

  /**
   * reset driver reports filter
   */
  const resetVendorReportsFilter = () => {
    setSearchVendor("");
    setStartDate("");
    setEndDate("");
    setVendorStatus("All");
    setPage(1);
    page === 1 &&
      dispatch(
        getVendorReportsActionThunk(null, 1, itemsPerPage, "", "", "All", "ASC")
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };

  /**
   * download csv and excel
   */

  const headers = [
    { label: "Vendor Name", key: "user_full_name" },
    { label: "Vendor Mobile", key: "user_mobile_number" },
    { label: "Vendor Email", key: "user_email" },
    { label: "Vendor Status", key: "user_is_active" },
    { label: "No. of Orders Delivered", key: "DeliveredOrders" },
    { label: "No. of Orders Reschedule", key: "RescheduleOrders" },
    {
      label: "Total Amount Paid by Customer on Online",
      key: "TotalAmountPaidOnline",
    },
    { label: "Total Net Earning Admin", key: "AdminNetEarning" },
    { label: "Total Net Earning Vendor", key: "VendorNetEarning" },
    {
      label: "Total Amount Paid to Freelance Driver",
      key: "totalAmountPaidToFreelanceDriver",
    },
  ];

  /**
   * xlsx file generate functionality
   * @param data
   * @param fileName
   */
  const generateXLSX = (
    data: TGetVendorReportsPayload,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) => {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        name: item?.user_full_name || "-",
        number:
          item?.user_country_code && item?.user_mobile_number
            ? item?.user_country_code + " " + item?.user_mobile_number
            : "-",
        emailId: item?.user_email || "-",
        vendorStatus: +item?.user_is_active === 1 ? "Active" : "Inactive",
        noOfOrdersDelivered: item?.DeliveredOrders || "-",
        noOfOrdersReschedule: item?.RescheduleOrders || "-",
        totalAmountPaidByCustomerOnOnline: item?.TotalAmountPaidOnline
          ? "$" + fixPrice(item?.TotalAmountPaidOnline)
          : "-",
        totalNetEarningAdmin: item?.AdminNetEarning
          ? "$" + fixPrice(item?.AdminNetEarning)
          : "-",
        totalNetEarningVendor: item?.VendorNetEarning
          ? "$" + fixPrice(item?.VendorNetEarning)
          : "-",
        totalAmountPaidToFreelanceDriver: item?.totalAmountPaidToFreelanceDriver
          ? "$" + fixPrice(item?.totalAmountPaidToFreelanceDriver)
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
  };

  return (
    <Report>
      <div className="tab-pane fadeIn active" id="tab-2">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchVendor}
                onChange={(e) => setSearchVendor(e.target.value)}
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
            <Select
              className="custom-select-dropdown w-175"
              value={
                vendorStatus
                  ? (SelectVendorStatus || []).find(
                      (prod) => prod.value === vendorStatus
                    ) || null
                  : null
              }
              onChange={(val) => setVendorStatus(val?.value || "")}
              placeholder="-- Select Vendor Status --"
              options={SelectVendorStatus || []}
            />
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setPage(1);
                vendorReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetVendorReportsFilter}
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
                    generateXLSX(vendor?.vendor, `Vendor report `, [
                      {
                        key: "name",
                        header: " Vendor Name",
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
                        key: "vendorStatus",
                        header: "Vendor Status",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "noOfOrdersDelivered",
                        header: "No. of Orders Delivered",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "noOfOrdersReschedule",
                        header: "No. of Orders Reschedule",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "totalAmountPaidByCustomerOnOnline",
                        header: "Total Amount Paid by Customer on Online",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "totalNetEarningAdmin",
                        header: "Total Net Earning Admin",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "totalNetEarningVendor",
                        header: "Total Net Earning Vendor",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "totalAmountPaidToFreelanceDriver",
                        header: "Total Amount Paid to Freelance Driver",
                        style: { alignment: { horizontal: "left" } },
                      },
                    ])
                  }
                >
                  <i className="fa fa-file-excel fa-fw mr-1"></i> Excel
                </Dropdown.Item>

                <CSVLink
                  className="dropdown-item"
                  data={vendor?.vendor.map((report) => ({
                    ...report,
                    user_mobile_number:
                      report?.user_country_code && report?.user_mobile_number
                        ? report?.user_country_code +
                          " " +
                          report?.user_mobile_number
                        : "-",
                    user_is_active:
                      +report?.user_is_active === 1 ? "Active" : "Inactive",
                    DeliveredOrders: report?.DeliveredOrders || "-",
                    RescheduleOrders: report?.RescheduleOrders || "-",
                    TotalAmountPaidOnline: report?.TotalAmountPaidOnline
                      ? "$" + fixPrice(report?.TotalAmountPaidOnline)
                      : "-",
                    AdminNetEarning: report?.AdminNetEarning
                      ? "$" + fixPrice(report?.AdminNetEarning)
                      : "-",
                    VendorNetEarning: report?.VendorNetEarning
                      ? "$" + fixPrice(report?.VendorNetEarning)
                      : "-",
                    totalAmountPaidToFreelanceDriver: report?.totalAmountPaidToFreelanceDriver
                      ? "$" + fixPrice(report?.totalAmountPaidToFreelanceDriver)
                      : "-",
                  }))}
                  headers={headers}
                  filename={`Vendor report`}
                >
                  <i className="fa fa-file-csv fa-fw mr-1"></i>
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Pagination
          ItemsComponent={VendorReportsList}
          pageCount={vendor?.count || 0}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          dispatchAction={fetchVendorsReports}
        />
      </div>
    </Report>
  );
};

export default VendorReports;

import React, { useEffect, useState } from "react";
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
import DriverReportsList from "./DriverReportsList";
import TRootState from "../../store/root.types";
import { getDriverReportsActionThunk } from "../../store/reports/reports.actions.async";
import {
  getAllFreelanceDriversActionThunk,
  getAllVendorDriversActionThunk,
} from "../../store/drivers/drivers.actions.async";
import { TGetDriverReportsPayload } from "../../store/reports/reports.types";

const SelectDriverStatus = [
  { value: "All", label: "All" },
  { value: "1", label: "Active" },
  { value: "0", label: "Inactive" },
];

const DriverReports = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const driver = useSelector((state: TRootState) => state?.reports?.driverData);
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchDriver, setSearchDriver] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [driverName, setDriverName] = useState("All");
  const [freelanceDriverName, setFreelanceDriverName] = useState("All");
  const [driverStatus, setDriverStatus] = useState("All");
  const [sort, setSort] = useState("ASC");
  const [sortBy, setSortBy] = useState<string | null>(null);
  // const [driverType, setDriverType] = useState();

  const SelectDriver = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.drivers.allVendorDrivers].map(
      (driver) => ({
        label: driver.fullName,
        value: driver.id.toString(),
      })
    )
  );

  const SelectFreelanceDriver = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.drivers.allFreelanceDrivers].map(
      (driver) => ({
        label: driver.fullName,
        value: driver.id.toString(),
      })
    )
  );
  /**
   *  get driver reports thunk dispatch
   */
  const fetchDriversReports = (pages?: number) => {
    dispatch(
      getDriverReportsActionThunk(
        searchDriver || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        driverName,
        freelanceDriverName,
        driverStatus,
        sort,
        sortBy
      )
    );
  };

  useEffect(() => {
    dispatch(getAllVendorDriversActionThunk(false, true));
    dispatch(getAllFreelanceDriversActionThunk(true, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * get driver reports by filter
   */
  const driverReportsFilterSubmitHandler = () => {
    fetchDriversReports();
  };

  /**
   * reset driver reports filter
   */
  const resetDriverReportsFilter = () => {
    setSearchDriver("");
    setStartDate("");
    setEndDate("");
    setDriverName("All");
    setFreelanceDriverName("All");
    setDriverStatus("All");
    setPage(1);
    page === 1 &&
      dispatch(
        getDriverReportsActionThunk(
          null,
          1,
          itemsPerPage,
          "",
          "",
          "All",
          "All",
          "All",
          "ASC",
          "driver"
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };

  /**
   * download csv and excel
   */
  const headers = [
    { label: "Driver Name", key: "driverName" },
    { label: "Driver Type", key: "driverType" },
    { label: "Mobile Number", key: "driverMobile" },
    { label: "Email Id", key: "driverEmail" },
    { label: "Vendor Name", key: "vendorName" },
    { label: "Driver Status", key: "driverStatus" },
    { label: "No. of Orders", key: "driverOrders" },
    { label: "Total Amount", key: "totalAmount" },
  ];
  /**
   * xlsx file generate functionality
   * @param data
   * @param fileName
   */
  const generateXLSX = (
    data: TGetDriverReportsPayload,
    fileName: any,
    header: { key: string; header: string; style?: any }[]
  ) => {
    const workbook: excel.Workbook = new excel.Workbook();
    const sheet: excel.Worksheet = workbook.addWorksheet(fileName);
    sheet.getRow(1).font = { bold: true };
    sheet.columns = header;
    for (let item of data) {
      sheet.addRow({
        driverName: item?.user_full_name ? item?.user_full_name : "-",
        driverType: !item?.vendor_id ? "Freelance" : "-",
        driverMobile:
          item?.user_country_code && item?.user_mobile_number
            ? item?.user_country_code + " " + item?.user_mobile_number
            : "-",
        driverEmail: item?.user_email ? item?.user_email : "-",
        vendorName: item?.users_full_name ? item?.users_full_name : "-",
        driverStatus: +item?.user_is_active === 1 ? "Active" : "Inactive",
        driverOrders: item?.TotalOrders ? item?.TotalOrders : "-",
        totalAmount: item?.totalAmount ? "$" + item?.totalAmount : "-",
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
      <div className="tab-pane fadeIn active" id="tab-3">
        <div className="px-3 pt-3 pb-2 d-flex justify-content-end">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchDriver}
                onChange={(e) => setSearchDriver(e.target.value)}
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
                    <label>Driver</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        driverName
                          ? (SelectDriver || []).find(
                              (prod) => prod.value === driverName
                            ) || null
                          : null
                      }
                      onChange={(val) => setDriverName(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectDriver || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Freelance Driver</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        freelanceDriverName
                          ? (SelectFreelanceDriver || []).find(
                              (prod) => prod.value === freelanceDriverName
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setFreelanceDriverName(val?.value || "")
                      }
                      placeholder="-- Select --"
                      options={SelectFreelanceDriver || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Driver Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        driverStatus
                          ? (SelectDriverStatus || []).find(
                              (prod) => prod.value === driverStatus
                            ) || null
                          : null
                      }
                      onChange={(val) => setDriverStatus(val?.value || "")}
                      placeholder="-- Select --"
                      options={SelectDriverStatus || []}
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
                driverReportsFilterSubmitHandler();
              }}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetDriverReportsFilter}
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
                    generateXLSX(driver?.drivers, `Driver report`, [
                      {
                        key: "driverName",
                        header: "Driver Name",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "driverType",
                        header: "Driver Type",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "driverMobile",
                        header: "Mobile Number",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "driverEmail",
                        header: "Email Id",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "vendorName",
                        header: "Vendor Name",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "driverStatus",
                        header: "Driver Status",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "driverOrders",
                        header: "No. of Orders",
                        style: { alignment: { horizontal: "left" } },
                      },
                      {
                        key: "totalAmount",
                        header: "Total Amount",
                        style: { alignment: { horizontal: "left" } },
                      },
                    ])
                  }
                >
                  <i className="fa fa-file-excel fa-fw mr-1"></i> Excel
                </Dropdown.Item>

                <CSVLink
                  className="dropdown-item"
                  data={driver?.drivers.map((report) => ({
                    ...report,
                    driverName: report?.user_full_name
                      ? report?.user_full_name
                      : "-",
                    driverType: !report?.vendor_id ? "Freelance" : "-",
                    driverMobile:
                      report?.user_country_code && report?.user_mobile_number
                        ? report?.user_country_code +
                          " " +
                          report?.user_mobile_number
                        : "-",
                    driverEmail: report?.user_email ? report?.user_email : "-",
                    vendorName: report?.users_full_name
                      ? report?.users_full_name
                      : "-",
                    driverStatus:
                      +report?.user_is_active === 1 ? "Active" : "Inactive",
                    driverOrders: report?.TotalOrders
                      ? report?.TotalOrders
                      : "-",
                    totalAmount: report?.totalAmount
                      ? "$" + report?.totalAmount
                      : "-",
                  }))}
                  headers={headers}
                  filename={`Driver report`}
                >
                  <i className="fa fa-file-csv fa-fw mr-1"></i>
                  CSV
                </CSVLink>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Pagination
          ItemsComponent={DriverReportsList}
          pageCount={driver?.count || 0}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          setFilterBy={setSortBy}
          dispatchAction={fetchDriversReports}
        />
      </div>
    </Report>
  );
};

export default DriverReports;

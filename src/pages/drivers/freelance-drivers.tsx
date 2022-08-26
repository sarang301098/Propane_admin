import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import moment from "moment";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";

import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import { DatePicker } from "../../components";
import FreelanceDriversList from "./freelance-drivers-list";
import TRootState from "../../store/root.types";
import { getFreelanceDriversActionThunk } from "../../store/drivers/drivers.actions.async";

const SelectDriverApprovalStatus = [
  { value: "All", label: "All" },
  { value: "1", label: "Approved" },
  { value: "0", label: "Not Approved" },
];

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const FreelanceDrivers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchFreelanceDriver, setSearchFreelanceDriver] = useState<
    string | null
  >(null);
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [driverApprovalStatus, setDriverApprovalStatus] = useState("All");
  const [driverStatus, setDriverStatus] = useState("All");
  const [sort, setSort] = useState("ASC");
  const freelanceDriversList = useSelector(
    (state: TRootState) => state.drivers.freelanceDriversList
  );

  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );

  /**
   *  get freelance drivers thunk dispatch
   **/
  const fetchFreelanceDrivers = (pages?: number) => {
    dispatch(
      getFreelanceDriversActionThunk(
        searchFreelanceDriver || null,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        driverStatus,
        driverApprovalStatus,
        sort
      )
    );
  };

  /**
   * get freelance drivers by filter
   */
  const freelanceDriverFilterSubmitHandler = () => {
    fetchFreelanceDrivers();
  };

  /**
   * reset freelance drivers get by filter
   */
  const resetFreelanceDriverFilter = () => {
    setSearchFreelanceDriver("");
    setStartDate("");
    setEndDate("");
    setDriverApprovalStatus("All");
    setDriverStatus("All");
    setSort("ASC");
    dispatch(
      getFreelanceDriversActionThunk(
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
  };

  return (
    <div id="app">
      <div className="d-block d-lg-none">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>Freelance Drivers</h1>
              </div>
              <div className="m-l-10">
                <div className="input-group w-250">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    title="Search"
                    value={searchFreelanceDriver || ""}
                    onChange={(e) => setSearchFreelanceDriver(e.target.value)}
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
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
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
                        <label>Driver Approval Request</label>
                        <Select
                          className="custom-select-dropdown"
                          value={
                            driverApprovalStatus
                              ? (SelectDriverApprovalStatus || []).find(
                                  (prod) => prod.value === driverApprovalStatus
                                ) || null
                              : null
                          }
                          onChange={(val) =>
                            setDriverApprovalStatus((val && val.value) || "")
                          }
                          placeholder="-- Select --"
                          options={SelectDriverApprovalStatus || []}
                        />
                      </div>
                      <div className="form-group">
                        <label>Status</label>
                        <Select
                          className="custom-select-dropdown"
                          value={
                            driverStatus
                              ? (SelectStatus || []).find(
                                  (prod) => prod.value === driverStatus
                                ) || null
                              : null
                          }
                          onChange={(val) =>
                            setDriverStatus((val && val.value) || "")
                          }
                          placeholder="-- Select --"
                          options={SelectStatus || []}
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
                  onClick={freelanceDriverFilterSubmitHandler}
                >
                  Submit
                </button>
              </div>
              <div className="m-l-10">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetFreelanceDriverFilter}
                >
                  Reset
                </button>
              </div>
            </div>
          </header>
          <section className="page-content container-fluid">
            <div className="card">
              <div className="card-body p-0">
                <div className="tab-pane fadeIn active" id="tab-2">
                  <Pagination
                    ItemsComponent={FreelanceDriversList}
                    pageCount={
                      freelanceDriversList ? freelanceDriversList.count : 1
                    }
                    dispatchAction={fetchFreelanceDrivers}
                    page={page}
                    setPage={setPage}
                    filter={sort}
                    setFilter={setSort}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FreelanceDrivers;

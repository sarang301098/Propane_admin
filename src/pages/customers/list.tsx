import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import moment from "moment";

import { Sidebar } from "../../components/sidebar/sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import { DatePicker } from "../../components";
import { getCustomersActionThunk } from "../../store/customer/customer.actions.async";
import TRootState from "../../store/root.types";
import CustomerList from "./CustomerList";
import Pagination from "../../components/pagination/Pagination";

const SelectMembershipStatus = [
  { value: "All", label: "All" },
  { value: "Free", label: "Free" },
  { value: "Paid", label: "Paid" },
];

const SelectCustomerStatus = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const Customers: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const customersData = useSelector(
    (state: TRootState) => state?.customer?.customersData
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchCustomer, setSearchCustomer] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<
    moment.Moment | null | undefined
  >();
  const [endDate, setEndDate] = useState<moment.Moment | null | undefined>();
  const [membershipStatus, setMembershipStatus] = useState<
    string | number | null
  >("All");
  const [customerStatus, setCustomerStatus] = useState<string | null>("All");
  const [sort, setSort] = useState("ASC");

  /**
   *  get customer thunk dispatch
   */
  const fetchCustomers = (pages?: number) => {
    dispatch(
      getCustomersActionThunk(
        searchCustomer === "" ? null : searchCustomer,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        membershipStatus === "All"
          ? null
          : membershipStatus === "Paid"
          ? 2
          : membershipStatus === "Free"
          ? 1
          : null,
        customerStatus === "All"
          ? null
          : customerStatus === "Active"
          ? true
          : customerStatus === "Inactive"
          ? false
          : null,
        sort
      )
    );
  };

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Customers </h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchCustomer || ""}
                      onChange={(e) => setSearchCustomer(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          fetchCustomers();
                        }
                      }}
                    />

                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => fetchCustomers()}
                      >
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
                          <label>Membership Status</label>
                          <Select
                            className="custom-select-dropdown"
                            classNamePrefix="react-select-dropdown"
                            value={
                              membershipStatus
                                ? (SelectMembershipStatus || []).find(
                                    (prod) => prod.value === membershipStatus
                                  ) || null
                                : { value: null, label: "All" }
                            }
                            onChange={(val) =>
                              setMembershipStatus(val && val.value)
                            }
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
                                : { value: null, label: "All" }
                            }
                            onChange={(val) =>
                              setCustomerStatus(val && val.value)
                            }
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
                    onClick={() => fetchCustomers()}
                  >
                    Submit
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      history.push(history.location.pathname, {
                        page: "1",
                      });
                      setPage(1);
                      setSearchCustomer(null);
                      setStartDate(null || undefined);
                      setEndDate(null || undefined);
                      setMembershipStatus("All");
                      setCustomerStatus("All");
                      setSort("ASC");
                      dispatch(
                        getCustomersActionThunk(
                          null,
                          page,
                          itemsPerPage,
                          null || undefined,
                          null || undefined,
                          null,
                          null,
                          "ASC"
                        )
                      );
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <Pagination
                      ItemsComponent={CustomerList}
                      pageCount={customersData ? customersData.count : 1}
                      page={page}
                      setPage={setPage}
                      dispatchAction={fetchCustomers}
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
    </React.Fragment>
  );
};

export default Customers;

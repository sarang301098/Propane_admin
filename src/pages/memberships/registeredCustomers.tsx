import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import moment from "moment";

import { DatePicker } from "../../components";
import Pagination from "../../components/pagination/Pagination";
import RegisteredCustomersList from "./registeredCustomersList";
import MemberShipList from "./list";
import TRootState from "../../store/root.types";
import { getCustomersActionThunk } from "../../store/customer/customer.actions.async";

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const RegisteredCustomers = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const membershipList = useSelector((state: TRootState) => state.customer.customersData);
  const itemsPerPage = useSelector((state: TRootState) => state.pagination.perPageItems);

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchCustomer, setSearchCustomer] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<moment.Moment | null | undefined>();
  const [endDate, setEndDate] = useState<moment.Moment | null | undefined>();
  const [customerStatus, setCustomerStatus] = useState<string | null>("All");
  const [sort, setSort] = useState("ASC");

  /**
   *  get membership thunk dispatch
   */
  const fetchMembership = (pages?: number) => {
    dispatch(
      getCustomersActionThunk(
        searchCustomer === "" ? null : searchCustomer,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        1,
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
    <MemberShipList>
      <div className="tab-pane fadeIn active" id="tab-1">
        <div className="p-3 d-flex justify-content-end inner-filter">
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
                    fetchMembership();
                  }
                }}
              />
              <div className="input-group-append">
                <button type="button" className="input-group-text pointer" onClick={() => fetchMembership()}>
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
            <Select
              className="custom-select-dropdown w-150"
              value={
                customerStatus
                  ? (SelectStatus || []).find((prod) => prod.value === customerStatus) || null
                  : { value: null, label: "All" }
              }
              onChange={(val) => setCustomerStatus(val && val.value)}
              placeholder="-- Status --"
              options={SelectStatus || []}
            />
          </div>
          <div className="m-l-10">
            <button type="button" className="btn btn-dark" onClick={() => fetchMembership()}>
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
                setCustomerStatus("All");
                setSort("ASC");
                dispatch(
                  getCustomersActionThunk(
                    null,
                    page,
                    itemsPerPage,
                    null || undefined,
                    null || undefined,
                    1,
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

        <Pagination
          ItemsComponent={RegisteredCustomersList}
          pageCount={membershipList ? membershipList.count : 1}
          dispatchAction={fetchMembership}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
        />
      </div>
    </MemberShipList>
  );
};

export default RegisteredCustomers;

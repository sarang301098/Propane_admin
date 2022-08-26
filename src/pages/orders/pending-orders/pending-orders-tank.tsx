import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import moment from "moment";

import { DatePicker } from "../../../components";
import Pagination from "../../../components/pagination/Pagination";
import TRootState from "../../../store/root.types";
import PendingOrders from "./pending-orders";
import PendingOrdersTankList from "./pending-orders-tank-list";
import { getAllVendorActionThunk } from "../../../store/vendor/vendor.action.async";
import {
  getAllFreelanceDriversActionThunk,
  getAllVendorDriversActionThunk,
} from "../../../store/drivers/drivers.actions.async";
import { getOrdersTankActionThunk } from "../../../store/orders/orders.actions.async";

// const SelectVendor = [
//   { value: "All", label: "All" },
//   { value: "John Smith", label: "John Smith" },
//   { value: "Peter Williams", label: "Peter Williams" },
// ];

// const SelectDriver = [
//   { value: "All", label: "All" },
//   { value: "John Smith", label: "John Smith" },
//   { value: "Peter Williams", label: "Peter Williams" },
// ];

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "ongoing", label: "Ongoing" },
  { value: "refilled", label: "Refilled" },
  { value: "rescheduled", label: "Rescheduled" },
];

// const SelectFreelanceDriver = [
//   { value: "All", label: "All" },
//   { value: "John Smith", label: "John Smith" },
//   { value: "Peter Williams", label: "Peter Williams" },
// ];

const SelectCategory = [
  { value: "All", label: "All" },
  { value: 1, label: "Spare Tank" },
  { value: 2, label: "Exchange" },
  { value: 3, label: "Accessories" },
];

const PendingOrdersTank = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const pendingOrders = useSelector((state: TRootState) => state.orders.orderTankData);
  const itemsPerPage = useSelector((state: TRootState) => state.pagination.perPageItems);
  const vendors = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.vendor.allVendors].map((vendor) => ({
      label: vendor.fullName,
      value: vendor.id.toString(),
    }))
  );

  const drivers = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.drivers.allVendorDrivers].map((driver) => ({
      label: driver.fullName,
      value: driver.id.toString(),
    }))
  );

  const freelanceDrivers = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.drivers.allFreelanceDrivers].map((driver) => ({
      label: driver.fullName,
      value: driver.id.toString(),
    }))
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchOrder, setSearchOrder] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<moment.Moment | null | undefined>();
  const [endDate, setEndDate] = useState<moment.Moment | null | undefined>();
  const [vendorName, setVendorName] = useState<string | null>("All");
  const [driverName, setDriverName] = useState<string | null>("All");
  const [freelanceDriverName, setFreelanceDriverName] = useState<string | null>("All");
  const [orderCategory, setOrderCategory] = useState<string | number | null>("All");
  const [orderStatus, setOrderStatus] = useState<string>("All");
  const [sort, setSort] = useState("DESC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  /**
   *  get pending orders thunk dispatch
   */
  const fetchPendingOrders = (pages?: number) => {
    dispatch(
      getOrdersTankActionThunk(
        searchOrder === "" ? null : searchOrder,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        sort,
        sortBy,
        vendorName === "All" ? null : vendorName,
        driverName === "All" ? null : driverName,
        freelanceDriverName === "All" ? null : freelanceDriverName,
        orderCategory === "All" ? null : orderCategory,
        orderStatus === "All" ? ["pending", "ongoing", "refilled", "rescheduled"] : [orderStatus]
      )
    );
  };

  useEffect(() => {
    dispatch(getAllVendorActionThunk());
    dispatch(getAllVendorDriversActionThunk(false, true));
    dispatch(getAllFreelanceDriversActionThunk(true, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PendingOrders>
      <div className="tab-pane fadeIn active" id="tab-2">
        <div className="p-3 d-flex justify-content-end inner-filter">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchOrder || ""}
                onChange={(e) => setSearchOrder(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    fetchPendingOrders();
                  }
                }}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="input-group-text pointer"
                  onClick={() => fetchPendingOrders()}
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
              <Dropdown.Toggle className="btn btn-secondary" id="dropdown-basic">
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
                          ? (vendors || []).find((prod) => prod.value === vendorName) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setVendorName((val && val.value) || "")}
                      placeholder="-- Select --"
                      options={vendors || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Driver</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        driverName
                          ? (drivers || []).find((prod) => prod.value === driverName) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setDriverName((val && val.value) || "")}
                      placeholder="-- Select --"
                      options={drivers || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Freelance Driver</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        freelanceDriverName
                          ? (freelanceDrivers || []).find(
                              (prod) => prod.value === freelanceDriverName
                            ) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setFreelanceDriverName((val && val.value) || "")}
                      placeholder="-- Select --"
                      options={freelanceDrivers || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        orderCategory
                          ? (SelectCategory || []).find((prod) => prod.value === orderCategory) ||
                            null
                          : null
                      }
                      onChange={(val) => setOrderCategory((val && val.value) || "")}
                      placeholder="-- Select --"
                      options={SelectCategory || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        orderStatus
                          ? (SelectStatus || []).find((prod) => prod.value === orderStatus) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setOrderStatus((val && val.value) || "")}
                      placeholder="-- Select --"
                      options={SelectStatus || []}
                    />
                  </div>
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="m-l-10">
            <button onClick={() => fetchPendingOrders()} type="button" className="btn btn-dark">
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
                setSearchOrder(null);
                setStartDate(null || undefined);
                setEndDate(null || undefined);
                setSort("DESC");
                setSortBy(null);
                setVendorName("All");
                setDriverName("All");
                setFreelanceDriverName("All");
                setOrderCategory("All");
                setOrderStatus("All");
                dispatch(
                  getOrdersTankActionThunk(
                    null,
                    page,
                    itemsPerPage,
                    null || undefined,
                    null || undefined,
                    "DESC",
                    null,
                    null,
                    null,
                    null,
                    null,
                    ["pending", "ongoing", "refilled", "rescheduled"]
                  )
                );
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <Pagination
          ItemsComponent={PendingOrdersTankList}
          pageCount={pendingOrders ? pendingOrders.count : 1}
          dispatchAction={fetchPendingOrders}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          setFilterBy={setSortBy}
        />
      </div>
    </PendingOrders>
  );
};

export default PendingOrdersTank;

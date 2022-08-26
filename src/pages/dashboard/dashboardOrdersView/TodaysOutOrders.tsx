import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";

import Pagination from "../../../components/pagination/Pagination";
import TodaysOutOrdersList from "./TodaysOutOrdersList";
import TRootState from "../../../store/root.types";
import { getDashboardOrdersActionThunk } from "../../../store/DashboardStore/dashboard.actions.async";
import { getAllVendorActionThunk } from "../../../store/vendor/vendor.action.async";
import { getAllVendorDriversActionThunk } from "../../../store/drivers/drivers.actions.async";

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
  { value: "ongoing", label: "Ongoing" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "cancelled_by_admin", label: "Cancelled by Admin" },
];
const SelectOrderType = [
  { value: "All", label: "All" },
  { value: 1, label: "Fuel Delivery" },
  { value: 2, label: "Propane Tank Exchange Delivery" },
];

const TodaysOutOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const todaysOutOrdersList = useSelector((state: TRootState) => state.dashboard.dashboardOrders);
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

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchTodaysOrder, setSearchTodaysOrder] = useState<string | number | null>(null);
  const [orderType, setOrderType] = useState<string | number | null>("All");
  const [vendorName, setVendorName] = useState<string | number | null>("All");
  const [driverName, setDriverName] = useState<string | number | null>("All");
  const [orderStatus, setOrderStatus] = useState<string | null>("ongoing");
  const [sort, setSort] = useState("DESC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  /**
   *  get today orders thunk dispatch
   */
  const fetchTodaysOrders = (pages?: number) => {
    dispatch(
      getDashboardOrdersActionThunk(
        pages || page,
        itemsPerPage,
        true,
        searchTodaysOrder === "" ? null : searchTodaysOrder,
        orderType === "All" ? null : orderType,
        vendorName === "All" ? null : vendorName,
        driverName === "All" ? null : driverName,
        orderStatus === "All" ? null : orderStatus,
        sort,
        sortBy
      )
    );
  };

  useEffect(() => {
    dispatch(getAllVendorActionThunk());
    dispatch(getAllVendorDriversActionThunk(false, false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tab-pane fadeIn active" id="tab-1">
      <div className="actions top-right">
        <div className="d-flex align-items-center">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchTodaysOrder || ""}
                onChange={(e) => setSearchTodaysOrder(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    fetchTodaysOrders();
                  }
                }}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="input-group-text pointer"
                  onClick={() => fetchTodaysOrders()}
                >
                  <span className="fa fa-search"></span>
                </button>
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
                    <label>Order Type</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        orderType
                          ? (SelectOrderType || []).find((prod) => prod.value === orderType) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setOrderType(val && val.value)}
                      placeholder="-- Select --"
                      options={SelectOrderType || []}
                    />
                  </div>
                  <div className="form-group">
                    <label>Vendor</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        vendorName
                          ? (vendors || []).find((ven) => ven.value === vendorName) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setVendorName(val && val.value)}
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
                          ? (drivers || []).find((dri) => dri.value === driverName) || null
                          : { value: null, label: "All" }
                      }
                      onChange={(val) => setDriverName(val && val.value)}
                      placeholder="-- Select --"
                      options={drivers || []}
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
                      onChange={(val) => setOrderStatus(val && val.value)}
                      placeholder="-- Select --"
                      options={SelectStatus || []}
                    />
                  </div>
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="m-l-10">
            <button type="button" className="btn btn-dark" onClick={() => fetchTodaysOrders()}>
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
                setSearchTodaysOrder(null);
                setOrderType("All");
                setVendorName("All");
                setDriverName("All");
                setOrderStatus("ongoing");
                setSort("DESC");
                setSortBy(null);
                dispatch(
                  getDashboardOrdersActionThunk(
                    page,
                    itemsPerPage,
                    true,
                    null,
                    null,
                    null,
                    null,
                    "ongoing",
                    "DESC",
                    null
                  )
                );
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      <Pagination
        ItemsComponent={TodaysOutOrdersList}
        pageCount={todaysOutOrdersList ? todaysOutOrdersList.count : 1}
        dispatchAction={fetchTodaysOrders}
        page={page}
        setPage={setPage}
        filter={sort}
        setFilter={setSort}
        setFilterBy={setSortBy}
      />
    </div>
  );
};

export default TodaysOutOrders;

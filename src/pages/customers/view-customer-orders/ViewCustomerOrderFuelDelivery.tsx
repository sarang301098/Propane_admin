import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import moment from "moment";

import Pagination from "../../../components/pagination/Pagination";
import { DatePicker } from "../../../components";
import ViewCustomersOrders from "../view-customer-details/ViewCustomersOrders";
import ViewCustomerOrdersFuelDeliveryList from "./ViewCustomerOrdersFuelDeliveryList";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../../store/root.types";
import { getCustomerOrdersFuelActionThunk } from "../../../store/customer/customer.actions.async";
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
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "cancelled_by_admin", label: "Cancelled by Admin" },
];

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const ViewCustomerOrderFuelDelivery = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { customerId } = useParams<{ customerId: string }>();
  const state = history?.location?.state as { page: string };

  const customerOrders = useSelector((state: TRootState) => state.customer.customerOrderFuelData);
  const itemsPerPage = useSelector((state: TRootState) => state.pagination.perPageItems);
  // const customerId = useSelector((state: TRootState) => state.customer.customerId);
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
  const [searchCustomerOrder, setSearchCustomerOrder] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<moment.Moment | null | undefined>();
  const [endDate, setEndDate] = useState<moment.Moment | null | undefined>();
  const [vendorName, setVendorName] = useState<string | null>("All");
  const [driverName, setDriverName] = useState<string | null>("All");
  const [orderStatus, setOrderStatus] = useState<string | null>("All");
  const [sort, setSort] = useState("DESC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  /**
   *  get customer orders thunk dispatch
   */
  const fetchCustomerOrders = (pages?: number) => {
    dispatch(
      getCustomerOrdersFuelActionThunk(
        searchCustomerOrder === "" ? null : searchCustomerOrder,
        pages || page,
        itemsPerPage,
        startDate,
        endDate,
        sort,
        sortBy,
        vendorName === "All" ? null : vendorName,
        driverName === "All" ? null : driverName,
        orderStatus === "All" ? null : orderStatus,
        customerId
      )
    );
  };

  useEffect(() => {
    dispatch(getAllVendorActionThunk());
    dispatch(getAllVendorDriversActionThunk(false, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewCustomersOrders>
      <div className="tab-pane fadeIn active" id="tab-31">
        <div className="p-3 d-flex justify-content-end inner-filter">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchCustomerOrder || ""}
                onChange={(e) => setSearchCustomerOrder(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    fetchCustomerOrders();
                  }
                }}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="input-group-text pointer"
                  onClick={() => fetchCustomerOrders()}
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
            <button type="button" className="btn btn-dark" onClick={() => fetchCustomerOrders()}>
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
                setSearchCustomerOrder(null);
                setStartDate(null || undefined);
                setEndDate(null || undefined);
                setSort("DESC");
                setSortBy(null);
                setVendorName("All");
                setDriverName("All");
                setOrderStatus("All");
                dispatch(
                  getCustomerOrdersFuelActionThunk(
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
                    customerId
                  )
                );
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <Pagination
          ItemsComponent={ViewCustomerOrdersFuelDeliveryList}
          pageCount={customerOrders ? customerOrders.count : 1}
          dispatchAction={fetchCustomerOrders}
          page={page}
          setPage={setPage}
          filter={sort}
          setFilter={setSort}
          setFilterBy={setSortBy}
        />
      </div>
    </ViewCustomersOrders>
  );
};

export default ViewCustomerOrderFuelDelivery;

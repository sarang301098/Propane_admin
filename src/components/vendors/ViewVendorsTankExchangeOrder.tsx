import moment from "moment";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getAllCustomersActionThunk } from "../../store/customer/customer.actions.async";
import {
  getAllFreelanceDriversActionThunk,
  getAllVendorDriversActionThunk,
} from "../../store/drivers/drivers.actions.async";
import TRootState from "../../store/root.types";
import { getVendorOrdersActionThunk } from "../../store/vendor/vendor.action.async";
import { DatePicker } from "../date-picker/datepicker";
import Pagination from "../pagination/Pagination";
import ViewVendorsOrder from "./ViewVendorsOrder";
import ViewVendorTankExchangeOrderList from "./ViewVendorTankExchangeOrderList";

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "cancelled_by_Admin", label: "Cancelled by Admin" },
];

const ViewVendorsTankExchangeOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { vendorId } = useParams<{ vendorId: string }>();
  const { count } = useSelector(
    (state: TRootState) => state?.vendor?.vendorOrders
  );
  const drivers = useSelector(
    (state: TRootState) => state?.drivers?.allVendorDrivers
  );
  const freelanceDrivers = useSelector(
    (state: TRootState) => state?.drivers?.allFreelanceDrivers
  );
  const { customers } = useSelector(
    (state: TRootState) => state?.customer?.allCustomers
  );
  const { categories } = useSelector(
    (state: TRootState) => state?.category?.categories
  );

  const [filter, setFilter] = useState({ sort: "ASC", sortBy: "customer" });
  const [page, setPage] = useState(Number(state?.page || 1));
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [vendorOrderSearch, setVendorOrderSearch] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedFreelanceDriver, setSelectedFreelanceDriver] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("All");

  const fetchFuelDeliveryOrders = (pageNumber?: number) => {
    dispatch(
      getVendorOrdersActionThunk(
        2,
        vendorOrderSearch,
        pageNumber || page,
        itemsPerPage,
        startDate,
        endDate,
        filter?.sort,
        filter?.sortBy,
        vendorId,
        selectedDriver,
        selectedFreelanceDriver,
        category,
        status,
        selectedCustomer
      )
    );
  };

  useEffect(() => {
    dispatch(getAllCustomersActionThunk());
    dispatch(getAllVendorDriversActionThunk(false, true));
    dispatch(getAllFreelanceDriversActionThunk(true, true));
    dispatch(getCategoryActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectDriver = drivers?.map((driver) => ({
    value: driver?.id,
    label: driver?.fullName,
  }));

  const SelectCustomer = customers?.map((customer) => ({
    value: customer?.id,
    label: customer?.fullName,
  }));

  const SelectFreelanceDriver = freelanceDrivers.map((driver) => ({
    value: driver?.id,
    label: driver?.fullName,
  }));

  const SelectCategory = categories?.map((category) => ({
    label: category?.name,
    value: category?.id?.toString(),
  }));

  return (
    <ViewVendorsOrder>
      {(singleVendorData) => (
        <div className="tab-pane fadeIn active" id="tab-72">
          <div className="p-3 d-flex justify-content-end inner-filter">
            <div className="m-l-10">
              <div className="input-group w-250">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  title="Search"
                  onChange={(e) => setVendorOrderSearch(e.target.value)}
                  value={vendorOrderSearch}
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
                      <label>Customer</label>
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectedCustomer
                            ? (SelectCustomer || []).find(
                                (prod) => prod.value === selectedCustomer
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setSelectedCustomer(val?.value || "")
                        }
                        placeholder="-- Select --"
                        options={SelectCustomer || []}
                      />
                    </div>
                    <div className="form-group">
                      <label>Driver</label>
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectedDriver
                            ? (SelectDriver || []).find(
                                (prod) => prod.value === selectedDriver
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setSelectedDriver(val?.value?.toString() || "")
                        }
                        placeholder="-- Select --"
                        options={SelectDriver || []}
                      />
                    </div>
                    <div className="form-group">
                      <label>Freelance Driver</label>
                      <Select
                        className="custom-select-dropdown"
                        value={
                          selectedFreelanceDriver
                            ? (SelectFreelanceDriver || []).find(
                                (prod) => prod.value === selectedFreelanceDriver
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setSelectedFreelanceDriver(
                            val?.value?.toString() || ""
                          )
                        }
                        placeholder="-- Select --"
                        options={SelectFreelanceDriver || []}
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <Select
                        className="custom-select-dropdown"
                        value={
                          category
                            ? (SelectCategory || []).find(
                                (prod) => prod.value === category
                              ) || null
                            : null
                        }
                        onChange={(val) =>
                          setCategory(val?.value?.toString() || "")
                        }
                        placeholder="-- Select --"
                        options={SelectCategory || []}
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <Select
                        className="custom-select-dropdown"
                        value={
                          status
                            ? (SelectStatus || []).find(
                                (prod) => prod.value === status
                              ) || null
                            : null
                        }
                        onChange={(val) => setStatus(val?.value || "")}
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
                onClick={() => fetchFuelDeliveryOrders()}
              >
                Submit
              </button>
            </div>
            <div className="m-l-10">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setVendorOrderSearch("");
                  setSelectedCustomer("");
                  setSelectedDriver("");
                  setSelectedFreelanceDriver("");
                  setStatus("All");
                  dispatch(
                    getVendorOrdersActionThunk(
                      2,
                      "",
                      1,
                      itemsPerPage,
                      "",
                      "",
                      filter?.sort,
                      filter?.sortBy,
                      vendorId,
                      "",
                      "",
                      "",
                      "All",
                      ""
                    )
                  );
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <Pagination
            page={page}
            pageCount={count}
            setPage={setPage}
            dispatchAction={fetchFuelDeliveryOrders}
            ItemsComponent={ViewVendorTankExchangeOrderList}
            filter={filter}
            setFilter={setFilter}
          />
        </div>
      )}
    </ViewVendorsOrder>
  );
};

export default ViewVendorsTankExchangeOrder;

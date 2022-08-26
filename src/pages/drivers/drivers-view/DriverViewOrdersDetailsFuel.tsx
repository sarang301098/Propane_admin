import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";

import Pagination from "../../../components/pagination/Pagination";
import DriverViewOrdersDetailsFuelList from "./DriverViewOrdersDetailsFuelList";
import { DatePicker } from "../../../components";
import DriverViewOrdersDetails from "./DriverViewOrdersDetails";
import { getDriverOrdersActionThunk } from "../../../store/drivers/drivers.actions.async";
import TRootState from "../../../store/root.types";
import { getAllCustomersActionThunk } from "../../../store/customer/customer.actions.async";

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "cancelled_by_admin", label: "Cancelled by Admin" },
];

const DriverViewOrdersDetailsFuel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const { id } = useParams<{ id: string }>();

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchDriverOrders, setSearchDriverOrders] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [customerName, setCustomerName] = useState("");
  const [ordersStatus, setOrdersStatus] = useState("All");
  const [filter, setFilter] = useState({ sort: "ASC", sortBy: "customer" });

  const driverOrdersFuelList = useSelector(
    (state: TRootState) => state.drivers.driverOrdersList
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const { customers } = useSelector(
    (state: TRootState) => state?.customer?.allCustomers
  );

  /**
   *  get driver orders thunk dispatch
   **/
  const fetchDriverOrders = (pages?: number) => {
    dispatch(
      getDriverOrdersActionThunk(
        id,
        searchDriverOrders || null,
        pages || page,
        itemsPerPage,
        1,
        startDate,
        endDate,
        customerName,
        ordersStatus,
        filter?.sort,
        filter?.sortBy
      )
    );
  };

  /**
   *  get driver orders by search term
   */
  const searchDriverOrdersHandler = () => {
    fetchDriverOrders();
  };

  /**
   * get driver orders by filter
   */
  const driverOrdersFilterSubmitHandler = () => {
    fetchDriverOrders();
  };

  /**
   * reset filter
   */
  const resetDriverOrdersFilter = () => {
    setSearchDriverOrders("");
    setStartDate("");
    setEndDate("");
    setCustomerName("");
    setOrdersStatus("All");
    dispatch(
      getDriverOrdersActionThunk(
        id,
        null,
        page,
        itemsPerPage,
        1,
        "",
        "",
        "",
        "All",
        "ASC",
        "driver",
        ""
      )
    );
  };

  useEffect(() => {
    dispatch(getAllCustomersActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectCustomer = customers?.map((customer) => ({
    label: customer?.fullName,
    value: customer?.id?.toString(),
  }));

  return (
    <DriverViewOrdersDetails>
      <div className="tab-pane fadeIn active" id="tab-31">
        <div className="p-3 d-flex justify-content-end inner-filter">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchDriverOrders || ""}
                onChange={(e) => setSearchDriverOrders(e.target.value)}
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="input-group-text pointer"
                  onClick={searchDriverOrdersHandler}
                >
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
                        customerName
                          ? (SelectCustomer || []).find(
                              (prod) => prod.value === customerName
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setCustomerName((val && val.value) || "")
                      }
                      placeholder="-- Select --"
                      options={SelectCustomer || []}
                    />
                  </div>
                  {/* <div className="form-group">
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
                      onChange={(val) =>
                        setDriverName((val && val.value) || "")
                      }
                      placeholder="-- Select --"
                      options={SelectDriver || []}
                    />
                  </div> */}
                  <div className="form-group">
                    <label>Status</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        ordersStatus
                          ? (SelectStatus || []).find(
                              (prod) => prod.value === ordersStatus
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setOrdersStatus((val && val.value) || "")
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
              onClick={driverOrdersFilterSubmitHandler}
            >
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetDriverOrdersFilter}
            >
              Reset
            </button>
          </div>
        </div>

        <Pagination
          ItemsComponent={DriverViewOrdersDetailsFuelList}
          pageCount={driverOrdersFuelList ? driverOrdersFuelList.count : 1}
          dispatchAction={fetchDriverOrders}
          page={page}
          setPage={setPage}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
    </DriverViewOrdersDetails>
  );
};

export default DriverViewOrdersDetailsFuel;

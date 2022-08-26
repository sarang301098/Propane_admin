import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
// import moment from "moment";

import { DatePicker } from "../../../components";
import Pagination from "../../../components/pagination/Pagination";
import DriverViewOrdersDetailsTankList from "./DriverViewOrdersDetailsTankList";
import DriverViewOrdersDetails from "./DriverViewOrdersDetails";
import TRootState from "../../../store/root.types";
import { getDriverOrdersActionThunk } from "../../../store/drivers/drivers.actions.async";
import { getAllCustomersActionThunk } from "../../../store/customer/customer.actions.async";
import { getCategoryActionThunk } from "../../../store/category/category.action.async";

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "cancelled_by_admin", label: "Cancelled by Admin" },
];

// const SelectFreelanceDriver = [
//   { value: "All", label: "All" },
//   { value: "John Smith", label: "John Smith" },
//   { value: "Peter Williams", label: "Peter Williams" },
// ];

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const DriverViewOrdersDetailsTank = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const { id } = useParams<{ id: string }>();

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchDriverOrders, setSearchDriverOrders] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [customerName, setCustomerName] = useState("");
  const [filter, setFilter] = useState({ sort: "ASC", sortBy: "driver" });

  // const [driverName, setDriverName] = useState("");
  const [ordersStatus, setOrdersStatus] = useState("All");
  // const [freelanceDriverName, setFreelanceDriverName] = useState("");
  const [orderCategory, setOrderCategory] = useState("");

  const { customers } = useSelector(
    (state: TRootState) => state?.customer?.allCustomers
  );
  const driverOrdersTankList = useSelector(
    (state: TRootState) => state.drivers.driverOrdersTankList
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const { categories } = useSelector(
    (state: TRootState) => state?.category?.categories
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
        2,
        startDate,
        endDate,
        customerName,
        ordersStatus,
        filter?.sort,
        filter?.sortBy,
        orderCategory
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
    setOrderCategory("");
    dispatch(
      getDriverOrdersActionThunk(
        id,
        null,
        page,
        itemsPerPage,
        2,
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
    dispatch(getCategoryActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SelectCustomer = customers?.map((customer) => ({
    label: customer?.fullName,
    value: customer?.id?.toString(),
  }));

  const SelectCategory = categories?.map((category) => ({
    label: category?.name,
    value: category?.id?.toString(),
  }));

  return (
    <DriverViewOrdersDetails>
      <div className="tab-pane fadeIn active" id="tab-32">
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
                        setFreelanceDriverName((val && val.value) || "")
                      }
                      placeholder="-- Select --"
                      options={SelectFreelanceDriver || []}
                    />
                  </div> */}
                  <div className="form-group">
                    <label>Category</label>
                    <Select
                      className="custom-select-dropdown"
                      value={
                        orderCategory
                          ? (SelectCategory || []).find(
                              (prod) => prod.value === orderCategory
                            ) || null
                          : null
                      }
                      onChange={(val) =>
                        setOrderCategory((val && val.value) || "")
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
          ItemsComponent={DriverViewOrdersDetailsTankList}
          pageCount={driverOrdersTankList ? driverOrdersTankList.count : 1}
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

export default DriverViewOrdersDetailsTank;

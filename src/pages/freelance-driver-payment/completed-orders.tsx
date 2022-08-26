import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";

import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import CompletedOrdersList from "./CompletedOrdersList";
import TRootState from "../../store/root.types";
import { getDriverCompletedOrdersActionThunk } from "../../store/drivers/drivers.actions.async";
import { getAllVendorActionThunk } from "../../store/vendor/vendor.action.async";

// const SelectVendor = [
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

const FreelanceDriverCompletedOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as {
    page: string;
    completedOrders: string | undefined;
  };
  const { driverId } = useParams<{ driverId: string }>();

  const vendors = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.vendor.allVendors].map(
      (vendor) => ({
        label: vendor.fullName,
        value: vendor.id.toString(),
      })
    )
  );
  const completedOrdersList = useSelector(
    (state: TRootState) => state.drivers.completedOrdersList
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchCompletedOrders, setSearchCompletedOrders] = useState<
    string | null
  >(null);
  const [vendorName, setVendorName] = useState<string | null>("All");
  const [orderStatus, setOrderStatus] = useState<string>(
    state?.completedOrders === "completed" ? "delivered" : "All"
  );
  const [sort, setSort] = useState("DESC");
  const [sortBy, setSortBy] = useState<string | null>(null);

  /**
   *  get completed orders thunk dispatch
   **/
  const fetchCompletedOrders = (pages?: number) => {
    dispatch(
      getDriverCompletedOrdersActionThunk(
        searchCompletedOrders === "" ? null : searchCompletedOrders,
        pages || page,
        itemsPerPage,
        sort,
        sortBy,
        vendorName === "All" ? null : vendorName,
        driverId,
        orderStatus === "All"
          ? ["delivered", "cancelled", "cancelled_by_admin"]
          : [orderStatus]
      )
    );
  };

  useEffect(() => {
    dispatch(getAllVendorActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <h1>Completed Orders</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchCompletedOrders || ""}
                      onChange={(e) => setSearchCompletedOrders(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          fetchCompletedOrders();
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => fetchCompletedOrders()}
                      >
                        <span className="fa fa-search"></span>
                      </button>
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
                          <label>Vendor</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              vendorName
                                ? (vendors || []).find(
                                    (prod) => prod.value === vendorName
                                  ) || null
                                : { value: null, label: "All" }
                            }
                            onChange={(val) =>
                              setVendorName((val && val.value) || "")
                            }
                            placeholder="-- Select --"
                            options={vendors || []}
                          />
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              orderStatus
                                ? (SelectStatus || []).find(
                                    (prod) => prod.value === orderStatus
                                  ) || null
                                : { value: null, label: "All" }
                            }
                            onChange={(val) =>
                              setOrderStatus((val && val.value) || "")
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
                    onClick={() => fetchCompletedOrders()}
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
                        completedOrders: state?.completedOrders,
                      });
                      setPage(1);
                      setSearchCompletedOrders(null);
                      setSort("DESC");
                      setSortBy(null);
                      setVendorName("All");
                      state?.completedOrders === "completed"
                        ? setOrderStatus("delivered")
                        : setOrderStatus("All");
                      dispatch(
                        getDriverCompletedOrdersActionThunk(
                          null,
                          page,
                          itemsPerPage,
                          "DESC",
                          null,
                          null,
                          driverId,
                          state?.completedOrders === "completed"
                            ? ["delivered"]
                            : ["delivered", "cancelled", "cancelled_by_admin"]
                        )
                      );
                    }}
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() => history.goBack()}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={CompletedOrdersList}
                    pageCount={
                      completedOrdersList ? completedOrdersList.count : 1
                    }
                    dispatchAction={fetchCompletedOrders}
                    page={page}
                    setPage={setPage}
                    filter={sort}
                    setFilter={setSort}
                    setFilterBy={setSortBy}
                    completedOrders={state?.completedOrders}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FreelanceDriverCompletedOrders;

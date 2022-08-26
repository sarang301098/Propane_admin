import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import moment from "moment";

import { Sidebar } from "../../components/sidebar/sidebar";
import { DatePicker } from "../../components";
import CancelledOrdersEarningList from "./CancelledOrdersEarningList";
import Pagination from "../../components/pagination/Pagination";
import TRootState from "../../store/root.types";
import { getCancelOrderEarningActionThunk } from "../../store/earnings/earning.actions.async";
import { getAllVendorActionThunk } from "../../store/vendor/vendor.action.async";

// const defaultStartDate = moment().subtract(30, "days").startOf("day");
// const defaultEndDate = moment().endOf("day");

const CancelledOrdersEarnings: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const cancelOrderEarningCount = useSelector(
    (state: TRootState) => state?.earning?.cancelOrderEarningList?.count
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const vendors = useSelector((state: TRootState) =>
    [{ id: "All", fullName: "All" }, ...state.vendor.allVendors].map(
      (vendor) => ({
        label: vendor.fullName,
        value: vendor.id.toString(),
      })
    )
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchVendor, setSearchVendor] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string | number | null>(
    "All"
  );
  const [startDate, setStartDate] = useState<
    moment.Moment | null | undefined
  >();
  const [endDate, setEndDate] = useState<moment.Moment | null | undefined>();

  /**
   * fetch cancel orders earning
   * @param pages
   */
  const fetchCancelOrderEarings = (pages?: number) => {
    dispatch(
      getCancelOrderEarningActionThunk(
        pages || page,
        itemsPerPage,
        searchVendor === "" ? null : searchVendor,
        startDate,
        endDate,
        selectedVendor === "All" ? null : selectedVendor
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
                  <h1>Earnings</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchVendor || ""}
                      onChange={(e) => setSearchVendor(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          fetchCancelOrderEarings();
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => fetchCancelOrderEarings()}
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
                  <Select
                    className="custom-select-dropdown w-175"
                    value={
                      selectedVendor
                        ? (vendors || []).find(
                            (ven) => ven.value === selectedVendor
                          ) || null
                        : { value: null, label: "All" }
                    }
                    onChange={(val) => setSelectedVendor(val && val.value)}
                    placeholder="-- Select Vendor --"
                    options={vendors || []}
                  />
                </div>
                <div className="m-l-10">
                  <button
                    onClick={() => fetchCancelOrderEarings()}
                    type="button"
                    className="btn btn-dark"
                  >
                    Submit
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    onClick={() => {
                      history.push(history.location.pathname, {
                        page: "1",
                      });
                      setPage(1);
                      setSearchVendor(null);
                      setStartDate(null || undefined);
                      setEndDate(null || undefined);
                      setSelectedVendor(null);
                      dispatch(
                        getCancelOrderEarningActionThunk(
                          page,
                          itemsPerPage,
                          null,
                          null || undefined,
                          null || undefined,
                          null
                        )
                      );
                    }}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-header clearfix">
                  <ul className="nav nav-tabs primary-tabs">
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/earnings/net"}
                        className="nav-link"
                        activeClassName="nav-link show active"
                      >
                        Net Earning
                      </NavLink>
                    </li>
                    <li className="nav-item" role="presentation">
                      <NavLink
                        to={"/earnings/cancelled-orders"}
                        className="nav-link"
                        activeClassName="nav-link active show"
                      >
                        Cancelled Orders Earning
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-0">
                  <div className="tab-content">
                    <Pagination
                      ItemsComponent={CancelledOrdersEarningList}
                      dispatchAction={fetchCancelOrderEarings}
                      pageCount={cancelOrderEarningCount}
                      page={page}
                      setPage={setPage}
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

export default CancelledOrdersEarnings;

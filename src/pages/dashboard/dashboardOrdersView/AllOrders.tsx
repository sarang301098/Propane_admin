import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Pagination from "../../../components/pagination/Pagination";
import AllOrdersList from "./AllOrdersList";
import TRootState from "../../../store/root.types";
import { getDashboardAllOrdersActionThunk } from "../../../store/DashboardStore/dashboard.actions.async";

const defaultWeek = moment().subtract(7, "days").startOf("day");
const defaultMonth = moment().subtract(30, "days").startOf("day");
const defaultYear = moment().subtract(365, "days").startOf("day");
const defaultEndDate = moment().endOf("day");

const AllOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const allOrdersList = useSelector((state: TRootState) => state.dashboard.dashboardAllOrders);
  const itemsPerPage = useSelector((state: TRootState) => state.pagination.perPageItems);

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [startDate, setStartDate] = useState<moment.Moment | undefined | null>();
  const [endDate, setEndDate] = useState<moment.Moment | undefined | null>();
  const [sort, setSort] = useState("DESC");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [active, setActive] = useState(0);

  /**
   *  get all orders thunk dispatch
   */
  const fetchAllOrders = (pages?: number) => {
    dispatch(
      getDashboardAllOrdersActionThunk(
        pages || page,
        itemsPerPage,
        startDate && endDate ? false : true,
        startDate,
        endDate,
        sort,
        sortBy
      )
    );
  };

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  const buttonActive = {
    background: "#6e85af",
    color: "#fff",
  };

  return (
    <div className="tab-pane fadeIn active" id="tab-2">
      <div className="actions top-right">
        <div className="d-flex align-items-center">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              style={active === 1 ? buttonActive : {}}
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setStartDate(defaultMonth);
                setEndDate(defaultEndDate);
                setActive(1);
              }}
            >
              Month
            </button>
            <button
              style={active === 2 ? buttonActive : {}}
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setStartDate(defaultWeek);
                setEndDate(defaultEndDate);
                setActive(2);
              }}
            >
              Week
            </button>
            <button
              style={active === 3 ? buttonActive : {}}
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setStartDate(defaultYear);
                setEndDate(defaultEndDate);
                setActive(3);
              }}
            >
              Year
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-primary btn-sm h-35"
              onClick={() => history.push("orders/all-orders/fuel-delivery")}
            >
              View All
            </button>
          </div>
        </div>
      </div>
      <Pagination
        ItemsComponent={AllOrdersList}
        pageCount={allOrdersList ? allOrdersList.count : 1}
        dispatchAction={fetchAllOrders}
        page={page}
        setPage={setPage}
        filter={sort}
        setFilter={setSort}
        setFilterBy={setSortBy}
      />
    </div>
  );
};

export default AllOrders;

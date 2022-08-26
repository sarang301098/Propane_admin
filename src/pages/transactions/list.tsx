import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import { DatePicker } from "../../components";
import TransactionsList from "./TransactionsList";
import { getTransactionActionThunk } from "../../store/transactions/transaction.actions.async";
import TRootState from "../../store/root.types";

const Transactions = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const state = history?.location?.state as { page: string };

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [tempSearch, setTempSearch] = useState("");
  const { count } = useSelector(
    (state: TRootState) => state.transaction.transactionData
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );

  /**
   *  get transaction by filter
   */
  const transactionSubmitHandler = () => {
    setSearchTransaction(tempSearch);
    setPage(1);
    page === 1 &&
      dispatch(
        getTransactionActionThunk(
          1,
          itemsPerPage,
          tempSearch,
          startDate,
          endDate
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };

  /**
   * reset all transaction filter
   */
  const transactionsResetHandler = () => {
    setStartDate("");
    setEndDate("");
    setSearchTransaction("");
    setTempSearch("");
    setPage(1);
    page === 1 &&
      dispatch(getTransactionActionThunk(page, itemsPerPage, "", "", ""));
    history?.push(history?.location?.pathname, { page: 1 });
  };

  /**
   *  get transaction thunk dispatch with params
   */
  const fetchTransaction = (pages?: number) => {
    dispatch(
      getTransactionActionThunk(
        pages || page,
        itemsPerPage,
        searchTransaction,
        startDate,
        endDate
      )
    );
  };

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Transactions</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={tempSearch}
                      onChange={(e) => setTempSearch(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
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
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={transactionSubmitHandler}
                  >
                    Submit
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={transactionsResetHandler}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={TransactionsList}
                    pageCount={count || 0}
                    dispatchAction={fetchTransaction}
                    page={page}
                    setPage={setPage}
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

export default Transactions;

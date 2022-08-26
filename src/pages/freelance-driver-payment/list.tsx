import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import FreelanceDriversList from "./FreelanceDriversList";
import TRootState from "../../store/root.types";
import { getFreelanceDriversPaymentActionThunk } from "../../store/drivers/drivers.actions.async";

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "Paid", label: "Paid" },
  { value: "Pending", label: "Pending" },
];

const FreelanceDriverPayment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const freelanceDriversPaymentList = useSelector(
    (state: TRootState) => state.drivers.freelanceDriversPaymentList
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [paymentStatus, setPaymentStatus] = useState<string | number | null>(
    "All"
  );
  const [searchFreelanceDriver, setSearchFreelanceDriver] = useState<
    string | number | null
  >(null);

  /**
   *  get freelance drivers thunk dispatch
   **/
  const fetchFreelanceDriversPayment = (pages?: number) => {
    dispatch(
      getFreelanceDriversPaymentActionThunk(
        searchFreelanceDriver === "" ? null : searchFreelanceDriver,
        pages || page,
        itemsPerPage,
        paymentStatus === "All"
          ? null
          : paymentStatus === "Paid"
          ? 1
          : paymentStatus === "Pending"
          ? 0
          : null
      )
    );
  };

  return (
    <div id="app">
      <div className="d-block d-lg-none">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <div className="content">
          <header className="page-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h1>Freelance Drivers Payment</h1>
              </div>
              <div className="m-l-10">
                <div className="input-group w-250">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    title="Search"
                    value={searchFreelanceDriver || ""}
                    onChange={(e) => setSearchFreelanceDriver(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        fetchFreelanceDriversPayment();
                      }
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="input-group-text pointer"
                      onClick={() => fetchFreelanceDriversPayment()}
                    >
                      <span className="fa fa-search"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="m-l-10">
                <Select
                  className="custom-select-dropdown w-150"
                  value={
                    paymentStatus
                      ? (SelectStatus || []).find(
                          (prod) => prod.value === paymentStatus
                        ) || null
                      : { value: null, label: "All" }
                  }
                  onChange={(val) => setPaymentStatus((val && val.value) || "")}
                  placeholder="-- Status --"
                  options={SelectStatus || []}
                />
              </div>
              <div className="m-l-10">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => fetchFreelanceDriversPayment()}
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
                    });
                    setPage(1);
                    setSearchFreelanceDriver(null);
                    setPaymentStatus("All");
                    dispatch(
                      getFreelanceDriversPaymentActionThunk(
                        null,
                        page,
                        itemsPerPage,
                        null
                      )
                    );
                  }}
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
                  ItemsComponent={FreelanceDriversList}
                  pageCount={
                    freelanceDriversPaymentList
                      ? freelanceDriversPaymentList.count
                      : 1
                  }
                  dispatchAction={fetchFreelanceDriversPayment}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FreelanceDriverPayment;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import TRootState from "../../store/root.types";
import GovernmentHoliday from "../../components/government-holiday/GovernmentHoliday";
import GovernmentHolidayModal from "../../components/government-holiday/GovernmentHolidayModal";
import {
  addHolidayActionThunk,
  getAllVendorsActionThunk,
  getHolidayActionThunk,
} from "../../store/governmentHolidays/governmentHolidays.action.async";

const Holiday = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const [show, setShow] = useState(false);
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [search, setSearch] = useState("");
  const [selectVendor, setSelectVendor] = useState("All");

  const perPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const count = useSelector(
    (state: TRootState) => state?.governmentHoliday?.holidayData?.count
  );
  const { vendor } = useSelector(
    (state: TRootState) => state?.governmentHoliday?.vendorsData
  );

  const handleShow = () => {
    setShow(true);
  };
  const fetchGovernmentHolidays = (pageNumber?: number) =>
    dispatch(
      getHolidayActionThunk(pageNumber || page, perPage, search, selectVendor)
    );
  const handleSubmit = (
    date: string,
    vendorId: (string | number)[],
    description: string
  ) => {
    dispatch(addHolidayActionThunk(date, vendorId, description, perPage));
  };
  const SelectVendor = vendor?.map((vendor) => ({
    value: vendor.id,
    label: vendor.fullName,
  }));
  SelectVendor.unshift({ label: "All", value: "All" });
  useEffect(() => {
    dispatch(getAllVendorsActionThunk());
  }, []);
  const reset = () => {
    setSearch(() => "");
    setSelectVendor(() => "All");
    dispatch(getHolidayActionThunk(page, perPage, "", "All"));
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
                  <h1>Government Holidays</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      value={search}
                      title="Search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => {
                          dispatch(
                            getHolidayActionThunk(
                              page,
                              perPage,
                              search,
                              selectVendor
                            )
                          );
                        }}
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <Select
                    className="custom-select-dropdown w-150"
                    value={
                      selectVendor
                        ? (SelectVendor || []).find(
                            (prod) => prod.value === selectVendor
                          ) || null
                        : null
                    }
                    onChange={(val) => {
                      setSelectVendor((val && val.value) || "");
                      dispatch(
                        getHolidayActionThunk(
                          page,
                          perPage,
                          search,
                          val?.value || ""
                        )
                      );
                    }}
                    placeholder="-- Select --"
                    options={SelectVendor || []}
                  />
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleShow}
                  >
                    Add New Holiday
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={GovernmentHoliday}
                    dispatchAction={fetchGovernmentHolidays}
                    pageCount={count}
                    page={page}
                    setPage={setPage}
                    filter={selectVendor}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <GovernmentHolidayModal
        filter={selectVendor}
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
      />
    </React.Fragment>
  );
};

export default Holiday;

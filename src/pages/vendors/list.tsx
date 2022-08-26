/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import { DatePicker } from "../../components";
import Select from "react-select";
import { getVendorsActionThunk } from "../../store/vendor/vendor.action.async";
import { useDispatch, useSelector } from "react-redux";
import VendorList from "../../components/vendors/VendorList";
import TRootState from "../../store/root.types";
import moment from "moment";
import { getZipcodesActioThunk } from "../../store/salesTax/salesTax.action.async";

const SelectStatus = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const Vendors = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };

  const { count } = useSelector(
    (state: TRootState) => state?.vendor?.vendorsData || 0
  );

  const itemsPerPage =
    useSelector((state: TRootState) => state.pagination.perPageItems) || 10;
  const zipCodes = useSelector(
    (state: TRootState) => state.salesTax.zipcodeData.zipcodes
  );

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [startDate, setStartDate] = useState<moment.Moment | string>("");
  const [endDate, setEndDate] = useState<moment.Moment | string>("");
  const [vendorStatus, setVendorStatus] = useState("all");
  const [vendorSearch, setVendorSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [sort, setSort] = useState("ASC");

  const handleRedirectToAddVendor = () => {
    history.push("/vendors/new", { tab: 1 });
  };

  useEffect(() => {
    dispatch(getZipcodesActioThunk(false, 0, 0, "", "", "", sort));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    setVendorSearch("");
    setVendorStatus("all");
    setTempSearch("");
    setStartDate("");
    setEndDate("");
    setZipcode("");
    setPage(1);
    page === 1 &&
      dispatch(
        getVendorsActionThunk(
          true,
          page,
          itemsPerPage,
          "",
          "",
          "",
          zipcode,
          "",
          sort
        )
      );
    history?.push(history?.location?.pathname, { page: 1 });
  };

  const SelectZipcode = zipCodes
    ? zipCodes?.map((zipcode) => ({
        value: zipcode.id.toString(),
        label: zipcode.zipcode,
      }))
    : [];

  const fetchVendors = (pageNumber?: number) => {
    dispatch(
      getVendorsActionThunk(
        true,
        pageNumber || page,
        itemsPerPage,
        startDate,
        endDate,
        vendorSearch,
        zipcode,
        vendorStatus,
        sort
      )
    );
  };

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
                  <h1>Vendors</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={tempSearch}
                      onChange={(e) => {
                        setTempSearch(e.target.value);
                      }}
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
                          <label>Zipcode</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              zipcode
                                ? (SelectZipcode || []).find(
                                    (prod) => prod.value === zipcode
                                  ) || null
                                : null
                            }
                            onChange={(val) => setZipcode(val?.value || "")}
                            placeholder="-- Select --"
                            options={SelectZipcode || []}
                          />
                        </div>
                        <div className="form-group">
                          <label>Status</label>
                          <Select
                            className="custom-select-dropdown"
                            value={
                              vendorStatus
                                ? (SelectStatus || []).find(
                                    (prod) => prod.value === vendorStatus
                                  ) || null
                                : null
                            }
                            onChange={(val) =>
                              setVendorStatus(val?.value || "")
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
                    onClick={() => {
                      setVendorSearch(tempSearch);
                      setTempSearch("");
                      setPage(1);
                      page === 1 &&
                        dispatch(
                          getVendorsActionThunk(
                            true,
                            page,
                            itemsPerPage,
                            startDate,
                            endDate,
                            tempSearch,
                            zipcode,
                            vendorStatus,
                            sort
                          )
                        );
                      history?.push(history?.location?.pathname, { page: 1 });
                    }}
                  >
                    Submit
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    onClick={reset}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRedirectToAddVendor}
                  >
                    Add New Vendor
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={VendorList}
                    pageCount={count || 0}
                    dispatchAction={fetchVendors}
                    page={page}
                    setPage={setPage}
                    filter={sort}
                    setFilter={setSort}
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

export default Vendors;

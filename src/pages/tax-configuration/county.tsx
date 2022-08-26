import React, { useState } from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import CountyModal from "../../components/tax-configuration/CountyModal";
import CountyComponent from "../../components/tax-configuration/County";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountyActionThunk,
  getContiesActoinThunk,
} from "../../store/salesTax/salesTax.action.async";
import TRootState from "../../store/root.types";

interface Prop {
  history: RouteComponentProps["history"];
}

const County: React.FC<Prop> = ({ history }) => {
  const dispatch = useDispatch();

  const state = history?.location?.state as { page: string };
  const { stateId } = useParams<{ stateId: string }>();
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const { count } = useSelector(
    (state: TRootState) => state.salesTax.countyData
  );
  const stateName = useSelector(
    (state: TRootState) => state?.salesTax?.countyData?.state?.name
  );
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchCounty, setSearchCounty] = useState("");
  const [sort, setSort] = useState("ASC");
  const [tempSearch, setTempSearch] = useState("");

  const fetchCounties = (pageNumber?: number, q?: string) =>
    dispatch(
      getContiesActoinThunk(
        pageNumber || page,
        itemsPerPage,
        q || searchCounty,
        stateId,
        sort
      )
    );

  const handleAdd = (
    countyName: string,
    salesTaxOne: string,
    salesTaxTwo: string,
    status: number
  ) => {
    dispatch(
      addCountyActionThunk(
        countyName,
        salesTaxOne,
        salesTaxTwo,
        status,
        stateId,
        itemsPerPage
      )
    );
  };

  const handleRedirectToSalesTax = () => {
    history.push("/states");
  };

  return (
    <>
      <CountyModal
        state={stateName || ""}
        show={show}
        setShow={setShow}
        submitAction={handleAdd}
      />
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>County Sales Tax ({stateName})</h1>
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
                        onClick={() => {
                          setSearchCounty(tempSearch);
                          setPage(1);
                          page === 1 && fetchCounties(1, tempSearch);
                          history.push(history.location.pathname, {
                            page: "1",
                          });
                        }}
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <button
                    onClick={() => {
                      setTempSearch("");
                      setSearchCounty("");
                      history.push(history.location.pathname, {
                        page: "1",
                      });
                      setPage(1);
                      page === 1 &&
                        dispatch(
                          getContiesActoinThunk(
                            page,
                            itemsPerPage,
                            "",
                            stateId,
                            sort
                          )
                        );
                    }}
                    type="button"
                    className="btn btn-secondary"
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleRedirectToSalesTax()}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShow(true)}
                  >
                    Add New County
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={CountyComponent}
                    pageCount={count}
                    dispatchAction={fetchCounties}
                    page={page}
                    filter={sort}
                    setFilter={setSort}
                    setPage={setPage}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(County);

import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import StateModal from "../../components/tax-configuration/StateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addStateActionThunk,
  getStatesActionThunk,
} from "../../store/salesTax/salesTax.action.async";
import States from "../../components/tax-configuration/States";
import TRootState from "../../store/root.types";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Prop {
  history: RouteComponentProps["history"];
}

const TaxConfiguration: React.FC<Prop> = ({ history }) => {
  const dispatch = useDispatch();

  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const state = history?.location?.state as { page: string };
  const { count } = useSelector(
    (state: TRootState) => state.salesTax.statesData
  );
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [sort, setSort] = useState("ASC");

  const fetchStates = (pageNumber?: number, q?: string) =>
    dispatch(
      getStatesActionThunk(
        pageNumber || page,
        itemsPerPage || 10,
        q || search,
        sort
      )
    );

  const handleSubmit = (name: string, salesTax: string, status: number) => {
    dispatch(addStateActionThunk(name, salesTax, status, itemsPerPage));
  };

  return (
    <React.Fragment>
      <StateModal
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
        editState={null}
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
                  <h1>Sales Tax</h1>
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
                          setSearch(tempSearch);
                          setPage(1);
                          page === 1 && fetchStates(1, tempSearch);
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
                      setSearch("");
                      history.push(history.location.pathname, {
                        page: "1",
                      });
                      setPage(1);
                      page === 1 &&
                        dispatch(
                          getStatesActionThunk(
                            page,
                            itemsPerPage || 10,
                            "",
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
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShow(true)}
                  >
                    Add New State
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={States}
                    dispatchAction={fetchStates}
                    pageCount={count}
                    page={page}
                    setPage={setPage}
                    setFilter={setSort}
                    filter={sort}
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

export default withRouter(TaxConfiguration);

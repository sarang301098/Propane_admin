import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams, withRouter } from "react-router-dom";

import TRootState from "../../store/root.types";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import ZipcodeModal from "../../components/tax-configuration/ZipcodeModal";
import {
  addZipcodeActionThunk,
  getZipcodesActioThunk,
} from "../../store/salesTax/salesTax.action.async";
import Zipcode from "../../components/tax-configuration/Zipcode";

interface Prop {
  history: RouteComponentProps["history"];
}

const SalesTaxZipcode: React.FC<Prop> = ({ history }) => {
  const dispatch = useDispatch();

  const state = history?.location?.state as {
    page: string;
  };
  const { stateId, countyId } = useParams<{
    stateId: string;
    countyId: string;
  }>();
  const { count } = useSelector(
    (state: TRootState) => state.salesTax.zipcodeData
  );
  const itemsPerpage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const { county } = useSelector(
    (state: TRootState) => state?.salesTax?.zipcodeData
  );

  const [searchZipcode, setSearchZipcode] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [sort, setSort] = useState("ASC");

  const fetchZipcodes = (pageNumber?: number, q?: string) => {
    dispatch(
      getZipcodesActioThunk(
        true,
        pageNumber || page,
        itemsPerpage,
        q || searchZipcode,
        stateId,
        countyId,
        sort
      )
    );
  };

  const addZipcode = (areaName: string, zipcode: string, status: number) => {
    dispatch(
      addZipcodeActionThunk(areaName, zipcode, status, countyId, itemsPerpage)
    );
  };

  const handleRedirectToCounty = () => {
    history.push(`/states/${stateId}/county`);
  };

  return (
    <React.Fragment>
      <ZipcodeModal
        county={county?.name || ""}
        show={show}
        setShow={setShow}
        submitAction={addZipcode}
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
                  <h1>Zipcode Sales Tax ({county?.name || ""})</h1>
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
                          setSearchZipcode(tempSearch);
                          setPage(1);
                          page === 1 && fetchZipcodes(1, tempSearch);
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
                      setSearchZipcode("");
                      setTempSearch("");
                      setPage(1);
                      page === 1 &&
                        dispatch(
                          getZipcodesActioThunk(
                            true,
                            page,
                            itemsPerpage,
                            "",
                            stateId,
                            countyId,
                            sort
                          )
                        );
                      history.push(history.location.pathname, {
                        page: "1",
                      });
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
                    onClick={() => handleRedirectToCounty()}
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
                    Add New Zipcode
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    dispatchAction={fetchZipcodes}
                    pageCount={count}
                    ItemsComponent={Zipcode}
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

export default withRouter(SalesTaxZipcode);

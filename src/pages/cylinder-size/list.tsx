import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar } from "../../components/sidebar/sidebar";

import {
  addCylinderSizeActionThunk,
  getCylinderSizeActionThunk,
} from "../../store/cylinderSize/cylinderSize.action.async";

import { useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";
import Pagination from "../../components/pagination/Pagination";
import CylinderSizeModal from "../../components/cylinderSize/CylinderSizeModal";
import CylinderSizeList from "../../components/cylinderSize/CylinderSize";

const CylinderSize = () => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const perPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const handleShow = () => {
    setShow(true);
  };

  const fetchCylinderSizes = () => {
    dispatch(getCylinderSizeActionThunk(true, page, perPage));
  };
  const count = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData?.count
  );
  const addCylindersize = (cylinderSize: number, itemsPerPage: number) => {
    dispatch(addCylinderSizeActionThunk(cylinderSize, itemsPerPage));
  };
  const reset = () => {
    setSearch(() => "");
    history.push(history?.location?.pathname, {
      search: "",
    });
    dispatch(getCylinderSizeActionThunk(true, page, perPage));
  };
  return (
    <React.Fragment>
      <CylinderSizeModal
        show={show}
        setShow={setShow}
        submitAction={addCylindersize}
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
                  <h1>Cylinder Size</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="number"
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
                          fetchCylinderSizes();
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    Add New Cylinder Size
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    dispatchAction={fetchCylinderSizes}
                    pageCount={count}
                    ItemsComponent={CylinderSizeList}
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

export default CylinderSize;

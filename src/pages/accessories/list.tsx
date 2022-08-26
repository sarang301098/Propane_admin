import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  addAccessoriesActionThunk,
  getAccessoriesActionThunk,
} from "../../store/accessories/accessories.action.async";
import AddAccessoriesModal from "../../components/accessories/AddAccessoriesModal";
import Pagination from "../../components/pagination/Pagination";
import AccessoriesListItems from "./AccessoriesListItems";
import { useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";

const Accessories = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [searchAccessory, setSearchAccessory] = useState("");
  const [tempSearch, setTempSearch] = useState("");
  const itemsPerpage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { count } = useSelector(
    (state: TRootState) => state?.accessories?.accessoriesData
  );
  const handleShow = () => {
    setShow(true);
  };

  const fetchAccessories = (pageNumber: number, search?: string) => {
    dispatch(
      getAccessoriesActionThunk(
        search || searchAccessory,
        pageNumber || page,
        itemsPerpage
      )
    );
  };

  const submitAction = (
    name: string,
    image: string,
    price: number,
    description: string
  ) => {
    dispatch(
      addAccessoriesActionThunk(name, image, price, description, itemsPerpage)
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
                  <h1>Accessories (Propane Tank Exchange Delivery)</h1>
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
                          setSearchAccessory(tempSearch);
                          setPage(1);
                          page === 1 && fetchAccessories(page, tempSearch);
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
                      setSearchAccessory("");
                      setTempSearch("");
                      setPage(1);
                      page === 1 &&
                        dispatch(
                          getAccessoriesActionThunk("", page, itemsPerpage)
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
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    Add New Accessories
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    pageCount={count}
                    ItemsComponent={AccessoriesListItems}
                    page={page}
                    setPage={setPage}
                    dispatchAction={fetchAccessories}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <AddAccessoriesModal
        show={show}
        setShow={setShow}
        submitAction={submitAction}
        editAccessories={null}
      />
    </React.Fragment>
  );
};

export default Accessories;

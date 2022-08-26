import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import SubAdmin from "../../components/subAdmin/SubAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubAdminActionThunk,
  getAllRolesActionThunk,
  getSubAdminActionThunk,
} from "../../store/subAdmin/subAdmin.action.async";
import { useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";
import SubAdminModal from "../../components/subAdmin/SubAdminModal";

const SubAdmins = () => {
  const [show, setShow] = useState(false);
  const [searchSubAdmins, setSearchSubAdmins] = useState("");
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [sort, setSort] = useState("ASC");

  const perPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const handleShow = () => {
    setShow(true);
  };
  const dispatch = useDispatch();

  const count = useSelector(
    (state: TRootState) => state?.subAdmin?.subAdminData?.count
  );

  const fetchSubAdmins = () =>
    dispatch(getSubAdminActionThunk(page, perPage, searchSubAdmins, sort));

  const handleSubmit = (
    status: boolean,
    mobileNumber: number,
    email: string,
    fullName: string,
    roleId: number
  ) => {
    dispatch(
      addSubAdminActionThunk(
        status,
        mobileNumber,
        email,
        fullName,
        roleId,
        perPage
      )
    );
  };

  const reset = () => {
    setSearchSubAdmins(() => "");
    dispatch(getSubAdminActionThunk(page, perPage, "", "ASC"));
  };

  useEffect(() => {
    dispatch(getAllRolesActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Sub Admins</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchSubAdmins}
                      onChange={(e) => setSearchSubAdmins(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => {
                          dispatch(
                            getSubAdminActionThunk(
                              page,
                              perPage,
                              searchSubAdmins,
                              sort
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleShow()}
                  >
                    Add New Sub Admin
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={SubAdmin}
                    dispatchAction={fetchSubAdmins}
                    pageCount={count}
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
      <SubAdminModal
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
      />
    </React.Fragment>
  );
};

export default SubAdmins;

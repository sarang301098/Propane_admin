import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getRolesActionThunk } from "../../store/rolesAndPermissions/rolesAndPermissions.action.async";
import TRootState from "../../store/root.types";
import RolesAndPermssions from "../../components/roles-permissions/rolesAndPermssions";

const RolesPermissions: React.FC = () => {
  const history = useHistory();
  const state = history?.location?.state as { page: string; state: string };
  const [page, setPage] = useState(Number(state?.page) || 1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("ASC");

  const handleRedirectToAddRole = () => {
    history.push("/settings/roles-permissions/new");
  };
  const count = useSelector(
    (state: TRootState) => state.rolesAndPermission?.rolesData?.count
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const dispatch = useDispatch();
  const fetchRoles = (page: number, search?: string) =>
    dispatch(getRolesActionThunk(page, itemsPerPage, search));
  const reset = () => {
    setSearch(() => "");
    dispatch(getRolesActionThunk(page, itemsPerPage, ""));
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
                  <h1>Roles & Permissions</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={(e) => {
                          dispatch(
                            getRolesActionThunk(page, itemsPerPage, search)
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
                    onClick={handleRedirectToAddRole}
                  >
                    Add New Role
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={RolesAndPermssions}
                    pageCount={count}
                    dispatchAction={fetchRoles}
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

export default RolesPermissions;

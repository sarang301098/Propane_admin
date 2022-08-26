import React, { useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getEmailTemplateActionThunk } from "../../store/emailTemplate/emailTemplate.action.async";
import { RouteComponentProps, withRouter } from "react-router-dom";
import TemplateItems from "../../components/email-templates/TemplateItems";
import TRootState from "../../store/root.types";

interface Prop {
  history: RouteComponentProps["history"];
}

const EmailTemplates: React.FC<Prop> = ({ history }) => {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );
  const state = history?.location?.state as { page: string };
  const [searchTemplate, setSearchTemplate] = useState("");
  const [page, setPage] = useState(Number(state?.page) || 1);
  const { count } = useSelector(
    (state: TRootState) => state.emailTemplate.emailTemplateList
  );
  const fetchEmailTemplate = (pageNumber?: number, q?: string) => {
    dispatch(
      getEmailTemplateActionThunk(
        pageNumber || page,
        itemsPerPage,
        q || searchTemplate
      )
    );
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
                  <h1>Email Templates</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-350">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      value={searchTemplate}
                      title="Search"
                      onChange={(e) => {
                        setSearchTemplate(e.target.value);
                        setPage(1);
                        history.push(history.location.pathname, {
                          page: "1",
                        });
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => {
                          fetchEmailTemplate();
                        }}
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>

                    <div className="m-l-10">
                      <button
                        onClick={() => {
                          setSearchTemplate("");
                          history.push(history.location.pathname, {
                            page: "1",
                          });
                          setPage(1);
                          dispatch(
                            getEmailTemplateActionThunk(page, itemsPerPage, "")
                          );
                        }}
                        type="button"
                        className="btn btn-secondary"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={TemplateItems}
                    dispatchAction={fetchEmailTemplate}
                    pageCount={count}
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

export default withRouter(EmailTemplates);

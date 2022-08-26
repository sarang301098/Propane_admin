import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { BarsLoader } from "../../components/loader/Loader";
import { Sidebar } from "../../components/sidebar/sidebar";
import { getSingleCmsPagesActionThunk } from "../../store/cms/cms.action.async";
import TRootState from "../../store/root.types";

const CMSPagesView = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = history?.location?.state as { type: string };
  const [pageContent, setPageContent] = useState("");

  const { pageId } = useParams<{ pageId: string }>();

  const { singleCmsPage, loading } = useSelector(
    (state: TRootState) => state.cms
  );

  useEffect(() => {
    dispatch(getSingleCmsPagesActionThunk(pageId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPageContent(singleCmsPage?.content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(singleCmsPage || {}).length]);

  const handleRedirectToCMSPages = () => {
    history.push(`/settings/cms/${state?.type || "customers"}`);
  };

  const handleRedirectToCMSPagesForm = () => {
    history.push("/settings/cms/form/" + pageId, {
      type: state?.type || "customers",
    });
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
                  <h1>View {singleCmsPage?.name}</h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={handleRedirectToCMSPages}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-primary"
                    onClick={handleRedirectToCMSPagesForm}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                {loading ? (
                  <div className="card-body font-weight-normal cms-page">
                    <BarsLoader />
                  </div>
                ) : (
                  <div
                    className="card-body font-weight-normal cms-page"
                    dangerouslySetInnerHTML={{
                      __html: pageContent,
                    }}
                  ></div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CMSPagesView;

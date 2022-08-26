import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CKEditor from "../../components/CKeditor/CKEditor";
import { Sidebar } from "../../components/sidebar/sidebar";
import {
  getSingleCmsPagesActionThunk,
  updateCmsPagesActionThunk,
} from "../../store/cms/cms.action.async";
import TRootState from "../../store/root.types";

const CMSPagesForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = history?.location?.state as { type: string };

  const { pageId } = useParams<{ pageId: string }>();
  const singlePageData = useSelector(
    (state: TRootState) => state.cms.singleCmsPage
  );
  const [pageData, setPageData] = useState(singlePageData?.content || "");
  const [name, setName] = useState(singlePageData?.name);
  const handleRedirectToCMSPagesView = () => {
    Promise.resolve(
      dispatch(
        updateCmsPagesActionThunk(
          pageData,
          name || "",
          singlePageData?.id?.toString() || ""
        )
      )
    ).then(() => {
      history.push("/settings/cms/view/" + singlePageData?.id, {
        pageData,
        type: state?.type || "customers",
      });
    });
  };

  useEffect(() => {
    dispatch(getSingleCmsPagesActionThunk(pageId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setName(singlePageData?.name);
    setPageData(singlePageData?.content || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Object.keys(singlePageData || {}).length]);

  // useEffect(() => {
  //   if (singlePageData === null) {
  //     history.push("/settings/cms/customers");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Edit {singlePageData?.name}</h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      history.push("/settings/cms/view/" + singlePageData?.id, {
                        pageData,
                        type: state?.type || "customer",
                      })
                    }
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <form className="form-horizontal">
                  <div className="card-body">
                    <div className="mt-3">
                      <div className="form-group row">
                        <label className="control-label text-md-right col-md-3">
                          CMS Particular Name{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control"
                            value={name || ""}
                            readOnly
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="control-label text-md-right col-md-3">
                          Content <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-7">
                          <CKEditor
                            setPageData={setPageData}
                            data={
                              singlePageData && (singlePageData?.content || "")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer bg-light text-right">
                    <button
                      type="button"
                      className="btn btn-secondary clear-form mr-2"
                      onClick={() =>
                        history.push(
                          "/settings/cms/view/" + singlePageData?.id,
                          { pageData, type: state?.type || "customers" }
                        )
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      disabled={pageData?.length === 0}
                      onClick={handleRedirectToCMSPagesView}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CMSPagesForm;

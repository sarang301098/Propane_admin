import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import CKEditor from "../../components/CKeditor/CKEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleTemplateActionThunk,
  updateEmailTemplateActionThunk,
} from "../../store/emailTemplate/emailTemplate.action.async";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";

const EmailTemplatesForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { templateId } = useParams<{ templateId: string }>();

  const { singleEmailTemplate, loading } = useSelector(
    (state: TRootState) => state?.emailTemplate
  );

  const [pageData, setPageData] = useState(singleEmailTemplate?.template || "");
  const [pageName, setPageName] = useState(singleEmailTemplate?.subject || "");

  /**
   * steps:
   *  1) Dispathced update email template action
   */
  const handleRedirectToEmailTemplate = () => {
    Promise.resolve(
      dispatch(
        updateEmailTemplateActionThunk(
          pageData,
          pageName,
          +templateId,
          singleEmailTemplate?.key || ""
        )
      )
    ).then(() => history.push("/settings/email-templates/list"));
  };

  useEffect(() => {
    dispatch(getSingleTemplateActionThunk(+templateId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (singleEmailTemplate) {
      setPageData(singleEmailTemplate?.template);
      setPageName(singleEmailTemplate?.subject);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleEmailTemplate]);

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        {loading ? (
          <BarsLoader />
        ) : (
          <div className="content-wrapper">
            <div className="content">
              <header className="page-header">
                <div className="d-flex align-items-center">
                  <div className="mr-auto">
                    <h1>Edit Email Template</h1>
                  </div>
                  <div className="m-l-10">
                    <button
                      className="btn btn-secondary"
                      onClick={() =>
                        history.push("/settings/email-templates/list")
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
                            Email Subject <span className="text-danger">*</span>
                          </label>
                          <div className="col-md-5">
                            <input
                              type="text"
                              className="form-control"
                              value={pageName}
                              onChange={(e) => setPageName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label className="control-label text-md-right col-md-3">
                            Email Content <span className="text-danger">*</span>
                          </label>
                          <div className="col-md-8">
                            <CKEditor
                              setPageData={setPageData}
                              data={pageData}
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
                          history.push("/settings/email-templates/list")
                        }
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleRedirectToEmailTemplate}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default EmailTemplatesForm;

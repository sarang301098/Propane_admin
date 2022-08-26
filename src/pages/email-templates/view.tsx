import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import { getSingleTemplateActionThunk } from "../../store/emailTemplate/emailTemplate.action.async";
import TRootState from "../../store/root.types";

const EmailTemplatesView = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { templateId } = useParams<{ templateId: string }>();

  const { singleEmailTemplate } = useSelector(
    (state: TRootState) => state?.emailTemplate
  );

  const handleRedirectToEmailTempalte = () => {
    history.push("/settings/email-templates/list");
  };

  useEffect(() => {
    dispatch(getSingleTemplateActionThunk(+templateId));
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
                  <h1>View Email Template</h1>
                </div>
                <div className="m-l-10">
                  <button
                    className="btn btn-secondary"
                    onClick={handleRedirectToEmailTempalte}
                  >
                    <i className="fa fa-angle-left">&nbsp;</i> Back
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body">
                  <div
                    style={{
                      margin: "0px",
                      padding: "0px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singleEmailTemplate?.template || "",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EmailTemplatesView;

import React from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { Link } from "react-router-dom";
import { BarsLoader } from "../loader/Loader";

const TemplateItems = () => {
  const { emailTemplates } = useSelector(
    (state: TRootState) => state.emailTemplate.emailTemplateList
  );

  const loading = useSelector(
    (state: TRootState) => state.emailTemplate.loading
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Email Subject</th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            emailTemplates && emailTemplates?.length > 0 ? (
              emailTemplates.map((emailTemplate, index: number) => (
                <tr key={emailTemplate?.id || index}>
                  <td>{emailTemplate.subject} </td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={{
                            pathname: `/settings/email-templates/${emailTemplate.id}/view`,
                          }}
                        >
                          <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                          View
                        </Dropdown.Item>
                        <Dropdown.Item
                          as={Link}
                          to={{
                            pathname: `/settings/email-templates/${emailTemplate.id}/edit`,
                          }}
                        >
                          <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                          Edit
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ textAlign: "center" }}>
                  No records available
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateItems;

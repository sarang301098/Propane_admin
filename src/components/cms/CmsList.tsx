import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TCmsPagePayload } from "../../store/cms/cms.types";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";

interface Prop {
  pageData: TCmsPagePayload[];
  type: string;
}

const CmsList: React.FC<Prop> = ({ pageData, type }) => {
  const { loading } = useSelector((state: TRootState) => state.cms);

  return (
    <div className="tab-pane fadeIn active" id="tab-1">
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th>Particular Name</th>
              <th>Last Modified on</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              pageData && pageData.length > 0 ? (
                pageData.map((page, index) => (
                  <tr key={index}>
                    <td>{page?.name}</td>
                    <td>{moment(page?.createdAt).format("DD-MM-YYYY")}</td>
                    <td className="table-field-actions">
                      <Link
                        to={{
                          pathname: "/settings/cms/view/" + page?.id,
                          state: { type },
                        }}
                        className="btn btn-default btn-icon-only"
                      >
                        <i className="zmdi zmdi-eye zmdi-hc-fw text-secondary font-size-20"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No pages available
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CmsList;

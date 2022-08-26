import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cmsPageViewAPI } from "../../services/cms/cmsServices";

const CmsPageView = () => {
  const location = useLocation();
  const [pageData, setPageData] = useState("");
  const [cmsName, setCmsName] = useState("");

  const query = new URLSearchParams(location.search);
  const key = query.get("key");
  const userType = query.get("userType");

  const getCmsPageView = (key: string | null, userType: string | null) => {
    cmsPageViewAPI(key, userType)
      .then((response) => {
        setPageData(response?.data?.content);
        setCmsName(response?.data?.name);
      })
      .catch(() => {
        setPageData("No data found.");
      });
  };

  useEffect(() => {
    getCmsPageView(key, userType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="page-header">
        <div className="d-flex align-items-center">
          <div className="mr-auto">
            <h1>{cmsName}</h1>
          </div>
        </div>
      </header>
      <section className="page-content container-fluid">
        <div className="card">
          <div className="card-body font-weight-normal cms-page">
            <div dangerouslySetInnerHTML={{ __html: pageData || "" }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CmsPageView;

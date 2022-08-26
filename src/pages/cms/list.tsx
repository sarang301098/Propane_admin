/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import CmsList from "../../components/cms/CmsList";
import { Sidebar } from "../../components/sidebar/sidebar";
import { getCmsPagesActionThunk } from "../../store/cms/cms.action.async";
import TRootState from "../../store/root.types";
interface Prop extends RouteComponentProps {
  history: RouteComponentProps["history"];
}
const CMSPages: React.FC<Prop> = ({ history }) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(
    history.location.pathname || "/settings/cms/customers"
  );
  const { cmsPages } = useSelector(
    (state: TRootState) => state.cms.cmsPageList
  );
  const vendor =
    cmsPages && cmsPages.filter((cmsPage) => cmsPage.userType === "vendor");
  const driver =
    cmsPages && cmsPages.filter((cmsPage) => cmsPage.userType === "driver");
  const customer =
    cmsPages && cmsPages.filter((cmsPage) => cmsPage.userType === "user");

  useEffect(() => {
    dispatch(getCmsPagesActionThunk());
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
                  <h1>CMS Pages</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <Tabs
                  activeKey={tabValue}
                  onSelect={(k: string | null) => {
                    setTabValue(k || "");
                    history.push(`${k}`);
                  }}
                  transition={false}
                  id="noanim-tab-example"
                  className="primary-tabs"
                  style={{ marginBottom: "5px" }}
                >
                  <Tab eventKey="/settings/cms/customers" title="Customers">
                    <CmsList pageData={customer || []} type="customers" />
                  </Tab>
                  <Tab eventKey="/settings/cms/vendors" title="Vendors">
                    <CmsList pageData={vendor || []} type="vendors" />
                  </Tab>
                  <Tab eventKey="/settings/cms/drivers" title="Drivers">
                    <CmsList pageData={driver || []} type="drivers" />
                  </Tab>
                </Tabs>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CMSPages);

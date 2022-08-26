import { Sidebar } from "../../components/sidebar/sidebar";
import DashboardHeader from "./dashboardView/DashboardHeader";
import DashboardView from "./dashboardView/DashboardView";
import DashboardOrdersView from "./dashboardOrdersView/DashboardOrdersView";

const Dashboard = () => {
  return (
    <div id="app">
      <div className="d-block d-lg-none">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <div className="content">
          <DashboardHeader />
          <section className="page-content container-fluid">
            <DashboardView />
            <DashboardOrdersView />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

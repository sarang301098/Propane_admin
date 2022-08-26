import { LiveClock } from "../../../components/live-clock/LiveClock";

const DashboardHeader = () => {
  return (
    <header className="page-header">
      <div className="d-flex align-items-center">
        <div className="mr-auto">
          <h1>Dashboard</h1>
        </div>
        <h1 className="h5 font-size-18">
          <LiveClock />
        </h1>
      </div>
    </header>
  );
};

export default DashboardHeader;

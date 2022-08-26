import React from "react";
import { useSelector } from "react-redux";

import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
}

const DriverReportsList: React.FC<Prop> = ({
  setFilter,
  filter,
  setFilterBy,
}) => {
  const drivers = useSelector(
    (state: TRootState) => state?.reports?.driverData
  );
  const loading = useSelector((state: TRootState) => state?.reports?.loading);

  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("driver");
                }}
              >
                Driver Name
              </span>
            </th>
            <th>Mobile Number</th>
            <th>Email Id</th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("vendor");
                }}
              >
                Vendor Name
              </span>
            </th>

            <th className="text-center">Driver Status</th>
            <th className="text-center">No. of Orders</th>
            <th className="text-center">Total Amount</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : drivers?.drivers && drivers?.drivers.length > 0 ? (
            drivers?.drivers.map((driver) => (
              <tr key={driver?.user_id}>
                <td className="text-nowrap">
                  {driver?.user_full_name || "-"} <br />
                  {!driver?.vendor_id && (
                    <small className="text-success">(Freelance)</small>
                  )}
                </td>
                <td>
                  {driver?.user_country_code && driver?.user_mobile_number
                    ? driver?.user_country_code +
                      " " +
                      driver?.user_mobile_number
                    : "-"}
                </td>
                <td>{driver?.user_email || "-"}</td>
                <td>{driver?.users_full_name || "-"}</td>
                <td className="text-center">
                  {driver?.user_is_active ? (
                    <i className="icon dripicons-checkmark text-success font-size-20"></i>
                  ) : (
                    <i className="icon dripicons-cross text-danger font-size-20"></i>
                  )}
                </td>
                <td className="text-center">{driver?.TotalOrders || "-"}</td>
                <td className="text-center">
                  {driver?.totalAmount ? "$" + driver?.totalAmount : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>
                No Driver reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DriverReportsList;

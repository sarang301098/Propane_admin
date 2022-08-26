import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";

interface Prop {
  setFilter: Function;
  filter: string;
}

const CustomerReportsList: React.FC<Prop> = ({ filter, setFilter }) => {
  const customers = useSelector(
    (state: TRootState) => state?.reports?.customerData
  );
  const loading = useSelector((state: TRootState) => state?.reports?.loading);

  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th className="sorting">
              <span
                onClick={() =>
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC")
                }
              >
                Customer Name
              </span>
            </th>
            <th>Mobile Number</th>
            <th>Email Id</th>
            <th>Registration Date</th>
            <th className="text-center">Membership Status</th>
            <th className="text-center">Customer Status</th>
            <th className="text-center">No. of Orders</th>
            <th className="text-center">Total Amount Received</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : customers.customers && customers.customers.length > 0 ? (
            customers.customers.map((report) => (
              <tr key={report?.user_id || "-"}>
                <td>{report?.user_full_name || "-"}</td>
                <td>
                  {report?.user_country_code && report?.user_mobile_number
                    ? report?.user_country_code +
                      " " +
                      report?.user_mobile_number
                    : "-"}
                </td>
                <td>{report?.user_email || "-"}</td>
                <td>{moment(report?.user_created_at).format("DD/MM/YYYY")}</td>
                <td className="text-center">
                  <span
                    className={`${
                      +report?.user_user_subscription_count === 0
                        ? "text-info"
                        : "text-success"
                    }`}
                  >
                    {report?.user_user_subscription_count === 0
                      ? "Free"
                      : "Paid"}
                  </span>
                </td>
                <td className="text-center">
                  <i
                    className={`icon dripicons-${
                      +report?.user_is_active === 1
                        ? "checkmark text-success"
                        : "cross text-danger"
                    } font-size-20`}
                  ></i>
                </td>
                <td className="text-center">{report?.TotalOrders || "-"}</td>
                <td className="text-center">
                  {report?.TotalAmountPaid
                    ? "$" + fixPrice(report?.TotalAmountPaid)
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No Customer reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerReportsList;

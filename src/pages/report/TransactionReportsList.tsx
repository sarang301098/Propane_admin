import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
}

const TransactionReportsList: React.FC<Prop> = ({
  setFilter,
  filter,
  setFilterBy,
}) => {
  const transactions = useSelector(
    (state: TRootState) => state?.reports?.transactionData
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
                  setFilterBy("customer");
                }}
              >
                Customer Info
              </span>
            </th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("driver");
                }}
              >
                Driver Info
              </span>
            </th>
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
            <th className="text-nowrap">Created On</th>
            <th>Order Delivered Date & Time</th>
            <th className="text-left">Total Amount</th>
            <th className="text-center">Payment Status</th>
            <th>Order Type</th>
            <th className="text-left">Admin Commission</th>
            <th>Payment Mode</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : transactions?.transactions &&
            transactions?.transactions?.length > 0 ? (
            transactions?.transactions?.map((report) => (
              <tr key={report?.id}>
                <td>
                  {report?.order?.user?.fullName || "-"} <br />{" "}
                  {report?.order?.user?.email || "-"}
                  <br />{" "}
                  {report?.order?.user?.countryCode &&
                  report?.order?.user?.mobileNumber
                    ? report?.order?.user?.countryCode +
                      " " +
                      report?.order?.user?.mobileNumber
                    : "-"}
                </td>
                <td>
                  {report?.driver?.fullName || "-"} <br />{" "}
                  {report?.driver?.email || "-"}
                  <br />
                  {report?.driver?.countryCode && report?.driver?.mobileNumber
                    ? report?.driver?.countryCode +
                      " " +
                      report?.driver?.mobileNumber
                    : "-"}
                </td>
                <td>{report?.vendor?.fullName || "-"}</td>
                <td>{moment(report?.createdAt).format("DD/MM/YYYY") || "-"}</td>
                <td>
                  {report?.scheduleDate
                    ? moment(report?.scheduleDate).format("DD/MM/YYYY")
                    : "-"}{" "}
                  <br />
                  {report?.scheduleDate
                    ? moment(report?.scheduleDate).format("hh:mm A")
                    : "-"}
                </td>
                <td className="text-left">
                  {report?.grandTotal
                    ? "$" + fixPrice(report?.grandTotal)
                    : "-"}
                </td>
                <td className="text-center">
                  <span
                    className={
                      report?.order?.isPaid ? "text-success" : "text-info"
                    }
                  >
                    {report?.order?.isPaid ? "Paid" : "Pending"}
                  </span>
                </td>
                <td>
                  {report?.orderType === 1
                    ? "Fuel Delivery"
                    : "Propane Tank Exchange Delivery"}
                </td>
                <td className="text-left">
                  {report?.adminReceivedAmount
                    ? "$" + fixPrice(report?.adminReceivedAmount)
                    : "-"}
                </td>
                <td>Online</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                No Transaction reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionReportsList;

import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";

const TransactionsList = () => {
  const loading = useSelector((state: TRootState) => state.transaction.loading);
  const transactionList = useSelector(
    (state: TRootState) => state.transaction.transactionData
  );
  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Customer Details</th>
            <th>Vendor Details</th>
            <th>Driver Details</th>
            <th className="text-right">Total Order Amount</th>
            <th className="text-right">
              Payment Recd. <br /> by Vendor
            </th>
            <th className="text-right">
              Payment Recd. <br /> by Driver
            </th>
            <th className="text-right">
              Payment Recd. <br /> by Propane Bros.
            </th>
            <th>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : transactionList?.transactions &&
            transactionList?.transactions.length > 0 ? (
            (transactionList?.transactions || []).map((trans) => (
              <tr key={trans?.id}>
                <td>{trans?.id || "-"}</td>
                <td>
                  {trans?.user?.fullName || "-"} <br />
                  <small>{trans?.user?.mobileNumber || "-"}</small> <br />
                  <small>{trans?.user?.email || "-"}</small>
                </td>
                <td>
                  {trans?.vendor?.fullName || "-"} <br />{" "}
                  <small>{trans?.vendor?.mobileNumber || "-"}</small> <br />
                  <small>{trans?.vendor?.email || "-"}</small>
                </td>
                <td>
                  {trans?.driver?.fullName} <br />{" "}
                  <small>{trans?.driver?.mobileNumber}</small> <br />
                  <small>{trans?.driver?.email}</small>
                </td>
                <td className="text-right">
                  {trans.grandTotal ? `$${trans.grandTotal}` : "-"}
                </td>
                <td className="text-right">
                  {trans.vendorReceivedAmount
                    ? `$${trans.vendorReceivedAmount}`
                    : "-"}
                </td>
                <td className="text-right">
                  {trans.driverReceivedAmount
                    ? `$${trans.driverReceivedAmount}`
                    : "-"}
                </td>
                <td className="text-right">
                  {trans.adminReceivedAmount
                    ? `$${trans.adminReceivedAmount}`
                    : "-"}
                </td>
                <td>
                  {moment(trans?.createdAt)?.format("DD/MM/YYYY")} <br />{" "}
                  {moment(trans?.createdAt)?.format("hh:mm")}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} style={{ textAlign: "center" }}>
                No transactions available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;

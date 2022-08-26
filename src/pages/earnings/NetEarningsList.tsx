import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";

const NetEarningsList = () => {
  const { earnings } = useSelector((state: TRootState) => state?.earning?.netEarningList);
  const loading = useSelector((state: TRootState) => state?.earning?.loading);

  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Mobile Number</th>
            <th>Email Id</th>
            <th className="text-center">Orders</th>
            <th className="text-right">Vendor Total Earning </th>
            <th className="text-right">Admin Total Earning </th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            earnings?.length > 0 ? (
              earnings?.map((earning, index) => (
                <tr key={earning?.user_id}>
                  <td>{earning?.user_full_name}</td>
                  <td>{earning?.user_mobile_number}</td>
                  <td>{earning?.user_email}</td>
                  {earning?.orders === ("0" || 0) ? (
                    <td className="text-center">-</td>
                  ) : (
                    <td className="text-center">
                      <Link to={`/vendors/view/${earning?.user_id}/orders/fuel-delivery`}>
                        <span className="badge badge-light">{earning?.orders}</span>
                      </Link>
                    </td>
                  )}
                  <td className="text-right">
                    {Number(earning?.vendorRecievedAmount) > 0
                      ? `$${Number(earning?.vendorRecievedAmount).toFixed(2)}`
                      : "-"}
                  </td>
                  <td className="text-right">
                    {Number(earning?.AdminRecievedAmount) > 0
                      ? `$${Number(earning?.AdminRecievedAmount).toFixed(2)}`
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No records available.
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NetEarningsList;
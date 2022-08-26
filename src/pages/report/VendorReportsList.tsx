import React from "react";
import { useSelector } from "react-redux";

import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";

interface Prop {
  setFilter: Function;
  filter: string;
}
const VendorReportsList: React.FC<Prop> = ({ filter, setFilter }) => {
  const vendor = useSelector((state: TRootState) => state?.reports?.vendorData);
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
                Vendor Info
              </span>
            </th>

            <th className="text-center">Vendor Status</th>
            <th className="text-center">No. of Orders Delivered</th>
            {/* <th className="text-center text-nowrap">
              No. of Orders <br /> Passed
            </th> */}
            <th className="text-center">No. of Orders Reschedule</th>
            <th className="text-center">
              Total Amount Paid by Customer on Online
            </th>
            {/* <th className="text-right">Total Earning</th> */}
            <th className="text-center text-nowrap">
              Total Net <br /> Earning Admin
            </th>
            <th className="text-center text-nowrap">
              Total Net <br /> Earning Vendor
            </th>
            <th className="text-center">
              Total Amount Paid to Freelance Driver
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : vendor.vendor && vendor.vendor.length > 0 ? (
            vendor.vendor.map((vendor) => (
              <tr key={vendor?.user_id}>
                <td>
                  {vendor?.user_full_name || "-"} <br />{" "}
                  <span className="text-muted">
                    {vendor?.user_country_code && vendor?.user_mobile_number
                      ? vendor?.user_country_code +
                        " " +
                        vendor?.user_mobile_number
                      : "-"}
                  </span>{" "}
                  <br />{" "}
                  <span className="text-muted">
                    {vendor?.user_email || "-"}
                  </span>{" "}
                </td>
                <td className="text-center">
                  {+vendor?.user_is_active === 1 ? (
                    <i className="icon dripicons-checkmark text-success font-size-20"></i>
                  ) : (
                    <i className="icon dripicons-cross text-danger font-size-20"></i>
                  )}
                </td>
                <td className="text-center">
                  {vendor?.DeliveredOrders || "-"}
                </td>
                {/* <td className="text-center">{vendor?.PassesOrders || "-"}</td> */}
                <td className="text-center">
                  {vendor?.RescheduleOrders || "-"}
                </td>
                <td className="text-center">
                  {vendor?.TotalAmountPaidOnline
                    ? "$" + fixPrice(vendor?.TotalAmountPaidOnline)
                    : "-"}
                </td>
                {/* <td className="text-right">{vendor?.TotalEarning || "-"}</td> */}
                <td className="text-center">
                  {vendor?.AdminNetEarning
                    ? "$" + fixPrice(vendor?.AdminNetEarning)
                    : "-"}
                </td>
                <td className="text-center">
                  {vendor?.VendorNetEarning
                    ? "$" + fixPrice(vendor?.VendorNetEarning)
                    : "-"}
                </td>
                <td className="text-center">
                  {vendor?.totalAmountPaidToFreelanceDriver
                    ? "$" + fixPrice(vendor?.totalAmountPaidToFreelanceDriver)
                    : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                No Vendor reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorReportsList;

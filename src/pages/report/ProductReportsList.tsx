import React from "react";
import { useSelector } from "react-redux";
import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";

const ProductReportsList = () => {
  const productReports = useSelector(
    (state: TRootState) => state?.reports?.productData
  );
  const loading = useSelector((state: TRootState) => state?.reports?.loading);
  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Order Type</th>
            <th>Product</th>
            <th className="text-center">Cylinder Size</th>
            <th className="text-center">No. of Orders</th>
            <th className="text-center">Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : productReports?.productReports &&
            productReports?.productReports?.length > 0 ? (
            productReports?.productReports?.map((report, index) => (
              <tr key={index}>
                <td>
                  {report?.orderdetails_order_type === 1
                    ? "Fuel Delivery"
                    : "Propanhe Tank Exchange Delivery"}
                </td>
                <td>{report?.products_name || "-"}</td>
                <td className="text-center">
                  {report?.cylinderSizes_cylinder_size || "-"}
                </td>
                <td className="text-center">{report?.TotalOrder || "-"}</td>
                <td className="text-center">
                  {report?.TotalSales ? "$" + fixPrice(report?.TotalSales) : "-"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No Product reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductReportsList;

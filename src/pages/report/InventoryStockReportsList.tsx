import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";

interface Prop {
  setFilter: Function;
  filter: string;
  setFilterBy: Function;
}

const InventoryStockReportsList: React.FC<Prop> = ({
  setFilter,
  filter,
  setFilterBy,
}) => {
  const inventoryReports = useSelector(
    (state: TRootState) => state?.reports?.inventoryStockData
  );
  const loading = useSelector((state: TRootState) => state?.reports?.loading);

  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Date</th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("user");
                }}
              >
                Vendor Name
              </span>
            </th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("category");
                }}
              >
                Category Name
              </span>
            </th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("product");
                }}
              >
                Product Name
              </span>
            </th>
            <th className="text-center">Cylinder Size</th>
            <th className="sorting">
              <span
                onClick={() => {
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC");
                  setFilterBy("accessory");
                }}
              >
                Accessories Name
              </span>
            </th>
            <th className="text-center">Opening Stock</th>
            <th className="text-center">Added Stock</th>
            <th className="text-center">Stock Delivered</th>
            <th className="text-center">Closing Stock</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          ) : inventoryReports?.inventoryReports &&
            inventoryReports?.inventoryReports?.length > 0 ? (
            inventoryReports?.inventoryReports?.map((report, index) => (
              <tr key={index}>
                <td>{moment(report?.addedAt).format("DD/MM/YYYY") || "-"} </td>
                <td>{report?.vendor?.user?.fullName || "-"}</td>
                <td>{report?.category?.name || "-"}</td>
                <td>{report?.product?.name || "-"}</td>
                <td className="text-center">
                  {report?.cylinderSize?.cylinderSize
                    ? report?.cylinderSize?.cylinderSize + " lbs"
                    : "-"}
                </td>
                <td>{report?.accessory?.name || "-"}</td>
                <td className="text-center">{report?.openingStock || "-"}</td>
                <td className="text-center">{report?.addedStockQty || "-"}</td>
                <td className="text-center">{report?.soldOutStock || "-"}</td>
                <td className="text-center">{report?.remainingStock || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: "center" }}>
                No Inventory Stock reports available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryStockReportsList;

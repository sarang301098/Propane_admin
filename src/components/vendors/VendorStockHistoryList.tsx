import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";

interface Prop {
  filter: { sort: string; sortBy: string };
  setFilter: Function;
}

const VendorStockHistoryList: React.FC<Prop> = ({ filter, setFilter }) => {
  const vendorStock = useSelector(
    (state: TRootState) => state?.vendor?.stockHistory?.vendorStock
  );
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);
  return (
    <table className="table table-hover m-0">
      <thead>
        <tr>
          <th>Date</th>
          <th className="sorting">
            <span
              onClick={() => {
                setFilter((prev: { sort: string; sortBy: string }) => ({
                  sort:
                    prev.sort === "ASC" && prev.sortBy === "categoryName"
                      ? "DESC"
                      : "ASC",
                  sortBy: "categoryName",
                }));
              }}
            >
              Category Name
            </span>
          </th>
          <th className="sorting">
            <span
              onClick={() => {
                setFilter((prev: { sort: string; sortBy: string }) => ({
                  sort:
                    prev.sort === "ASC" && prev.sortBy === "productName"
                      ? "DESC"
                      : "ASC",
                  sortBy: "productName",
                }));
              }}
            >
              Product Name
            </span>
          </th>
          <th className="text-center">Cylinder Size</th>
          <th className="sorting">
            <span
              onClick={() => {
                setFilter((prev: { sort: string; sortBy: string }) => ({
                  sort:
                    prev.sort === "ASC" && prev.sortBy === "accessoryName"
                      ? "DESC"
                      : "ASC",
                  sortBy: "accessoryName",
                }));
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
            <td>
              <BarsLoader />
            </td>
          </tr>
        ) : vendorStock?.length ? (
          vendorStock?.map((stock, index) => (
            <tr key={index}>
              <td>
                {stock?.addedAt
                  ? moment(stock?.addedAt)?.format("DD/MM/YYYY")
                  : "-"}{" "}
              </td>
              <td>{stock?.category?.name || "-"}</td>
              <td>{stock?.product?.name || "-"}</td>
              <td className="text-center">
                {stock?.cylinderSize?.cylinderSize || "-"}
              </td>
              <td>{stock?.accessory?.name || "-"}</td>
              <td className="text-center">{stock?.openingStock || "-"}</td>
              <td className="text-center">{stock?.addedStockQty || "-"}</td>
              <td className="text-center">{stock?.soldOutStock || "-"}</td>
              <td className="text-center">{stock?.remainingStock || "-"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9} className="text-center">
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default VendorStockHistoryList;

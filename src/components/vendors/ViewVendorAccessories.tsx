import React, { useEffect } from "react";
import VendorsView from "../../pages/vendors/view";
import FireTable from "../../assets/img/fire-table.png";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { getAccessoriesActionThunk } from "../../store/accessories/accessories.action.async";
import { BarsLoader } from "../loader/Loader";
import { fixPrice } from "../../utils/helpers/priceFixed";

const ViewAccessories = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);
  useEffect(() => {
    dispatch(getAccessoriesActionThunk("", 0, 0, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { accessories } = useSelector(
    (state: TRootState) => state?.accessories?.accessoriesData
  );
  return (
    <VendorsView>
      {(singleVendorData) => {
        const vendorAccessroies = accessories?.filter((accesssory) =>
          (singleVendorData?.vendor?.accessoryIds || [])?.includes(
            accesssory?.id?.toString()
          )
        );
        return loading ? (
          <BarsLoader />
        ) : (
          <div className="tab-pane fadeIn active" id="tab-5">
            <div className="card-body p-0">
              <div className="table-responsive accessories">
                <table className="table table-hover m-0">
                  <thead>
                    <tr>
                      <th className="w-400">Accessories Name</th>
                      <th>Accessories Image</th>
                      <th>Price</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorAccessroies?.length > 0 ? (
                      vendorAccessroies?.map((accessory, index) => (
                        <tr key={accessory?.id}>
                          <td>{accessory?.name || "-"}</td>
                          <td>
                            <img
                              src={FireTable}
                              className="h-40 w-40 rounded-circle o-cover"
                              alt="Product Logo"
                            />
                          </td>
                          <td>
                            {accessory?.price
                              ? "$" + fixPrice(accessory?.price)
                              : "-"}
                          </td>
                          <td>{accessory?.description || "-"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center" }}>
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      }}
    </VendorsView>
  );
};

export default ViewAccessories;

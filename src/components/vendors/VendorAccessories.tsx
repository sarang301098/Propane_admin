import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TRootState from "../../store/root.types";
import { updateVendorActionThunk } from "../../store/vendor/vendor.action.async";
import { BarsLoader } from "../loader/Loader";

interface Prop {
  setTabValue: Function;
}

const VendorAccessories: React.FC<Prop> = ({ setTabValue }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { vendorId } = useParams<{ vendorId: string }>();

  const loading = useSelector((state: TRootState) => state?.vendor?.loading);
  const { accessories } = useSelector(
    (state: TRootState) => state.accessories.accessoriesData
  );
  const selectedIds = useSelector(
    (state: TRootState) => state?.vendor?.singleVendorData?.vendor?.accessoryIds
  );

  const [selectedAccessories, setSelectedAccessories] = useState(accessories);
  const [selectedId, setSelectedId] = useState<number[]>([]);

  useEffect(() => {
    setSelectedAccessories(
      accessories.map((accessory) =>
        (selectedIds || [])?.map((id) => +id)?.includes(accessory?.id)
          ? { ...accessory, isChecked: true }
          : accessory
      )
    );
    setSelectedId(selectedIds?.map((id) => Number(id)) || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessories, selectedIds]);

  /**
   * steps:
   *  1) If id = selectAll set the isChecked value of all element as checked value.
   *  2) Else match the id with accessory id, if id matches set isChecked value as checked value.
   * @param e
   */
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (id === "selectAll") {
      const tempAccessories = selectedAccessories.map((accessory) => {
        return { ...accessory, isChecked: checked };
      });
      setSelectedAccessories(tempAccessories);
      const selectedIds = tempAccessories.map((accessory) => accessory.id);
      setSelectedId(checked ? selectedIds : []);
    } else {
      const tempAccessories = selectedAccessories.map((accessory) =>
        accessory.id === Number(id)
          ? { ...accessory, isChecked: checked }
          : accessory
      );
      const tempIds = [...selectedId];
      if (!(tempIds || [])?.includes(Number(id)) && checked === true) {
        tempIds.push(Number(id));
      } else {
        tempIds.splice(tempIds.indexOf(Number(id)), 1);
      }
      setSelectedAccessories(tempAccessories);
      setSelectedId(tempIds);
    }
  };

  return (
    <div className="tab-pane fadeIn active" id="tab-5">
      {loading ? (
        <BarsLoader />
      ) : (
        <>
          <div className="card-body p-0">
            <div className="table-responsive accessories">
              <table className="table table-hover m-0">
                <thead>
                  <tr>
                    <th className="w-50">
                      <label
                        className="control control-outline control-primary control--checkbox m-0"
                        htmlFor="selectAll"
                      >
                        <input
                          type="checkbox"
                          id="selectAll"
                          onChange={(e) => handleCheck(e)}
                          checked={
                            selectedAccessories.length > 0
                              ? selectedAccessories.filter(
                                  (selectedAccessories) =>
                                    selectedAccessories?.isChecked === true
                                ).length === selectedAccessories.length
                              : false
                          }
                        />
                        <div className="control__indicator"></div>
                      </label>
                    </th>
                    <th className="w-400">Accessories Name</th>
                    <th>Accessories Image</th>
                    <th>Price</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAccessories.map((accessory, index) => (
                    <tr key={index}>
                      <td>
                        <label
                          className="control control-outline control-primary control--checkbox m-0"
                          htmlFor={accessory.id}
                        >
                          <input
                            type="checkbox"
                            id={accessory.id}
                            checked={accessory?.isChecked || false}
                            onChange={(e) => handleCheck(e)}
                          />
                          <div className="control__indicator"></div>
                        </label>
                      </td>
                      <td>{accessory.name}</td>
                      <td>
                        <img
                          src={accessory.image}
                          className="h-40 w-40 rounded-circle o-cover"
                          alt="Product Logo"
                        />
                      </td>
                      <td>${accessory.price}</td>
                      <td>{accessory.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer bg-light text-right">
            <button
              type="button"
              className="btn btn-secondary clear-form mr-2"
              onClick={() => {
                setTabValue(3);
                history.push(history?.location?.pathname, { tab: 3 });
              }}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                dispatch(
                  updateVendorActionThunk(
                    { accessoryIds: selectedId, currentTab: 4 },
                    vendorId,
                    () => {
                      setTabValue(5);
                      history.push(history?.location?.pathname, { tab: 5 });
                    }
                  )
                );
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorAccessories;

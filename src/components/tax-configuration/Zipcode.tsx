/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";
import {
  deleteZipcodeActionThunk,
  updateZipcodesActionThunk,
} from "../../store/salesTax/salesTax.action.async";
import { AppendedMyComponent } from "../appendToBody/appendToBody";
import { BarsLoader } from "../loader/Loader";
import ZipcodeModal from "./ZipcodeModal";

interface Prop {
  getAction: Function;
  setFilter: Function;
  filter: string;
}

const Zipcode: React.FC<Prop> = ({ getAction, filter, setFilter }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { count } = useSelector(
    (state: TRootState) => state?.salesTax?.zipcodeData
  );
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [zipcodeId, setZipcodeId] = useState("");
  const [countyName, setCountyName] = useState("");
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [editZipcode, setEditZipcode] = useState<{
    areaName: string;
    zipcode: number;
    status: number;
  } | null>(null);
  const { zipcodes } = useSelector(
    (state: TRootState) => state.salesTax.zipcodeData
  );
  const loading = useSelector((state: TRootState) => state.salesTax.loading);

  const showAlert = () => {
    setSweetAlert(true);
  };
  const handleShow = () => {
    setShow(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };

  /**
   * steps:
   *  1) Dispatched update zipcode action
   * @param areaName
   * @param zipcode
   * @param status
   */
  const updateZipcode = (areaName: string, zipcode: number, status: number) => {
    dispatch(updateZipcodesActionThunk(areaName, zipcode, status, zipcodeId));
  };

  /**
   * steps:
   *  1) Dispatched delete zipcode action
   */
  const handleDelete = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteZipcodeActionThunk(
        zipcodeId,
        isLastPage && Math.ceil(count / itemsPerPage) !== 1
          ? getAction
          : undefined
      )
    );
    hideAlert();
  };

  const handleCloseChangeStatus = () => {
    if (editZipcode) {
      updateZipcode(
        editZipcode.areaName,
        editZipcode.zipcode,
        editZipcode.status === 1 ? 0 : 1
      );
    }
    setShowChangeStatusAlert(false);
  };
  return (
    <div className="table-responsive">
      <ZipcodeModal
        show={show}
        setShow={setShow}
        submitAction={updateZipcode}
        editZipcode={editZipcode}
        county={countyName}
      />
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th className="sorting w-300">
              <span
                onClick={() =>
                  filter === "ASC" ? setFilter("DESC") : setFilter("ASC")
                }
              >
                {" "}
                Area Name{" "}
              </span>
            </th>
            <th>Zipcode</th>
            <th className="text-center">
              Sales Tax (%)
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id={`tooltip01`}>
                    State Sales Tax (%) + County Sales Tax (%) (1) + County
                    Sales Tax (%) (2)
                  </Tooltip>
                }
              >
                <i className="fa fa-info-circle top-1 m-l-5"></i>
              </OverlayTrigger>
            </th>
            <th className="table-field-status">Status</th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            zipcodes?.length > 0 ? (
              zipcodes.map((zipcode, index) => (
                <tr key={index}>
                  <td>{zipcode.areaName || "-"}</td>
                  <td>{zipcode.zipcode || "-"}</td>
                  <td className="text-center">{zipcode.salesTax || "-"}</td>
                  <td className="table-field-status">
                    <a
                      href="#"
                      onClick={() => {
                        setZipcodeId(zipcode.id.toString());
                        setEditZipcode({
                          areaName: zipcode?.areaName,
                          zipcode: zipcode?.zipcode,
                          status: zipcode?.status,
                        });
                        setShowChangeStatusAlert(true);
                      }}
                    >
                      {Number(zipcode.status) === 1 ? (
                        <i className="icon dripicons-checkmark text-success font-size-20"></i>
                      ) : (
                        <i className="icon dripicons-cross text-danger font-size-20"></i>
                      )}
                    </a>
                  </td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setZipcodeId(zipcode.id.toString());
                              setEditZipcode({
                                areaName: zipcode?.areaName,
                                zipcode: zipcode?.zipcode,
                                status: zipcode?.status,
                              });
                              setCountyName(zipcode?.county?.name);
                              handleShow();
                            }}
                          >
                            <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              showAlert();
                              setZipcodeId(zipcode.id.toString());
                            }}
                          >
                            <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </AppendedMyComponent>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No records available
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <React.Fragment>
        {showChangeStatusAlert && (
          <SweetAlert
            success
            showCancel
            title="Are you sure want to change status?"
            onConfirm={() => setShowChangeStatusAlert(false)}
            onCancel={() => setShowChangeStatusAlert(false)}
            customButtons={
              <React.Fragment>
                <button
                  className="btn btn-dark min-w-100 mr-3"
                  onClick={() => setShowChangeStatusAlert(false)}
                >
                  No
                </button>
                <button
                  className="btn btn-danger min-w-100"
                  onClick={handleCloseChangeStatus}
                >
                  Yes
                </button>
              </React.Fragment>
            }
          ></SweetAlert>
        )}

        {sweetAlert && (
          <SweetAlert
            danger
            showCancel
            title="Are you sure want to delete zipcode?"
            onConfirm={hideAlert}
            onCancel={hideAlert}
            customButtons={
              <React.Fragment>
                <button
                  className="btn btn-dark min-w-100 mr-3"
                  onClick={hideAlert}
                >
                  No
                </button>
                <button
                  className="btn btn-danger min-w-100"
                  onClick={handleDelete}
                >
                  Yes
                </button>
              </React.Fragment>
            }
          ></SweetAlert>
        )}
      </React.Fragment>
    </div>
  );
};

export default Zipcode;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import {
  deleteSubAdminActionThunk,
  getSubAdminByIdActionThunk,
  updateSubAdminActionThunk,
  updateSubAdminStatusActionThunk,
} from "../../store/subAdmin/subAdmin.action.async";
import { AppendedMyComponent } from "../appendToBody/appendToBody";
import { BarsLoader } from "../loader/Loader";
import SubAdminModal from "./SubAdminModal";

interface Prop {
  setFilter: Function;
  filter: string;
}

const SubAdmin: React.FC<Prop> = ({ filter, setFilter }) => {
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [id, setId] = useState("");
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [editSubAdmin, setEditSubAdmin] = useState<{
    countryCode: string;
    email: string;
    fullName: string;
    roleName: { label: string; value: string | number } | null;
    isActive: boolean;
    mobileNumber: number;
    id: number | string;
  } | null>(null);
  const loading = useSelector((state: TRootState) => state?.subAdmin?.loading);
  const { subAdmin } = useSelector(
    (state: TRootState) => state?.subAdmin?.subAdminData
  );
  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const dispatch = useDispatch();
  const handleSubmit = (
    status: boolean,
    mobileNumber: number,
    email: string,
    fullName: string,
    roleId: number
  ) => {
    dispatch(
      updateSubAdminActionThunk(
        status,
        mobileNumber,
        email,
        fullName,
        roleId,
        id
      )
    );
  };

  const changeSubAdminStatusHandler = () => {
    if (editSubAdmin) {
      dispatch(updateSubAdminStatusActionThunk(editSubAdmin.isActive, id));
    }
    setShowChangeStatusAlert(false);
  };
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
                Sub Admin Name
              </span>
            </th>
            <th className="table-field-status">Status</th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            subAdmin?.length > 0 ? (
              subAdmin?.map((subAdmin, index: number) => (
                <tr key={index}>
                  <td>{subAdmin?.fullName}</td>
                  <td className="table-field-status">
                    <a
                      href="#"
                      onClick={() => {
                        setShowChangeStatusAlert(true);
                        setEditSubAdmin({
                          countryCode: subAdmin?.countryCode,
                          email: subAdmin?.email,
                          fullName: subAdmin?.fullName,
                          roleName: null,
                          isActive: !subAdmin?.isActive,
                          mobileNumber: subAdmin?.mobileNumber,
                          id: subAdmin?.id,
                        });
                        setId(subAdmin?.id?.toString());
                      }}
                    >
                      <i
                        className={`icon dripicons-checkmark ${
                          Number(subAdmin?.isActive)
                            ? "dripicons-checkmark text-success"
                            : "dripicons-cross text-danger"
                        } font-size-20`}
                      ></i>
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
                            onClick={async () => {
                              await setEditSubAdmin({
                                countryCode: subAdmin?.countryCode,
                                email: subAdmin?.email,
                                fullName: subAdmin?.fullName,
                                roleName: null,
                                isActive: subAdmin?.isActive,
                                mobileNumber: subAdmin?.mobileNumber,
                                id: subAdmin?.id,
                              });
                              setId(subAdmin?.id?.toString());
                              dispatch(
                                getSubAdminByIdActionThunk(subAdmin?.id)
                              );
                              handleShow();
                            }}
                          >
                            <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setId(subAdmin?.id?.toString());
                              showAlert();
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
      <SubAdminModal
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
        editSubAdmin={editSubAdmin}
      />
      {sweetAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to delete?"
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
                onClick={() => {
                  dispatch(deleteSubAdminActionThunk(id));
                  hideAlert();
                }}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
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
                onClick={changeSubAdminStatusHandler}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </div>
  );
};
export default SubAdmin;

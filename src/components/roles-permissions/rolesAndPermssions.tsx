/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import {
  deleteRoleActionThunk,
  updateRolesStatusActionThunk,
} from "../../store/rolesAndPermissions/rolesAndPermissions.action.async";
import { BarsLoader } from "../loader/Loader";
import { AppendedMyComponent } from "../appendToBody/appendToBody";

interface Prop {
  setFilter: Function;
  filter: string;
}
const RolesAndPermssions: React.FC<Prop> = ({ filter, setFilter }) => {
  const [sweetAlert, setSweetAlert] = useState(false);
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [id, setId] = useState("");
  const rolesData = useSelector(
    (state: TRootState) => state.rolesAndPermission?.rolesData?.roles
  );
  const [editRoles, setEditRoles] = useState<{
    isActive: boolean;
  } | null>(null);
  const loading = useSelector(
    (state: TRootState) => state.rolesAndPermission?.loading
  );
  const dispatch = useDispatch();
  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };

  const changeRolesStatusHandler = () => {
    if (editRoles) {
      dispatch(updateRolesStatusActionThunk(editRoles.isActive, id));
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
                Role Name
              </span>
            </th>
            <th className="table-field-status">Status</th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            rolesData?.length > 0 ? (
              rolesData?.map((roles) => (
                <tr key={roles?.id}>
                  <td>{roles?.name}</td>
                  <td className="table-field-status">
                    <a
                      href="#"
                      onClick={() => {
                        setShowChangeStatusAlert(true);
                        setEditRoles({
                          isActive: !roles?.isActive,
                        });
                        setId(roles.id.toString());
                      }}
                    >
                      {roles?.isActive ? (
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
                            href={"/settings/roles-permissions/" + roles.id}
                            onClick={() => {
                              setId(roles.id.toString());
                            }}
                          >
                            <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setId(roles.id.toString());
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
                <td colSpan={3} style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                <BarsLoader />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {sweetAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to delete role?"
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
                  dispatch(deleteRoleActionThunk(id));
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
                onClick={changeRolesStatusHandler}
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
export default RolesAndPermssions;

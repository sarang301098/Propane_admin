/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import TRootState from "../../store/root.types";
import {
  deleteStateActionThunk,
  updateStateActionThunk,
} from "../../store/salesTax/salesTax.action.async";
import { BarsLoader } from "../loader/Loader";
import StateModal from "./StateModal";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";

interface Prop {
  getAction: Function;
  filter: string;
  setFilter: Function;
}

const States: React.FC<Prop> = ({ getAction, filter, setFilter }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { count } = useSelector(
    (state: TRootState) => state?.salesTax?.statesData
  );
  const [show, setShow] = useState(false);
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [stateId, setStateId] = useState("");
  const [editState, setEditState] = useState<{
    name: string;
    salesTax: number;
    status: number;
  } | null>(null);
  const { states } = useSelector(
    (state: TRootState) => state.salesTax.statesData
  );
  const loading = useSelector((state: TRootState) => state.salesTax.loading);

  const showAlert = () => {
    setSweetAlert(true);
  };

  const hideAlert = () => {
    setSweetAlert(false);
  };

  const handleCloseChangeStatus = () => {
    if (editState) {
      handleSubmit(
        editState.name,
        editState.salesTax?.toString(),
        editState.status === 1 ? 0 : 1
      );
    }
    setShowChangeStatusAlert(false);
  };

  /**
   * Dispatched update state action
   * @param name
   * @param saleTax
   * @param status
   */
  const handleSubmit = (name: string, saleTax: string, status: number) => {
    dispatch(updateStateActionThunk(name, saleTax, status, stateId));
    setEditState(null);
  };

  /**
   * step:
   *  1): Dispatched delete state action
   */
  const handleDelete = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteStateActionThunk(
        stateId,
        isLastPage && Math.ceil(count / itemsPerPage) !== 1
          ? getAction
          : undefined
      )
    );
    hideAlert();
  };
  return (
    <>
      <div className="table-responsive">
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
                  State Name{" "}
                </span>
              </th>
              <th className="text-center">Sales Tax (%)</th>
              <th className="text-center">County</th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              states && states.length > 0 ? (
                states.map((state, index) => (
                  <tr key={state.id}>
                    <td>{state.name || "-"}</td>
                    <td className="text-center">{state.salesTax || "-"}</td>
                    <td className="text-center">
                      <Link
                        to={{
                          pathname: `/states/${state.id}/county`,
                          state: { state: state.name },
                        }}
                      >
                        <span className="badge badge-light">
                          {state.totalCounties}
                        </span>
                      </Link>
                    </td>
                    <td className="table-field-status">
                      <a
                        href="#"
                        onClick={() => {
                          const editState = {
                            name: state.name,
                            salesTax: state.salesTax,
                            status: state.status,
                          };
                          setEditState(() => editState);
                          setStateId(state.id.toString());
                        }}
                      >
                        {Number(state.status) === 1 ? (
                          <i
                            className="icon dripicons-checkmark text-success font-size-20"
                            onClick={() => setShowChangeStatusAlert(true)}
                          ></i>
                        ) : (
                          <i
                            className="icon dripicons-cross text-danger font-size-20"
                            onClick={() => setShowChangeStatusAlert(true)}
                          ></i>
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
                                const editState = {
                                  name: state.name,
                                  salesTax: state.salesTax,
                                  status: state.status,
                                };
                                setEditState(() => editState);
                                setStateId(state.id.toString());
                                setShow(true);
                              }}
                            >
                              <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={() => {
                                showAlert();
                                setStateId(state.id.toString());
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
      </div>
      <StateModal
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
        editState={editState}
      />
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
            title="Are you sure want to delete state?"
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
    </>
  );
};

export default States;

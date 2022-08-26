/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";
import TRootState from "../../store/root.types";
import {
  deleteCountiesActionThunk,
  updateCountiesActionThunk,
} from "../../store/salesTax/salesTax.action.async";
import { BarsLoader } from "../loader/Loader";
import CountyModal from "./CountyModal";

interface Prop {
  getAction: Function;
  setFilter: Function;
  filter: string;
}

const County: React.FC<Prop> = ({ getAction, setFilter, filter }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { count } = useSelector(
    (state: TRootState) => state?.salesTax?.countyData
  );
  const { stateId } = useParams<{ stateId: string }>();
  const { counties } = useSelector(
    (state: TRootState) => state.salesTax.countyData
  );
  const loading = useSelector((state: TRootState) => state.salesTax.loading);

  const [show, setShow] = useState(false);
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [stateName, setStateName] = useState("");
  const [editCounty, setEditCounty] = useState<{
    countyName: string;
    salesTaxOne: number;
    salesTaxTwo: number;
    status: number;
  } | null>(null);
  const [countyId, setCountyId] = useState("");

  const showAlert = () => {
    setSweetAlert(true);
  };

  const hideAlert = () => {
    setSweetAlert(false);
  };

  /**
   * steps:
   *  1) Dispatched update county action
   * @param countyName
   * @param salesTaxOne
   * @param salesTaxTwo
   * @param status
   */
  const handleSubmit = (
    countyName: string,
    salesTaxOne: string,
    salesTaxTwo: string,
    status: number
  ) => {
    dispatch(
      updateCountiesActionThunk(
        countyName,
        salesTaxOne,
        salesTaxTwo,
        status,
        countyId
      )
    );
  };

  /**
   * steps:
   *  1): Dispathced delete county action
   */
  const handleDelete = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteCountiesActionThunk(
        countyId,
        isLastPage && Math.ceil(count / itemsPerPage) !== 1
          ? getAction
          : undefined
      )
    );
    hideAlert();
  };

  const handleCloseChangeStatus = () => {
    if (editCounty) {
      handleSubmit(
        editCounty.countyName,
        editCounty.salesTaxOne?.toString(),
        editCounty.salesTaxTwo?.toString(),
        editCounty.status === 1 ? 0 : 1
      );
    }
    setShowChangeStatusAlert(false);
  };

  return (
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
                County Name{" "}
              </span>
            </th>
            <th className="text-center">Sales Tax (%) (1)</th>
            <th className="text-center">Sales Tax (%) (2)</th>
            <th className="text-center">Zipcode</th>
            <th className="table-field-status">Status</th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            counties?.length > 0 ? (
              counties.map((county, index) => (
                <tr key={index}>
                  <td>{county?.name || "-"}</td>
                  <td className="text-center">{county?.salesTaxOne || "-"}</td>
                  <td className="text-center">{county?.salesTaxTwo || "-"}</td>
                  <td className="text-center">
                    <Link
                      to={{
                        pathname: `/states/${stateId}/counties/${county?.id}/zip-codes`,
                        state: {
                          county: county?.name,
                          state: county?.state?.name,
                        },
                      }}
                    >
                      <span className="badge badge-light">
                        {county?.totalZipcodes}
                      </span>
                    </Link>
                  </td>
                  <td className="table-field-status">
                    <a
                      href="#"
                      onClick={() => {
                        setCountyId((county?.id).toString());
                        setEditCounty(() => ({
                          countyName: county?.name,
                          salesTaxOne: county?.salesTaxOne,
                          salesTaxTwo: county?.salesTaxTwo,
                          status: county.status,
                        }));
                        setShowChangeStatusAlert(true);
                      }}
                    >
                      {Number(county.status) === 1 ? (
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
                              setCountyId((county?.id).toString());
                              setEditCounty(() => ({
                                countyName: county?.name,
                                salesTaxOne: county?.salesTaxOne,
                                salesTaxTwo: county?.salesTaxTwo,
                                status: county.status,
                              }));
                              setStateName(county?.state?.name);
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
                              setCountyId((county?.id).toString());
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

      <CountyModal
        setEditCounty={setEditCounty}
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
        editCounty={editCounty}
        state={stateName}
      />

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
          title="Are you sure want to delete county?"
          onConfirm={hideAlert}
          onCancel={hideAlert}
          customButtons={
            <>
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
            </>
          }
        ></SweetAlert>
      )}
    </div>
  );
};

export default County;

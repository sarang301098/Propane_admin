import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

// import MapImage from "../../assets/img/map-new.jpg";
import User from "../../assets/img/user.jpg";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";
import {
  deleteDriverActionThunk,
  getDriverLocationActionThunk,
  updateDriverActionThunk,
  updateDriverApprovalActionThunk,
} from "../../store/drivers/drivers.actions.async";
import LiveLocation from "../../components/Map/LiveLocation";

interface Prop {
  getAction: Function;
  filter: string;
  setFilter: Function;
}

const FreelanceDriversList: React.FC<Prop> = ({
  getAction,
  filter,
  setFilter,
}) => {
  const dispatch = useDispatch();

  const [showMap, setShowMap] = useState(false);
  const [deleteDriver, setDeleteDriver] = useState(false);
  const [, setDriverId] = useState<string | number>("");
  const [showChangeStatusAlert, setShowChangeStatusAlert] = useState(false);
  const [showChangeApprovalAlert, setShowChangeApprovalAlert] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState("");
  const [status, setStatus] = useState(0);
  const [fetchLatLong, setFetchLatLong] = useState<NodeJS.Timer | undefined>();
  const [markers, setShowMarkers] = useState<
    null | { address: string; lat: number | string; lng: number | string }[]
  >(null);

  const freelanceDriversList = useSelector(
    (state: TRootState) => state?.drivers?.freelanceDriversList
  );
  const loading = useSelector((state: TRootState) => state?.drivers?.loading);
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const count = useSelector(
    (state: TRootState) => state?.drivers?.freelanceDriversList?.count
  );

  /**
   * delete driver
   */
  const driverDeleteHandler = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteDriverActionThunk(id, true, isLastPage ? getAction : undefined)
    );
    setDeleteDriver(false);
  };

  const completedOrderHandler = (driverID: string) => {
    // dispatch(getDriverByIdAction(driverID));
  };

  const changeFreelanceDriverStatusHandler = () => {
    dispatch(updateDriverActionThunk(isActive, id, true));
    setShowChangeStatusAlert(false);
  };
  const changeFreelanceDriverApprovalHandler = () => {
    dispatch(updateDriverApprovalActionThunk(status, id, true));
    setShowChangeApprovalAlert(false);
  };

  return (
    <>
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
                  Full Name{" "}
                </span>
              </th>
              <th>License Number</th>
              <th>Registration Date</th>
              <th className="text-center">Live Location</th>
              <th className="text-center">Completed Orders</th>
              <th className="text-center">Driver Approval Request</th>
              <th className="table-field-status">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : freelanceDriversList.drivers &&
              freelanceDriversList.drivers.length > 0 ? (
              freelanceDriversList.drivers.map((driver) => (
                <tr key={driver?.id}>
                  <td>
                    <div className="media">
                      <img
                        className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                        src={driver?.profileImage || User}
                        alt=""
                      />
                      <div className="media-body">
                        <h6 className="mt-1 mb-0">{driver?.fullName}</h6>
                        <span className="text-muted">
                          {driver?.countryCode + " " + driver?.mobileNumber}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {driver?.driver?.licenceNo || "-"}
                  </td>
                  <td>
                    {moment(driver?.driver?.createdAt).format("MM/DD/YYYY")}
                  </td>

                  <td className="text-center">
                    {driver?.driver?.lat && driver?.driver?.long ? (
                      <button
                        className="simple-btn"
                        onClick={() => {
                          setShowMap(true);
                          driver?.id &&
                            setFetchLatLong(
                              setInterval(() => {
                                dispatch(
                                  getDriverLocationActionThunk(driver?.id)
                                );
                                setShowMarkers([
                                  {
                                    lat: driver?.driver?.lat
                                      ? +driver?.driver?.lat
                                      : "",
                                    lng: driver?.driver?.long
                                      ? +driver?.driver?.long
                                      : "",
                                    address: "",
                                  },
                                ]);
                              }, 5000)
                            );
                          setShowMarkers([
                            {
                              address: "",
                              lat: driver?.driver?.lat,
                              lng: driver?.driver?.long,
                            },
                          ]);
                        }}
                      >
                        <i className="icons dripicons-location"></i>
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>

                  {!driver?.orders["1"]?.length &&
                  !driver?.orders["2"]?.length ? (
                    <td className="text-center">-</td>
                  ) : (
                    <td className="text-center">
                      <Link
                        to={{
                          pathname: `/drivers/${driver?.id}/completed-orders`,
                          state: { completedOrders: "completed" },
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip03`}>
                              Fuel Order -{" "}
                              {
                                (driver?.orders["1"] || [])?.filter(
                                  ({ status }) => status === "delivered"
                                ).length
                              }
                              <br />
                              Propane Tank -{" "}
                              {
                                (driver?.orders["2"] || [])?.filter(
                                  ({ status }) => status === "delivered"
                                ).length
                              }
                            </Tooltip>
                          }
                        >
                          <span
                            className="badge badge-light"
                            onClick={() => completedOrderHandler(driver?.id)}
                          >
                            {(driver?.orders["1"] || [])?.filter(
                              ({ status }) => status === "delivered"
                            ).length +
                              (driver?.orders["2"] || [])?.filter(
                                ({ status }) => status === "delivered"
                              ).length}
                          </span>
                        </OverlayTrigger>
                      </Link>
                    </td>
                  )}
                  <td className="text-center">
                    {driver?.driver?.status === 1 ? (
                      <span className="text-success">Approved</span>
                    ) : (
                      <span className="font-size-13 text-danger">
                        Not Approved
                      </span>
                    )}
                  </td>
                  {driver?.isActive ? (
                    <td className="table-field-status">
                      <i
                        className="icon dripicons-checkmark text-success font-size-20"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setId(driver?.id);
                          setIsActive(!driver?.isActive);
                          setShowChangeStatusAlert(true);
                        }}
                      ></i>
                    </td>
                  ) : (
                    <td className="table-field-status">
                      <i
                        className="icon dripicons-cross text-danger font-size-20"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setId(driver?.id);
                          setIsActive(!driver?.isActive);
                          setShowChangeStatusAlert(true);
                        }}
                      ></i>
                    </td>
                  )}

                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        className="btn btn-sm btn-icon-only"
                      >
                        <i
                          className="icon dripicons-dots-3 zmdi-hc-fw"
                          onClick={() => setDriverId(driver?.driver?.id)}
                        ></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as={Link}
                            to={
                              "/drivers/view/" + driver?.id + "/basic-details"
                            }
                          >
                            <i className="fa fa-info-circle fa-fw text-accent-custom"></i>{" "}
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setIsActive(!driver?.isActive);
                              setId(driver?.id);
                              setShowChangeStatusAlert(true);
                            }}
                          >
                            {driver?.isActive ? (
                              <i className="fa fa-times fa-fw text-accent-custom" />
                            ) : (
                              <i className="fa fa-check fa-fw text-accent-custom" />
                            )}
                            {driver?.isActive ? "Inactive" : " Active"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setShowChangeApprovalAlert(true);
                              setStatus(
                                driver?.driver?.status === 0 ||
                                  driver?.driver?.status === 2
                                  ? 1
                                  : 2
                              );
                              setId(driver?.id);
                            }}
                          >
                            {!(
                              driver?.driver?.status === 0 ||
                              driver?.driver?.status === 2
                            ) ? (
                              <i className="fa fa-times fa-fw text-accent-custom" />
                            ) : (
                              <i className="far fa-check-circle fa-fw text-accent-custom" />
                            )}
                            {!(
                              driver?.driver?.status === 0 ||
                              driver?.driver?.status === 2
                            )
                              ? "Not Approve"
                              : "Approve"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setId(driver?.id);
                              setDeleteDriver(true);
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
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No Freelance Drivers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <LiveLocation
        showMap={showMap}
        setShowMap={setShowMap}
        fetchLatLong={fetchLatLong}
        markers={markers}
      />
      {/* <Modal
        centered
        show={showMap}
        onHide={() => {
          fetchLatLong && clearInterval(fetchLatLong);
          setShowMap(false);
        }}
      >
        <Modal.Header>
          <h4 className="modal-title">Live Location</h4>
          <button
            className="close"
            onClick={() => {
              fetchLatLong && clearInterval(fetchLatLong);
              setShowMap(false);
            }}
          >
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body className="text-center">
          <CustomMap
            markers={markers}
            loadingElement={<BarsLoader />}
            containerElement={
              <div style={{ height: `500px`, width: "auto" }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </Modal.Body>
      </Modal> */}
      <React.Fragment>
        {deleteDriver && (
          <SweetAlert
            danger
            showCancel
            title="Are you sure want to delete?"
            onConfirm={() => setDeleteDriver(false)}
            onCancel={() => setDeleteDriver(false)}
            customButtons={
              <React.Fragment>
                <button
                  className="btn btn-dark min-w-100 mr-3"
                  onClick={() => setDeleteDriver(false)}
                >
                  No
                </button>
                <button
                  className="btn btn-danger min-w-100"
                  onClick={driverDeleteHandler}
                >
                  Yes
                </button>
              </React.Fragment>
            }
          ></SweetAlert>
        )}
      </React.Fragment>
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
                onClick={() => changeFreelanceDriverStatusHandler()}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
      {showChangeApprovalAlert && (
        <SweetAlert
          success
          showCancel
          title="Are you sure want to change status?"
          onConfirm={() => setShowChangeApprovalAlert(false)}
          onCancel={() => setShowChangeApprovalAlert(false)}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={() => setShowChangeApprovalAlert(false)}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={() => changeFreelanceDriverApprovalHandler()}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </>
  );
};

export default FreelanceDriversList;

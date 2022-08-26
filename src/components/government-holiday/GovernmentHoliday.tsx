import React, { useState } from "react";
import moment from "moment";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";
import GovernmentHolidayModal from "./GovernmentHolidayModal";
import {
  deleteteHolidayActionThunk,
  updateHolidayActionThunk,
} from "../../store/governmentHolidays/governmentHolidays.action.async";
import { AppendedMyComponent } from "../appendToBody/appendToBody";
import { useHistory } from "react-router-dom";

interface Prop {
  getAction: Function;
  filter: string;
}

const GovernmentHoliday: React.FC<Prop> = ({ getAction, filter }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [id, setId] = useState("");
  const [editHoliday, setEditHoliday] = useState<{
    date: string;
    vendor: { label: string; value: string }[];
    description: string;
  } | null>(null);

  const loading = useSelector(
    (state: TRootState) => state.governmentHoliday?.loading
  );
  const { holidays } = useSelector(
    (state: TRootState) => state.governmentHoliday?.holidayData || {}
  );
  const { vendor } = useSelector(
    (state: TRootState) => state?.governmentHoliday?.vendorsData
  );

  const SelectVendor = vendor?.map((vendor) => ({
    value: vendor.id,
    label: vendor.fullName,
  }));

  const handleShow = () => {
    setShow(true);
  };
  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };
  const handleSubmit = (
    date: string,
    vendorId: (string | number)[],
    description: string
  ) => {
    dispatch(updateHolidayActionThunk(date, vendorId, description, id));
  };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const count = useSelector(
    (state: TRootState) => state?.governmentHoliday?.holidayData?.count
  );
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  return (
    <div className="table-responsive">
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th className="w-250">Date</th>
            <th>Description</th>
            {/* <th>Vendor</th> */}
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            holidays?.length > 0 ? (
              holidays?.map((holiday, index: number) => (
                <tr key={index}>
                  <td>
                    {moment(holiday?.date || new Date()).format("DD/MM/YYYY")}
                  </td>
                  <td style={{ wordBreak: "break-word" }}>
                    {holiday?.description}{" "}
                  </td>
                  {/* <td>{holiday.vendorIds}</td> */}
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
                              setEditHoliday({
                                date: holiday?.date,
                                vendor: SelectVendor?.filter((vendor) =>
                                  (holiday?.vendorIds || []).includes(
                                    vendor.value
                                  )
                                ),
                                description: holiday?.description,
                              });
                              setId(holiday?.id?.toString());
                              handleShow();
                            }}
                          >
                            <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setId(holiday?.id?.toString());
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
      <GovernmentHolidayModal
        show={show}
        setShow={setShow}
        submitAction={handleSubmit}
        filter={filter}
        editHoliday={editHoliday}
      />
      <React.Fragment>
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
                    const isLastPage =
                      Number(state?.page) !== Math.ceil(count / itemsPerPage);
                    dispatch(
                      deleteteHolidayActionThunk(
                        id,
                        isLastPage ? getAction : undefined
                      )
                    );
                    hideAlert();
                  }}
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
export default GovernmentHoliday;

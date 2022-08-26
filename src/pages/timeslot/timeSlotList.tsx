import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { convertTo12 } from "../../utils/helpers/timeConvert";
import TRootState from "../../store/root.types";
import {
  deleteTimeSlotActionThunk,
  editTimeSlotActionThunk,
} from "../../store/timesSlot/timeSlot.actions.async";
import { BarsLoader } from "../../components/loader/Loader";
import { warningToast } from "../../components/toast/toast";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";

const TimeSlotList: React.FC = () => {
  const [showEditSlot, setShowEditSlot] = useState(false);
  const [showDeleteSlot, setShowDeleteSlot] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [startEditTimeSlot, setStartEditTimeSlot] = useState("");
  const [endEditTimeSlot, setEndEditTimeSlot] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state: TRootState) => state.timeSlot.loading);
  const timeSlotList = useSelector((state: TRootState) => state.timeSlot.timeSlotList);
  const itemsPerPage = useSelector((state: TRootState) => state.pagination.perPageItems);

  const state = history?.location?.state as { page: string };
  const convertedStartTime00 = moment(startEditTimeSlot, "HHmmss").format("HH:mm:ss");
  const convertedEndTime00 = moment(endEditTimeSlot, "HHmmss").format("HH:mm:ss");

  /**
   * find existing slot
   */
  const existingSlot = timeSlotList.timeSlots.filter(
    (old) => old.startTime === convertedStartTime00 && old.endTime === convertedEndTime00
  );

  /**
   * edit time slot submit handler
   * @param e
   */
  const editSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (startEditTimeSlot === endEditTimeSlot) {
      warningToast("Please enter valid slot.");
    } else if (existingSlot.length > 0) {
      warningToast("Time slot already exists.");
    } else {
      dispatch(
        editTimeSlotActionThunk(editId, {
          startTime: convertedStartTime00,
          endTime: convertedEndTime00,
        })
      );
      setShowEditSlot(false);
    }
  };

  /**
   * delete time slot handler
   */
  const deleteSlotHandler = () => {
    dispatch(deleteTimeSlotActionThunk(editId, Number(state?.page) || 1, itemsPerPage));
    setShowDeleteSlot(false);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th className="w-300">Start Time</th>
              <th>End Time</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : timeSlotList.timeSlots && timeSlotList.timeSlots.length > 0 ? (
              timeSlotList.timeSlots.map((slot) => (
                <tr key={slot.id}>
                  <td>{convertTo12(slot.startTime)}</td>
                  <td>{convertTo12(slot.endTime)}</td>
                  <td className="table-field-actions">
                    <Dropdown className="btn-group">
                      <Dropdown.Toggle id="dropdown-basic" className="btn btn-sm btn-icon-only">
                        <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                      </Dropdown.Toggle>
                      <AppendedMyComponent>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setShowEditSlot(true);
                              setEditId(slot.id);
                              setStartEditTimeSlot(moment(slot.startTime, "HHmmss").format("HH:mm"));
                              setEndEditTimeSlot(moment(slot.endTime, "HHmmss").format("HH:mm"));
                            }}
                          >
                            <i className="fa fa-edit fa-fw text-accent-custom"></i> Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={() => {
                              setShowDeleteSlot(true);
                              setEditId(slot.id);
                            }}
                          >
                            <i className="fa fa-trash-alt fa-fw text-accent-custom"></i> Delete
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
                  No Time slots available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        centered
        scrollable
        show={showEditSlot}
        // onHide={() => setShowEditSlot(false)}
      >
        <Modal.Header>
          <h4 className="modal-title">Edit Time Slot</h4>
          <button className="close" onClick={() => setShowEditSlot(false)}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <form onSubmit={editSubmitHandler}>
          <Modal.Body>
            <div className="form-row">
              <div className="col-md-5">
                <div className="form-group">
                  <label className="control-label">
                    Start Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={startEditTimeSlot}
                    className="form-control"
                    onChange={(e) => setStartEditTimeSlot(moment(e.target.value, "HHmmss").format("HH:mm"))}
                    required
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <label className="control-label">
                    End Time <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    value={endEditTimeSlot}
                    className="form-control"
                    onChange={(e) => setEndEditTimeSlot(moment(e.target.value, "HHmmss").format("HH:mm"))}
                    required
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={() => setShowEditSlot(false)}>
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
      <React.Fragment>
        {showDeleteSlot && (
          <SweetAlert
            danger
            showCancel
            title="Are you sure want to delete?"
            onConfirm={() => setShowDeleteSlot(false)}
            // onCancel={() => setShowDeleteSlot(false)}
            customButtons={
              <React.Fragment>
                <button className="btn btn-dark min-w-100 mr-3" onClick={() => setShowDeleteSlot(false)}>
                  No
                </button>
                <button className="btn btn-danger min-w-100" onClick={deleteSlotHandler}>
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

export default TimeSlotList;

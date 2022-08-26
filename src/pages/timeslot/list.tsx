import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { Sidebar } from "../../components/sidebar/sidebar";
import Pagination from "../../components/pagination/Pagination";
import TimeSlotList from "./timeSlotList";
import {
  addTimeSlotActionThunk,
  getTimeSlotActionThunk,
} from "../../store/timesSlot/timeSlot.actions.async";
import TRootState from "../../store/root.types";
import { warningToast } from "../../components/toast/toast";
import { TAddTimeSlotPayload } from "../../store/timesSlot/timeSlot.types";

interface createMoreSlotData {
  [name: string]: string;
  startTime: string;
  endTime: string;
}

const TimeSlot: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const state = history?.location?.state as { page: string };

  const [page, setPage] = useState(Number(state?.page) || 1);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [searchSlot, setSearchSlot] = useState<string | null>(null);
  const [createMoreSlot, setCreateMoreSlot] = useState<createMoreSlotData[]>([
    {
      startTime: "",
      endTime: "",
    },
  ]);

  const timeSlotList = useSelector(
    (state: TRootState) => state.timeSlot.timeSlotList
  );
  const itemsPerPage = useSelector(
    (state: TRootState) => state.pagination.perPageItems
  );

  /**
   * slot state update on onChange method
   * @param index
   * @param name
   * @param value
   */
  const addSlotData = (index: number, name: string, value: string) => {
    const updatedMoreSlot = [...createMoreSlot];
    updatedMoreSlot[index][name] = value;
    setCreateMoreSlot(updatedMoreSlot);
  };

  /**
   * add new slot function
   */
  const slotData = {
    startTime: "",
    endTime: "",
  };

  const addMoreSlotHandler = () => {
    setCreateMoreSlot([...createMoreSlot, slotData]);
  };

  /**
   * delete slot function
   * @param id
   * @returns
   */
  const deleteMoreSlotHandler = (id: number) => {
    const updatedMoreSlot = [...createMoreSlot];
    if (updatedMoreSlot.length === 1) return;
    updatedMoreSlot.splice(id, 1);
    setCreateMoreSlot(updatedMoreSlot);
  };

  /**
   * convert to 00 hours
   */
  const formatTime00: TAddTimeSlotPayload = [];

  (createMoreSlot || []).forEach((time) => {
    formatTime00.push({
      startTime: moment(time.startTime, "HHmmss").format("HH:mm:ss"),
      endTime: moment(time.endTime, "HHmmss").format("HH:mm:ss"),
    });
  });

  /**
   * find same slot for start and end value
   */
  const sameTime: string[] = [];
  const sameFn = () => {
    (createMoreSlot || []).forEach((time, i: number) => {
      if (
        createMoreSlot[i].startTime === createMoreSlot[i].endTime &&
        createMoreSlot[i] &&
        createMoreSlot[i].startTime !== "" &&
        createMoreSlot[i].endTime !== ""
      ) {
        sameTime.push(createMoreSlot[i].startTime);
      }
    });
  };

  /**
   * find empty slot for start or end value
   */
  const emptySlot: object[] = [];
  const emptyFn = () => {
    (createMoreSlot || []).forEach((time, i: number) => {
      if (
        createMoreSlot[i].startTime === "" ||
        createMoreSlot[i].endTime === ""
      ) {
        emptySlot.push({
          startTime: createMoreSlot[i].startTime,
          endTime: createMoreSlot[i].endTime,
        });
      }
    });
  };

  /**
   * find existing slot
   */
  const existingSlot: object[] = [];
  const existingFn = () => {
    for (let n = 0; n < (formatTime00 || []).length; n++) {
      const newSlot = formatTime00[n];
      for (let o = 0; o < (timeSlotList?.timeSlots || []).length; o++) {
        const oldSlot = (timeSlotList?.timeSlots || [])[o];
        if (
          newSlot.startTime === oldSlot.startTime &&
          newSlot.endTime === oldSlot?.endTime
        ) {
          existingSlot.push(newSlot);
        }
      }
    }
  };

  /**
   * add slot submit function
   * @param e
   */
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sameFn();
    emptyFn();
    existingFn();
    if (emptySlot.length > 0) {
      warningToast("This field is required.");
    } else if (sameTime.length > 0) {
      warningToast("Please enter valid slot.");
    } else if (existingSlot.length > 0) {
      warningToast("Time slot already exists.");
    } else {
      dispatch(
        addTimeSlotActionThunk(
          formatTime00,
          Number(state?.page) || 1,
          itemsPerPage
        )
      );
      setCreateMoreSlot([
        {
          startTime: "",
          endTime: "",
        },
      ]);
      setShowAddSlot(false);
    }
  };

  /**
   * pagination get time slots thunk dispatch
   **/
  const fetchSlots = (pages?: number) => {
    dispatch(
      getTimeSlotActionThunk(searchSlot || null, pages || page, itemsPerPage)
    );
  };

  return (
    <React.Fragment>
      <div id="app">
        <Sidebar />
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Time Slots</h1>
                </div>
                <div className="m-l-10">
                  <div className="input-group w-250">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      title="Search"
                      value={searchSlot || ""}
                      onChange={(e) => setSearchSlot(e.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          fetchSlots();
                        }
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="input-group-text pointer"
                        onClick={() => fetchSlots()}
                      >
                        <span className="fa fa-search"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      history.push(history.location.pathname, {
                        page: "1",
                      });
                      setPage(1);
                      setSearchSlot(null);
                      dispatch(
                        getTimeSlotActionThunk(null, page, itemsPerPage)
                      );
                    }}
                  >
                    Reset
                  </button>
                </div>
                <div className="m-l-10">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowAddSlot(true)}
                  >
                    Add New Time Slot
                  </button>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card">
                <div className="card-body p-0">
                  <Pagination
                    ItemsComponent={TimeSlotList}
                    pageCount={timeSlotList ? timeSlotList.count : 1}
                    dispatchAction={fetchSlots}
                    page={page}
                    setPage={setPage}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Modal
        centered
        scrollable
        className="timeslot-modal"
        show={showAddSlot}
        // onHide={() => setShowAddSlot(false)}
      >
        <Modal.Header>
          <h4 className="modal-title">Add New Time Slot</h4>
          <button className="close" onClick={() => setShowAddSlot(false)}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <form onSubmit={submitHandler}>
          <Modal.Body>
            {createMoreSlot?.map((data, index) => {
              return (
                <div className="form-row" key={index}>
                  <div className="col-md-5">
                    <div className="form-group">
                      <label className="control-label">
                        Start Time <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        value={data.startTime}
                        className="form-control"
                        onChange={(e) =>
                          addSlotData(
                            index,
                            "startTime",
                            moment(e.target.value, "HHmmss").format("HH:mm")
                          )
                        }
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
                        value={data.endTime}
                        className="form-control"
                        onChange={(e) => {
                          addSlotData(
                            index,
                            "endTime",
                            moment(e.target.value, "HHmmss").format("HH:mm")
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label className="control-label d-block">&nbsp;</label>
                      <button
                        type="button"
                        className="btn btn-danger removebtn px-3"
                        onClick={() => deleteMoreSlotHandler(index)}
                      >
                        <i className="fa fa-trash-alt text-white"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className="btn btn-dark btn-sm"
              onClick={addMoreSlotHandler}
            >
              <i className="fa fa-plus text-white"></i> Add more
            </button>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowAddSlot(false)}
            >
              Close
            </button>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default TimeSlot;

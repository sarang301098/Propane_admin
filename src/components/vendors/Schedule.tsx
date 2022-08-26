import React from "react";
import _ from "lodash";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import moment from "moment";

interface Prop {
  selectedTimeSlots: {
    timeSlot: {
      id: null | number;
      startTime: string;
      endTime: string;
    } | null;
    maxAcceptOrderLimit: number;
    id?: number | null;
    day: number;
    status?: number;
    isChecked: boolean;
  }[];
  setSelectedTimeSlots: Function;
  day: number;
}
const Schedule: React.FC<Prop> = ({
  selectedTimeSlots,
  setSelectedTimeSlots,
  day,
}) => {
  const timeSlotsData = useSelector(
    (state: TRootState) => state.timeSlot.timeSlotList.timeSlots
  );

  /**
   * steps:
   *  1) If slotIdis -1 then return.
   *  2) Make a copy of selectedTimeSlots.
   *  3) Find the index where day and simeSlotId matches.
   *  4) If index > -1 then update the element in array by index.
   *  5) If index = -1 then insert an element in an array.
   * @param slotId
   * @param value
   * @returns
   */
  const handleChange = (slotId: number, value: string) => {
    if (slotId === -1) return;
    const updatedSlots = selectedTimeSlots && _.cloneDeep(selectedTimeSlots);
    const updateSlotIndex = updatedSlots.findIndex(
      (slot) => slot?.timeSlot?.id === slotId && slot?.day === day
    );
    if (updateSlotIndex > -1) {
      updatedSlots[updateSlotIndex]["maxAcceptOrderLimit"] = Number(value);
      updatedSlots[updateSlotIndex]["isChecked"] = true;
    } else {
      updatedSlots.push({
        isChecked: true,
        day,
        maxAcceptOrderLimit: Number(value),
        timeSlot: timeSlotsData?.find((slot) => slot?.id === slotId) || null,
      });
    }
    setSelectedTimeSlots(updatedSlots);
  };

  /**
   * steps:
   *  1) Make a copy of selectedTimeSlots
   *  2) Find the index where day and simeSlotId matches.
   *  3) If index = -1 and checked = true, insert element in array
   *  3) Else update isChecked value.
   * @param e
   * @param timeSlotId
   */
  const handleCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    timeSlotId: number | null
  ) => {
    const { checked } = e.target;
    const selectedSlotDataClone = selectedTimeSlots && [...selectedTimeSlots];

    const slotIndex = selectedSlotDataClone?.findIndex(
      (slot) => slot?.timeSlot?.id === timeSlotId && slot?.day === day
    );

    if (slotIndex === -1 && checked) {
      selectedSlotDataClone?.push({
        maxAcceptOrderLimit: 0,
        timeSlot:
          timeSlotsData?.find((slot) => slot?.id === timeSlotId) || null,
        day,
        isChecked: checked,
      });
    } else {
      selectedSlotDataClone[slotIndex] = {
        ...selectedSlotDataClone[slotIndex],
        isChecked: checked,
      };
    }

    setSelectedTimeSlots && setSelectedTimeSlots(selectedSlotDataClone);
  };
  return (
    <div className="tab-pane fadeIn active" id="tab-62">
      <div className="card-body">
        <div className="row">
          <div className="col-lg-12 col-xl-8">
            <div className="form-row">
              {timeSlotsData?.map((slots, index) => {
                return (
                  <div className="col-md-6 mb-4" key={index}>
                    <div className="d-flex align-items-center">
                      <label
                        className="control control-outline control-primary control--checkbox m-0"
                        htmlFor={String(index)}
                      >
                        {" "}
                        {slots?.startTime && slots?.endTime
                          ? `${moment(slots.startTime, "hh:mm").format(
                              "hh:mm A"
                            )} - ${moment(slots.endTime, "hh:mm").format(
                              "hh:mm A"
                            )}`
                          : "-"}
                        <input
                          type="checkbox"
                          id={String(index)}
                          checked={
                            selectedTimeSlots.findIndex(
                              (slot) =>
                                slot?.timeSlot?.id === slots?.id &&
                                slot?.day === day &&
                                slot?.isChecked
                            ) > -1
                          }
                          onChange={(e) => {
                            handleCheck(e, slots?.id);
                          }}
                        />
                        <div className="control__indicator"></div>
                      </label>
                      <div className="w-75 ml-3">
                        <input
                          type="text"
                          className="form-control"
                          value={
                            selectedTimeSlots.findIndex(
                              (innerSlot) =>
                                innerSlot?.timeSlot?.id === slots?.id ||
                                innerSlot?.day === day
                            ) > -1
                              ? selectedTimeSlots[
                                  selectedTimeSlots.findIndex(
                                    (innerSlot) =>
                                      innerSlot?.timeSlot?.id === slots?.id &&
                                      innerSlot?.day === day
                                  )
                                ]?.maxAcceptOrderLimit
                              : ""
                          }
                          onChange={(e) =>
                            handleChange(slots?.id || -1, e.target.value)
                          }
                        />
                      </div>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip01`}>Accept Max. Orders</Tooltip>
                        }
                      >
                        <i className="fa fa-info-circle ml-2"></i>
                      </OverlayTrigger>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <label className="text-info">
          <strong className="d-block mb-1">Note:</strong>
          <ol className="m-0 pl-3">
            <li>
              {" "}
              If you put blank value in the system, we will consider default
              value=0.
            </li>
            <li>Above Timeslots comes from Timeslots Module.</li>
          </ol>
        </label>
      </div>
    </div>
  );
};

export default Schedule;

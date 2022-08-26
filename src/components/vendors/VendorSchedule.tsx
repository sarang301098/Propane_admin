/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TRootState from "../../store/root.types";
import { updateVendorActionThunk } from "../../store/vendor/vendor.action.async";
import Schedule from "./Schedule";
import { BarsLoader } from "../../components/loader/Loader";
interface Prop {
  setTabValue: Function;
  tabValue: number;
}
const VendorSchedule: React.FC<Prop> = ({ setTabValue, tabValue }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const timeSlotsData = useSelector(
    (state: TRootState) => state.timeSlot.timeSlotList.timeSlots
  );
  const vendorSchedule = useSelector(
    (state: TRootState) =>
      state?.vendor?.singleVendorData?.vendor?.vendorSchecules
  );
  const { loading } = useSelector((state: TRootState) => state?.vendor);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState(
    vendorSchedule || []
  );
  const [, setCheckAll] = useState(
    selectedTimeSlots?.length === timeSlotsData?.length * 7
  );
  const { vendorId } = useParams<{ vendorId: string }>();
  const [tabInnerValue, setTabInnerValue] = useState(61);

  /**
   * steps:
   *  1) Create an array of 7 elements.(For 7 Days)
   *  2) Insert all the values in an array for all timeslots.
   *  3) If the day and timeslot id already exists in an array then set the maxAcceptOrder by finding the index of that element.
   *  4) At last flat the array.
   * @param check
   */
  const selectAll = (check: boolean) => {
    const slots = Array.from(Array(7).keys()).map((day) =>
      timeSlotsData.map((slot) => ({
        ...slot,
        id: vendorSchedule?.find(
          (schedule) =>
            schedule?.day === day + 1 && schedule?.timeSlot?.id === slot.id
        )?.id,
        timeSlot: { ...slot },
        day: day + 1,
        isChecked: check,
        maxAcceptOrderLimit:
          selectedTimeSlots.findIndex(
            (innerSlot) =>
              innerSlot?.timeSlot?.id === slot?.id && innerSlot?.day === day + 1
          ) > -1
            ? selectedTimeSlots[
                selectedTimeSlots.findIndex(
                  (innerSlot) =>
                    innerSlot?.timeSlot?.id === slot?.id &&
                    innerSlot?.day === day + 1
                )
              ]["maxAcceptOrderLimit"]
            : 0,
      }))
    );

    setSelectedTimeSlots(_.flatten(slots));
  };

  const checkDifference = (
    vendorSchedule: {
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
    }[],
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
    }[]
  ) => {
    const changedSchedule = [];
    for (let index = 0; index < (selectedTimeSlots?.length || 0); index++) {
      const oldData = (vendorSchedule && vendorSchedule[index]) || [];
      const newData = selectedTimeSlots[index] || [];
      if (
        oldData?.isChecked !== newData?.isChecked ||
        oldData?.maxAcceptOrderLimit !== newData?.maxAcceptOrderLimit
      ) {
        changedSchedule.push({
          id: newData?.id,
          day: newData?.day,
          maxAcceptOrderLimit: newData?.maxAcceptOrderLimit,
          isChecked: newData?.isChecked,
          timeslotId: newData?.timeSlot?.id,
        });
      }
    }
    return changedSchedule;
  };

  useEffect(() => {
    if (vendorSchedule) {
      setSelectedTimeSlots(vendorSchedule);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendorSchedule]);

  return (
    <div className="tab-pane fadeIn active" id="tab-6">
      <ul className="actions top-right inner-tab minus-tab">
        <li>
          <button
            className="btn btn-success btn-sm"
            onClick={(event) => {
              event.preventDefault();
              // const check = !checkAll;
              setCheckAll(
                selectedTimeSlots?.filter(
                  (slots) => slots?.isChecked && slots?.timeSlot
                )?.length ===
                  timeSlotsData?.length * 7
              );
              selectAll(
                !(
                  selectedTimeSlots?.filter(
                    (slots) => slots?.isChecked && slots?.timeSlot
                  )?.length ===
                  timeSlotsData?.length * 7
                )
              );
            }}
          >
            {selectedTimeSlots?.filter(
              (slots) => slots?.isChecked && slots?.timeSlot
            )?.length ===
            timeSlotsData?.length * 7
              ? "Unselect All"
              : "Select All"}
          </button>
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id={`tooltip01`}>
                If you select all then all days timeslots are selected.
              </Tooltip>
            }
          >
            <i className="fa fa-info-circle ml-2"></i>
          </OverlayTrigger>
        </li>
      </ul>
      <div className="card-header clearfix ">
        <ul className="nav nav-tabs primary-tabs">
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(61)}
              className={
                tabValue === 5 && tabInnerValue === 61
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Monday
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(62)}
              className={
                tabValue === 5 && tabInnerValue === 62
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Tuesday
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(63)}
              className={
                tabValue === 5 && tabInnerValue === 63
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Wednesday
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(64)}
              className={
                tabValue === 5 && tabInnerValue === 64
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Thursday
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(65)}
              className={
                tabValue === 5 && tabInnerValue === 65
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Friday
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(66)}
              className={
                tabValue === 5 && tabInnerValue === 66
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Saturday
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue(67)}
              className={
                tabValue === 5 && tabInnerValue === 67
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Sunday
            </a>
          </li>
        </ul>
      </div>
      {loading ? (
        <BarsLoader />
      ) : (
        <div className="tab-content">
          {tabValue === 5 && tabInnerValue === 61 ? (
            <Schedule
              day={1}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
          {tabValue === 5 && tabInnerValue === 62 ? (
            <Schedule
              day={2}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
          {tabValue === 5 && tabInnerValue === 63 ? (
            <Schedule
              day={3}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
          {tabValue === 5 && tabInnerValue === 64 ? (
            <Schedule
              day={4}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
          {tabValue === 5 && tabInnerValue === 65 ? (
            <Schedule
              day={5}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
          {tabValue === 5 && tabInnerValue === 66 ? (
            <Schedule
              day={6}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
          {tabValue === 5 && tabInnerValue === 67 ? (
            <Schedule
              day={7}
              selectedTimeSlots={selectedTimeSlots}
              setSelectedTimeSlots={setSelectedTimeSlots}
            />
          ) : null}
        </div>
      )}
      <div className="card-footer bg-light text-right">
        <button
          type="button"
          className="btn btn-secondary clear-form mr-2"
          onClick={() => {
            setTabValue(4);
            history.push(history?.location?.pathname, { tab: 4 });
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={async () => {
            const changedSchedule = await checkDifference(
              vendorSchedule || [],
              selectedTimeSlots
            );
            dispatch(
              updateVendorActionThunk(
                {
                  schedule: changedSchedule,
                  currentTab: 5,
                  allData: selectedTimeSlots,
                },
                vendorId,
                () => {
                  setTabValue(6);
                  history.push(history?.location?.pathname, { tab: 6 });
                }
              )
            );
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VendorSchedule;

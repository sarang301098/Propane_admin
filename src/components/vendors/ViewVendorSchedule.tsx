/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VendorsView from "../../pages/vendors/view";
import { getTimeSlotActionThunk } from "../../store/timesSlot/timeSlot.actions.async";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";

interface Prop {
  schedule: {
    maxAcceptOrderLimit: number;
    id?: number | null;
    day: number;
    status?: number;
    isChecked: boolean;
    timeSlot: {
      startTime: string;
      endTime: string;
    } | null;
  }[];
}

const ShowVendorSchedule: React.FC<Prop> = ({ schedule }) => {
  return (
    <div className="tab-pane fadeIn active" id="tab-91">
      <div className="table-responsive">
        <table className="table m-0">
          <thead>
            <tr>
              <th className="w-200">Time Slot</th>
              <th className="text-center">Accept Max. Order</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {schedule?.length > 0 ? (
              schedule?.map((schedule, index) => (
                <tr key={index}>
                  <td>
                    {schedule?.timeSlot?.startTime &&
                    schedule?.timeSlot?.endTime
                      ? `${moment(
                          schedule?.timeSlot?.startTime,
                          "hh:mm"
                        ).format("hh:mm A")} To ${moment(
                          schedule?.timeSlot?.endTime,
                          "hh:mm"
                        ).format("hh:mm A")}`
                      : "-"}
                  </td>
                  <td className="text-center">
                    {schedule?.maxAcceptOrderLimit &&
                    schedule?.maxAcceptOrderLimit > -1
                      ? schedule?.maxAcceptOrderLimit
                      : "-"}
                  </td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No timeslots available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ViewVendorSchedule = () => {
  const [tabInnerValue, setTabInnerValue] = useState(1);
  const { loading } = useSelector((state: TRootState) => state?.vendor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTimeSlotActionThunk(null, 0, 0, false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VendorsView>
      {(singleVendorData) =>
        loading ? (
          <BarsLoader />
        ) : (
          <div className="tab-pane fadeIn active" id="tab-9">
            <div className="card-header clearfix ">
              <ul className="nav nav-tabs primary-tabs">
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(1)}
                    className={
                      tabInnerValue === 1 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Monday
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(2)}
                    className={
                      tabInnerValue === 2 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Tuesday
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(3)}
                    className={
                      tabInnerValue === 3 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Wednesday
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(4)}
                    className={
                      tabInnerValue === 4 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Thursday
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(5)}
                    className={
                      tabInnerValue === 5 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Friday
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(6)}
                    className={
                      tabInnerValue === 6 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Saturday
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    onClick={() => setTabInnerValue(7)}
                    className={
                      tabInnerValue === 7 ? "nav-link active show" : "nav-link"
                    }
                  >
                    Sunday
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              {tabInnerValue === 1 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 1
                    ) || []
                  }
                />
              ) : null}
              {tabInnerValue === 2 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 2
                    ) || []
                  }
                />
              ) : null}
              {tabInnerValue === 3 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 3
                    ) || []
                  }
                />
              ) : null}
              {tabInnerValue === 4 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 4
                    ) || []
                  }
                />
              ) : null}
              {tabInnerValue === 5 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 5
                    ) || []
                  }
                />
              ) : null}
              {tabInnerValue === 6 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 6
                    ) || []
                  }
                />
              ) : null}
              {tabInnerValue === 7 ? (
                <ShowVendorSchedule
                  schedule={
                    singleVendorData?.vendor?.vendorSchecules?.filter(
                      (schedule) => schedule?.day === 7
                    ) || []
                  }
                />
              ) : null}
            </div>
          </div>
        )
      }
    </VendorsView>
  );
};

export default ViewVendorSchedule;

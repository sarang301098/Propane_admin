import { ActionType } from "typesafe-actions";
import * as actions from "./timeSlot.action";

type TTimeSlotState = {
  loading: boolean;
  timeSlotList: {
    count: number;
    timeSlots: {
      id: number | null;
      startTime: string;
      endTime: string;
    }[];
  };
};

type TGetTimeSlotPayload = {
  count: number;
  timeSlots: {
    id: number | null;
    startTime: string;
    endTime: string;
  }[];
};

type TAddTimeSlotPayload = {
  startTime: string;
  endTime: string;
}[];

type TEditTimeSlotPayload = {
  startTime: string;
  endTime: string;
};

type TTimeSlotActionType = ActionType<typeof actions>;

export {
  TTimeSlotState,
  TGetTimeSlotPayload,
  TAddTimeSlotPayload,
  TEditTimeSlotPayload,
  TTimeSlotActionType,
};

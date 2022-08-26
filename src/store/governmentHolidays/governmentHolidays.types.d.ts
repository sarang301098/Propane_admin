import { ActionType } from "typesafe-actions";
import * as actions from "./earning.action";

type THolidayPayload = {
  id: number | string;
  description: string;
  vendorIds: (string | number)[];
  date: string;
  status: number;
};
type THolidayState = {
  holidayData: { count: number; holidays: THolidayPayload[] };
  loading: boolean;
  vendorsData: { count: number; vendor: { id: string; fullName: string }[] };
};

type THolidayActionType = ActionType<typeof actions>;

export { THolidayPayload, THolidayState, THolidayActionType };

import { ActionType } from "typesafe-actions";
import * as actions from "./appSettings.action";

type TAppSettingsState = {
  loading: boolean;
  appSettingsFuel: TGetAppSettingsPayload;
  appSettingsExchange: TGetAppSettingsPayload;
  appSettingsGeneral: TGetAppSettingsPayload;
};

type TGetAppSettingsPayload = {
  id: number;
  isActive: boolean;
  value: number;
  orderType: number;
  key: string | null;
  label: string;
}[];

type TUpdateAppSettingsPayload = {
  appSettings: {
    id: number;
    isActive: boolean;
    value: number;
  }[];
};

type TAppSettingsActionType = ActionType<typeof actions>;

export { TAppSettingsState, TGetAppSettingsPayload, TUpdateAppSettingsPayload, TAppSettingsActionType };

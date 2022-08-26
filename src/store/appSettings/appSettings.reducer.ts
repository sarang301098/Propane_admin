import AppSettingsActionTypeEnum from "./appSettings.enum";
import { TAppSettingsActionType, TAppSettingsState } from "./appSettings.types";

const INITIAL_STATE: TAppSettingsState = {
  loading: false,
  appSettingsFuel: [],
  appSettingsExchange: [],
  appSettingsGeneral: [],
};

const appSettingsReducer = (state = INITIAL_STATE, action: TAppSettingsActionType): TAppSettingsState => {
  switch (action.type) {
    case AppSettingsActionTypeEnum.APP_SETTING_PENDING:
      return { ...state, loading: true };

    case AppSettingsActionTypeEnum.APP_SETTING_LOADED:
      return { ...state, loading: false };

    case AppSettingsActionTypeEnum.GET_APP_SETTING:
      return {
        ...state,
        loading: false,
        appSettingsFuel: (action.payload || []).filter((fuel) => fuel.orderType === 1),
        appSettingsExchange: (action.payload || []).filter((fuel) => fuel.orderType === 2),
        appSettingsGeneral: (action.payload || []).filter((fuel) => fuel.orderType === null),
      };

    case AppSettingsActionTypeEnum.UPDATE_APP_SETTING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default appSettingsReducer;

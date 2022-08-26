import SubAdminTypeEnum from "./subAdmin.enum";
import { TSubAdminPayload, TSubAdminState } from "./subAdmin.types";
const ininitialState: TSubAdminState = {
  subAdminData: { count: 0, subAdmin: [] },
  loading: false,
  singleSubAdminData: { roleId: "" },
  allRoles: { count: 0, roles: [] },
};
const subAdminReducer = (state = ininitialState, action: any) => {
  switch (action.type) {
    case SubAdminTypeEnum.GET_SUB_ADMIN_PENDING:
      return { ...state, loading: true };

    case SubAdminTypeEnum.GET_SUB_ADMIN_SUCCESS:
      return { ...state, loading: false, subAdminData: action.payload };

    case SubAdminTypeEnum.GET_SUB_ADMIN_FAILED:
      return { ...state, loading: false };

    case SubAdminTypeEnum.GET_ALL_ROLES_PENDING:
      return { ...state, loading: true };

    case SubAdminTypeEnum.GET_ALL_ROLES_SUCCESS:
      return { ...state, loading: false, allRoles: action.payload };

    case SubAdminTypeEnum.GET_ALL_ROLES_FAILED:
      return { ...state, loading: false };

    case SubAdminTypeEnum.GET_SUB_ADMIN_BY_ID_PENDING:
      return { ...state, loading: true };

    case SubAdminTypeEnum.GET_SUB_ADMIN_BY_ID_SUCCESS:
      return {
        ...state,
        singleSubAdminData: { roleId: action.payload },
        loading: false,
      };

    case SubAdminTypeEnum.GET_SUB_ADMIN_BY_ID_FAILED:
      return { ...state, loading: false };

    case SubAdminTypeEnum.ADD_SUB_ADMIN_PENDING:
      return { ...state, loading: false };

    case SubAdminTypeEnum.ADD_SUB_ADMIN_SUCCESS:
      let newSubAdmin: TSubAdminPayload[] = [...state.subAdminData.subAdmin];
      if (state.subAdminData.subAdmin.length < action.payload.itemsPerPage) {
        newSubAdmin.push(action.payload.subAdminData);
      }
      return {
        ...state,
        loading: false,
        subAdminData: {
          count: state.subAdminData.count + 1,
          subAdmin: newSubAdmin,
        },
      };
    case SubAdminTypeEnum.UPDATE_SUB_ADMIN_PENDING:
      return { ...state, loading: true };

    case SubAdminTypeEnum.UPDATE_SUB_ADMIN_SUCCESS:
      const updatedSubAdmin = [...state.subAdminData.subAdmin];
      const updatedSubAdminId = updatedSubAdmin.findIndex(
        (subAdmin) => subAdmin.id === action.payload.id
      );
      if (updatedSubAdminId > -1) {
        updatedSubAdmin[updatedSubAdminId]["isActive"] = action.payload.status;
        updatedSubAdmin[updatedSubAdminId]["countryCode"] =
          action.payload.countryCode;
        updatedSubAdmin[updatedSubAdminId]["mobileNumber"] =
          action.payload.mobileNumber;
        updatedSubAdmin[updatedSubAdminId]["email"] = action.payload.email;
        updatedSubAdmin[updatedSubAdminId]["fullName"] =
          action.payload.fullName;
      }
      return {
        ...state,
        subAdminData: { ...state.subAdminData, subAdmin: updatedSubAdmin },
        loading: false,
      };

    case SubAdminTypeEnum.UPDATE_SUB_ADMIN_FAILED:
      return { ...state, loading: false };

    case SubAdminTypeEnum.DELETE_SUB_ADMIN_PENDING:
      return { ...state, loading: true };

    case SubAdminTypeEnum.DELETE_SUB_ADMIN_SUCCESS:
      const subAdminData = [...state.subAdminData.subAdmin];
      const subAdminId = subAdminData.findIndex(
        (subAdmin) => subAdmin.id === action.payload
      );
      if (subAdminId > -1) {
        subAdminData.splice(subAdminId, 1);
      }
      return {
        ...state,
        loading: false,
        subAdminData: {
          ...state.subAdminData,
          subAdmin: subAdminData,
          count: state.subAdminData.count - 1,
        },
      };

    case SubAdminTypeEnum.DELTE_SUB_ADMIN_FAILED:
      return { ...state, loading: false };

    case SubAdminTypeEnum.UPDATE_SUB_ADMIN_STATUS_PENDING:
      return { ...state, laoding: true };

    case SubAdminTypeEnum.UPDATE_SUB_ADMIN_STATUS_SUCCESS:
      const updateSubAdminStatus = [...state.subAdminData.subAdmin];
      const updatedSubAdminStatusId = updateSubAdminStatus.findIndex(
        (subAdmin) => subAdmin.id === action.payload.id
      );
      if (updatedSubAdminStatusId > -1) {
        updateSubAdminStatus[updatedSubAdminStatusId]["isActive"] =
          action.payload.isActive;
      }
      return {
        ...state,
        subAdminData: {
          ...state.subAdminData,
          subAdmin: updateSubAdminStatus,
        },
        laoding: false,
      };

    case SubAdminTypeEnum.UPDATE_SUB_ADMIN_STATUS_FAILED:
      return { ...state, laoding: true };

    default:
      return state;
  }
};
export default subAdminReducer;

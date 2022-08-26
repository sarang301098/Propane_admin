import { ActionType } from "typesafe-actions";
import * as actions from "./earning.action";

type TSubAdminPayload = {
  status: boolean;
  countryCode: string;
  mobileNumber: number;
  email: string;
  fullName: string;
  id: string | number;
  isActive: boolean;
};

type TAllRolesPayload = {
  count: number;
  roles: {
    id: string | number;
    name: string;
  }[];
};

type TSingleSubAdminPayload = {
  roleId: string | number;
};

type TSubAdminState = {
  subAdminData: { count: number; subAdmin: TSubAdminPayload[] };
  loading: boolean;
  singleSubAdminData: {
    roleId: string | number;
  };
  allRoles: TAllRolesPayload;
};

type TSubAdminActionType = ActionType<typeof actions>;

export {
  TSubAdminState,
  TSubAdminPayload,
  TSubAdminActionType,
  TSingleSubAdminPayload,
};

import * as actions from "./dashboard.action.creator";
import { ActionType } from "typesafe-actions";

type TRolesAndPermissionPayload = {};

type TModulesPayload = {};

type TRolesAndPermissionState = {
  loading: boolean;
  modulesData: {
    count: number;
    modules: { id: number; name: string; parentId: number; child?: any[] }[];
  };
  rolesData: {
    count: number;
    roles: {
      createdAt: string;
      createdBy: string;
      deletedAt: string;
      id: number;
      isActive: boolean;
      name: string;
      updatedAt: string;
      updatedBy: string;
    }[];
  };
  singleRolesData: Partial<{
    id: string;
    isActive: boolean;
    name: string;
    permissions: {
      all: boolean;
      index: boolean;
      add: boolean;
      edit: boolean;
      view: boolean;
      delete: boolean;
      id?: number;
      module: { id: number; name: string; parentId: number; child?: any[] };
    }[];
    [];
  }>;
};

type TRolesPayload = {
  name: string;
  isActive: boolean;
  permissions: Record<
    string,
    {
      all: boolean;
      index: boolean;
      add: boolean;
      edit: boolean;
      view: boolean;
      delete: boolean;
    }
  >[];
};
type TRolesAndPermissionActionTypes = ActionType<typeof actions>;

export {
  TRolesAndPermissionPayload,
  TRolesAndPermissionState,
  TRolesAndPermissionActionTypes,
  TModulesPayload,
  TRolesPayload,
};

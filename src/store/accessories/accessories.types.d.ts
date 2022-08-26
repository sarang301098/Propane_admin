import { ActionType } from "typesafe-actions";

type TAccessoriesPayload = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  status: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  createdBy: string;
  updatedBy: string;
};

type TAccessoriesState = {
  loading: boolean;
  accessoriesData: { count: number; accessories: AccessoriesPayload[] };
};

type TAccessoriesActionType = ActionType<typeof actions>;

export { TAccessoriesState, TAccessoriesPayload, TAccessoriesActionType };

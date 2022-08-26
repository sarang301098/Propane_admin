import { action } from "typesafe-actions";
import AccessoriesActionTypeEnum from "./accessories.enum";
import { TAccessoriesPayload } from "./accessories.types";

/**
 * Get accessories pending action creator
 * @returns
 */
const getAccessoriesPending = () =>
  action(AccessoriesActionTypeEnum.GET_ACCESSORIES_PENDING);

/**
 * Get accessories success action creator
 * @param payload
 * @returns
 */
const getAccessoriesSuccess = (payload: {
  count: number;
  accessoriesData: TAccessoriesPayload[];
}) => action(AccessoriesActionTypeEnum.GET_ACCESSORIES_SUCCESS, payload);

/**
 * Get accessories failed action creator
 * @returns
 */
const gerAccessoriesFailed = () =>
  action(AccessoriesActionTypeEnum.GET_ACCESSORIES_FAILED);

/**
 * Add accessories pending action creator
 * @returns
 */
const addAccessoriesPending = () =>
  action(AccessoriesActionTypeEnum.ADD_ACCESSORIES_PENDING);

/**
 * Add acccessories success action creator
 * @param payload
 * @returns
 */
const addAccessoriesSuccess = (payload: {
  accessory: TAccessoriesPayload;
  itemsPerpage: number;
}) => action(AccessoriesActionTypeEnum.ADD_ACCESSORIES_SUCCESS, payload);

/**
 * Add accessories failed action creator
 * @returns
 */
const addAccessoriesFailed = () =>
  action(AccessoriesActionTypeEnum.ADD_ACCESSORIES_FAILED);

/**
 * Update accessories success action creator
 * @param payload
 * @returns
 */
const updateAccessoriesSuccess = (payload: {
  accessoryId: number;
  accessoryDetails: {
    name: string;
    image: string;
    price: number;
    description: string;
  };
}) => action(AccessoriesActionTypeEnum.UPDATE_ACCESSORIES_SUCCESS, payload);

/**
 * Update accessories failed action creator
 * @returns
 */
const updateAccessoriesFailed = () =>
  action(AccessoriesActionTypeEnum.UPDATE_ACCESSORIES_FAILED);

/**
 * Update accessories pending action creator
 * @returns
 */
const updateAccessoriesPending = () =>
  action(AccessoriesActionTypeEnum.UPDATE_ACCESSORIES_PENDING);

/**
 * Delete accessories pending action creator
 * @returns
 */
const deleteAccessoriesPending = () =>
  action(AccessoriesActionTypeEnum.DELETE_ACCESSORIES_PENDING);

/**
 * Delete accessories failed action creator
 * @returns
 */
const deleteAccessoriesFailed = () =>
  action(AccessoriesActionTypeEnum.DELETE_ACCESSORIES_FAILED);

/**
 * Delete acessories success action creator
 * @param payload
 * @returns
 */
const deleteAccessoriesSuccess = (payload: {
  id: number;
  getAction: Function | undefined;
}) => action(AccessoriesActionTypeEnum.DELETE_ACCESSORIES_SUCCESS, payload);

export {
  getAccessoriesPending,
  getAccessoriesSuccess,
  gerAccessoriesFailed,
  addAccessoriesPending,
  addAccessoriesSuccess,
  addAccessoriesFailed,
  updateAccessoriesSuccess,
  updateAccessoriesFailed,
  updateAccessoriesPending,
  deleteAccessoriesPending,
  deleteAccessoriesFailed,
  deleteAccessoriesSuccess,
};

import { action } from "typesafe-actions";
import CylinderSizeTypeEnum from "./cylinderSize.enum";
import { TCylinderSizePayload } from "./cylinderSize.types";

/**
 * Get cylinder size pending action creator
 * @returns
 */
const getCylinderSizePending = () =>
  action(CylinderSizeTypeEnum.GET_CYLINDER_SIZE_PENDING);

/**
 * Get cylinder size success action creator
 * @param payload
 * @returns
 */
const getCylinderSizeSuccess = (payload: {
  cylinderSizeData: TCylinderSizePayload[];
}) => action(CylinderSizeTypeEnum.GET_CYLINDER_SIZE_SUCCESS, payload);

/**
 * Get cylinder size failed action creator
 * @returns
 */
const getCylinderSizeFailed = () =>
  action(CylinderSizeTypeEnum.GET_CYLINDER_SIZE_FAILED);

/**
 * Update cylinder pending action creator
 * @returns
 */
const updateCylinderSizePending = () =>
  action(CylinderSizeTypeEnum.UPDATE_CYLINDER_SIZE_PENDING);

/**
 * Update cylnder size success action creator
 * @returns
 */
const updateCylinderSizeSuccess = (payload: {
  id: number;
  cylinderSize: number;
}) => action(CylinderSizeTypeEnum.UPDATE_CYLINDER_SIZE_SUCCESS, payload);

/**
 * Update cylinder size failed action creator
 * @returns
 */
const updateCylinderSizeFailed = () =>
  action(CylinderSizeTypeEnum.UPDATE_CYLINDER_SIZE_FAILED);

/**
 * Delete cylinder size pending action creator
 * @returns
 */
const deleteCylinderSizePending = () =>
  action(CylinderSizeTypeEnum.DELETE_CYLINDER_SIZE_PENDING);

/**
 * Delete cylinder size success action creator
 * @returns
 */
const deleteCylinderSizeSucess = (payload: {
  id: number;
  getAction: Function | undefined;
}) => action(CylinderSizeTypeEnum.DELETE_CYLINDER_SIZE_SUCCESS, payload);

/**
 * Delete cylinder size failed action creator
 * @returns
 */

const deleteCylinderSizeFailed = () =>
  action(CylinderSizeTypeEnum.DELETE_CYLINDER_SIZE_FAILED);

/**
 * Add cylinder size pending action creator
 * @returns
 */
const addCylinderSizePending = () =>
  action(CylinderSizeTypeEnum.ADD_CYLINDER_SIZE_PENDING);

/**
 * Add cylinder size success action creator
 * @returns
 */
const addCylinderSizeSuccess = (payload: {
  cylinderSize: TCylinderSizePayload;
  itemsPerPage: number;
}) => action(CylinderSizeTypeEnum.ADD_CYLINDER_SIZE_SUCCESS, payload);

/**
 * Add cylinder size failed action creator
 * @returns
 */
const addCylinderSizeFailed = () =>
  action(CylinderSizeTypeEnum.ADD_CYLINDER_SIZE_FAILED);

export {
  getCylinderSizePending,
  getCylinderSizeSuccess,
  getCylinderSizeFailed,
  updateCylinderSizePending,
  updateCylinderSizeSuccess,
  updateCylinderSizeFailed,
  deleteCylinderSizePending,
  deleteCylinderSizeSucess,
  deleteCylinderSizeFailed,
  addCylinderSizePending,
  addCylinderSizeSuccess,
  addCylinderSizeFailed,
};

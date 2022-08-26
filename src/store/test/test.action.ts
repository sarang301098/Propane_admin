import { action } from "typesafe-actions";
import TestActionTypeEnum from "./test.enum";
import { TTestPayload } from "./test.types";

/**
 * test pending action creator
 * @returns
 */
const testSuccess = () => action(TestActionTypeEnum.SUCCESS);

/**
 * test pending action creator
 * @returns
 */
const testPending = () => action(TestActionTypeEnum.PENDING);

/**
 * test action creator
 * @param testData
 * @returns
 */
const test = (testData: TTestPayload) =>
  action(TestActionTypeEnum.TEST, testData);

export { test, testPending, testSuccess };

import { action } from "typesafe-actions";
import MembershipPlansActionTypeEnum from "./membershipPlans.enum";

/**
 * membership plan loading action creator
 * @returns
 */
const membershipPlansLoadingAction = () => action(MembershipPlansActionTypeEnum.MEMBERSHIP_PLANS_LOADING);

/**
 * membership plan loaded action creator
 * @returns
 */
const membershipPlansLoadedAction = () => action(MembershipPlansActionTypeEnum.MEMBERSHIP_PLANS_LOADED);

/**
 * get membership plan action creator
 * @param membershipPlansList
 * @returns
 */
const getMembershipPlansAction = (membershipPlansList: any) =>
  action(MembershipPlansActionTypeEnum.GET_MEMBERSHIP_PLANS, membershipPlansList);

/**
 * get membership plan by id action creator
 * @returns
 */
const getMembershipPlansByIdAction = (membershipPlansById: any) =>
  action(MembershipPlansActionTypeEnum.GET_MEMBERSHIP_PLANS_BY_ID, membershipPlansById);

/**
 * edit membership plan action creator
 * @returns
 */
const editMembershipPlansAction = () => action(MembershipPlansActionTypeEnum.EDIT_MEMBERSHIP_PLANS);

/**
 * edit fuel membership plan status action creator
 * @param values
 * @returns
 */
const editMembershipFuelPlansStatusAction = (values: { id: number; isActive: boolean }) =>
  action(MembershipPlansActionTypeEnum.EDIT_FUEL_MEMBERSHIP_STATUS, values);

/**
 * edit tank membership plan status action creator
 * @param values
 * @returns
 */
const editMembershipTankPlansStatusAction = (values: { id: number; isActive: boolean }) =>
  action(MembershipPlansActionTypeEnum.EDIT_TANK_MEMBERSHIP_STATUS, values);

const getPlanIdAction = (planId: number | null) => action(MembershipPlansActionTypeEnum.GET_PLAN_ID, planId);

export {
  membershipPlansLoadingAction,
  membershipPlansLoadedAction,
  getMembershipPlansAction,
  getMembershipPlansByIdAction,
  editMembershipPlansAction,
  editMembershipFuelPlansStatusAction,
  editMembershipTankPlansStatusAction,
  getPlanIdAction,
};

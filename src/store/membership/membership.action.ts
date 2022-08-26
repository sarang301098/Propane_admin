import { action } from "typesafe-actions";
import MembershipActionTypeEnum from "./membership.enum";
import { TGetMembershipPayload } from "./membership.types";

/**
 * membership loading action creator
 * @returns
 */
const membershipLoadingAction = () =>
  action(MembershipActionTypeEnum.MEMBERSHIP_LOADING);

/**
 * membership loaded action creator
 * @returns
 */
const membershipLoadedAction = () =>
  action(MembershipActionTypeEnum.MEMBERSHIP_LOADED);

/**
 * get membership action creator
 * @param membershipList
 * @returns
 */
const getMembershipAction = (membershipList: TGetMembershipPayload) =>
  action(MembershipActionTypeEnum.GET_MEMBERSHIP, membershipList);

/**
 * edit membership action creator
 * @returns
 */
const editMembershipAction = () =>
  action(MembershipActionTypeEnum.EDIT_MEMBERSHIP);

/**
 * delete membership action creator
 * @returns
 */
const deleteMembershipAction = () =>
  action(MembershipActionTypeEnum.DELETE_MEMBERSHIP);

export {
  membershipLoadingAction,
  membershipLoadedAction,
  getMembershipAction,
  editMembershipAction,
  deleteMembershipAction,
};

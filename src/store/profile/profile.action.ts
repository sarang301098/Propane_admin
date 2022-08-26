import { action } from "typesafe-actions";

import ProfileActionTypeEnum from "./profile.enum";
import { TGetProfilePayload } from "./profile.types";

/**
 * profile loading action creator
 * @returns
 */
const profileLoadingAction = () =>
  action(ProfileActionTypeEnum.PROFILE_LOADING);

/**
 * profile loaded action creator
 * @returns
 */
const profileLoadedAction = () => action(ProfileActionTypeEnum.PROFILE_LOADED);

/**
 * get profile action creator
 * @param profileData
 * @returns
 */
const getProfileAction = (profileData: TGetProfilePayload) =>
  action(ProfileActionTypeEnum.GET_PROFILE, profileData);

/**
 * edit profile action creator
 * @returns
 */
const editProfileAction = () => action(ProfileActionTypeEnum.EDIT_PROFILE);

export {
  profileLoadingAction,
  profileLoadedAction,
  getProfileAction,
  editProfileAction,
};

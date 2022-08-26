import { ActionType } from "typesafe-actions";
import * as actions from "./customer.action";

type TCmsPagePayload = {
	id: number;
	name: string;
	userType: string;
	content: string;
	key: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: null | string;
	createdBy: string;
	updatedBy: string;
};

type TCmsPagesState = {
	cmsPageList: { count: number; cmsPages: TCmsPagePayload[] };
	singleCmsPage: TCmsPagePayload | null;
	loading: boolean;
};

type TCmsPagesActionType = ActionType<typeof actions>;

export { TCmsPagesActionType, TCmsPagesState, TCmsPagePayload };

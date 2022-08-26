import { ActionType } from "typesafe-actions";

type TCategoryPayload = {
	id: number;
	name: string;
	orderType: number;
	status: 2;
	createdAt: string;
	updatedAt: string;
	deletedAt: null | string;
	createdBy: null | string;
	updatedBy: null | string;
	isActive: boolean;
};

type TCategoryState = {
	loading: boolean;
	categories: { count: number; categories: TCategoryPayload[] };
};

type TCateoryActionTypes = ActionType<typeof actions>;

export { TCategoryPayload, TCategoryState, TCateoryActionTypes };

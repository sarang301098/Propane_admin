import { ActionType } from "typesafe-actions";
import * as actions from "./emailTemplate.action";

type TEmailTemplatePayload = {
	id: number;
	subject: string;
	template: string;
	key: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
	deletedAt: null | string;
};

type TEmailTemplateState = {
	loading: boolean;
	emailTemplateList: { count: number; emailTemplates: TEmailTemplatePayload[] };
	singleEmailTemplate: TEmailTemplatePayload | null;
};

type TEmailTemplateActionTypes = ActionType<typeof actions>;

export {
	TEmailTemplatePayload,
	TEmailTemplateState,
	TEmailTemplateActionTypes,
};

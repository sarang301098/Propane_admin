import EmailTemplateTypeEnum from "./emailTemplate.enum";
import {
	TEmailTemplateState,
	TEmailTemplateActionTypes,
} from "./emailTemplate.types";

const initialState: TEmailTemplateState = {
	loading: false,
	emailTemplateList: { count: 0, emailTemplates: [] },
	singleEmailTemplate: null,
};

const emailTemplateReducer = (
	state = initialState,
	action: TEmailTemplateActionTypes
): TEmailTemplateState => {
	switch (action.type) {
		case EmailTemplateTypeEnum.GET_EMAIL_TEMPLATE_PENDING:
			return {
				...state,
				loading: true,
			};
		case EmailTemplateTypeEnum.GET_EMAIL_TEMPLATE_SUCCESS:
			return {
				...state,
				emailTemplateList: action.payload,
				loading: false,
			};
		case EmailTemplateTypeEnum.GET_EMAIL_TEMPLATE_FAILED:
			return {
				...state,
				loading: false,
			};
		case EmailTemplateTypeEnum.GET_SINGLE_EMAIL_TEMPLATE_SUCCESS:
			return {
				...state,
				loading: false,
				singleEmailTemplate: action.payload,
			};
		case EmailTemplateTypeEnum.GET_SINGLE_EMAIL_TEMPLATE_PENDING:
			return {
				...state,
				loading: true,
				singleEmailTemplate: null,
			};
		case EmailTemplateTypeEnum.GET_SINGLE_EMAIL_TEMPLATE_FAILED:
			return {
				...state,
				loading: false,
			};
		case EmailTemplateTypeEnum.UPDATE_EMAIL_TEMPLATE_PENDING:
			return {
				...state,
				loading: true,
			};
		case EmailTemplateTypeEnum.UPDATE_EMAIL_TEMPLATE_SUCCESS:
			const updatedTemplates = [...state.emailTemplateList.emailTemplates];
			const id = updatedTemplates.findIndex(
				(state) => state.id === Number(action.payload.templateId)
			);
			if (id > -1) {
				updatedTemplates[id]["template"] = action.payload.data;
				updatedTemplates[id]["subject"] = action.payload.name;
			}
			return {
				...state,
				loading: false,
				emailTemplateList: {
					...state.emailTemplateList,
					emailTemplates: updatedTemplates,
				},
			};
		default:
			return state;
	}
};

export default emailTemplateReducer;

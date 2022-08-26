import CmsActionTypeEnum from "./cms.enum";
import { TCmsPagesActionType, TCmsPagesState } from "./cms.types";

const initialState: TCmsPagesState = {
	cmsPageList: { count: 0, cmsPages: [] },
	loading: false,
	singleCmsPage: null,
};

const cmsReducer = (
	state = initialState,
	action: TCmsPagesActionType
): TCmsPagesState => {
	switch (action.type) {
		case CmsActionTypeEnum.GET_CMS_PENDING:
			return {
				...state,
				loading: true,
			};

		case CmsActionTypeEnum.GET_CMS_SUCCESS:
			return {
				...state,
				cmsPageList: action.payload,
				loading: false,
			};

		case CmsActionTypeEnum.GET_CMS_FAILED:
			return {
				...state,
				loading: false,
			};
		case CmsActionTypeEnum.GET_SINGLE_CMS_SUCCESS:
			return {
				...state,
				loading: false,
				singleCmsPage: action.payload,
			};
		case CmsActionTypeEnum.GET_SINGLE_CMS_PENDING:
			return {
				...state,
				loading: true,
				singleCmsPage: null,
			};
		case CmsActionTypeEnum.GET_SINGLE_CMS_FAILED:
			return {
				...state,
				loading: false,
			};
		case CmsActionTypeEnum.UPDATE_CMS_PENDING:
			return {
				...state,
				loading: true,
			};
		case CmsActionTypeEnum.UPDATE_CMS_SUCCESS:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};

export default cmsReducer;

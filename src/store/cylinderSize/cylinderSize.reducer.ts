import CylinderSizeTypeEnum from "./cylinderSize.enum";
import {
  TCylinderSizeActionType,
  TCylinderSizePayload,
  TCylinderSizeState,
} from "./cylinderSize.types";

const INITIAL_STATE: TCylinderSizeState = {
  loading: false,
  cylinderSizeData: { count: 0, cylinderSizes: [] },
};

const cylinderSizeReducer = (
  state = INITIAL_STATE,
  action: TCylinderSizeActionType
): TCylinderSizeState => {
  switch (action.type) {
    case CylinderSizeTypeEnum.GET_CYLINDER_SIZE_PENDING:
      return { ...state, loading: true };

    case CylinderSizeTypeEnum.GET_CYLINDER_SIZE_SUCCESS:
      return { ...state, loading: false, cylinderSizeData: action.payload };

    case CylinderSizeTypeEnum.GET_CYLINDER_SIZE_FAILED:
      return { ...state, loading: false };

    case CylinderSizeTypeEnum.UPDATE_CYLINDER_SIZE_PENDING:
      return { ...state, loading: true };

    case CylinderSizeTypeEnum.UPDATE_CYLINDER_SIZE_SUCCESS:
      const updatedCylinderSize = [...state.cylinderSizeData.cylinderSizes];
      const id = updatedCylinderSize.findIndex(
        (state) => state.id === Number(action.payload.id)
      );
      updatedCylinderSize[id]["cylinderSize"] = action.payload.cylinderSize;
      return {
        ...state,
        loading: false,
        cylinderSizeData: {
          ...state.cylinderSizeData,
          cylinderSizes: updatedCylinderSize,
        },
      };

    case CylinderSizeTypeEnum.UPDATE_CYLINDER_SIZE_FAILED:
      return { ...state, loading: false };

    case CylinderSizeTypeEnum.DELETE_CYLINDER_SIZE_PENDING:
      return { ...state, loading: true };

    case CylinderSizeTypeEnum.DELETE_CYLINDER_SIZE_SUCCESS:
      const deleteCylinderSize = [...state.cylinderSizeData.cylinderSizes];
      const deleteId = deleteCylinderSize.findIndex(
        (state) => state.id === Number(action.payload.id)
      );
      if (deleteId > -1) {
        deleteCylinderSize.splice(deleteId, 1);
      }
      return {
        ...state,
        loading: action.payload.getAction ? true : false,
        cylinderSizeData: {
          count: state.cylinderSizeData.count - 1,
          cylinderSizes: deleteCylinderSize,
        },
      };

    case CylinderSizeTypeEnum.DELETE_CYLINDER_SIZE_FAILED:
      return { ...state, loading: false };

    case CylinderSizeTypeEnum.ADD_CYLINDER_SIZE_PENDING:
      return { ...state, loading: true };

    case CylinderSizeTypeEnum.ADD_CYLINDER_SIZE_SUCCESS:
      let newCylinderSizes: TCylinderSizePayload[] = [
        ...state.cylinderSizeData.cylinderSizes,
      ];
      if (
        state.cylinderSizeData.cylinderSizes.length <
        action.payload.itemsPerPage
      ) {
        newCylinderSizes.push(action.payload.cylinderSize);
      }
      return {
        ...state,
        loading: false,
        cylinderSizeData: {
          ...state?.cylinderSizeData,
          count: state?.cylinderSizeData?.count + 1,
          cylinderSizes: newCylinderSizes,
        },
      };

    case CylinderSizeTypeEnum.ADD_CYLINDER_SIZE_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default cylinderSizeReducer;

import AccessoriesActionTypeEnum from "./accessories.enum";
import { TAccessoriesState, TAccessoriesActionType } from "./accessories.types";

const initialState: TAccessoriesState = {
  loading: false,
  accessoriesData: { count: 0, accessories: [] },
};

const accessoriesReducer = (
  state = initialState,
  action: TAccessoriesActionType
): TAccessoriesState => {
  switch (action.type) {
    case AccessoriesActionTypeEnum.GET_ACCESSORIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case AccessoriesActionTypeEnum.GET_ACCESSORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        accessoriesData: action.payload,
      };
    case AccessoriesActionTypeEnum.GET_ACCESSORIES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case AccessoriesActionTypeEnum.ADD_ACCESSORIES_PENDING:
      return {
        ...state,
        loading: true,
      };

    case AccessoriesActionTypeEnum.ADD_ACCESSORIES_SUCCESS:
      const addAccessories = [...state?.accessoriesData?.accessories];
      if (
        state?.accessoriesData?.accessories?.length <
        action.payload.itemsPerpage
      ) {
        addAccessories.push(action.payload.accessory);
      }
      return {
        ...state,
        loading: false,
        accessoriesData: {
          count: state.accessoriesData.count + 1,
          accessories: addAccessories,
        },
      };

    case AccessoriesActionTypeEnum.ADD_ACCESSORIES_FAILED:
      return {
        ...state,
        loading: false,
      };
    case AccessoriesActionTypeEnum.UPDATE_ACCESSORIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case AccessoriesActionTypeEnum.UPDATE_ACCESSORIES_FAILED:
      return {
        ...state,
        loading: false,
      };
    case AccessoriesActionTypeEnum.UPDATE_ACCESSORIES_SUCCESS:
      const updateAccessory = [...state.accessoriesData.accessories];
      const accessoryId = updateAccessory.findIndex(
        (state) => state.id === Number(action.payload.accessoryId)
      );
      updateAccessory[accessoryId]["name"] =
        action.payload.accessoryDetails.name;
      updateAccessory[accessoryId]["price"] =
        action.payload.accessoryDetails.price;
      updateAccessory[accessoryId]["description"] =
        action.payload.accessoryDetails.description;
      updateAccessory[accessoryId]["image"] =
        action.payload.accessoryDetails.image;
      return {
        ...state,
        loading: false,
        accessoriesData: {
          ...state.accessoriesData,
          accessories: updateAccessory,
        },
      };
    case AccessoriesActionTypeEnum.DELETE_ACCESSORIES_PENDING:
      return {
        ...state,
        loading: true,
      };

    case AccessoriesActionTypeEnum.DELETE_ACCESSORIES_FAILED:
      return {
        ...state,
        loading: false,
      };

    case AccessoriesActionTypeEnum.DELETE_ACCESSORIES_SUCCESS:
      const deleteAccessory = [...state.accessoriesData.accessories];
      const id = deleteAccessory.findIndex(
        (state) => state.id === Number(action.payload?.id)
      );
      if (id > -1) {
        deleteAccessory.splice(id, 1);
      }
      return {
        ...state,
        loading: action?.payload?.getAction ? true : false,
        accessoriesData: {
          count: state.accessoriesData.count - 1,
          accessories: deleteAccessory,
        },
      };
    default:
      return state;
  }
};

export default accessoriesReducer;

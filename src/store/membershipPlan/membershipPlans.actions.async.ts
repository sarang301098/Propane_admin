import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { RouteComponentProps } from "react-router-dom";

import {
  membershipPlansLoadingAction,
  membershipPlansLoadedAction,
  getMembershipPlansAction,
  editMembershipPlansAction,
  getMembershipPlansByIdAction,
  editMembershipFuelPlansStatusAction,
  editMembershipTankPlansStatusAction,
} from "./membershipPlans.action";
import { errorToast, successToast } from "../../components/toast/toast";
import * as requestFromServer from "../../services/membership-plans/membershipPlansService";

/*
    you can replace this implementation with whatever api call using axios or fetch etc 
    replace ThunkAction<void, {}, {}, AnyAction> by  replace ThunkAction<Promise<void>, {}, {}, AnyAction>
*/

/**
 * get membership plans thunk
 * @returns
 */
export const getMembershipPlansActionThunk = (
  searchPlan?: string | null,
  planStatus?: boolean | null
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipPlansLoadingAction());

    // const getAsyncData = async () => {
    //   try {
    //     const response = await requestFromServer.getMemberShipPlanAPI(searchPlan, planStatus);
    //     dispatch(getMembershipPlansAction(response.data));
    //   } catch (error: any) {
    //     dispatch(membershipPlansLoadedAction());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   }
    // };
    // getAsyncData();

    requestFromServer
      .getMemberShipPlanAPI(searchPlan, planStatus)
      .then((response) => {
        dispatch(getMembershipPlansAction(response.data));
      })
      .catch((error) => {
        dispatch(membershipPlansLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * get membership plans by id thunk
 * @param id
 * @returns
 */
export const getMembershipPlansByIdActionThunk = (
  id: number | null,
  history?: RouteComponentProps["history"],
  rout?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipPlansLoadingAction());

    const getAsyncData = async () => {
      try {
        const response = await requestFromServer.getMemberShipPlanAByIdAPI(id);
        dispatch(getMembershipPlansByIdAction(response.data?.membershipPlan));

        if (response.status === 200) {
          history?.push(`/settings/membership-plans/${rout}/${id}/edit`);
        }
      } catch (error: any) {
        dispatch(membershipPlansLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      }
    };
    getAsyncData();

    // requestFromServer
    //   .getMemberShipPlanAByIdAPI(id)
    //   .then(async (response) => {
    //     await dispatch(getMembershipPlansByIdAction(response.data?.membershipPlan));
    //     if (response.status === 200) {
    //       history?.push(`/settings/membership-plans/${rout}/${id}/edit`);
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(membershipPlansLoadedAction());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   });
  };
};

/**
 * edit membership plan thunk
 * @param values
 * @returns
 */
export const editMembershipPlansActionThunk = (
  values: Record<string, any>,
  history?: RouteComponentProps["history"],
  rout?: string
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipPlansLoadingAction());

    const getAsyncData = async () => {
      try {
        const response = await requestFromServer.editMembershipPlanAPI(values);

        dispatch(editMembershipPlansAction());
        successToast("Membership plan updated successfully.");

        if (response.status === 204) {
          // dispatch(getMembershipPlansByIdActionThunk(values?.membershipPlan?.id));
          history?.push(`/settings/membership-plans/${rout}`);
        }
      } catch (error: any) {
        dispatch(membershipPlansLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      }
    };
    getAsyncData();

    // requestFromServer
    //   .editMembershipPlanAPI(values)
    //   .then(async (response) => {
    //     await dispatch(editMembershipPlansAction());
    //     successToast("Membership plan updated successfully.");
    //     if (response.status === 204) {
    //       history?.push(`/settings/membership-plans/${rout}`);
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(membershipPlansLoadedAction());
    //     if (error.response && error.response.data) {
    //       errorToast(error.response.data.message);
    //     } else {
    //       errorToast("Something went wrong.");
    //     }
    //   });
  };
};

/**
 * edit membership fuel plan thunk
 * @param values
 * @returns
 */
export const editMembershipFuelPlansStatusActionThunk = (
  values: Record<string, any>
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipPlansLoadingAction());

    requestFromServer
      .editMembershipPlanAPI(values)
      .then(() => {
        dispatch(
          editMembershipFuelPlansStatusAction({
            id: values.membershipPlan.id,
            isActive: values.membershipPlan.isActive,
          })
        );
        successToast("Membership status updated successfully.");
      })
      .catch((error) => {
        dispatch(membershipPlansLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

/**
 * edit membership tank plan thunk
 * @param values
 * @returns
 */
export const editMembershipTankPlansStatusActionThunk = (
  values: Record<string, any>
): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(membershipPlansLoadingAction());

    requestFromServer
      .editMembershipPlanAPI(values)
      .then(() => {
        dispatch(
          editMembershipTankPlansStatusAction({
            id: values.membershipPlan.id,
            isActive: values.membershipPlan.isActive,
          })
        );
        successToast("Membership status updated successfully.");
      })
      .catch((error) => {
        dispatch(membershipPlansLoadedAction());
        if (error.response && error.response.data) {
          errorToast(error.response.data.message);
        } else {
          errorToast("Something went wrong.");
        }
      });
  };
};

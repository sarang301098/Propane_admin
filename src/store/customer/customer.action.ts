import { action } from "typesafe-actions";
import CustomerActionTypeEnum from "./customer.enum";
import { TCustomerPayload, TCustomerOrdersFuel, TCustomerOrdersTank, TAllCustomers } from "./customer.types";

/**
 * customers loading action creator
 * @returns
 */
const customersLoadingAction = () => action(CustomerActionTypeEnum.CUSTOMER_LOADING);

/**
 * customers loaded action creator
 * @returns
 */
const customersLoadedAction = () => action(CustomerActionTypeEnum.CUSTOMER_LOADED);

/**
 *  get customers  action creator
 * @returns
 */
const getCustomersAction = (payload: TCustomerPayload) =>
  action(CustomerActionTypeEnum.GET_CUSTOMER, payload);

/**
 * get customer id action creator
 * @param customerId
 * @returns
 */
const getCustomerIdAction = (customerId: string | number) =>
  action(CustomerActionTypeEnum.CUSTOMER_ID, customerId);

/**
 * update customer status action creator
 * @param values
 * @returns
 */
const updateCustomersAction = (values: { id: string | number; isActive: boolean }) =>
  action(CustomerActionTypeEnum.UPDATE_CUSTOMER_STATUS, values);

/**
 * get customer byy id action creator
 * @param values
 * @returns
 */
const getCustomersByIdAction = (values: {
  isActive: boolean;
  profileImage: any;
  id: string;
  fullName: string;
  countryCode: string;
  mobileNumber: string;
  email: string;
  createdAt: string;
  orders: number;
  subscription:
    | {
        id: string;
        startDate: string;
        endDate: string;
        membershipPlan: { name: string };
      }[]
    | [];
}) => action(CustomerActionTypeEnum.GET_CUSTOMER_BY_ID, values);

/**
 * get customer fuel delivery orders action creator
 * @param customerFuelOrders
 * @returns
 */
const getCustomerOrderFuelAction = (customerFuelOrders: TCustomerOrdersFuel) =>
  action(CustomerActionTypeEnum.GET_CUSTOMER_ORDERS_FUEL, customerFuelOrders);

/**
 * get customer propane tank orders action creator
 * @param customerTankOrders
 * @returns
 */
const getCustomerOrderTankAction = (customerTankOrders: TCustomerOrdersTank) =>
  action(CustomerActionTypeEnum.GET_CUSTOMER_ORDERS_TANK, customerTankOrders);

const getAllCustomersAction = (payload: TAllCustomers) =>
  action(CustomerActionTypeEnum.GET_ALL_CUSTOMERS, payload);

/**
 * delete customers
 * @returns
 */
const deleteCustomersAction = () => action(CustomerActionTypeEnum.DELETE_CUSTOMERS);

export {
  customersLoadingAction,
  customersLoadedAction,
  getCustomersAction,
  getCustomerIdAction,
  updateCustomersAction,
  getCustomerOrderFuelAction,
  getCustomerOrderTankAction,
  getAllCustomersAction,
  getCustomersByIdAction,
  deleteCustomersAction,
};

import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { BarsLoader } from "../../../components/loader/Loader";
import TRootState from "../../../store/root.types";
import CustomersView from "./view";

const ViewCustomersMembershipDetails = () => {
  const customersById = useSelector((state: TRootState) => state.customer.customerById);
  const loading = useSelector((state: TRootState) => state.customer.loading);

  return (
    <CustomersView>
      <div className="tab-pane fadeIn active" id="tab-2">
        <div className="card-body pb-0 border-bottom">
          <div className="row">
            <div className="col-lg-12 col-xl-10">
              <ul className="list-unstyled text-left row mb-0">
                <li className="mb-3 col-md-6">
                  <label className="text-muted mb-1">Membership </label>
                  <br />
                  <span className="text-info">
                    {customersById && customersById.subscription?.length > 0 ? "Paid" : "Free"}{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <h4 className="mt-2 mb-3">Purchased History</h4>
        </div>
        <div className="table-responsive">
          <table className="table m-0">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Purchased Date</th>
                <th className="text-center">Days Left</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    <BarsLoader />
                  </td>
                </tr>
              ) : customersById && customersById?.subscription.length > 0 ? (
                customersById?.subscription.map((plan) => (
                  <tr key={plan.id}>
                    <td>{plan.membershipPlan?.name}</td>
                    <td>{moment(plan.startDate).format("DD/MM/YYYY")}</td>
                    <td className="text-center">{moment(plan.endDate).diff(moment(new Date()), "days")}</td>
                    <td>{moment(plan.endDate).format("DD/MM/YYYY")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No Plans available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CustomersView>
  );
};

export default ViewCustomersMembershipDetails;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";

import FuelDeliveryPlansList from "./fuel-delivery-plans-list";
import MemberShipPlanList from "./list";
import { getMembershipPlansActionThunk } from "../../store/membershipPlan/membershipPlans.actions.async";

const SelectStatus = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const FuelDeliveryPlans = () => {
  const dispatch = useDispatch();

  const [searchPlan, setSearchPlan] = useState<string | null>(null);
  const [planStatus, setPlanStatus] = useState<string | null>("All");

  /**
   * get all membership plan
   */
  const fetchMembershipPlans = () => {
    dispatch(
      getMembershipPlansActionThunk(
        searchPlan || null,
        planStatus === "All" ? null : planStatus === "Active" ? true : false
      )
    );
  };

  useEffect(() => {
    fetchMembershipPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MemberShipPlanList>
      <div className="tab-pane fadeIn active" id="tab-1">
        <div className="p-3 d-flex justify-content-end inner-filter">
          <div className="m-l-10">
            <div className="input-group w-250">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                title="Search"
                value={searchPlan || ""}
                onChange={(e) => setSearchPlan(e.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    fetchMembershipPlans();
                  }
                }}
              />
              <div className="input-group-append">
                <button type="button" className="input-group-text pointer" onClick={fetchMembershipPlans}>
                  <span className="fa fa-search"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="m-l-10">
            <Select
              className="custom-select-dropdown w-150"
              value={
                planStatus
                  ? (SelectStatus || []).find((prod) => prod.value === planStatus) || null
                  : { value: null, label: "All" }
              }
              onChange={(val) => setPlanStatus(val && val.value)}
              placeholder="-- Status --"
              options={SelectStatus || []}
            />
          </div>
          <div className="m-l-10">
            <button type="button" className="btn btn-dark" onClick={fetchMembershipPlans}>
              Submit
            </button>
          </div>
          <div className="m-l-10">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchPlan(null);
                setPlanStatus("All");
                dispatch(getMembershipPlansActionThunk(null, null));
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <FuelDeliveryPlansList />
      </div>
    </MemberShipPlanList>
  );
};

export default FuelDeliveryPlans;

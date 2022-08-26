import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import User from "../../assets/img/user.jpg";
import { BarsLoader } from "../../components/loader/Loader";
import TRootState from "../../store/root.types";

const FreelanceDriversList = () => {
  const freelanceDriversList = useSelector((state: TRootState) => state.drivers.freelanceDriversPaymentList);
  const loading = useSelector((state: TRootState) => state.drivers.loading);

  const [showPayNow, setShowPayNow] = useState(false);
  const [payment, setPayment] = useState<number | string>("");
  const [payError, setPayError] = useState("");

  const paymentHandler = () => {
    if (Number(payment) <= 0) {
      setPayError("Please enter valid value");
    } else {
      // dispatch(freelanceDriverPayActionThunk(+payment))
      setShowPayNow(false);
      setPayError("");
    }
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th>Freelance Driver Name</th>
              <th className="text-center">Completed Orders</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
              <th>Remaining Amount</th>
              <th className="table-field-status text-left">Status</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            ) : freelanceDriversList?.drivers && freelanceDriversList?.drivers?.length > 0 ? (
              freelanceDriversList?.drivers.map((pay) => (
                <tr key={pay?.user_id}>
                  <td>
                    <div className="media">
                      <img
                        className="align-self-center m-r-10 w-40 h-40 rounded-circle o-cover"
                        src={User}
                        alt=""
                      />
                      <div className="media-body">
                        <h6 className="mt-1 mb-0">{pay?.user_full_name}</h6>
                        <span className="text-muted">
                          {pay?.user_country_code} {pay?.user_mobile_number}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    {Number(pay?.completedOrder) > 0 ? (
                      <Link
                        to={{
                          pathname: `/drivers/${pay?.user_id}/completed-orders`,
                          state: { completedOrders: "completed" },
                        }}
                      >
                        <span className="badge badge-light">{pay?.completedOrder}</span>
                      </Link>
                    ) : (
                      // <Link
                      //   to={{
                      //     pathname: `/drivers/${pay?.user_id}/completed-orders`,
                      //     state: { completedOrders: "completed" },
                      //   }}
                      // >
                      <span className="text-center">-</span>
                      // <span className="badge badge-light">-</span>
                      // </Link>
                    )}
                  </td>
                  <td>
                    {Number(pay?.TotalAmount) > 0
                      ? `$${Number(pay?.TotalAmount)?.toFixed(2)}`
                      : `$${Number(pay?.TotalAmount)?.toFixed(2)}`}
                  </td>
                  <td>
                    {Number(pay?.paidAmount) > 0
                      ? `$${Number(pay?.paidAmount)?.toFixed(2)}`
                      : `$${Number(pay?.paidAmount)?.toFixed(2)}`}
                  </td>
                  <td>${Number(pay?.remainingAmounts)?.toFixed(2)}</td>
                  <td className="table-field-status text-left">
                    {Number(pay?.remainingAmounts) === 0 ? (
                      <span className="badge badge-pill badge-success">Paid</span>
                    ) : (
                      <span className="badge badge-pill badge-warning">Pending</span>
                    )}
                  </td>
                  {Number(pay?.remainingAmounts) === 0 ? (
                    <td className="table-field-actions">-</td>
                  ) : (
                    <td className="table-field-actions">
                      <button
                        type="button"
                        className="btn btn-success btn-outline btn-sm add-money-btn"
                        onClick={() => setShowPayNow(true)}
                      >
                        Pay Now
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No Drivers available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal centered show={showPayNow}>
        <Modal.Header>
          <h4 className="modal-title">Pay Now</h4>
          <button className="close" onClick={() => setShowPayNow(false)}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Amount <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              />
            </div>
            <span className="text-danger">{payment <= 0 ? payError : null}</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" type="button" onClick={() => setShowPayNow(false)}>
            Cancel
          </button>
          <button className="btn btn-primary" type="button" onClick={paymentHandler}>
            Pay
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FreelanceDriversList;

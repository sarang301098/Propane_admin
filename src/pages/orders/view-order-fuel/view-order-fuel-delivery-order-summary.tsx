import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";

import Bahrs from "../../../assets/img/bahrs.png";
import ViewOrderFuelDelivery from "./view-order-fuel-delivery";
import TRootState from "../../../store/root.types";
import { fixPrice } from "../../../utils/helpers/priceFixed";

const ViewOrderFuelDeliveryOrderSummary = () => {
  const orderById = useSelector(
    (state: TRootState) => state?.orders?.orderById
  );
  return (
    <ViewOrderFuelDelivery>
      <div className="tab-pane fadeIn active" id="tab-2">
        <div className="table-responsive">
          <table className="table table-hover nowrap m-0">
            <thead>
              <tr>
                <th>Order Type</th>
                <th>Product Name</th>
                <th className="text-center">Qty in Bulk </th>
                <th>
                  Index Price <br /> (Per Gallon)
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Vendor's Product Index Price`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Vendor Delivery Price <br /> (Per Gallon)
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Vendor's Product Vendor Delivery Price`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Sub Total
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from (Index Price + Vendor Delivery Price) * Qty in Bulk`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  PB Discount <br /> Promocode (
                  {orderById?.order?.promocodeDiscountPercentage != null &&
                  orderById?.order?.promocodeDiscountPercentage > -1
                    ? `${orderById?.order?.promocodeDiscountPercentage}%`
                    : "-"}
                  )
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Sub Total * PB Discount Promocode%`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Product Discount
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Sub Total * Product Discount%`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Delivery Fee
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from App Settings > Freelance Driver Price`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                {/* <th>
                  Schedule time-slot <br /> charged in $
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Vendor > Schedule > Timeslot > Price`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th> */}
                <th>
                  Service fee
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from App Settings > Service Fee`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Service Charge
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from App Settings > Service Charge`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Location of <br /> Where to deliver
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Location of Where to deliver Price`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Leakage Fee
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from Vendor > Add > Fees Settings > Leakage Fee`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
                <th>
                  Grand Total Amt.
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip01`}>
                        {`This Price comes from (Sub Total + Delivery Fee + Schedule time-slot charged in $ + Service Fee + Service Charge + Location of Where to deliver + Leakage Fee) - (PB Discount Promocode (5%) + Product Discount)`}
                      </Tooltip>
                    }
                  >
                    <i className="fa fa-info-circle top-1 m-l-5"></i>
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {!orderById?.order?.orderType && "-"}
                  {orderById?.order?.orderType === 1 && "Fuel Delivery"}
                </td>
                <td className="min-w-175">
                  <div className="d-flex align-items-center">
                    <img
                      className="w-40 h-40 rounded-circle o-cover mr-3"
                      src={Bahrs}
                      alt="Product Logo"
                    />{" "}
                    {orderById?.order?.product?.name || "-"}
                  </div>
                </td>
                <td className="text-center">{orderById?.order?.qty || "-"}</td>
                <td>
                  {orderById?.order?.indexPrice
                    ? `$${fixPrice(orderById?.order?.indexPrice)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.vendorDeliveryFee != null &&
                  orderById?.order?.vendorDeliveryFee > -1
                    ? `$${fixPrice(orderById?.order?.vendorDeliveryFee)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.subTotal != null &&
                  orderById?.order?.subTotal > -1
                    ? `$${fixPrice(orderById?.order?.subTotal)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.promocodeDiscountAmount != null &&
                  orderById?.order?.promocodeDiscountAmount > -1
                    ? `$${fixPrice(orderById?.order?.promocodeDiscountAmount)}`
                    : "-"}
                </td>
                <td>
                  {!(orderById?.order?.product?.details[0]?.discount == null) &&
                  orderById?.order?.product?.details[0]?.discount > -1
                    ? `${orderById?.order?.product?.details[0]?.discount}%`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.generalDeliveryFee != null &&
                  orderById?.order?.generalDeliveryFee > -1
                    ? `$${fixPrice(orderById?.order?.generalDeliveryFee)}`
                    : "-"}
                </td>
                {/* <td>$3</td> */}
                <td>
                  {orderById?.order?.order?.serviceFee != null &&
                  orderById?.order?.order?.serviceFee > -1
                    ? `$${fixPrice(orderById?.order?.order?.serviceFee)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.order?.serviceCharge != null &&
                  orderById?.order?.order?.serviceCharge > -1
                    ? `$${fixPrice(orderById?.order?.order?.serviceCharge)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.location?.price != null &&
                  orderById?.order?.location?.price > -1
                    ? `$${fixPrice(orderById?.order?.location?.price)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.leakageFee != null &&
                  orderById?.order?.leakageFee > -1
                    ? `$${fixPrice(orderById?.order?.leakageFee)}`
                    : "-"}
                </td>
                <td>
                  {orderById?.order?.grandTotal != null &&
                  orderById?.order?.grandTotal > -1
                    ? `$${fixPrice(orderById?.order?.grandTotal)}`
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ViewOrderFuelDelivery>
  );
};

export default ViewOrderFuelDeliveryOrderSummary;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";
import { BarsLoader } from "../loader/Loader";

const ViewFuelDeliveryPricingList = () => {
  const { vendorProducts } = useSelector(
    (state: TRootState) => state?.vendor?.product
  );
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);

  const [showPricingTiersModal, setShowPricingTiersModal] = useState(false);
  const [fuelProductTiers, setFuelProductTiers] = useState<
    typeof vendorProducts[0] | null
  >(null);

  const handleShowPricingTiers = () => {
    setShowPricingTiersModal(true);
  };

  const handleClosePricingTiers = () => {
    setShowPricingTiersModal(false);
  };

  return (
    <div className="table-responsive">
      <table className="table m-0">
        <thead>
          <tr>
            <td>Order Type</td>
            <td>Product</td>
            <td>
              Index Price
              <span>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip01`}>
                      {`This Price comes from Products > Added Index Price`}
                    </Tooltip>
                  }
                >
                  <i className="fa fa-info-circle top-1 m-l-5"></i>
                </OverlayTrigger>
              </span>
            </td>
            <td className="text-center">Pricing Tiers</td>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <BarsLoader />
              </td>
            </tr>
          ) : vendorProducts?.filter((product) => product?.pricing?.length)
              ?.length ? (
            vendorProducts
              ?.filter((product) => product?.pricing?.length)
              ?.map(
                (product) => (
                  // product?.pricing?.length ? (
                  <tr key={product?.id}>
                    <td>Fuel Delivery</td>
                    <td>{product?.product?.name || "-"}</td>
                    <td>
                      {product?.product?.details[0]?.indexPrice
                        ? "$" +
                          fixPrice(product?.product?.details[0]?.indexPrice)
                        : "-"}
                    </td>
                    <td className="text-center">
                      <a
                        onClick={() => {
                          handleShowPricingTiers();
                          setFuelProductTiers(product);
                        }}
                      >
                        <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                      </a>
                    </td>
                  </tr>
                )
                // ) : null
              )
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No product pricing available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        size="lg"
        centered
        show={showPricingTiersModal}
        onHide={() => handleClosePricingTiers()}
      >
        <Modal.Header>
          <h4 className="modal-title m">Pricing Tiers</h4>
          <button className="close" onClick={() => handleClosePricingTiers()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="table-responsive">
            <table className="table m-0">
              <thead>
                <tr>
                  <th>Pricing Tiers (Gallons)</th>
                  <th>
                    Index Price
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip01`}>
                          {`This Price comes from Products > Added Index Price`}
                        </Tooltip>
                      }
                    >
                      <i className="fa fa-info-circle top-1 m-l-5"></i>
                    </OverlayTrigger>
                  </th>
                  <th>Vendor Delivery Price</th>
                  <th>
                    Grand Total
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip01`}>
                          (Index Price + Vendor Delivery Price + Sales Tax
                          (7.5%))
                        </Tooltip>
                      }
                    >
                      <i className="fa fa-info-circle top-1 m-l-5"></i>
                    </OverlayTrigger>
                  </th>
                </tr>
              </thead>
              <tbody>
                {fuelProductTiers &&
                  (fuelProductTiers?.tiers || [])?.map((tier) => (
                    <tr key={tier?.id}>
                      <td>
                        {tier?.from > -1 && tier?.to
                          ? tier?.from +
                            (tier?.to < 2147483647
                              ? ` - ${tier?.to}`
                              : " or more")
                          : "-"}
                      </td>
                      <td>
                        {(fuelProductTiers?.product?.details || [])[0]
                          ?.indexPrice
                          ? "$" +
                            fixPrice(
                              (fuelProductTiers?.product?.details || [])[0]
                                ?.indexPrice
                            )
                          : "-"}
                      </td>
                      <td>
                        {fuelProductTiers?.pricing?.find(
                          (price) => price?.vendorProductTiersId === tier?.id
                        )?.price
                          ? "$" +
                            fixPrice(
                              fuelProductTiers?.pricing?.find(
                                (price) =>
                                  price?.vendorProductTiersId === tier?.id
                              )?.price || 0
                            )
                          : "-"}
                      </td>
                      <td>
                        {(fuelProductTiers?.product?.details || [])[0]
                          ?.indexPrice &&
                        fuelProductTiers?.pricing?.find(
                          (price) => price?.vendorProductTiersId === tier?.id
                        )?.price
                          ? "$" +
                            fixPrice(
                              Number(
                                (fuelProductTiers?.product?.details || [])[0]
                                  ?.indexPrice || 0
                              ) +
                                Number(
                                  fuelProductTiers?.pricing?.find(
                                    (price) =>
                                      price?.vendorProductTiersId === tier?.id
                                  )?.price || 0
                                )
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewFuelDeliveryPricingList;

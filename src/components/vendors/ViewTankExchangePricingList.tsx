/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { fixPrice } from "../../utils/helpers/priceFixed";
import { BarsLoader } from "../loader/Loader";
import { VendorProduct } from "./ProductPricing";

const ViewTankExchangePricingList = () => {
  const { product } = useSelector((state: TRootState) => state?.vendor);
  const { loading } = useSelector((state: TRootState) => state?.vendor);
  const [
    showPricingTiersPropaneTankModal,
    setShowPricingTiersPropaneTankModal,
  ] = useState(false);
  const [tabValue, setTabvalue] = useState(21);
  const [tankExchangeData, setTankExchangeData] = useState<
    Partial<VendorProduct>[]
  >([{ pricing: [] }]);
  const [tankExchangeTier, setTankExchangeTier] = useState<
    Partial<VendorProduct>
  >({});

  const handleShowPricingTiersPropaneTank = () => {
    setShowPricingTiersPropaneTankModal(true);
  };
  const handleClosePricingTiersPropaneTank = () => {
    setShowPricingTiersPropaneTankModal(false);
  };

  const { cylinderSizes } = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData
  );

  useEffect(() => {
    if (product?.count) {
      const cloneVendorProducts = _.cloneDeep(product?.vendorProducts);
      cloneVendorProducts?.map((products) => {
        if (products["pricing"]?.length === 0) {
          products["pricing"] = [{}];
        } else {
          products["isTiersSaved"] = true;
          const modifiedPrice: Record<string, any>[] = [];
          for (let price of products["pricing"]) {
            if (modifiedPrice?.length === 0) {
              modifiedPrice?.push({
                isPriceSaved: true,
                categoryId: price?.categoryId,
                cylinderSizeId: price?.cylinderSizeId,
                price: [
                  {
                    price: price?.price,
                    vendorProductTiersId: price?.vendorProductTiersId,
                    id: price?.id,
                  },
                ],
              });
            } else {
              for (let innerPrice of modifiedPrice) {
                if (
                  price?.categoryId === innerPrice?.categoryId &&
                  price?.cylinderSizeId === innerPrice?.cylinderSizeId
                ) {
                  if (innerPrice["price"]?.length) {
                    innerPrice["price"] = [
                      ...innerPrice["price"],
                      {
                        price: price?.price,
                        vendorProductTiersId: price?.vendorProductTiersId,
                        id: price?.id,
                      },
                    ];
                  } else {
                    innerPrice["price"] = [
                      {
                        price: price.price,
                        vendorProductTiersId: price?.vendorProductTiersId,
                        id: price?.id,
                      },
                    ];
                  }
                } else {
                  if (
                    modifiedPrice?.findIndex(
                      (innerPrice) =>
                        price?.categoryId === innerPrice?.categoryId &&
                        price?.cylinderSizeId === innerPrice?.cylinderSizeId
                    ) < 0
                  ) {
                    modifiedPrice?.push({
                      isPriceSaved: true,
                      categoryId: price?.categoryId,
                      cylinderSizeId: price?.cylinderSizeId,
                      price: [],
                    });
                  }
                }
              }
            }
          }
          products["pricing"] = modifiedPrice;
        }
        setTankExchangeData(cloneVendorProducts as VendorProduct[]);
        return products;
      });
    } else {
      setTankExchangeData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.count, product?.vendorProducts]);

  return (
    <div className="table-responsive">
      <table className="table m-0">
        <thead>
          <tr>
            <td>Order Type</td>
            <td>Product</td>
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
          ) : tankExchangeData?.length &&
            tankExchangeData?.filter((product) => product?.pricing?.length)
              ?.length ? (
            tankExchangeData
              ?.filter((product) => product?.pricing?.length)
              ?.map(
                (tankProduct) =>
                  tankProduct?.isTiersSaved && (
                    <tr key={tankProduct?.id}>
                      <td>Propane Tank Exchange Delivery</td>
                      <td>{tankProduct?.product?.name || "-"}</td>
                      <td className="text-center">
                        <a
                          onClick={() => {
                            handleShowPricingTiersPropaneTank();
                            setTankExchangeTier(tankProduct);
                            setTabvalue(21);
                          }}
                        >
                          <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                        </a>
                      </td>
                    </tr>
                  )
              )
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No product pricing available
              </td>
            </tr>
          )}
          {}
        </tbody>
      </table>

      <Modal
        size="lg"
        centered
        show={showPricingTiersPropaneTankModal}
        onHide={() => handleClosePricingTiersPropaneTank()}
      >
        <Modal.Header>
          <h4 className="modal-title m">Pricing Tiers</h4>
          <button
            className="close"
            onClick={() => handleClosePricingTiersPropaneTank()}
          >
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ul className="nav nav-tabs primary-tabs m-0">
            <li className="nav-item" role="presentation">
              <a
                onClick={() => setTabvalue(21)}
                className={
                  tabValue === 21 ? "nav-link active show" : "nav-link"
                }
              >
                Spare Tank
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                onClick={() => setTabvalue(22)}
                className={
                  tabValue === 22 ? "nav-link active show" : "nav-link"
                }
              >
                Exchange
              </a>
            </li>
          </ul>
          <div className="tab-content pricing-tier-modal">
            {tabValue === 21 ? (
              <div className="tab-pane fadeIn active" id="tab-21">
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th>Pricing Tiers (Tanks)</th>
                        <th>Cylinder Size</th>
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
                        {/* <th>
                          Sales Tax (7.5%)
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip01`}>
                                (Index Price + Vendor Delivery Price) * 7.5%
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-info-circle top-1 m-l-5"></i>
                          </OverlayTrigger>
                        </th> */}
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
                      {tankExchangeTier?.isTiersSaved &&
                      (tankExchangeTier?.pricing || [])?.filter(
                        (tiers) => tiers && tiers?.categoryId === 1
                      )?.length > 0 ? (
                        tankExchangeTier?.pricing
                          ?.filter((tiers) => tiers?.categoryId === 1)
                          .map((price) =>
                            price?.price?.map(
                              (innerPrice) =>
                                price?.isPriceSaved && (
                                  <tr key={innerPrice?.id}>
                                    <td>
                                      {(tankExchangeTier?.tiers?.find(
                                        (tier) =>
                                          tier?.id ===
                                          innerPrice?.vendorProductTiersId
                                      )?.from || 0) > -1 &&
                                      tankExchangeTier?.tiers?.find(
                                        (tier) =>
                                          tier?.id ===
                                          innerPrice?.vendorProductTiersId
                                      )?.to
                                        ? tankExchangeTier?.tiers?.find(
                                            (tier) =>
                                              tier?.id ===
                                              innerPrice?.vendorProductTiersId
                                          )?.from +
                                          (tankExchangeTier?.tiers?.find(
                                            (tier) =>
                                              tier?.id ===
                                              innerPrice?.vendorProductTiersId
                                          )?.to === 2147483647
                                            ? " and more"
                                            : "-" +
                                              tankExchangeTier?.tiers?.find(
                                                (tier) =>
                                                  tier?.id ===
                                                  innerPrice?.vendorProductTiersId
                                              )?.to)
                                        : "-"}
                                    </td>
                                    <td>
                                      {cylinderSizes?.find(
                                        (size) =>
                                          size?.id === price?.cylinderSizeId
                                      )?.cylinderSize
                                        ? cylinderSizes?.find(
                                            (size) =>
                                              size?.id === price?.cylinderSizeId
                                          )?.cylinderSize + " lbs"
                                        : "-"}
                                      <OverlayTrigger
                                        placement="top"
                                        overlay={
                                          <Tooltip id={`tooltip02`}>
                                            {tankExchangeTier?.product?.name}
                                          </Tooltip>
                                        }
                                      >
                                        <i className="fa fa-info-circle top-1 m-l-5"></i>
                                      </OverlayTrigger>
                                    </td>
                                    <td>
                                      {tankExchangeTier?.product?.details?.find(
                                        (category) =>
                                          category?.categoryId ===
                                          price?.categoryId
                                      )?.indexPrice
                                        ? "$" +
                                          fixPrice(
                                            tankExchangeTier?.product?.details?.find(
                                              (category) =>
                                                category?.categoryId ===
                                                price?.categoryId
                                            )?.indexPrice
                                          )
                                        : "-"}
                                    </td>
                                    <td>
                                      {innerPrice?.price
                                        ? "$" + fixPrice(innerPrice?.price)
                                        : "-"}
                                    </td>
                                    <td>
                                      {tankExchangeTier?.product?.details?.find(
                                        (category) =>
                                          category?.categoryId ===
                                          price?.categoryId
                                      )?.indexPrice &&
                                      Number(innerPrice?.price || 0)
                                        ? "$" +
                                          fixPrice(
                                            Number(
                                              tankExchangeTier?.product?.details?.find(
                                                (category) =>
                                                  category?.categoryId ===
                                                  price?.categoryId
                                              )?.indexPrice || 0
                                            ) + Number(innerPrice?.price || 0)
                                          )
                                        : "-"}
                                    </td>
                                  </tr>
                                )
                            )
                          )
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {tabValue === 22 ? (
              <div className="tab-pane fadeIn active" id="tab-22">
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th>Pricing Tiers (Tanks)</th>
                        <th>Cylinder Size</th>
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
                        {/* <th>
                          Sales Tax (7.5%)
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip01`}>
                                (Index Price + Vendor Delivery Price) * 7.5%
                              </Tooltip>
                            }
                          >
                            <i className="fa fa-info-circle top-1 m-l-5"></i>
                          </OverlayTrigger>
                        </th> */}
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
                      {tankExchangeTier?.isTiersSaved &&
                      (tankExchangeTier?.pricing || [])?.filter(
                        (tiers) => tiers && tiers?.categoryId === 2
                      )?.length > 0 ? (
                        tankExchangeTier?.pricing
                          ?.filter((tiers) => tiers?.categoryId === 2)
                          .map((price) =>
                            price?.price?.map(
                              (innerPrice) =>
                                price?.isPriceSaved && (
                                  <tr key={innerPrice?.id}>
                                    <td>
                                      {(tankExchangeTier?.tiers?.find(
                                        (tier) =>
                                          tier?.id ===
                                          innerPrice?.vendorProductTiersId
                                      )?.from || 0) > -1 &&
                                      tankExchangeTier?.tiers?.find(
                                        (tier) =>
                                          tier?.id ===
                                          innerPrice?.vendorProductTiersId
                                      )?.to
                                        ? tankExchangeTier?.tiers?.find(
                                            (tier) =>
                                              tier?.id ===
                                              innerPrice?.vendorProductTiersId
                                          )?.from +
                                          (tankExchangeTier?.tiers?.find(
                                            (tier) =>
                                              tier?.id ===
                                              innerPrice?.vendorProductTiersId
                                          )?.to === 2147483647
                                            ? " and more"
                                            : "-" +
                                              tankExchangeTier?.tiers?.find(
                                                (tier) =>
                                                  tier?.id ===
                                                  innerPrice?.vendorProductTiersId
                                              )?.to)
                                        : "-"}
                                    </td>
                                    <td>
                                      {cylinderSizes?.find(
                                        (size) =>
                                          size?.id === price?.cylinderSizeId
                                      )?.cylinderSize
                                        ? cylinderSizes?.find(
                                            (size) =>
                                              size?.id === price?.cylinderSizeId
                                          )?.cylinderSize + " lbs"
                                        : "-"}
                                      <OverlayTrigger
                                        placement="top"
                                        overlay={
                                          <Tooltip id={`tooltip02`}>
                                            {tankExchangeTier?.product?.name}
                                          </Tooltip>
                                        }
                                      >
                                        <i className="fa fa-info-circle top-1 m-l-5"></i>
                                      </OverlayTrigger>
                                    </td>
                                    <td>
                                      {tankExchangeTier?.product?.details?.find(
                                        (category) =>
                                          category?.categoryId ===
                                          price?.categoryId
                                      )?.indexPrice
                                        ? "$" +
                                          fixPrice(
                                            tankExchangeTier?.product?.details?.find(
                                              (category) =>
                                                category?.categoryId ===
                                                price?.categoryId
                                            )?.indexPrice
                                          )
                                        : "-"}
                                    </td>
                                    <td>
                                      {innerPrice?.price
                                        ? "$" + fixPrice(innerPrice?.price)
                                        : "-"}
                                    </td>
                                    <td>
                                      {tankExchangeTier?.product?.details?.find(
                                        (category) =>
                                          category?.categoryId ===
                                          price?.categoryId
                                      )?.indexPrice && innerPrice?.price
                                        ? "$" +
                                          fixPrice(
                                            Number(
                                              tankExchangeTier?.product?.details?.find(
                                                (category) =>
                                                  category?.categoryId ===
                                                  price?.categoryId
                                              )?.indexPrice || 0
                                            ) + Number(innerPrice?.price || 0)
                                          )
                                        : "-"}
                                    </td>
                                  </tr>
                                )
                            )
                          )
                      ) : (
                        <tr>
                          <td colSpan={5} style={{ textAlign: "center" }}>
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewTankExchangePricingList;

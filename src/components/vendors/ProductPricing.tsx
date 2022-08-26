/* eslint-disable jsx-a11y/anchor-is-valid */

//* NOTE: I will remove commented code after QA feedback
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import { getCylinderSizeActionThunk } from "../../store/cylinderSize/cylinderSize.action.async";

import {
  getProducByIdActionThunk,
  getProductsActionThunk,
} from "../../store/products/products.action.async";
import { TProductsPayload } from "../../store/products/products.types";
import TRootState from "../../store/root.types";
import {
  addVendorProductActionThunk,
  deleteVendorProductPricingActionThunk,
  deletVendorProductActionThunk,
  getVendorProductActionThunk,
  updateVendorProductActionThunk,
  updateVendorProductPricingActionThunk,
  updateVendorProductTiersActionThunk,
  vendorProductPricingTierActionThunk,
} from "../../store/vendor/vendor.action.async";
import { TVendorProductTiers } from "../../store/vendor/vendor.types";
import { BarsLoader } from "../loader/Loader";
import { errorToast } from "../toast/toast";
interface Prop {
  tabValue: number;
  setTabValue: Function;
}

export interface VendorProduct {
  id: number;
  isCompleted: boolean;
  isSalesTax: boolean;
  tiers: TVendorProductTiers[];
  vendorId: string;
  zipcodeIds: null | string[];
  pricing: Partial<{
    createdAt: string;
    categoryId: number;
    cylinderSizeId: number;
    createdBy: string;
    id: number;
    price: {
      vendorProductTiersId: number | undefined;
      price: number | string;
      id: number | undefined;
      [key: string]: number | undefined | string | boolean;
    }[];
    vendorProductId: number;
    updatedAt: string;
    updatedBy: string;
    [key: string]:
      | string
      | number
      | boolean
      | {
          vendorProductTiersId: number | undefined;
          price: number | string;
          id: number | undefined;
        }[];
  }>[];
  product?: {
    details: {
      categoryId: number;
      discount: number;
      id: number;
      indexPrice: number | string;
      productId: number;
    }[];
    id: number;
    status: number;
    name: string;
  };
  error?: string;
  productId?: string;
  [key: string]:
    | string
    | TVendorProductTiers[]
    | TProductsPayload
    | boolean
    | undefined
    | number
    | null
    | {
        details: {
          categoryId: number;
          discount: number;
          id: number;
          indexPrice: number | string;
          productId: number;
        }[];
        id: number;
        name: string;
        status: number;
      }
    | Partial<{
        createdAt: string;
        createdBy: string;
        id: number;
        price: {
          vendorProductTiersId: number | undefined;
          price: number | string;
          id: number | undefined;
          [key: string]: number | undefined | string | boolean;
        }[];
        updatedAt: string;
        updatedBy: string;
      }>[]
    | string[];
}

const ProductPricing: React.FC<Prop> = ({ tabValue, setTabValue }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { vendorId } = useParams<{ vendorId: string }>();

  const { product, loading } = useSelector(
    (state: TRootState) => state?.vendor
  );
  const { fuelDeliveryProducts, tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products
  );
  const { singleProductData } = useSelector(
    (state: TRootState) => state?.products
  );
  const { categories } = useSelector(
    (state: TRootState) => state.category?.categories
  );
  const { cylinderSizes } = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData
  );
  const [productError, setProductError] = useState(false);
  const [tabInnerValue, setTabInnerValue] = useState(41);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [fuelProductTiers, setFuelProductTiers] = useState<
    Partial<VendorProduct>
  >({});

  const [tankExchangeTier, setTankExchangeTier] = useState<
    Partial<VendorProduct>
  >({});

  const fuelProduct = fuelDeliveryProducts?.map((product) => ({
    label: product?.name,
    value: product?.id,
  }));
  const tankExchangeProduct = tankExchangeProducts?.map((product) => ({
    label: product?.name,
    value: product?.id,
  }));

  const CylinderSizesOption = cylinderSizes?.map((size) => ({
    label: size?.cylinderSize?.toString(),
    value: size?.id?.toString(),
  }));

  const [showPricingTiersModal, setShowPricingTiersModal] = useState(false);
  const [productIndex, setProductIndex] = useState<{
    index: number;
    id: number | null;
  } | null>(null);
  const [
    showPricingTiersPropaneTankModal,
    setShowPricingTiersPropaneTankModal,
  ] = useState(false);

  const [fuelDeliveryData, setFuelDeliveryData] = useState<
    Partial<VendorProduct>[]
  >([{}]);

  const [tankExchangeData, setTankExchangeData] = useState<
    Partial<VendorProduct>[]
  >([{ pricing: [] }]);
  const [tabValue1, setTabvalue1] = useState(21);

  useEffect(() => {
    dispatch(getProductsActionThunk());
    if (tabInnerValue === 42) {
      dispatch(getCategoryActionThunk());
      dispatch(getCylinderSizeActionThunk(false, 0, 0));
    }
    dispatch(
      getVendorProductActionThunk(vendorId, tabInnerValue === 41 ? 1 : 2)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabInnerValue]);

  useEffect(() => {
    if (product?.count > 0) {
      const cloneVendorProducts = _.cloneDeep(product?.vendorProducts);
      cloneVendorProducts?.map((products) => {
        products["isNewProduct"] = true;
        /**
         * Formatted tankexchange product pricing as
         * {
         * categoryId: number,
         * cylinderSizeId:number,
         * price:{id:number, vendorProductTiersId:number, price:number}[]
         * }[]
         */
        if (tabInnerValue === 42) {
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
                      price: Number(price?.price)?.toFixed(2),
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
                          price: Number(price?.price)?.toFixed(2),
                          vendorProductTiersId: price?.vendorProductTiersId,
                          id: price?.id,
                        },
                      ];
                    } else {
                      innerPrice["price"] = [
                        {
                          price: Number(price?.price)?.toFixed(2),
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
        }
        if (tabInnerValue === 41) {
          if (products["pricing"]?.length > 0) {
            products["isTiersSaved"] = true;
            if (
              products["pricing"]?.filter((price) => !price?.price)?.length ===
              0
            ) {
              const modifiedPrice: Record<string, any> = [];
              products["pricing"]?.forEach((pricing) => {
                modifiedPrice?.push({
                  ...pricing,
                  price: pricing?.price
                    ? parseFloat(pricing?.price?.toString())?.toFixed(2)
                    : "",
                });
              });
              products["pricing"] = modifiedPrice as Partial<{
                [key: string]: string | number;
                createdAt: string;
                categoryId: number;
                cylinderSizeId: number;
                createdBy: string;
                id: number;
                price: number;
                vendorProductId: number;
                vendorProductTiersId: number;
                updatedAt: string;
                updatedBy: string;
              }>[];
            }
          }
        }
        return products;
      });
      tabInnerValue === 41
        ? setFuelDeliveryData(cloneVendorProducts as VendorProduct[])
        : setTankExchangeData(cloneVendorProducts as VendorProduct[]);
    } else {
      tabInnerValue === 41
        ? setFuelDeliveryData([{}])
        : setTankExchangeData([{ pricing: [] }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.vendorProducts, product?.count]);

  const handleShowPricingTiersPropaneTank = () => {
    setShowPricingTiersPropaneTankModal(true);
  };
  const handleClosePricingTiersPropaneTank = () => {
    setShowPricingTiersPropaneTankModal(false);
  };
  const handleShowPricingTiers = () => {
    setShowPricingTiersModal(true);
  };
  const handleClosePricingTiers = () => {
    setShowPricingTiersModal(false);
  };
  const hideAlert = () => {
    setShowDeleteAlert(false);
  };

  /**
   * add/update fuel products
   * @param index
   * @param name
   * @param value
   * @param tierIndex
   * @param tierId
   */
  const addFuelData = (
    index: number,
    name: string,
    value: string | boolean | number,
    tierIndex?: number,
    tierId?: number
  ) => {
    const updatedFuelData = fuelDeliveryData && _.cloneDeep(fuelDeliveryData);
    if (tierIndex && tierIndex > 0) {
      const tiers =
        updatedFuelData &&
        (updatedFuelData[index]["tiers"] || [])[tierIndex - 1];
      if (name === "price" && tierId) {
        if (updatedFuelData[index]["pricing"]?.length === 0) {
          updatedFuelData[index]["pricing"] = Array(
            updatedFuelData[index]["tiers"]?.length
          )?.fill({});
        }
        (updatedFuelData[index]["pricing"] ||
          ([] as Record<string, string | number | undefined>[]))[
          tierIndex - 1
        ] = {
          ...(updatedFuelData[index]["pricing"] || [])[tierIndex - 1],
          vendorProductTiersId: tierId,
          price: value ? (value as string | number) : "",
          vendorProductId: updatedFuelData[index].id,
          priceError: Number(value) < 1 ? "Price must be greater than 0" : "",
        };
      } else {
        tiers[name] = value ? Number(value) : value;
      }
      if (!value) {
        tiers[`${name}Error`] = "This field is required";
      } else if (isNaN(Number(value))) {
        tiers[`${name}Error`] = "Enter valid value";
      } else if (Number(value) < 1) {
        tiers[`${name}Error`] = "Value must be greater than 0";
      } else if (name === "from" && Number(tiers?.to) < Number(value)) {
        tiers[`${name}Error`] = "From must be less than To";
      } else if (name === "to" && Number(tiers?.from) > Number(value)) {
        tiers[`${name}Error`] = "To must be greater than From";
      } else if (tierIndex > 1 && name === "from") {
        const previousTier =
          updatedFuelData &&
          (updatedFuelData[index]["tiers"] || [])[tierIndex - 2];
        if (tiers?.from !== previousTier?.to + 1) {
          tiers[`${name}Error`] = `This tier's value must be equal to ${
            previousTier?.to + 1
          } `;
        } else {
          tiers[`${name}Error`] = "";
          previousTier[`toError`] = "";
        }
      } else if (tierIndex > 0 && tierIndex < 5 && name === "to") {
        const nextTier =
          updatedFuelData && (updatedFuelData[index]["tiers"] || [])[tierIndex];
        if (tiers?.to !== nextTier?.from - 1) {
          tiers[`${name}Error`] = `This tier's value must be equal to  ${
            nextTier?.from - 1
          }`;
        } else {
          tiers[`${name}Error`] = "";
          nextTier[`fromError`] = "";
        }
      } else {
        tiers[`${name}Error`] = "";
      }
    } else {
      updatedFuelData && (updatedFuelData[index][name] = value);
    }

    setFuelDeliveryData(updatedFuelData);
  };

  /**
   * Delete fuel products
   * @param id
   * @param productId
   * @returns
   */
  const deleteFuelData = (id: number, productId: number | null) => {
    const updatedFuelData = fuelDeliveryData && [...fuelDeliveryData];
    if (updatedFuelData && updatedFuelData.length === 1) {
      hideAlert();
      return;
    }
    if (productId) {
      dispatch(deletVendorProductActionThunk(Number(productId)));
    } else {
      updatedFuelData?.splice(id, 1);
      setFuelDeliveryData(updatedFuelData);
    }
    hideAlert();
  };

  /**
   * Delete tank-exchange products
   * @param id
   * @param index
   * @returns
   */
  const deleteTankData = (id: number | null, index: number) => {
    const updatedTankData = [...tankExchangeData];
    if (updatedTankData.length === 1) {
      hideAlert();
      return;
    }
    if (id) {
      dispatch(deletVendorProductActionThunk(id));
    } else {
      updatedTankData?.splice(index, 1);
      setTankExchangeData(updatedTankData);
    }
    hideAlert();
  };

  /**
   * Delete tank-exchange product category
   * @param index
   * @param price
   * @param priceIndex
   * @returns
   */
  const deleteCategory = (
    index: number,
    price?: {
      [key: string]: string | number | undefined | boolean;
      vendorProductTiersId: number | undefined;
      price: number | string;
      id: number | undefined;
    }[],
    priceIndex?: number
  ) => {
    const updatedTankData = [...tankExchangeData];
    if (updatedTankData[index]["pricing"]?.length === 1) return;
    const priceIds = price && price?.map((price) => price?.id && price.id);
    if (
      (priceIds?.filter((id) => !id)?.length ===
        updatedTankData[index]["tiers"]?.length ||
        !priceIds?.length) &&
      priceIndex
    ) {
      (updatedTankData[index]["pricing"] || [])?.splice(priceIndex, 1);
      setTankExchangeData(updatedTankData);
    } else {
      priceIds &&
        priceIds?.length &&
        dispatch(deleteVendorProductPricingActionThunk(priceIds, index));
    }
  };

  /**
   * Adds new category for tank-exchange product
   * @param index
   */
  const handleCategory = (index: number) => {
    const updatedTankData = _.cloneDeep(tankExchangeData);
    updatedTankData[index]["pricing"]?.push({});
    setTankExchangeData(updatedTankData);
  };

  /**
   * Update tank-exchange product tiers
   * @param index
   * @param name
   * @param value
   * @param tierIndex
   */
  const updateTankExchangeTiers = (
    index: number,
    name: string,
    value: string | boolean,
    tierIndex: number
  ) => {
    const updatedTankData = tankExchangeData && _.cloneDeep(tankExchangeData);
    const tiers =
      updatedTankData && (updatedTankData[index]["tiers"] || [])[tierIndex - 1];
    tiers[name] = value ? Number(value) : value;
    if (!value) {
      tiers[`${name}Error`] = "This field is required";
    } else if (isNaN(Number(value))) {
      tiers[`${name}Error`] = "Enter valid value";
    } else if (Number(value) < -1) {
      tiers[`${name}Error`] = "Value must be greater than 0";
    } else if (name === "from" && Number(tiers?.to) < Number(value)) {
      tiers[`${name}Error`] = "From must be less than To";
    } else if (name === "to" && Number(tiers?.from) > Number(value)) {
      tiers[`${name}Error`] = "To must be greater than From";
    } else if (tierIndex > 1 && name === "from") {
      const previousTier =
        updatedTankData &&
        (updatedTankData[index]["tiers"] || [])[tierIndex - 2];
      if (tiers?.from !== previousTier?.to + 1) {
        tiers[`${name}Error`] = `This tier's value must be equal to ${
          previousTier?.to + 1
        } `;
      } else {
        tiers[`${name}Error`] = "";
        previousTier[`toError`] = "";
      }
    } else if (tierIndex > 0 && tierIndex < 5 && name === "to") {
      const nextTier =
        updatedTankData && (updatedTankData[index]["tiers"] || [])[tierIndex];
      if (tiers?.to !== nextTier?.from - 1) {
        tiers[`${name}Error`] = `This tier's value must be equal to  ${
          nextTier?.from - 1
        }`;
      } else {
        tiers[`${name}Error`] = "";
        nextTier[`fromError`] = "";
      }
    } else if (name === "price" && Number(value) < 1) {
      tiers[`${name}Error`] = "Price must be greater than 0";
    } else {
      tiers[`${name}Error`] = "";
    }
    setTankExchangeData(updatedTankData);
  };

  /**
   * Update tank-exchange product
   * @param index
   * @param name
   * @param value
   * @param tierIndex
   */
  const updateTankData = (
    index: number,
    name: string,
    value: string | boolean,
    tierIndex?: number
  ) => {
    const updatedTankData = tankExchangeData && _.cloneDeep(tankExchangeData);
    updatedTankData && (updatedTankData[index][name] = value);
    setTankExchangeData(updatedTankData);
  };

  /**
   * Update tank-exchange product categories
   * @param index
   * @param name
   * @param value
   * @param priceIndex
   * @param vendorProductTiersId
   */
  const updateTankCategories = (
    index: number,
    name: string,
    value: number | string,
    priceIndex: number,
    vendorProductTiersId?: number
  ) => {
    const updatedTankData = tankExchangeData && _.cloneDeep(tankExchangeData);
    const pricing =
      updatedTankData && (updatedTankData[index]["pricing"] || [])[priceIndex];

    if (name === "price" && vendorProductTiersId && pricing) {
      const prices = pricing?.price;
      if (prices?.length) {
        const priceIndex = prices?.findIndex(
          (price) => price?.vendorProductTiersId === vendorProductTiersId
        );
        if (priceIndex > -1) {
          prices[priceIndex].price = !isNaN(Number(value))
            ? Number(value)
            : value;
          prices[priceIndex]["priceError"] =
            Number(value) < 1 ? "Price must be greater than 0" : "";
        } else {
          prices.push({
            vendorProductTiersId,
            price: !isNaN(Number(value)) ? Number(value) : value,
            id: prices[priceIndex]?.id,
            priceError: Number(value) < 1 ? "Price must be greater than 0" : "",
          });
        }
      } else {
        pricing["price"] = [
          {
            vendorProductTiersId,
            price: Number(value),
            id: (prices || [])[priceIndex]?.id,
          },
        ];
      }
    } else {
      name === "categoryId" && (pricing["categoryError"] = "");
      name === "cylinderSizeId" && (pricing["cylinderSizeError"] = "");
      pricing && (pricing[name] = value ? Number(value) : value);
    }
    setTankExchangeData(updatedTankData);
  };

  /**
   * Add/Update fuel-delivery product tiers API call
   * @param data
   * @param index
   */
  const handleTier = (data: Partial<VendorProduct>, index: number) => {
    if (
      !(
        (data?.tiers || [])?.filter((tier) => tier?.toError || tier?.fromError)
          .length > 0
      )
    ) {
      const tiers = (data?.tiers || []).map((tier) => ({
        id: tier?.id,
        from: tier?.from,
        to: tier?.to,
      }));
      dispatch(
        updateVendorProductTiersActionThunk(tiers, Number(data?.id), () =>
          tabInnerValue === 41
            ? addFuelData(index, "isTiersSaved", true)
            : updateTankData(index, "isTiersSaved", true)
        )
      );
    }
  };

  /**
   * add/update fuel-delivery product prices
   * @param data
   * @param index
   */
  const handleFuelDeliveryTierPrice = (
    data: Partial<VendorProduct>,
    index: number
  ) => {
    if (
      !(
        (data?.pricing || [])?.filter((price) => price?.priceError)?.length > 0
      ) &&
      (data?.pricing || [])?.filter((price) => price?.price)?.length ===
        data["tiers"]?.length
    ) {
      const pricing = (data?.pricing || []).map((price) => ({
        id: price?.id,
        categoryId: undefined,
        cylinderSizeId: undefined,
        vendorProductTierId: price?.vendorProductTiersId,
        vendorProductId: data?.id,
        price: price?.price,
      }));
      if (
        (data["pricing"] || [])?.filter((price) => price?.id)?.length ===
        fuelDeliveryData[index]?.tiers?.length
      ) {
        const updatePricing =
          (data.pricing || [])?.map((price) => ({
            categoryId: undefined,
            cylinderSizeId: undefined,
            vendorProductTierId: price?.vendorProductTiersId,
            vendorProductId: data?.id,
            price: price?.price,
            id: price?.id,
          })) || [];
        pricing?.length &&
          dispatch(
            updateVendorProductPricingActionThunk(
              updatePricing?.map((price) => ({
                ...price,
                vendorProductTierId: undefined,
                vendorProductId: undefined,
              })) as Partial<{
                categoryId: undefined | number;
                cylinderSizeId: undefined | number;
                vendorProductTierId: number | undefined;
                vendorProductId: number;
                price: number;
                id: number | undefined;
              }>[],
              data?.id || ""
            )
          );
      } else {
        dispatch(
          vendorProductPricingTierActionThunk(
            pricing as Partial<{
              categoryId: number | undefined;
              cylinderSizeId: number | undefined;
              vendorProductTierId: number | undefined;
              vendorProductId: number;
              price: number;
              id: number | undefined;
            }>[],
            index
          )
        );
        addFuelData(index, "isPriceSaved", true);
      }
    } else {
      if (data["pricing"]?.length === 0) {
        data["pricing"] = Array((data["tiers"] || [])?.length).fill({});
      }
      for (
        let tierLength = 0;
        tierLength < (data["tiers"] || [])?.length;
        tierLength++
      ) {
        (data["pricing"] || [])[tierLength] = {
          ...(data["pricing"] || [])[tierLength],
          priceError: ((data["pricing"] || [])[tierLength] as Record<
            string,
            string | number
          >)?.price
            ? ""
            : "Price is required",
          vendorProductTiersId: (data["tiers"] || [])[tierLength]?.id,
        };
      }
      const cloneFuelData = _.cloneDeep(fuelDeliveryData);
      cloneFuelData[index] = data;

      setFuelDeliveryData(cloneFuelData);
    }
  };

  /**
   * add/update tank-exchange product price
   * @param price
   * @param index
   * @param category
   * @param priceIndex
   * @returns
   */
  const handleTankExchangePrice = (
    price: {
      categoryId: number | undefined;
      cylinderSizeId: number | undefined;
      price:
        | {
            id: number | undefined;
            price: number | string;
            vendorProductTiersId: number | undefined;
            [key: string]: number | undefined | string | boolean;
          }[]
        | undefined;
    },
    index: number,
    category: Partial<{
      [key: string]:
        | string
        | number
        | boolean
        | {
            vendorProductTiersId: number | undefined;
            price: number | string;
            id: number | undefined;
          }[];
      createdAt: string;
      categoryId: number;
      cylinderSizeId: number;
      createdBy: string;
      id: number;
      price: {
        vendorProductTiersId: number | undefined;
        price: number | string;
        id: number | undefined;
        [key: string]: string | number | undefined | boolean;
      }[];
      vendorProductId: number;
      updatedAt: string;
      updatedBy: string;
    }>,
    priceIndex: number
  ) => {
    !price?.categoryId
      ? (category["categoryError"] = "Category is required")
      : (category["categoryError"] = "");
    !price?.cylinderSizeId
      ? (category["cylinderSizeError"] = "Cylinder size is required")
      : (category["cylinderSizeError"] = "");

    if (
      !price?.price ||
      price?.price?.length < (tankExchangeData[index]["tiers"] || [])?.length
    ) {
      for (
        let tierLength = 0;
        tierLength < (tankExchangeData[index]?.tiers || [])?.length;
        tierLength++
      ) {
        if (tierLength === 0) {
          category["price"] = [
            {
              ...(category["price"] || [])[0],
              vendorProductTiersId: (tankExchangeData[index]["tiers"] || [])[
                tierLength
              ]?.id,
              priceError: !(category["price"] || [])[0]?.price
                ? "Price is required"
                : "",
            },
          ];
        } else {
          category["price"] = [
            ...(category["price"] || []),
            {
              ...(price["price"] || [])[tierLength],
              vendorProductTiersId: (tankExchangeData[index]["tiers"] || [])[
                tierLength
              ]?.id,
              priceError: !(category["price"] || [])[tierLength]?.price
                ? "Price is required"
                : "",
            },
          ];
        }
      }
    }
    const cloneTankData = _.cloneDeep(tankExchangeData);

    const availablePrices =
      priceIndex > 0
        ? cloneTankData[index]?.pricing?.slice(0, -1)?.filter((price) => {
            return (
              price?.categoryId === category?.categoryId &&
              price?.cylinderSizeId === category?.cylinderSizeId
            );
          })
        : [];
    (cloneTankData[index]["pricing"] || [])[priceIndex] = category;
    if (
      availablePrices?.length &&
      price?.price &&
      price?.categoryId &&
      price?.cylinderSizeId
    ) {
      errorToast("Price already exists");
      return;
    }
    if (
      !category?.categoryError &&
      !category?.cylinderSizeError &&
      category?.price?.filter((price) => price?.priceError)?.length === 0 &&
      !availablePrices?.length
    ) {
      const updatedPrices = price?.price?.map((innerPrice) => ({
        ...innerPrice,
        price: innerPrice?.price,
        priceError: undefined,
        categoryId: price?.categoryId,
        cylinderSizeId: price?.cylinderSizeId,
        vendorProductId: tankExchangeData[index]?.id,
        vendorProductTierId: innerPrice?.vendorProductTiersId,
        vendorProductTiersId: undefined,
      })); // to pass in api
      if (
        price?.price?.filter((price) => price?.id)?.length ===
        tankExchangeData[index]?.tiers?.length
      ) {
        updatedPrices?.length &&
          dispatch(
            updateVendorProductPricingActionThunk(
              updatedPrices?.map((price) => ({
                ...price,
                vendorProductTierId: undefined,
                vendorProductId: undefined,
              })) || [],
              tankExchangeData[index]?.id || ""
            )
          );
      } else {
        updatedPrices?.length &&
          dispatch(
            vendorProductPricingTierActionThunk(updatedPrices || [], index, 2)
          );
      }
      category["isPriceSaved"] = true;
    }
    setTankExchangeData(cloneTankData);
  };

  return (
    <div className="tab-pane fadeIn active" id="tab-4">
      <div className="card-header clearfix ">
        <ul className="nav nav-tabs primary-tabs">
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue && setTabInnerValue(41)}
              className={
                tabValue === 3 && tabInnerValue === 41
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Fuel delivery
            </a>
          </li>
          <li className="nav-item" role="presentation">
            <a
              onClick={() => setTabInnerValue && setTabInnerValue(42)}
              className={
                tabValue === 3 && tabInnerValue === 42
                  ? "nav-link active show"
                  : "nav-link"
              }
            >
              Propane Tank Exchange
            </a>
          </li>
        </ul>
      </div>
      <div className="tab-content">
        {tabValue === 3 && tabInnerValue === 41 ? (
          <div className="tab-pane fadeIn active" id="tab-41">
            <div className="card-body pb-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {!loading ? (
                  fuelDeliveryData?.map((data, index) => {
                    return (
                      <React.Fragment key={data?.id}>
                        <div className="row flex flex-wrap mb-4">
                          <div className="col-xl-12">
                            <div className="border rounded">
                              <div className="px-4 pt-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h5 className="font-weight-600 m-0">
                                    Add Product Pricing
                                  </h5>
                                  <i
                                    style={{
                                      cursor:
                                        fuelDeliveryData?.length > 1
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() => {
                                      // deleteFuelData(index, data?.id || null);
                                      setProductIndex({
                                        index,
                                        id: data?.id || null,
                                      });
                                      setShowDeleteAlert(
                                        fuelDeliveryData?.length > 1
                                          ? true
                                          : false
                                      );
                                    }}
                                    className="fa fa-trash-alt fa-fw text-danger"
                                  ></i>
                                </div>
                                <div className="form-row">
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Product{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <Select
                                        className="custom-select-dropdown"
                                        isDisabled={data?.id ? true : false}
                                        defaultValue={
                                          fuelProduct.filter(
                                            (product) =>
                                              !(fuelDeliveryData || [])
                                                ?.map((tier) =>
                                                  Number(tier.productId)
                                                )
                                                ?.includes(
                                                  Number(product?.value)
                                                )
                                          )[0]
                                        }
                                        value={
                                          data?.productId
                                            ? (fuelProduct || []).find(
                                                (prod) =>
                                                  prod?.value ===
                                                  data?.productId
                                              ) || null
                                            : null
                                        }
                                        onChange={(val) => {
                                          setProductError(false);
                                          addFuelData(
                                            index,
                                            "productId",
                                            val?.value || ""
                                          );
                                          Promise.resolve(
                                            dispatch(
                                              getProducByIdActionThunk(
                                                val?.value || ""
                                              )
                                            )
                                          ).then(
                                            () =>
                                              data.product &&
                                              (data.product.details[0].indexPrice =
                                                singleProductData?.details[0]
                                                  ?.indexPrice || "")
                                          );
                                        }}
                                        placeholder="-- Select --"
                                        options={
                                          fuelProduct.filter(
                                            (product) =>
                                              !(fuelDeliveryData || [])
                                                ?.map((tier) =>
                                                  Number(tier.productId)
                                                )
                                                ?.includes(
                                                  Number(product?.value)
                                                )
                                          ) || []
                                        }
                                      />
                                    </div>
                                  </div>
                                  {(data?.productId || data?.isNewProduct) && (
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <label className="control-label">
                                          Index Price
                                          <OverlayTrigger
                                            placement="top"
                                            overlay={
                                              <Tooltip id={`tooltip01`}>
                                                {`This Price comes from Products > Added Index Price`}
                                              </Tooltip>
                                            }
                                          >
                                            <i className="fa fa-info-circle top-1 m-l-5 m-r-5"></i>
                                          </OverlayTrigger>
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control-plaintext"
                                          value={`$${
                                            Number(
                                              fuelDeliveryProducts?.find(
                                                (product) =>
                                                  product?.id ===
                                                  data?.productId
                                              )?.details[0]?.indexPrice
                                            )?.toFixed(2) || ""
                                          }`}
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Sales Tax
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip id={`tooltip01`}>
                                              This Tax comes from Zipcode Sales
                                              Tax (%)
                                            </Tooltip>
                                          }
                                        >
                                          <i className="fa fa-info-circle top-1 m-l-5 m-r-5"></i>
                                        </OverlayTrigger>
                                      </label>
                                      <label
                                        className="control control-outline control-primary control--checkbox m-0"
                                        htmlFor={"sales-tax-" + index}
                                      >
                                        <input
                                          type="checkbox"
                                          id={"sales-tax-" + index}
                                          checked={data?.isSalesTax || false}
                                          onChange={(e) => {
                                            addFuelData(
                                              index,
                                              "isSalesTax",
                                              e.target.checked || false
                                            );
                                          }}
                                        />
                                        <div className="control__indicator"></div>
                                      </label>
                                      {/* <input type="text" className="form-control-plaintext" value="7.5%" /> */}
                                    </div>
                                  </div>
                                  {/* {!data?.id && (
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <label className="control-label d-block">
                                        &nbsp;
                                      </label>
                                      <button
                                        type="button"
                                        className="btn btn-primary px-3 mr-2"
                                        onClick={() => {
                                          if (data?.id) {
                                            dispatch(
                                              updateVendorProductActionThunk(
                                                data.id,
                                                data?.isSalesTax || false,
                                                data?.productId || "",
                                                vendorId
                                              )
                                            );
                                          } else {
                                            dispatch(
                                              addVendorProductActionThunk(
                                                vendorId,
                                                data?.productId || "",
                                                data?.isSalesTax || false,
                                                1
                                              )
                                            );
                                          }
                                        }}
                                      >
                                        Save Product
                                      </button>
                                    </div>
                                  </div>
                                )} */}
                                </div>
                                {data?.productId && data?.isNewProduct && (
                                  <>
                                    <h5 className="font-weight-600 mb-3 mt-3">
                                      Set Pricing Tiers
                                    </h5>
                                    <div className="form-row">
                                      {data?.tiers?.map(
                                        (tier, tierIndex) =>
                                          tier?.position === tierIndex + 1 && (
                                            <div
                                              className={
                                                "col col-sm-6 col-md-4 col-lg-4 col-xl"
                                              }
                                              key={tier?.id}
                                            >
                                              <div className="form-group">
                                                <div className="d-flex align-items-center mb-2">
                                                  <input
                                                    type="number"
                                                    readOnly={
                                                      tier?.from === 0 &&
                                                      tierIndex === 0
                                                    }
                                                    className={`form-control ${
                                                      tier.to === 2147483647 &&
                                                      tierIndex ===
                                                        (data?.tiers || [])
                                                          ?.length -
                                                          1
                                                        ? "w-60"
                                                        : "w-50"
                                                    }`}
                                                    value={tier.from}
                                                    onChange={(e) =>
                                                      addFuelData(
                                                        index,
                                                        "from",
                                                        e.target.value,
                                                        tier?.position
                                                      )
                                                    }
                                                  />
                                                  -
                                                  <input
                                                    type={
                                                      tier.to === 2147483647
                                                        ? "string"
                                                        : "number"
                                                    }
                                                    readOnly={
                                                      tier.to === 2147483647
                                                    }
                                                    className={`form-control ${
                                                      tier.to === 2147483647 &&
                                                      tierIndex ===
                                                        (data?.tiers || [])
                                                          ?.length -
                                                          1
                                                        ? "w-75"
                                                        : "w-50"
                                                    }`}
                                                    value={
                                                      tier.to === 2147483647
                                                        ? "or more"
                                                        : tier.to
                                                    }
                                                    onChange={(e) =>
                                                      addFuelData(
                                                        index,
                                                        "to",
                                                        e.target.value,
                                                        tier?.position
                                                      )
                                                    }
                                                  />
                                                  <span className="font-size-14 ml-2 text-nowrap">
                                                    {" "}
                                                    Gallons{" "}
                                                    <span className="text-danger">
                                                      *
                                                    </span>{" "}
                                                  </span>
                                                  {/* {(data?.tiers || [])?.length -
                                                    1 ===
                                                    tierIndex && (
                                                    <button
                                                      type="button"
                                                      className="btn btn-primary px-3 mx-2"
                                                      onClick={() => {
                                                        handleTier(data, index);
                                                      }}
                                                    >
                                                      Save Tiers
                                                    </button>
                                                  )} */}
                                                </div>
                                                {tier?.fromError && (
                                                  <div className="text-danger">
                                                    {tier?.fromError as string}
                                                  </div>
                                                )}
                                                {tier?.toError && (
                                                  <div className="text-danger">
                                                    {tier?.toError as string}
                                                  </div>
                                                )}
                                                {data?.isTiersSaved && (
                                                  <>
                                                    <div className="d-flex">
                                                      <div className="d-flex flex-column flex-fill">
                                                        <div className="input-group">
                                                          <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                              $
                                                            </span>
                                                          </div>
                                                          <input
                                                            type="number"
                                                            className="form-control"
                                                            value={
                                                              (data?.pricing?.find(
                                                                (price) =>
                                                                  price?.vendorProductTiersId ===
                                                                  tier?.id
                                                              ) as Record<
                                                                string,
                                                                string
                                                              >)?.price
                                                            }
                                                            onChange={(e) =>
                                                              addFuelData(
                                                                index,
                                                                "price",
                                                                e.target.value,
                                                                tier?.position,
                                                                tier?.id
                                                              )
                                                            }
                                                          />
                                                        </div>
                                                        {(data?.pricing || [])[
                                                          tierIndex
                                                        ]?.priceError && (
                                                          <div className="text-danger">
                                                            {
                                                              (data?.pricing ||
                                                                [])[tierIndex]
                                                                ?.priceError as string
                                                            }
                                                          </div>
                                                        )}
                                                      </div>
                                                      {/* {data?.isTiersSaved &&
                                                        (data?.tiers || [])
                                                          ?.length -
                                                          1 ===
                                                          tierIndex && (
                                                          <button
                                                            type="button"
                                                            className="btn btn-primary px-3 mx-2"
                                                            onClick={() =>
                                                              handleFuelDeliveryTierPrice(
                                                                data,
                                                                index
                                                              )
                                                            }
                                                          >
                                                            Save Price
                                                          </button>
                                                        )} */}
                                                    </div>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          )
                                      )}
                                      <div className="col col-sm-6 col-md-4 col-lg-4 col-xl">
                                        <div className="d-flex flex-column flex-fill max-w-125">
                                          {
                                            <button
                                              type="button"
                                              className="btn btn-primary px-3 h-35 lh-15 mb-2"
                                              onClick={() => {
                                                handleTier(data, index);
                                              }}
                                            >
                                              Save Tiers
                                            </button>
                                          }
                                          {data?.isTiersSaved && (
                                            <button
                                              type="button"
                                              className="btn btn-primary px-3 h-35 lh-15"
                                              onClick={() =>
                                                handleFuelDeliveryTierPrice(
                                                  data,
                                                  index
                                                )
                                              }
                                            >
                                              Save Price
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {productError && (
                              <div className="text-danger">
                                Please add atleast one product
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          {fuelDeliveryData?.length - 1 === index &&
                            fuelDeliveryData?.length < fuelProduct?.length && (
                              <button
                                onClick={() => {
                                  if (
                                    fuelDeliveryData?.length ===
                                    fuelProduct?.length
                                  ) {
                                    return;
                                  }
                                  const cloneFuelDeliveryData = _.cloneDeep(
                                    fuelDeliveryData
                                  );
                                  cloneFuelDeliveryData.push({});
                                  setFuelDeliveryData(cloneFuelDeliveryData);
                                }}
                                type="button"
                                className="btn btn-dark px-3 mr-2"
                              >
                                <i className="fa fa-plus font-size-12 text-white"></i>{" "}
                                Add More
                              </button>
                            )}
                          <button
                            type="submit"
                            className="btn btn-primary px-3 mr-2"
                            onClick={() => {
                              if (data?.id) {
                                dispatch(
                                  updateVendorProductActionThunk(
                                    data.id,
                                    data?.isSalesTax || false,
                                    data?.productId || "",
                                    vendorId
                                  )
                                );
                              } else {
                                dispatch(
                                  addVendorProductActionThunk(
                                    vendorId,
                                    data?.productId || "",
                                    data?.isSalesTax || false,
                                    1
                                  )
                                );
                              }
                              setProductError(false);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <BarsLoader />
                )}
              </form>
            </div>
            <div className="card-body pt-0 pb-2 border-bottom">
              <h4 className="font-weight-600">Products Pricing List</h4>
            </div>
            <div className="card-body p-0">
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
                    {fuelDeliveryData?.map(
                      (fuelProduct, index) =>
                        fuelProduct?.isPriceSaved && (
                          <tr key={fuelProduct?.id}>
                            <td>Fuel Delivery</td>
                            <td>{fuelProduct?.product?.name}</td>
                            <td>
                              $
                              {(fuelProduct?.product?.details || [])[0]
                                ?.indexPrice
                                ? Number(
                                    (fuelProduct?.product?.details || [])[0]
                                      ?.indexPrice
                                  )?.toFixed(2)
                                : "-"}
                            </td>
                            <td className="text-center">
                              <a
                                onClick={() => {
                                  setFuelProductTiers(fuelProduct);
                                  handleShowPricingTiers();
                                }}
                              >
                                <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                              </a>
                            </td>
                          </tr>
                        )
                    )}
                    {/* <tr>
                      <td>Fuel Delivery</td>
                      <td>Bahr's Fuel</td>
                      <td>$1.21</td>
                      <td className="text-center">
                        <a onClick={() => handleShowPricingTiers()}>
                          <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Fuel Delivery</td>
                      <td>Bahr's Fuel</td>
                      <td>$1.21</td>
                      <td className="text-center">
                        <a onClick={() => handleShowPricingTiers()}>
                          <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                        </a>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
        {tabValue === 3 && tabInnerValue === 42 ? (
          <div className="tab-pane fadeIn active" id="tab-42">
            <div className="card-body pb-0">
              <form onSubmit={(e) => e.preventDefault()}>
                {!loading ? (
                  tankExchangeData?.map((tankdata, index) => {
                    return (
                      <React.Fragment key={tankdata?.id}>
                        <div className="row flex flex-wrap mb-4">
                          <div className="col-xl-12">
                            <div className="border rounded">
                              <div className="px-4 pt-3">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <h5 className="font-weight-600 m-0">
                                    Add Product Pricing
                                  </h5>
                                  <i
                                    onClick={() => {
                                      setProductIndex({
                                        index,
                                        id: tankdata?.id || null,
                                      });
                                      setShowDeleteAlert(true);
                                    }}
                                    className="fa fa-trash-alt fa-fw text-danger"
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </div>
                                <div className="form-row">
                                  <div className="col-6 col-sm-4 col-lg col-xl">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Product{" "}
                                        <span className="text-danger">*</span>
                                      </label>
                                      <Select
                                        isDisabled={tankdata?.id ? true : false}
                                        className="custom-select-dropdown"
                                        value={
                                          tankdata.productId
                                            ? (tankExchangeProduct || []).find(
                                                (prod) =>
                                                  prod?.value ===
                                                  tankdata.productId
                                              ) || null
                                            : null
                                        }
                                        onChange={(val) => {
                                          setProductError(false);
                                          updateTankData(
                                            index,
                                            "productId",
                                            val?.value || ""
                                          );
                                        }}
                                        placeholder="-- Select --"
                                        options={
                                          tankExchangeProduct.filter(
                                            (product) =>
                                              !(tankExchangeData || [])
                                                ?.map((tier) =>
                                                  Number(tier.productId)
                                                )
                                                ?.includes(
                                                  Number(product?.value)
                                                )
                                          ) || []
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-6 col-sm-4 col-lg col-xl">
                                    <div className="form-group">
                                      <label className="control-label">
                                        Sales Tax
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={
                                            <Tooltip id={`tooltip01`}>
                                              This Tax comes from Zipcode Sales
                                              Tax (%)
                                            </Tooltip>
                                          }
                                        >
                                          <i className="fa fa-info-circle top-1 m-l-5 m-r-5"></i>
                                        </OverlayTrigger>
                                      </label>
                                      <label
                                        className="control control-outline control-primary control--checkbox m-0"
                                        htmlFor={"sales-tax-" + index}
                                      >
                                        {" "}
                                        <input
                                          type="checkbox"
                                          id={"sales-tax-" + index}
                                          checked={tankdata.isSalesTax}
                                          onChange={(e) => {
                                            updateTankData(
                                              index,
                                              "isSalesTax",
                                              e.target.checked
                                            );
                                          }}
                                        />
                                        <div className="control__indicator"></div>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-6 col-sm-4 col-lg col-xl"></div>
                                  <div className="col-6 col-sm-4 col-lg col-xl"></div>
                                  <div className="col-6 col-sm-4 col-lg col-xl"></div>
                                  {/* {!tankdata?.id && (
                                  <div className="col-md-2">
                                    <div className="form-group">
                                      <label className="control-label d-block">
                                        &nbsp;
                                      </label>
                                      <button
                                        type="button"
                                        className="btn btn-primary px-3 mr-2"
                                        onClick={() => {
                                          if (tankdata?.id) {
                                            dispatch(
                                              updateVendorProductActionThunk(
                                                tankdata.id,
                                                tankdata?.isSalesTax || false,
                                                tankdata?.productId || "",
                                                vendorId
                                              )
                                            );
                                          } else {
                                            dispatch(
                                              addVendorProductActionThunk(
                                                vendorId,
                                                tankdata?.productId || "",
                                                tankdata?.isSalesTax || false,
                                                2
                                              )
                                            );
                                          }
                                          const clonetankExchangeData =
                                            _.cloneDeep(tankExchangeData);
                                          clonetankExchangeData[index][
                                            "pricing"
                                          ] = [{}];
                                          setTankExchangeData(
                                            clonetankExchangeData
                                          );
                                        }}
                                      >
                                        Save Product
                                      </button>
                                    </div>
                                  </div>
                                )} */}
                                </div>
                                {tankdata?.id && (
                                  <>
                                    <h5 className="font-weight-600 mb-2 mt-3">
                                      Set Pricing Tiers{" "}
                                    </h5>
                                    <div className="form-row">
                                      <div className="col-md-12 set-pricing-tiers">
                                        {tankdata?.pricing?.map(
                                          (category, priceIndex) => (
                                            <React.Fragment key={category?.id}>
                                              <div className="form-row mb-2">
                                                {tankdata?.isTiersSaved && (
                                                  <>
                                                    <div className="col-6 col-sm-4 col-lg col-xl">
                                                      <div className="form-group">
                                                        {priceIndex === 0 && (
                                                          <label className="control-label">
                                                            Category{" "}
                                                            <span className="text-danger">
                                                              *
                                                            </span>
                                                          </label>
                                                        )}
                                                        <Select
                                                          className={
                                                            priceIndex === 0
                                                              ? "custom-select-dropdown"
                                                              : "custom-select-dropdown"
                                                          }
                                                          value={
                                                            category?.categoryId
                                                              ? tankdata?.product?.details
                                                                  ?.map(
                                                                    (
                                                                      product
                                                                    ) => ({
                                                                      label: categories?.find(
                                                                        (
                                                                          category
                                                                        ) =>
                                                                          Number(
                                                                            category?.id
                                                                          ) ===
                                                                          Number(
                                                                            product?.categoryId
                                                                          )
                                                                      )?.name,
                                                                      value: product?.categoryId?.toString(),
                                                                    })
                                                                  )
                                                                  .find(
                                                                    (
                                                                      categories
                                                                    ) =>
                                                                      Number(
                                                                        categories?.value
                                                                      ) ===
                                                                      Number(
                                                                        category.categoryId
                                                                      )
                                                                  )
                                                              : null
                                                          }
                                                          onChange={(val) =>
                                                            updateTankCategories(
                                                              index,
                                                              "categoryId",
                                                              val?.value || "",
                                                              priceIndex
                                                            )
                                                          }
                                                          placeholder="-- Select --"
                                                          options={
                                                            tankExchangeProducts
                                                              ?.find(
                                                                (products) =>
                                                                  tankdata?.productId ===
                                                                  products?.id
                                                              )
                                                              ?.details?.map(
                                                                (product) => ({
                                                                  label:
                                                                    categories?.find(
                                                                      (
                                                                        categories
                                                                      ) =>
                                                                        Number(
                                                                          categories?.id
                                                                        ) ===
                                                                        Number(
                                                                          product
                                                                            ?.category
                                                                            ?.id
                                                                        )
                                                                    )?.name ||
                                                                    "",
                                                                  value:
                                                                    product?.category?.id?.toString() ||
                                                                    "",
                                                                })
                                                              ) || []
                                                          }
                                                        />
                                                        {(tankdata["pricing"] ||
                                                          [])[priceIndex]
                                                          ?.categoryError && (
                                                          <div className="text-danger">
                                                            {
                                                              (tankdata[
                                                                "pricing"
                                                              ] || [])[
                                                                priceIndex
                                                              ]
                                                                ?.categoryError as string
                                                            }
                                                          </div>
                                                        )}
                                                      </div>
                                                    </div>
                                                    <div className="col-6 col-sm-4 col-lg col-xl">
                                                      <div className="form-group">
                                                        {priceIndex === 0 && (
                                                          <label className="control-label">
                                                            Cylinder Size{" "}
                                                            <span className="text-danger">
                                                              *
                                                            </span>
                                                          </label>
                                                        )}
                                                        <div className="input-group">
                                                          <Select
                                                            className={
                                                              priceIndex === 0
                                                                ? "custom-select-dropdown flex-fill"
                                                                : "custom-select-dropdown flex-fill"
                                                            }
                                                            value={
                                                              category?.cylinderSizeId
                                                                ? CylinderSizesOption?.find(
                                                                    (size) =>
                                                                      Number(
                                                                        size?.value
                                                                      ) ===
                                                                      Number(
                                                                        category.cylinderSizeId
                                                                      )
                                                                  ) || null
                                                                : null
                                                            }
                                                            onChange={(val) =>
                                                              updateTankCategories(
                                                                index,
                                                                "cylinderSizeId",
                                                                val?.value ||
                                                                  "",
                                                                priceIndex
                                                              )
                                                            }
                                                            placeholder="-- Select --"
                                                            options={
                                                              CylinderSizesOption ||
                                                              []
                                                            }
                                                          />
                                                          {/* <div className="input-group-append">
                                                      <span className="input-group-text">
                                                        lbs
                                                      </span>
                                                    </div> */}

                                                          {(tankdata[
                                                            "pricing"
                                                          ] || [])[priceIndex]
                                                            ?.cylinderSizeError && (
                                                            <div className="text-danger">
                                                              {
                                                                (tankdata[
                                                                  "pricing"
                                                                ] || [])[
                                                                  priceIndex
                                                                ]
                                                                  ?.cylinderSizeError as string
                                                              }
                                                            </div>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                    <div className="col-6 col-sm-4 col-lg col-xl">
                                                      <div className="form-group">
                                                        {priceIndex === 0 && (
                                                          <label className="control-label">
                                                            Index Price
                                                            <OverlayTrigger
                                                              placement="top"
                                                              overlay={
                                                                <Tooltip
                                                                  id={`tooltip01`}
                                                                >
                                                                  {`This Price comes from Products > Added Index Price`}
                                                                </Tooltip>
                                                              }
                                                            >
                                                              <i className="fa fa-info-circle top-1 m-l-5 m-r-5"></i>
                                                            </OverlayTrigger>
                                                            <span className="text-danger">
                                                              *
                                                            </span>
                                                          </label>
                                                        )}
                                                        <input
                                                          type="text"
                                                          className={
                                                            priceIndex === 0
                                                              ? "form-control-plaintext"
                                                              : "form-control-plaintext"
                                                          }
                                                          value={`$${
                                                            tankdata?.product?.details?.find(
                                                              (product) =>
                                                                Number(
                                                                  category?.categoryId
                                                                ) ===
                                                                Number(
                                                                  product?.categoryId
                                                                )
                                                            )?.indexPrice
                                                              ? Number(
                                                                  tankdata?.product?.details?.find(
                                                                    (product) =>
                                                                      Number(
                                                                        category?.categoryId
                                                                      ) ===
                                                                      Number(
                                                                        product?.categoryId
                                                                      )
                                                                  )?.indexPrice
                                                                )?.toFixed(2)
                                                              : ""
                                                          }`}
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="col-6 col-sm-4 col-lg col-xl"></div>
                                                    <div className="col-6 col-sm-4 col-md-2"></div>
                                                  </>
                                                )}
                                              </div>
                                              <div className="form-row">
                                                {tankdata?.isNewProduct &&
                                                  priceIndex === 0 &&
                                                  tankdata?.tiers?.map(
                                                    (
                                                      tier,
                                                      innerIndex: number
                                                    ) => (
                                                      <React.Fragment
                                                        key={tier?.id}
                                                      >
                                                        <div
                                                          className={
                                                            tankdata?.isTiersSaved
                                                              ? "col-6 col-sm-4 col-lg col-xl"
                                                              : "col-lg-2"
                                                          }
                                                        >
                                                          <div className="form-group">
                                                            {
                                                              <div className="d-flex align-items-center mb-2">
                                                                <input
                                                                  type="number"
                                                                  readOnly={
                                                                    innerIndex ===
                                                                      0 &&
                                                                    tier?.from ===
                                                                      0
                                                                  }
                                                                  className={`form-control ${
                                                                    tier.to ===
                                                                      2147483647 &&
                                                                    innerIndex ===
                                                                      (
                                                                        tankdata?.tiers ||
                                                                        []
                                                                      )
                                                                        ?.length -
                                                                        1
                                                                      ? "w-60"
                                                                      : "w-50"
                                                                  }`}
                                                                  value={
                                                                    tier.from >
                                                                    -1
                                                                      ? tier?.from
                                                                      : ""
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) =>
                                                                    updateTankExchangeTiers(
                                                                      index,
                                                                      "from",
                                                                      e.target
                                                                        .value,
                                                                      tier?.position
                                                                    )
                                                                  }
                                                                />
                                                                -
                                                                <input
                                                                  type={
                                                                    tier.to ===
                                                                    2147483647
                                                                      ? "text"
                                                                      : "number"
                                                                  }
                                                                  className={`form-control ${
                                                                    tier.to ===
                                                                      2147483647 &&
                                                                    innerIndex ===
                                                                      (
                                                                        tankdata?.tiers ||
                                                                        []
                                                                      )
                                                                        ?.length -
                                                                        1
                                                                      ? "w-75"
                                                                      : "w-50"
                                                                  }`}
                                                                  value={
                                                                    tier.to ===
                                                                    2147483647
                                                                      ? "or more"
                                                                      : tier?.to
                                                                  }
                                                                  onChange={(
                                                                    e
                                                                  ) =>
                                                                    updateTankExchangeTiers(
                                                                      index,
                                                                      "to",
                                                                      e.target
                                                                        .value,
                                                                      tier?.position
                                                                    )
                                                                  }
                                                                  readOnly={
                                                                    tier?.to ===
                                                                    2147483647
                                                                  }
                                                                />
                                                                <span className="font-size-14 ml-2 text-nowrap">
                                                                  {" "}
                                                                  Tanks *{" "}
                                                                </span>
                                                                {/* {(
                                                                  tankdata?.tiers ||
                                                                  []
                                                                )?.length -
                                                                  1 ===
                                                                  innerIndex && (
                                                                  <button
                                                                    type="button"
                                                                    className="btn btn-primary px-3 mx-2"
                                                                    onClick={() => {
                                                                      handleTier(
                                                                        tankdata,
                                                                        index
                                                                      );
                                                                    }}
                                                                  >
                                                                    Save Tiers
                                                                  </button>
                                                                )} */}
                                                              </div>
                                                            }
                                                            {tier?.fromError && (
                                                              <div className="text-danger">
                                                                {
                                                                  tier?.fromError as string
                                                                }
                                                              </div>
                                                            )}
                                                            {tier?.toError && (
                                                              <div className="text-danger">
                                                                {
                                                                  tier?.toError as string
                                                                }
                                                              </div>
                                                            )}
                                                            {tankdata?.isTiersSaved && (
                                                              <>
                                                                <div className="d-flex">
                                                                  <div className="form-group flex-fill">
                                                                    <div
                                                                      className="input-group"
                                                                      style={{
                                                                        flexWrap:
                                                                          "nowrap",
                                                                      }}
                                                                    >
                                                                      <div className="input-group-prepend">
                                                                        <span className="input-group-text">
                                                                          $
                                                                        </span>
                                                                      </div>
                                                                      <input
                                                                        type="number"
                                                                        className="form-control w-100"
                                                                        value={
                                                                          (tankdata?.pricing ||
                                                                            [])[
                                                                            priceIndex
                                                                          ]?.price?.find(
                                                                            (
                                                                              price
                                                                            ) =>
                                                                              price?.vendorProductTiersId ===
                                                                              tier?.id
                                                                          )
                                                                            ?.price
                                                                        }
                                                                        onChange={(
                                                                          e
                                                                        ) =>
                                                                          updateTankCategories(
                                                                            index,
                                                                            "price",
                                                                            e
                                                                              .target
                                                                              .value,
                                                                            priceIndex,
                                                                            tier?.id
                                                                          )
                                                                        }
                                                                      />
                                                                    </div>
                                                                    {(category?.price ||
                                                                      [])[
                                                                      innerIndex
                                                                    ]
                                                                      ?.priceError && (
                                                                      <div className="text-danger">
                                                                        {
                                                                          (category?.price ||
                                                                            [])[
                                                                            innerIndex
                                                                          ]
                                                                            ?.priceError
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                                  {tankdata?.isTiersSaved &&
                                                                    innerIndex ===
                                                                      (
                                                                        tankdata?.tiers ||
                                                                        []
                                                                      )
                                                                        ?.length -
                                                                        1 &&
                                                                    ((
                                                                      tankdata?.pricing ||
                                                                      []
                                                                    )?.length >
                                                                    1 ? (
                                                                      <button
                                                                        type="button"
                                                                        className="btn btn-danger px-3"
                                                                        style={{
                                                                          marginLeft:
                                                                            ".5rem",
                                                                        }}
                                                                        onClick={() =>
                                                                          deleteCategory(
                                                                            index,
                                                                            category?.price ||
                                                                              [],
                                                                            priceIndex
                                                                          )
                                                                        }
                                                                      >
                                                                        <i className="fa fa-trash font-size-12 text-white"></i>
                                                                      </button>
                                                                    ) : (
                                                                      <>
                                                                        <button
                                                                          type="button"
                                                                          className="btn btn-dark px-3"
                                                                          style={{
                                                                            marginLeft:
                                                                              ".5rem",
                                                                          }}
                                                                          onClick={() =>
                                                                            handleCategory(
                                                                              index
                                                                            )
                                                                          }
                                                                        >
                                                                          <i className="fa fa-plus font-size-12 text-white"></i>
                                                                        </button>
                                                                      </>
                                                                    ))}
                                                                  {/* {tankdata?.isTiersSaved &&
                                                                    innerIndex ===
                                                                      (
                                                                        tankdata?.tiers ||
                                                                        []
                                                                      )
                                                                        ?.length -
                                                                        1 && (
                                                                      <button
                                                                        type="button"
                                                                        className="btn btn-primary px-3 mx-2"
                                                                        onClick={() =>
                                                                          handleTankExchangePrice(
                                                                            {
                                                                              categoryId:
                                                                                category?.categoryId,
                                                                              cylinderSizeId:
                                                                                category?.cylinderSizeId,
                                                                              price:
                                                                                category?.price,
                                                                            },
                                                                            index,
                                                                            _.cloneDeep(
                                                                              category
                                                                            ),
                                                                            priceIndex
                                                                          )
                                                                        }
                                                                      >
                                                                        Save
                                                                        Price
                                                                      </button>
                                                                    )} */}
                                                                </div>
                                                              </>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </React.Fragment>
                                                    )
                                                  )}

                                                {priceIndex > 0 &&
                                                  tankdata?.tiers?.map(
                                                    (tier, innerIndex) => (
                                                      <div
                                                        className="col-6 col-sm-4 col-lg col-xl"
                                                        key={tier?.id}
                                                      >
                                                        <div className="form-group">
                                                          {tankdata?.isTiersSaved && (
                                                            <>
                                                              <div className="d-flex">
                                                                <div className="form-group flex-fill">
                                                                  <div
                                                                    className="input-group"
                                                                    style={{
                                                                      flexWrap:
                                                                        "nowrap",
                                                                    }}
                                                                  >
                                                                    <div className="input-group-prepend">
                                                                      <span className="input-group-text">
                                                                        $
                                                                      </span>
                                                                    </div>
                                                                    <input
                                                                      type="number"
                                                                      className="form-control w-100"
                                                                      value={
                                                                        (tankdata?.pricing ||
                                                                          [])[
                                                                          priceIndex
                                                                        ]?.price?.find(
                                                                          (
                                                                            price
                                                                          ) =>
                                                                            price?.vendorProductTiersId ===
                                                                            tier?.id
                                                                        )?.price
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        updateTankCategories(
                                                                          index,
                                                                          "price",
                                                                          e
                                                                            .target
                                                                            .value,
                                                                          priceIndex,
                                                                          tier?.id
                                                                        )
                                                                      }
                                                                    />
                                                                  </div>
                                                                  {(category?.price ||
                                                                    [])[
                                                                    innerIndex
                                                                  ]
                                                                    ?.priceError && (
                                                                    <div className="text-danger">
                                                                      {
                                                                        (category?.price ||
                                                                          [])[
                                                                          innerIndex
                                                                        ]
                                                                          ?.priceError
                                                                      }
                                                                    </div>
                                                                  )}
                                                                </div>
                                                                {tankdata?.isTiersSaved &&
                                                                  innerIndex ===
                                                                    (
                                                                      tankdata?.tiers ||
                                                                      []
                                                                    )?.length -
                                                                      1 &&
                                                                  ((
                                                                    tankdata?.pricing ||
                                                                    []
                                                                  )?.length -
                                                                    1 !==
                                                                    priceIndex ||
                                                                  cylinderSizes?.length *
                                                                    (
                                                                      tankdata
                                                                        ?.product
                                                                        ?.details ||
                                                                      []
                                                                    )
                                                                      ?.length ===
                                                                    tankdata
                                                                      ?.pricing
                                                                      ?.length ? (
                                                                    <button
                                                                      type="button"
                                                                      className="btn btn-danger px-3"
                                                                      style={{
                                                                        marginLeft:
                                                                          ".5rem",
                                                                      }}
                                                                      onClick={() =>
                                                                        deleteCategory(
                                                                          index,
                                                                          category?.price ||
                                                                            [],
                                                                          priceIndex
                                                                        )
                                                                      }
                                                                    >
                                                                      <i className="fa fa-trash font-size-12 text-white"></i>
                                                                    </button>
                                                                  ) : (
                                                                    <>
                                                                      <button
                                                                        type="button"
                                                                        className="btn btn-dark px-3"
                                                                        style={{
                                                                          marginLeft:
                                                                            ".5rem",
                                                                        }}
                                                                        onClick={() =>
                                                                          handleCategory(
                                                                            index
                                                                          )
                                                                        }
                                                                      >
                                                                        <i className="fa fa-plus font-size-12 text-white"></i>
                                                                      </button>
                                                                    </>
                                                                  ))}
                                                                {/* {tankdata?.isTiersSaved &&
                                                                  innerIndex ===
                                                                    (
                                                                      tankdata?.tiers ||
                                                                      []
                                                                    )?.length -
                                                                      1 && (
                                                                    <button
                                                                      type="button"
                                                                      className="btn btn-primary px-3 mx-2"
                                                                      onClick={() =>
                                                                        handleTankExchangePrice(
                                                                          {
                                                                            categoryId:
                                                                              category?.categoryId,
                                                                            cylinderSizeId:
                                                                              category?.cylinderSizeId,
                                                                            price:
                                                                              category?.price,
                                                                          },
                                                                          index,
                                                                          _.cloneDeep(
                                                                            category
                                                                          ),
                                                                          priceIndex
                                                                        )
                                                                      }
                                                                    >
                                                                      Save Price
                                                                    </button>
                                                                  )} */}
                                                              </div>
                                                            </>
                                                          )}
                                                        </div>
                                                      </div>
                                                    )
                                                  )}

                                                <div
                                                  className={`col-6 col-sm-4 col-md-2 ${
                                                    tankdata?.isTiersSaved
                                                      ? " "
                                                      : "ml-4"
                                                  }`}
                                                >
                                                  <div className="d-flex flex-column flex-fill max-w-125">
                                                    {priceIndex === 0 && (
                                                      <button
                                                        type="button"
                                                        className="btn btn-primary px-3 h-35 lh-15 mb-2"
                                                        onClick={() => {
                                                          handleTier(
                                                            tankdata,
                                                            index
                                                          );
                                                        }}
                                                      >
                                                        Save Tiers
                                                      </button>
                                                    )}
                                                    {tankdata?.isTiersSaved && (
                                                      <button
                                                        type="button"
                                                        className="btn btn-primary px-3 h-35 lh-15"
                                                        onClick={() =>
                                                          handleTankExchangePrice(
                                                            {
                                                              categoryId:
                                                                category?.categoryId,
                                                              cylinderSizeId:
                                                                category?.cylinderSizeId,
                                                              price:
                                                                category?.price,
                                                            },
                                                            index,
                                                            _.cloneDeep(
                                                              category
                                                            ),
                                                            priceIndex
                                                          )
                                                        }
                                                      >
                                                        Save Price
                                                      </button>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </React.Fragment>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {productError && (
                              <div className="text-danger">
                                Please add atleast one fuel product
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group mb-4">
                          {tankExchangeData?.length - 1 === index &&
                            tankExchangeData?.length <
                              tankExchangeProduct?.length && (
                              <button
                                type="button"
                                className="btn btn-dark px-3 mr-2"
                                onClick={() =>
                                  setTankExchangeData([...tankExchangeData, {}])
                                }
                              >
                                <i className="fa fa-plus font-size-12 text-white"></i>{" "}
                                Add More
                              </button>
                            )}
                          <button
                            type="submit"
                            className="btn btn-primary px-3 mr-2"
                            onClick={() => {
                              if (tankdata?.id) {
                                dispatch(
                                  updateVendorProductActionThunk(
                                    tankdata.id,
                                    tankdata?.isSalesTax || false,
                                    tankdata?.productId || "",
                                    vendorId
                                  )
                                );
                              } else {
                                dispatch(
                                  addVendorProductActionThunk(
                                    vendorId,
                                    tankdata?.productId || "",
                                    tankdata?.isSalesTax || false,
                                    2
                                  )
                                );
                              }
                              setProductError(false);
                              const clonetankExchangeData = _.cloneDeep(
                                tankExchangeData
                              );
                              clonetankExchangeData[index]["pricing"] = [{}];
                              setTankExchangeData(clonetankExchangeData);
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <BarsLoader />
                )}
              </form>
              <div className="card-body pt-0 pb-2 border-bottom"></div>
              <h4 className="font-weight-600 mt-4">Products Pricing List</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table m-0">
                  <thead>
                    <tr>
                      <td>Order Type</td>
                      <td>Product</td>
                      {/* <td>Cylinder Size</td>
                      <td>
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
                      </td> */}
                      <td className="text-center">Pricing Tiers</td>
                    </tr>
                  </thead>
                  <tbody>
                    {tankExchangeData?.map(
                      (tankProduct) =>
                        tankProduct?.isTiersSaved && (
                          <tr key={tankProduct?.id}>
                            <td>Propane Tank Exchange Delivery</td>
                            <td>{tankProduct?.product?.name}</td>
                            <td className="text-center">
                              <a
                                onClick={() => {
                                  handleShowPricingTiersPropaneTank();
                                  setTankExchangeTier(tankProduct);
                                }}
                              >
                                <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                              </a>
                            </td>
                          </tr>
                        )
                    )}
                    {/* <tr>
                      <td>Propane Tank Exchange Delivery</td>
                      <td>Propane Ninja</td>
                      <td>15 lbs</td>
                      <td>$45.00</td>
                      <td className="text-center">
                        <a onClick={() => handleShowPricingTiersPropaneTank()}>
                          <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                        </a>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="card-footer bg-light text-right">
        <button
          type="button"
          className="btn btn-secondary clear-form mr-2"
          onClick={() => {
            setTabValue(2);
            history.push(history?.location?.pathname, { tab: 2 });
          }}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (
              !fuelDeliveryData?.filter((product) => product?.id)?.length &&
              !tankExchangeData?.filter((product) => product?.id)?.length
            ) {
              setProductError(true);
            } else {
              setTabValue(4);
              history.push(history?.location?.pathname, { tab: 4 });
            }
          }}
        >
          Next
        </button>
      </div>

      {showDeleteAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to change status?"
          onConfirm={hideAlert}
          onCancel={hideAlert}
          customButtons={
            <React.Fragment>
              <button
                className="btn btn-dark min-w-100 mr-3"
                onClick={hideAlert}
              >
                No
              </button>
              <button
                className="btn btn-danger min-w-100"
                onClick={() => {
                  productIndex &&
                    (tabInnerValue === 41
                      ? deleteFuelData(productIndex?.index, productIndex?.id)
                      : deleteTankData(productIndex?.id, productIndex?.index));
                }}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}

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
                {(fuelProductTiers?.tiers || [])?.map((tier) => (
                  <tr key={tier?.id}>
                    <td>
                      {tier?.from}
                      {tier?.to < 2147483647 ? ` - ${tier?.to}` : " or more"}
                    </td>
                    <td>
                      $
                      {(fuelProductTiers?.product?.details || [])[0]?.indexPrice
                        ? Number(
                            (fuelProductTiers?.product?.details || [])[0]
                              ?.indexPrice
                          )?.toFixed(2)
                        : "-"}
                    </td>
                    <td>
                      $
                      {(fuelProductTiers?.pricing?.find(
                        (price) => price?.vendorProductTiersId === tier?.id
                      ) as Record<string, string>)?.price
                        ? Number(
                            (fuelProductTiers?.pricing?.find(
                              (price) =>
                                price?.vendorProductTiersId === tier?.id
                            ) as Record<string, string>)?.price
                          )?.toFixed(2)
                        : "-"}
                    </td>
                    <td>
                      $
                      {(
                        Number(
                          (fuelProductTiers?.product?.details || [])[0]
                            ?.indexPrice || 0
                        ) +
                        Number(
                          fuelProductTiers?.pricing?.find(
                            (price) => price?.vendorProductTiersId === tier?.id
                          )?.price || 0
                        )
                      )?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
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
                onClick={() => setTabvalue1(21)}
                className={
                  tabValue1 === 21 ? "nav-link active show" : "nav-link"
                }
              >
                Spare Tank
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                onClick={() => setTabvalue1(22)}
                className={
                  tabValue1 === 22 ? "nav-link active show" : "nav-link"
                }
              >
                Exchange
              </a>
            </li>
          </ul>
          <div className="tab-content pricing-tier-modal">
            {tabValue1 === 21 ? (
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
                                      {
                                        tankExchangeTier?.tiers?.find(
                                          (tier) =>
                                            tier?.id ===
                                            innerPrice?.vendorProductTiersId
                                        )?.from
                                      }
                                      {tankExchangeTier?.tiers?.find(
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
                                          )?.to}
                                    </td>
                                    <td>
                                      {
                                        cylinderSizes?.find(
                                          (size) =>
                                            size?.id === price?.cylinderSizeId
                                        )?.cylinderSize
                                      }{" "}
                                      lbs
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
                                      $
                                      {tankExchangeTier?.product?.details?.find(
                                        (category) =>
                                          category?.categoryId ===
                                          price?.categoryId
                                      )?.indexPrice
                                        ? Number(
                                            tankExchangeTier?.product?.details?.find(
                                              (category) =>
                                                category?.categoryId ===
                                                price?.categoryId
                                            )?.indexPrice
                                          )?.toFixed(2)
                                        : "-"}
                                    </td>
                                    <td>${innerPrice?.price}</td>
                                    <td>
                                      $
                                      {(
                                        Number(
                                          tankExchangeTier?.product?.details?.find(
                                            (category) =>
                                              category?.categoryId ===
                                              price?.categoryId
                                          )?.indexPrice || 0
                                        ) + Number(innerPrice?.price || 0)
                                      )?.toFixed(2)}
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
                      {/* <tr>
                        <td>0-3</td>
                        <td>$45.00</td>
                        <td>$12.99</td>
                        <td>$4.35</td>
                        <td>$62.34</td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
            {tabValue1 === 22 ? (
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
                      {/* <tr>
                        <td>0-3</td>
                        <td>$9.00</td>
                        <td>$10.99</td>
                        <td>$1.50</td>
                        <td>$21.49</td>
                      </tr> */}
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
                                      {
                                        tankExchangeTier?.tiers?.find(
                                          (tier) =>
                                            tier?.id ===
                                            innerPrice?.vendorProductTiersId
                                        )?.from
                                      }
                                      {tankExchangeTier?.tiers?.find(
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
                                          )?.to}
                                    </td>
                                    <td>
                                      {
                                        cylinderSizes?.find(
                                          (size) =>
                                            size?.id === price?.cylinderSizeId
                                        )?.cylinderSize
                                      }{" "}
                                      lbs
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
                                      $
                                      {tankExchangeTier?.product?.details?.find(
                                        (category) =>
                                          category?.categoryId ===
                                          price?.categoryId
                                      )?.indexPrice
                                        ? Number(
                                            tankExchangeTier?.product?.details?.find(
                                              (category) =>
                                                category?.categoryId ===
                                                price?.categoryId
                                            )?.indexPrice
                                          )?.toFixed(2)
                                        : "-"}
                                    </td>
                                    <td>${innerPrice?.price}</td>
                                    <td>
                                      $
                                      {(
                                        Number(
                                          tankExchangeTier?.product?.details?.find(
                                            (category) =>
                                              category?.categoryId ===
                                              price?.categoryId
                                          )?.indexPrice || 0
                                        ) + Number(innerPrice?.price || 0)
                                      )?.toFixed(2)}
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

export default ProductPricing;

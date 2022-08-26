/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Tab, Tabs } from "react-bootstrap";
import FuelDeliveryProduct from "../../components/products/FuelDeliveryProduct";
import TankExchangeProduct from "../../components/products/TankExchangeProduct";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryActionThunk } from "../../store/category/category.action.async";
import TRootState from "../../store/root.types";
import { getProductsActionThunk } from "../../store/products/products.action.async";

interface Prop {
  history: RouteComponentProps["history"];
}

const Products: React.FC<Prop> = ({ history }) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(
    history?.location?.pathname || "/products/fuel-delivery"
  );
  const { fuelDeliveryProducts, tankExchangeProducts } = useSelector(
    (state: TRootState) => state?.products?.productsData?.products || {}
  );

  useEffect(() => {
    dispatch(getCategoryActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getProductsActionThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  return (
    <React.Fragment>
      <div id="app">
        <div className="d-block d-lg-none">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <header className="page-header">
              <div className="d-flex align-items-center">
                <div className="mr-auto">
                  <h1>Products</h1>
                </div>
              </div>
            </header>
            <section className="page-content container-fluid">
              <div className="card card-tabs clearfix">
                <div className="card-body p-0">
                  <div className="tab-content">
                    <Tabs
                      activeKey={tabValue}
                      onSelect={(k: string | null) => {
                        setTabValue(k || "");
                        history.push(`${k}`);
                      }}
                      transition={false}
                      id="noanim-tab-example"
                      className="primary-tabs"
                      style={{ marginBottom: "5px" }}
                    >
                      <Tab
                        eventKey="/products/fuel-delivery"
                        title="Fuel Delivery"
                      >
                        <FuelDeliveryProduct
                          fueldeliveryProduct={fuelDeliveryProducts}
                        />
                      </Tab>
                      <Tab
                        eventKey="/products/tank-exchange"
                        title="Propane Tank Exchange Delivery"
                      >
                        <TankExchangeProduct
                          tankExchangeProduct={tankExchangeProducts}
                        />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Products);

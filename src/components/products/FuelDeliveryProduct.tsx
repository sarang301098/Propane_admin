import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import FuelDeliveryModal from "./FuelDeliveryModal";
import SweetAlert from "react-bootstrap-sweetalert";
import { TProductsPayload } from "../../store/products/products.types";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";
import {
  deleteProductActionThunk,
  getProductsActionThunk,
} from "../../store/products/products.action.async";
import { AppendedMyComponent } from "../appendToBody/appendToBody";
interface Prop {
  fueldeliveryProduct: TProductsPayload[];
}

const FuelDeliveryProduct: React.FC<Prop> = ({ fueldeliveryProduct }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [editFuelProduct, setEditFuelProduct] = useState<{
    id?: number;
    name: string;
    logo: string;
    discount: number;
    status: number;
    indexPrice: number;
  } | null>(null);
  const handleShow = () => setShow(true);
  const hideAlert = () => setSweetAlert(false);
  const showAlert = () => setSweetAlert(true);
  const loading = useSelector((state: TRootState) => state.products.loading);
  const handleDelete = () => {
    dispatch(deleteProductActionThunk(productId, 1));
    hideAlert();
  };
  return (
    <>
      <div className="tab-pane fadeIn active" id="tab-1">
        <div className="actions top-right">
          <div className="d-flex align-items-center">
            <div className="m-l-10">
              <div className="input-group w-250">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  title="Search"
                  value={searchProduct}
                  onChange={(e) => {
                    setSearchProduct(e.target.value);
                  }}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="input-group-text pointer"
                    onClick={() =>
                      dispatch(
                        getProductsActionThunk(searchProduct, undefined, [], 1)
                      )
                    }
                  >
                    <span className="fa fa-search"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="m-l-10">
              <button
                onClick={() => {
                  setSearchProduct("");
                  dispatch(getProductsActionThunk("", undefined, [], 1));
                }}
                type="button"
                className="btn btn-secondary"
              >
                Reset
              </button>
            </div>
            <div className="m-l-10">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setEditFuelProduct(null);
                  handleShow();
                }}
              >
                Add New Product
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover m-0">
            <thead>
              <tr>
                <th className="w-400">Product Name</th>
                <th>Product Logo</th>
                <th>Index Price</th>
                <th className="text-center">Product Discount</th>
                <th className="table-field-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                fueldeliveryProduct?.length > 0 ? (
                  fueldeliveryProduct?.map((product) => (
                    <tr key={product?.id}>
                      <td>{product?.name}</td>
                      <td>
                        <img
                          src={product?.logo}
                          className="h-40 w-40 rounded-circle o-cover"
                          alt="Product Logo"
                        />
                      </td>
                      <td>${product?.details[0]?.indexPrice}</td>
                      <td className="text-center">
                        {product?.details[0]?.discount}%
                      </td>
                      <td className="table-field-actions">
                        <Dropdown className="btn-group">
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="btn btn-sm btn-icon-only"
                          >
                            <i className="icon dripicons-dots-3 zmdi-hc-fw"></i>
                          </Dropdown.Toggle>
                          <AppendedMyComponent>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                href="#"
                                onClick={() => {
                                  setEditFuelProduct({
                                    name: product?.name,
                                    logo: product?.logo,
                                    indexPrice: Number(
                                      product?.details[0]?.indexPrice
                                    ),
                                    discount: Number(
                                      product?.details[0]?.discount
                                    ),
                                    status: product?.status,
                                    id: product?.details[0]?.id,
                                  });
                                  setProductId(product?.id);
                                  handleShow();
                                }}
                              >
                                <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#"
                                onClick={() => {
                                  showAlert();
                                  setProductId(product?.id);
                                }}
                              >
                                <i className="fa fa-trash-alt fa-fw text-accent-custom"></i>{" "}
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </AppendedMyComponent>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center" }}>
                      No records found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan={5}>
                    <BarsLoader />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <FuelDeliveryModal
        show={show}
        setShow={setShow}
        editFuelProduct={editFuelProduct}
        productId={productId}
      />

      {sweetAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to delete product?"
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
                onClick={handleDelete}
              >
                Yes
              </button>
            </React.Fragment>
          }
        ></SweetAlert>
      )}
    </>
  );
};

export default FuelDeliveryProduct;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import Select from "react-select";
import TankExchangeModal from "./TankExchangeModal";
import { TProductsPayload } from "../../store/products/products.types";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";
import {
  deleteProductActionThunk,
  getProducByIdActionThunk,
  getProductsActionThunk,
} from "../../store/products/products.action.async";
import { useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { AppendedMyComponent } from "../appendToBody/appendToBody";

interface Prop {
  tankExchangeProduct: TProductsPayload[];
}
const TankExchangeProduct: React.FC<Prop> = ({ tankExchangeProduct }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectCategory("All");
    setSearchProduct("");
  }, [history.location.pathname]);

  const { categories } = useSelector(
    (state: TRootState) => state?.category?.categories
  );

  const loading = useSelector((state: TRootState) => state?.products?.loading);

  let myCategories = categories
    ?.filter((category) => category?.orderType !== null)
    .map((category) => ({
      value: category?.id?.toString(),
      label: category?.name,
    }));
  myCategories.unshift({ value: "All", label: "All" });
  const [productDetails, setProductDetails] = useState<
    | {
        id?: number;
        category?: { id: string; name: string };
        indexPrice: number | string;
        discount: number | string;
        isDeleted?: boolean;
      }[]
    | null
  >(null);
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);

  const handleShowDescription = () => setShowDescriptionModal(true);
  const handleShowPropaneTank = () => setShow(true);
  const hideAlert = () => setSweetAlert(false);
  const showAlert = () => setSweetAlert(true);
  const [selectCategory, setSelectCategory] = useState("All");
  const [productId, setProductId] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const handleCloseDescription = () => {
    setShowDescriptionModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteProductActionThunk(productId, 2));
    hideAlert();
  };
  return (
    <>
      <TankExchangeModal
        setShow={setShow}
        show={show}
        categories={myCategories.filter(
          (category) => category?.value !== "All"
        )}
        addNew={addNew}
        productId={productId}
        setProductDetails={setProductDetails}
      />
      <div className="tab-pane fadeIn active" id="tab-2">
        <div className="actions top-right">
          <div className="d-flex align-items-center">
            <div className="m-l-10">
              <div className="input-group w-250">
                <input
                  type="text"
                  className="form-control w-110"
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
                        getProductsActionThunk(
                          searchProduct,
                          selectCategory,
                          [],
                          2
                        )
                      )
                    }
                  >
                    <span className="fa fa-search"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="m-l-10">
              <Select
                className="custom-select-dropdown w-150"
                value={
                  selectCategory
                    ? (myCategories || []).find(
                        (prod) => prod?.value === selectCategory
                      ) || null
                    : null
                }
                onChange={(val) => {
                  setSelectCategory(val?.value || "All");
                  dispatch(getProductsActionThunk(searchProduct, val?.value));
                }}
                placeholder="-- Category --"
                options={myCategories || []}
              />
            </div>

            <div className="m-l-10">
              <button
                onClick={() => {
                  setSearchProduct("");
                  setSelectCategory("All");
                  dispatch(getProductsActionThunk("", "All", [], 2));
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
                  setAddNew(true);
                  handleShowPropaneTank();
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
                <th className="text-center">Description</th>
                <th className="table-field-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading ? (
                tankExchangeProduct?.length > 0 ? (
                  tankExchangeProduct?.map((product, index) => (
                    <tr key={product?.id || index}>
                      <td>{product?.name}</td>
                      <td>
                        <img
                          src={product?.logo}
                          className="h-40 w-40 rounded-circle o-cover"
                          alt="Product Logo"
                        />
                      </td>
                      <td className="text-center">
                        <a
                          onClick={() => {
                            setProductDetails(product?.details || null);
                            handleShowDescription();
                          }}
                        >
                          <i className="fa fa-info-circle fa-lg text-accent-custom"></i>
                        </a>
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
                                  dispatch(
                                    getProducByIdActionThunk(product?.id)
                                  );
                                  setAddNew(false);
                                  handleShowPropaneTank();
                                }}
                              >
                                <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                href="#"
                                onClick={() => {
                                  showAlert();
                                  setProductId(product.id);
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

      <Modal
        centered
        show={showDescriptionModal}
        onHide={() => handleCloseDescription()}
      >
        <Modal.Header>
          <h4 className="modal-title m">Description</h4>
          <button className="close" onClick={() => handleCloseDescription()}>
            <span aria-hidden="true" className="zmdi zmdi-close"></span>
          </button>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="table-responsive">
            <table className="table m-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Index Price</th>
                  <th className="text-center">Product Discount</th>
                </tr>
              </thead>
              <tbody>
                {productDetails &&
                  productDetails?.map(
                    (detail) =>
                      !detail?.isDeleted && (
                        <tr>
                          <td>{detail?.category && detail?.category?.name}</td>
                          <td>${detail?.indexPrice}</td>
                          <td className="text-center">{detail?.discount}%</td>
                        </tr>
                      )
                  )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

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

export default TankExchangeProduct;

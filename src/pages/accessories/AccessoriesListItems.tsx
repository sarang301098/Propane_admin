import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../../components/loader/Loader";
import Dropdown from "react-bootstrap/Dropdown";
import FireTable from "../../assets/img/fire-table.png";
import AddAccessoriesModal from "../../components/accessories/AddAccessoriesModal";
import {
  deleteAcccessoriesActionThunk,
  updateAccessoriesActionThunk,
} from "../../store/accessories/accessories.action.async";
import SweetAlert from "react-bootstrap-sweetalert";
import { AppendedMyComponent } from "../../components/appendToBody/appendToBody";
import { useHistory } from "react-router-dom";

interface Prop {
  getAction: Function;
}

const AccessoriesListItems: React.FC<Prop> = ({ getAction }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = history?.location?.state as { page: string };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );
  const { loading } = useSelector((state: TRootState) => state.accessories);
  const { accessories, count } = useSelector(
    (state: TRootState) => state.accessories.accessoriesData
  );
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [id, setId] = useState("");
  const [editAccessory, setEditAccessory] = useState<{
    accesoryName: string;
    accesoryPrice: number;
    accessoryImage: string;
    accessoryDescription: string;
  } | null>(null);
  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const updateAction = (
    name: string,
    image: string,
    price: number,
    description: string
  ) => {
    dispatch(updateAccessoriesActionThunk(name, image, price, description, id));
  };

  const handleDelete = () => {
    const isLastPage =
      Number(state?.page || 1) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteAcccessoriesActionThunk(id, isLastPage ? getAction : undefined)
    );
    hideAlert();
  };

  return (
    <>
      <AddAccessoriesModal
        show={show}
        setShow={setShow}
        submitAction={updateAction}
        editAccessories={editAccessory}
      />
      <div className="table-responsive">
        <table className="table table-hover m-0">
          <thead>
            <tr>
              <th className="w-400">Accessories Name</th>
              <th>Accessories Image</th>
              <th>Price</th>
              <th>Description</th>
              <th className="table-field-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              accessories?.length > 0 ? (
                accessories?.map((accessory) => (
                  <tr key={accessory.id}>
                    <td>{accessory.name}</td>
                    <td>
                      <img
                        src={FireTable}
                        className="h-40 w-40 rounded-circle o-cover"
                        alt="Product Logo"
                      />
                    </td>
                    <td>${accessory.price}</td>
                    <td>{accessory.description}</td>
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
                              onClick={async () => {
                                await setEditAccessory({
                                  accesoryName: accessory.name,
                                  accesoryPrice: accessory.price,
                                  accessoryDescription: accessory.description,
                                  accessoryImage: accessory.image,
                                });
                                await setId(accessory.id);
                                handleShow();
                              }}
                            >
                              <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={() => {
                                setId(accessory.id);
                                showAlert();
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
                    No records available
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  <BarsLoader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sweetAlert && (
        <SweetAlert
          danger
          showCancel
          title="Are you sure want to delete?"
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

export default AccessoriesListItems;

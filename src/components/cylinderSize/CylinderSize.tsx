import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  deleteCylinderSizeActionThunk,
  updateCylinderSizeActionThunk,
} from "../../store/cylinderSize/cylinderSize.action.async";
import TRootState from "../../store/root.types";
import { AppendedMyComponent } from "../appendToBody/appendToBody";
import { BarsLoader } from "../loader/Loader";
import CylinderSizeModal from "./CylinderSizeModal";

interface Prop {
  getAction: Function;
}

const CylinderSizeList: React.FC<Prop> = ({ getAction }) => {
  const [show, setShow] = useState(false);
  const [sweetAlert, setSweetAlert] = useState(false);
  const [cylinderSize, setCylinderSize] = useState<string | number>("");
  const [id, setId] = useState("");
  const [isUpdate, seIsUpdate] = useState(false);
  const { loading } = useSelector((state: TRootState) => state.cylinderSize);

  const { cylinderSizes } = useSelector(
    (state: TRootState) => state.cylinderSize.cylinderSizeData
  );
  const showAlert = () => {
    setSweetAlert(true);
  };
  const hideAlert = () => {
    setSweetAlert(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const dispatch = useDispatch();

  const updateCylinderSize = (id: number, cylinderSize: number) => {
    dispatch(updateCylinderSizeActionThunk(id, cylinderSize));
  };
  const itemsPerPage = useSelector(
    (state: TRootState) => state?.pagination?.perPageItems
  );

  const count = useSelector(
    (state: TRootState) => state?.cylinderSize?.cylinderSizeData?.count
  );

  const history = useHistory();

  const state = history?.location?.state as { page: string };

  const handleDelete = () => {
    const isLastPage = Number(state?.page) !== Math.ceil(count / itemsPerPage);
    dispatch(
      deleteCylinderSizeActionThunk(
        Number(id),
        isLastPage ? getAction : undefined
      )
    );
    hideAlert();
  };
  return (
    <div className="table-responsive">
      <CylinderSizeModal
        show={show}
        setShow={setShow}
        submitAction={updateCylinderSize}
        isUpdate={isUpdate}
        id={id}
        cylinderSize={cylinderSize}
      />
      <table className="table table-hover m-0">
        <thead>
          <tr>
            <th>Size</th>
            <th className="table-field-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            cylinderSizes?.length > 0 ? (
              cylinderSizes?.map((cylinder, index) => (
                <tr key={index}>
                  <td>{cylinder.cylinderSize} lbs</td>
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
                              setId(cylinder.id.toString());
                              setCylinderSize(cylinder.cylinderSize.toString());
                              seIsUpdate(true);
                              handleShow();
                            }}
                          >
                            <i className="fa fa-edit fa-fw text-accent-custom"></i>{" "}
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#"
                            onClick={(e) => {
                              showAlert();
                              setId(cylinder.id.toString());
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

      <React.Fragment>
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
      </React.Fragment>
    </div>
  );
};
export default CylinderSizeList;

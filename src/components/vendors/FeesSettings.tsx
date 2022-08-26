import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateVendorActionThunk } from "../../store/vendor/vendor.action.async";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import TRootState from "../../store/root.types";
import { BarsLoader } from "../loader/Loader";
import { fixPrice } from "../../utils/helpers/priceFixed";

interface Prop {
  setTabValue: Function;
  tabValue: number;
}

const FeesSettings: React.FC<Prop> = ({ setTabValue, tabValue }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { vendorId } = useParams<{ vendorId: string }>();

  const vendor = useSelector(
    (state: TRootState) => state?.vendor?.singleVendorData?.vendor
  );
  const loading = useSelector((state: TRootState) => state?.vendor?.loading);

  const feesSettingsSchema = Yup.object().shape({
    comissionFee: Yup.string().required("Commission fees is required"),
    leakageFee: Yup.string().required("Leakage fees is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: feesSettingsSchema,
    initialValues: {
      comissionFee: (vendor && fixPrice(vendor?.comissionFee)) || "",
      leakageFee: (vendor && fixPrice(vendor?.leakageFee || "")) || "",
    },
    onSubmit: (values) => {
      dispatch(
        updateVendorActionThunk(
          {
            comissionFee: Number(values.comissionFee),
            leakageFee: Number(values?.leakageFee),
            currentTab: tabValue,
          },
          vendorId,
          () => history.push("/vendors/list")
        )
      );
    },
  });

  const { errors, touched } = formik;
  return (
    <form
      onSubmit={(e) => {
        formik.handleSubmit(e);
        e.preventDefault();
      }}
    >
      {loading ? (
        <BarsLoader />
      ) : (
        <div className="tab-pane fadeIn active" id="tab-7">
          <div className="card-body form-horizontal mt-3">
            <div className="form-group row">
              <label className="control-label text-md-right col-md-4">
                Vendor Commission Fee <span className="text-danger">*</span>
              </label>
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    name="comissionFee"
                    value={formik.values?.comissionFee}
                    onChange={formik.handleChange}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                </div>
                {errors?.comissionFee && touched?.comissionFee && (
                  <div className="text-danger">{errors?.comissionFee}</div>
                )}
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label text-md-right col-md-4">
                Leak Check
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip01`}>
                      Additional services – Leakage, Valve check
                    </Tooltip>
                  }
                >
                  <i className="fa fa-info-circle top-1 m-l-5 m-r-5"></i>
                </OverlayTrigger>
                <span className="text-danger">*</span>
              </label>
              <div className="col-md-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">$</span>
                  </div>
                  <input
                    type="number"
                    min={0}
                    className="form-control"
                    name="leakageFee"
                    value={formik.values?.leakageFee}
                    onChange={formik.handleChange}
                  />
                </div>
                {errors?.leakageFee && touched?.leakageFee && (
                  <div className="text-danger">{errors?.leakageFee}</div>
                )}
              </div>
            </div>
          </div>
          <div className="card-footer bg-light text-right">
            <button
              type="button"
              className="btn btn-secondary clear-form mr-2"
              onClick={() => {
                setTabValue(5);
                history.push(history?.location?.pathname, {
                  tab: 5,
                });
              }}
            >
              Back
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default FeesSettings;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { paginationPerPage } from "../../store/pagination/pagination.action";
import {
  getAppSettingsDataActionThunk,
  updateAppSettingsDataActionThunk,
} from "../../store/appSettings/appSettings.actions.async";
import TRootState from "../../store/root.types";
import AppSettings from "./list";
import { BarsLoader } from "../../components/loader/Loader";

const General = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const itemsPerPage = useSelector((state: TRootState) => state.pagination.perPageItems);
  const appSettingsGeneral = useSelector((state: TRootState) => state.appSettings.appSettingsGeneral);
  const loading = useSelector((state: TRootState) => state.appSettings.loading);

  const [perPage, setPerPage] = useState<string | number>(itemsPerPage);
  const [value1, setValue1] = useState<string | number>(appSettingsGeneral[0]?.value);
  const [value2, setValue2] = useState<string | number>(appSettingsGeneral[1]?.value);
  const [value3, setValue3] = useState<string | number>(appSettingsGeneral[2]?.value);
  const [active1, setActive1] = useState(appSettingsGeneral[0]?.isActive);
  const [active2, setActive2] = useState(appSettingsGeneral[1]?.isActive);
  const [active3, setActive3] = useState(appSettingsGeneral[2]?.isActive);

  /**
   * app settings submit function
   * @param e
   * @returns
   */
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      value1 < 0 ||
      value2 < 0 ||
      value3 < 0 ||
      value1 === "" ||
      value2 === "" ||
      value3 === "" ||
      value1?.toString()?.length > 10 ||
      value2?.toString()?.length > 10 ||
      value3?.toString()?.length > 10 ||
      perPage < 1 ||
      perPage === "" ||
      perPage?.toString()?.length > 10
    ) {
      return;
    } else {
      dispatch(
        updateAppSettingsDataActionThunk({
          appSettings: [
            { id: appSettingsGeneral[0]?.id, isActive: active1, value: +value1 },
            { id: appSettingsGeneral[1]?.id, isActive: active2, value: +value2 },
            { id: appSettingsGeneral[2]?.id, isActive: active3, value: +value3 },
          ],
        })
      );

      dispatch(paginationPerPage(+perPage));
    }
  };

  useEffect(() => {
    if (appSettingsGeneral.length < 1) {
      dispatch(getAppSettingsDataActionThunk());
    }
    setValue1(appSettingsGeneral[0]?.value || 0);
    setValue2(appSettingsGeneral[1]?.value || 0);
    setValue3(appSettingsGeneral[2]?.value || 0);
    setActive1(appSettingsGeneral[0]?.isActive || false);
    setActive2(appSettingsGeneral[1]?.isActive || false);
    setActive3(appSettingsGeneral[2]?.isActive || false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appSettingsGeneral.length]);

  return (
    <AppSettings>
      <div className="tab-pane fadeIn active" id="tab-2">
        {loading ? (
          <div className="card-body">
            <BarsLoader />
          </div>
        ) : appSettingsGeneral && appSettingsGeneral.length > 0 ? (
          <form className="form-horizontal" onSubmit={submitHandler}>
            <div className="card-body">
              <div className="mt-3">
                <div className="form-group row">
                  <label className="control-label text-md-right col-md-3">
                    {appSettingsGeneral[0]?.label}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-5">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        value={value1}
                        onChange={(e) => {
                          setValue1(e.target.value);
                        }}
                        step={0.1}
                      />
                    </div>
                    {(value1 === "" ? <span className="text-danger">This field is required</span> : null) ||
                      (value1 < 0 ? (
                        <span className="text-danger">
                          Please enter positive value <br />
                        </span>
                      ) : null) ||
                      (value1?.toString()?.length > 10 ? (
                        <span className="text-danger">Value is too long</span>
                      ) : null)}
                  </div>
                  <div className="col-md-3 align-self-center">
                    <input
                      className="tgl tgl-light tgl-primary"
                      id={`cb1`}
                      type="checkbox"
                      checked={active1}
                      onChange={(e) => {
                        setActive1(e.target.checked);
                      }}
                    />
                    <label className="tgl-btn m-0" htmlFor={`cb1`}></label>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="control-label text-md-right col-md-3">
                    {appSettingsGeneral[1]?.label}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-5">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        value={value2}
                        onChange={(e) => {
                          setValue2(e.target.value);
                        }}
                        step={0.1}
                      />
                    </div>
                    {(value2 === "" ? <span className="text-danger">This field is required</span> : null) ||
                      (value2 < 0 ? (
                        <span className="text-danger">
                          Please enter positive value <br />
                        </span>
                      ) : null) ||
                      (value2?.toString()?.length > 10 ? (
                        <span className="text-danger">Value is too long</span>
                      ) : null)}
                  </div>
                  <div className="col-md-3 align-self-center">
                    <input
                      className="tgl tgl-light tgl-primary"
                      id={`cb2`}
                      type="checkbox"
                      checked={active2}
                      onChange={(e) => {
                        setActive2(e.target.checked);
                      }}
                    />
                    <label className="tgl-btn m-0" htmlFor={`cb2`}></label>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="control-label text-md-right col-md-3">
                    {appSettingsGeneral[2]?.label}
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-5">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        type="number"
                        className="form-control"
                        value={value3}
                        onChange={(e) => {
                          setValue3(e.target.value);
                        }}
                        step={0.1}
                      />
                    </div>
                    {(value3 === "" ? <span className="text-danger">This field is required</span> : null) ||
                      (value3 < 0 ? (
                        <span className="text-danger">
                          Please enter positive value <br />
                        </span>
                      ) : null) ||
                      (value3?.toString()?.length > 10 ? (
                        <span className="text-danger">Value is too long</span>
                      ) : null)}
                  </div>
                  <div className="col-md-3 align-self-center">
                    <input
                      className="tgl tgl-light tgl-primary"
                      id={`cb3`}
                      type="checkbox"
                      checked={active3}
                      onChange={(e) => {
                        setActive3(e.target.checked);
                      }}
                    />
                    <label className="tgl-btn m-0" htmlFor={`cb3`}></label>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="control-label text-md-right col-md-3">
                    Per Page List Limit Page
                    <span className="text-danger">*</span>
                  </label>
                  <div className="col-md-5">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={perPage}
                        onChange={(e) =>
                          setPerPage(
                            e.target.value === ""
                              ? e.target.value
                              : Number(parseFloat(e?.target?.value).toFixed())
                          )
                        }
                        step={1}
                      />
                    </div>
                    {(perPage === "" ? <span className="text-danger">This field is required</span> : null) ||
                      (perPage < 1 ? (
                        <span className="text-danger">
                          Please enter positive value (Minimum 1) <br />
                        </span>
                      ) : null) ||
                      (perPage?.toString()?.length > 10 ? (
                        <span className="text-danger">Value is too long</span>
                      ) : null)}
                  </div>
                </div>

                <div className="form-group row">
                  <label className="control-label text-md-right col-md-3"></label>
                  <div className="col-md-5">
                    <label className="text-info">
                      <strong>Note:</strong> If you put blank value in the system, we will consider default
                      value=0.
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-light text-right">
              <button
                type="button"
                className="btn btn-secondary clear-form mr-2"
                onClick={() => history.goBack()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        ) : (
          <div className="card-body" style={{ textAlign: "center" }}>
            No Data Found
          </div>
        )}
      </div>
    </AppSettings>
  );
};

export default General;

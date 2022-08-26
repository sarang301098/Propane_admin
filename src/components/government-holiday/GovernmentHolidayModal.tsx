import React from "react";
import { Modal } from "react-bootstrap";
import { MultiSelectCheckbox, SingleDatePickerComp } from "../../components";
import { useSelector } from "react-redux";
import { components, OptionProps } from "react-select";
import makeAnimated from "react-select/animated";
import TRootState from "../../store/root.types";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";

interface Prop {
  show: boolean;
  filter: string;
  setShow: Function;
  submitAction: Function;
  editHoliday?: {
    date: string;
    vendor: { label: string; value: string }[];
    description: string;
  } | null;
}

const Option = (props: OptionProps) => {
  return (
    <div>
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label className="m-0 ml-2">{props.label}</label>
        </div>
      </components.Option>
    </div>
  );
};

const GovernmentHolidayModal: React.FC<Prop> = ({
  show,
  setShow,
  submitAction,
  editHoliday,
}) => {
  const HolidaySchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    vendor: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string(),
          label: Yup.string(),
        })
      )
      .min(1, "Vendor is required"),
    description: Yup.string()
      .required("Description is required")
      .max(255, "Description must be less than 255 characters."),
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: HolidaySchema,
    initialValues: {
      date: (editHoliday && editHoliday?.date) || "",
      vendor: (editHoliday && editHoliday?.vendor) || [],
      description: (editHoliday && editHoliday?.description) || "",
    },
    onSubmit: (values, { resetForm }) => {
      submitAction &&
        submitAction(
          values.date,
          values.vendor?.map((vendor) => vendor?.value),
          values.description
        );

      setShow(false);
      resetForm();
    },
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (selected: { label: string; value: string }[]) => {
    formik.setValues({ ...formik.values, vendor: selected });
  };
  const animatedComponents = makeAnimated();

  const { vendor } = useSelector(
    (state: TRootState) => state?.governmentHoliday?.vendorsData
  );
  const { holidays } = useSelector(
    (state: TRootState) => state.governmentHoliday?.holidayData || {}
  );
  const multiSelectOptions = vendor?.map((vendor) => ({
    value: vendor.id,
    label: vendor.fullName,
  }));
  const { errors, touched } = formik;
  return (
    <Modal centered scrollable show={show} className={"custom-modal"}>
      <Modal.Header>
        <h4 className="modal-title">Add New Holiday</h4>
        <button className="close" onClick={handleClose}>
          <span aria-hidden="true" className="zmdi zmdi-close"></span>
        </button>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="form-group">
            <label className="control-label">
              Date <span className="text-danger">*</span>
            </label>
            <div className="input-group inner-page-date d-flex">
              <SingleDatePickerComp
                setDate={(date: string) =>
                  formik.setValues({ ...formik.values, date: date })
                }
                name="date"
                date={formik.values.date}
                isDayBlocked={(date: moment.Moment) => {
                  return (
                    editHoliday &&
                    holidays.findIndex(
                      (holiday) =>
                        moment(holiday.date).format("DD-MM-YYYY") ===
                        moment(date).format("DD-MM-YYYY")
                    ) > -1
                  );
                }}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="icon dripicons-calendar"></i>
                </span>
              </div>
            </div>
            {errors.date && touched.date && (
              <div className="text-danger">{errors.date}</div>
            )}
          </div>
          <div className="form-group">
            <label className="control-label">
              Vendor <span className="text-danger">*</span>
            </label>
            <div data-toggle="popover" data-trigger="focus">
              <MultiSelectCheckbox
                className="custom-select-dropdown"
                options={multiSelectOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                  animatedComponents,
                }}
                onChange={handleChange}
                allowSelectAll={true}
                value={formik.values.vendor}
              />
              {errors.vendor && touched.vendor && (
                <div className="text-danger">
                  {(errors as { vendor: string }).vendor}
                </div>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              value={formik.values.description}
              onChange={formik.handleChange}
              name={"description"}
            ></textarea>
            {errors.description && touched.description && (
              <div className="text-danger">{errors.description}</div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={handleClose}
            type="button"
          >
            Close
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
export default GovernmentHolidayModal;

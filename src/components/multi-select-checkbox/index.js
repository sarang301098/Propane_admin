import React, { useRef } from "react";
import ReactSelect from "react-select";

const MultiSelect = (props) => {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;

  const selectAllOption = {
    value: "*",
    label: "Select All",
  };

  const isSelectAllSelected = () => {
    if (props.options.length === 0) {
      return false;
    }
    return valueRef.current?.length === props.options.length;
  };
  const isOptionSelected = (option) =>
    valueRef.current?.some(({ value }) => value === option.value) || isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...props.options];

  const getValue = () => (isSelectAllSelected() ? [selectAllOption] : props.value);

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
    } else if (
      (action === "deselect-option" && option.value === selectAllOption.value) ||
      (action === "remove-value" && removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta);
    } else if (actionMeta.action === "deselect-option" && isSelectAllSelected()) {
      props.onChange(
        props.options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      props.onChange(newValue || [], actionMeta);
    }
  };

  return (
    <ReactSelect
      {...props}
      isOptionSelected={isOptionSelected}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      // hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isMulti
    />
  );
};

export default MultiSelect;

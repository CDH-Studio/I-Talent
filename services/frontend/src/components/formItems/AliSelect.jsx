// import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const AliSelect = ({
  onChange,
  initialValueId,
  placeholderText,
  isDisabled,
  options,
  isMulti,
  isSearchable,
  isClearable,
}) => {
  const mapInitialValue = (SelectOptions, savedIds) =>
    isMulti
      ? savedIds.map((Id) =>
          SelectOptions.find((option) => option.value === Id)
        )
      : SelectOptions.find((option) => option.value === savedIds);

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };
  // eslint-disable-next-line no-unused-vars
  const onSelectedValueChange = (newVal) => {
    if (newVal && isMulti) {
      console.log(
        "map",
        newVal.map(({ value }) => value)
      );
      triggerChange(newVal.map(({ value }) => value));
    } else if (newVal) {
      triggerChange(newVal.value);
    } else {
      triggerChange(undefined);
    }
  };

  console.log("map", mapInitialValue(options, initialValueId));

  return (
    <Select
      //   aria-label="this is a label for location"
      //   aria-label="zzzz"
      //   aria-live="assertive"
      //   aria-required="true"
      //   aria-autocomplete="list"
      //   closeMenuOnSelect={false}

      defaultValue={mapInitialValue(options, initialValueId)}
      options={options}
      placeholder={placeholderText}
      onChange={onSelectedValueChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
      required
      closeMenuOnSelect={!isMulti}
      blurInputOnSelect={false}
    />
  );
};

AliSelect.propTypes = {
  onChange: PropTypes.func,
  placeholderText: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  initialValueId: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
};

AliSelect.defaultProps = {
  placeholderText: "Select...",
  isMulti: false,
  onChange: null,
  initialValueId: "",
  isSearchable: true,
  isDisabled: false,
  isClearable: true,
};

export default AliSelect;

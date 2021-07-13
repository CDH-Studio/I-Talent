// import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useIntl } from "react-intl";

const AliSelect = ({
  ariaLabel,
  onChange,
  initialValueId,
  placeholderText,
  isDisabled,
  options,
  isMulti,
  isSearchable,
  isClearable,
  isRequired,
}) => {
  const intl = useIntl();

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

  return (
    <Select
      aria-label={`${ariaLabel} ${
        isRequired && intl.formatMessage({ id: "rules.required" })
      }`}
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
  ariaLabel: PropTypes.string,
  onChange: PropTypes.func,
  placeholderText: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  initialValueId: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isRequired: PropTypes.bool,
};

AliSelect.defaultProps = {
  ariaLabel: "",
  placeholderText: "Select...",
  onChange: null,
  isMulti: false,
  initialValueId: "",
  isSearchable: true,
  isDisabled: false,
  isClearable: true,
  isRequired: false,
};

export default AliSelect;

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
  //   const [selectedValue, setSelectedValue] = useState(defaultValue);

  const mapInitialValue = (SelectOptions, Id) =>
    SelectOptions.find((option) => option.value === Id);

  const triggerChange = (changedValue) => {
    onChange?.(changedValue);
  };
  // eslint-disable-next-line no-unused-vars
  const onSelectedValueChange = (newVal) => {
    if (newVal && isMulti) {
      triggerChange(newVal.map(({ value }) => value));
    } else if (newVal) {
      triggerChange(newVal.value);
    } else {
      triggerChange(undefined);
    }
  };

  console.log("initialValueId", mapInitialValue(options, initialValueId));

  return (
    <Select
      aria-labelledby="zzzz"
      aria-required="true"
      defaultValue={mapInitialValue(options, initialValueId)}
      options={options}
      placeholder={placeholderText}
      onChange={onSelectedValueChange}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isDisabled={isDisabled}
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

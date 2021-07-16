import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { useIntl } from "react-intl";
import antdStyles from "../../styling/antdTheme";

const AliSelect = ({
  ariaLabel,
  onChange,
  initialValueId,
  inputValue,
  placeholderText,
  isDisabled,
  options,
  isMulti,
  isSearchable,
  isClearable,
  isRequired,
  isCreatable,
  maxSelectedOptions,
  className,
}) => {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState(initialValueId);

  const mapInitialValue = (dropdownOptions, savedIds) =>
    isMulti
      ? savedIds.map((Id) =>
          dropdownOptions.find((option) => option.value === Id)
        )
      : dropdownOptions.find((option) => option.value === savedIds);

  const mapInitialValueCreatable = (savedIds) =>
    savedIds.map((Id) => ({
      value: Id,
      label: Id,
    }));

  const triggerChange = (changedValue) => {
    setSelectedOptions(changedValue);
    onChange?.(changedValue);
  };

  const onSelectedValueChange = (newVal) => {
    if (newVal && isMulti) {
      triggerChange(newVal.map(({ value }) => value));
    } else if (newVal) {
      triggerChange(newVal.value);
    } else {
      triggerChange(undefined);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: state.isFocused || state.active ? "#087472" : "#d9d9d9",
      minHeight: isMulti ? "36px" : "32px",
      padding: isMulti ? "3px 0" : 0,
      boxShadow:
        state.isFocused || state.active
          ? "0px 0px 0px 2px rgb(8 116 114 / 50%)"
          : "none",
    }),

    valueContainer: (provided) => ({
      ...provided,
      minHeight: "32px",
      padding: "0 11px",
    }),

    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: isMulti ? "auto" : "32px",
    }),
    option: (provided) => ({
      ...provided,
      height: "32px",
      padding: "0 11px",
      lineHeight: "32px",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: antdStyles["@primary-color-2"],
      borderStyle: "solid",
      borderColor: antdStyles["@primary-color"],
      color: antdStyles["@primary-color"],
      borderWidth: "1px",
      borderRadius: "1rem",
      padding: "0 5px",
      margin: "3px 6px 3px 0",
      fontSize: "1rem",
      lineHeight: "1.1rem",
    }),
  };

  const customTheme = (theme) => ({
    ...theme,
    borderRadius: "5px",
    colors: {
      ...theme.colors,
      primary50: antdStyles["@primary-color-2"],
      primary25: antdStyles["@primary-color-2"],
      primary: antdStyles["@primary-color-1"],
    },
  });

  const generateAriaLabel = (formFieldLabel, isFieldRequired) =>
    `${formFieldLabel} ${
      isFieldRequired && intl.formatMessage({ id: "rules.required" })
    }`;

  const formatCreateLabelCreator = (value) =>
  const formatCreateLabelCreatable = (value) =>
    `${intl.formatMessage({ id: "press.enter.to.add" })} "${value}"`;

  const generateNoOptionsMessageCreatable = () =>
    intl.formatMessage({ id: "press.enter.to.add" });

  const generateSelectOptions = (
    providedOptions,
    userSelectedOptions,
    isMultiSelect,
    maxSelected
  ) =>
    isMultiSelect && maxSelected && userSelectedOptions.length >= maxSelected
      ? []
      : providedOptions;

  const generateNoOptionsMessage = (
    userSelectedOptions,
    isMultiSelect,
    maxSelected
  ) =>
    isMultiSelect && maxSelected && userSelectedOptions.length >= maxSelected
      ? "You've reached the max number of options."
      : "No options available";

  const isOptionsDisabled = (isMultiSelect, maxSelected) =>
    isMulti && maxSelected && selectedOptions.length >= maxSelected;

  const isValidInputCreatable = (
    inputValueString,
    selectValues,
    isMultiSelect,
    maxSelected
  ) => {
    // Check whether typed value is either empty or already exists
    if (
      inputValueString.trim().length === 0 ||
      selectValues.find((option) => option.value === inputValueString)
    ) {
      return false;
    }
    // Check whether the number of selected options exceeds max count
    if (isMulti && maxSelected && selectValues.length >= maxSelected) {
      return false;
    }

    return true;
  };

  return (
    <>
      {isCreatable ? (
        <CreatableSelect
          aria-label={generateAriaLabel(ariaLabel, isRequired)}
          placeholder={placeholderText}
          defaultValue={mapInitialValueCreatable(initialValueId)}
          // inputValue={mapInitialValueCreatable(inputValue)}
          onChange={onSelectedValueChange}
          formatCreateLabel={formatCreateLabelCreatable}
          noOptionsMessage={generateNoOptionsMessageCreatable}
          blurInputOnSelect={false}
          isMulti
          styles={customStyles}
          theme={customTheme}
          isValidNewOption={(userTypedValue, selectValue) =>
            isValidInputCreatable(
              userTypedValue,
              selectValue,
              isMulti,
              maxSelectedOptions
            )
          }
          className={className}
        />
      ) : (
        <Select
          aria-label={generateAriaLabel(ariaLabel, isRequired)}
          defaultValue={mapInitialValue(options, initialValueId)}
          value={mapInitialValue(options, inputValue || selectedOptions)}
          options={generateSelectOptions(
            options,
            selectedOptions,
            isMulti,
            maxSelectedOptions
          )}
          noOptionsMessage={() =>
            generateNoOptionsMessage(
              selectedOptions,
              isMulti,
              maxSelectedOptions
            )
          }
          placeholder={placeholderText}
          onChange={onSelectedValueChange}
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isDisabled={isDisabled}
          closeMenuOnSelect={!isMulti}
          blurInputOnSelect={false}
          styles={customStyles}
          theme={customTheme}
          isOptionDisabled={() =>
            isOptionsDisabled(isMulti, maxSelectedOptions)
          }
          className={className}
        />
      )}
    </>
  );
};

AliSelect.propTypes = {
  ariaLabel: PropTypes.string,
  onChange: PropTypes.func,
  placeholderText: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.object),
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  initialValueId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  inputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isRequired: PropTypes.bool,
  isCreatable: PropTypes.bool,
  maxSelectedOptions: PropTypes.number,
  className: PropTypes.string,
};

AliSelect.defaultProps = {
  options: undefined,
  ariaLabel: "",
  placeholderText: "Select...",
  onChange: null,
  isMulti: false,
  initialValueId: "",
  inputValue: undefined,
  isSearchable: true,
  isDisabled: false,
  isClearable: true,
  isRequired: false,
  isCreatable: false,
  maxSelectedOptions: undefined,
  className: "",
};

export default AliSelect;

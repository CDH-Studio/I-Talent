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
  placeholderText,
  isDisabled,
  options,
  isMulti,
  isSearchable,
  isClearable,
  isRequired,
  isCreatable,
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
    console.log("selectedOptions", selectedOptions);
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

  const formatCreateLabelCreator = (value) =>
    `${intl.formatMessage({ id: "press.enter.to.add" })} "${value}"`;

  const noOptionsMessageCreator = () =>
    intl.formatMessage({ id: "press.enter.to.add" });

  const generateSelectOptions = (providedOptions, userSelectedOptions) =>
    isMulti && userSelectedOptions.length >= 2 ? [] : providedOptions;

  return (
    <>
      {isCreatable ? (
        <CreatableSelect
          aria-label={`${ariaLabel} ${
            isRequired && intl.formatMessage({ id: "rules.required" })
          }`}
          placeholder={placeholderText}
          defaultValue={mapInitialValueCreatable(initialValueId)}
          onChange={onSelectedValueChange}
          formatCreateLabel={formatCreateLabelCreator}
          noOptionsMessage={noOptionsMessageCreator}
          blurInputOnSelect={false}
          isMulti
          styles={customStyles}
          theme={customTheme}
        />
      ) : (
        <Select
          //   components={{ Menu }}
          aria-label={`${ariaLabel} ${
            isRequired && intl.formatMessage({ id: "rules.required" })
          }`}
          defaultValue={mapInitialValue(options, initialValueId)}
          //   options={selectedOptions.length >= 2 ? [] : options}
          options={generateSelectOptions(options, selectedOptions)}
          noOptionsMessage={() =>
            isMulti && selectedOptions.length >= 2
              ? "You've reached the max number of options."
              : "No options available"
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
          isOptionDisabled={() => isMulti && selectedOptions.length > 2}
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
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isRequired: PropTypes.bool,
  isCreatable: PropTypes.bool,
};

AliSelect.defaultProps = {
  options: undefined,
  ariaLabel: "",
  placeholderText: "Select...",
  onChange: null,
  isMulti: false,
  initialValueId: "",
  isSearchable: true,
  isDisabled: false,
  isClearable: true,
  isRequired: false,
  isCreatable: false,
};

export default AliSelect;

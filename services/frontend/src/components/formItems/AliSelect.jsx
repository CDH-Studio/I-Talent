import { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { PlusCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
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
  maxSelectedOptions,
  isSearchable,
  isClearable,
  isRequired,
  isCreatable,
  className,
}) => {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState(initialValueId);

  /**
   * Trigger the OnChange function passed into the component and update state
   *
   * @param {string[]} userSelectedOptionValues - an array of selected option values
   *
   */
  const triggerChange = (userSelectedOptionValues) => {
    setSelectedOptions(userSelectedOptionValues);
    onChange?.(userSelectedOptionValues);
  };

  /**
   * A function that is triggered when the user types or makes a selection
   * using react-select. It extracts the changed values returned by the
   * component based on the dropdown configuration and triggers the onChange
   *
   * @param {Array.<{value:string, label:string}>} userSelectedOptions - an array of selected options
   * @param {boolean} isMultiSelect - has the component been configured as a multiselect
   *
   */
  const onSelectedValueChange = (userSelectedOptions, isMultiSelect) => {
    if (userSelectedOptions && isMultiSelect) {
      triggerChange(userSelectedOptions.map(({ value }) => value));
    } else if (userSelectedOptions) {
      triggerChange(userSelectedOptions.value);
    } else {
      triggerChange(undefined);
    }
  };

  /**
   * Extract the saved options from the options list using the values
   * This is only used for the simple "react-select" dropdown
   *
   * @param {Array.<{value:string, label:string}>} dropdownOptions - an array of options for dropdown
   * @param {(string || string[])} savedValues - an array of options for dropdown
   * @return {Array.<{value:string, label:string}>} a list of save option objects
   *
   */
  const mapInitialValue = (dropdownOptions, savedValues) =>
    isMulti
      ? savedValues.map((value) =>
          dropdownOptions.find((option) => option.value === value)
        )
      : dropdownOptions.find((option) => option.value === savedValues);

  /**
   * Convert the saved values into a objects to be read by "creatable react-select"
   *
   * @param {string[]} savedValues - an array of options for dropdown
   * @return {Array.<{value:string, label:string}>} a list of save option objects
   *
   */
  const mapInitialValueCreatable = (savedValues) =>
    savedValues.map((Id) => ({
      value: Id,
      label: Id,
    }));

  /**
   * Generate the aria-label for the field
   *
   * @param {string} formFieldLabel - Text to describe the field
   * @param {boolean} isFieldRequired - is the field required be filled out
   * @return {string} generated aria-label
   *
   */
  const generateAriaLabel = (formFieldLabel, isFieldRequired) =>
    `${formFieldLabel} ${
      isFieldRequired && intl.formatMessage({ id: "rules.required" })
    }`;

  /**
   * Generate a text to prompt the user to press "enter" to add the typed
   * value as a selected option for "creatable react-select"
   *
   * @param {string} userTypedInput - The users input as they type
   * @return {string} generated text to display
   *
   */
  const formatCreateLabelCreatable = (userTypedInput) =>
    `${intl.formatMessage({ id: "press.enter.to.add" })} "${userTypedInput}"`;

  /**
   * Generate the message to display when no options are available to be selected
   * for "creatable react-select"
   *
   * @param {Object} userTypedInput - The users input as they type
   * @param {string[]} userSelectedOptions - The user selected options
   * @param {boolean} isMultiSelect - is the field configured as multi-select
   * @param {number} maxSelectedLimit - max number of options that can be selected
   * @return {HTMLElement} generated element to display
   *
   */
  const generateNoOptionsMessageCreatable = (
    userTypedInput,
    userSelectedOptions,
    isMultiSelect,
    maxSelectedLimit
  ) => {
    const inputString = userTypedInput.inputValue;

    // display message when the user typed value already exists
    if (userSelectedOptions.find((option) => option === inputString)) {
      return (
        <span role="alert">
          <InfoCircleOutlined aria-hidden="true" className="mr-1" />
          <strong>{inputString}</strong> has already been added
        </span>
      );
    }

    // display message when the limit for the number of selected values has been reached
    if (
      isMultiSelect &&
      maxSelectedLimit &&
      userSelectedOptions.length >= maxSelectedLimit
    ) {
      return (
        <span role="alert">
          <InfoCircleOutlined aria-hidden="true" className="mr-1" />
          You have reached the max of {maxSelectedLimit} selected items
        </span>
      );
    }

    return (
      <span role="alert">
        <PlusCircleOutlined aria-hidden="true" className="mr-1" />
        Type and press enter to add custom option
      </span>
    );
  };

  /**
   * Generate the options to display for regular "react-select" dropdown
   *
   * @param {Array.<{value:string, label:string}>} providedOptions - The dropdown options to display
   * @param {string[]} userSelectedOptions - The user selected options
   * @param {boolean} isMultiSelect - is the field configured as multi-select
   * @param {number} maxSelectedLimit - max number of options that can be selected
   * @return {Array.<{value:string, label:string}>} a list of options to display
   *
   */
  const generateSelectOptions = (
    providedOptions,
    userSelectedOptions,
    isMultiSelect,
    maxSelectedLimit
  ) =>
    isMultiSelect &&
    maxSelectedLimit &&
    userSelectedOptions.length >= maxSelectedLimit
      ? []
      : providedOptions;

  /**
   * Generate the message to display when no options are available to be selected
   * for regular "react-select"
   *
   * @param {string[]} userSelectedOptions - The user selected options
   * @param {boolean} isMultiSelect - is the field configured as multi-select
   * @param {number} maxSelectedLimit - max number of options that can be selected
   * @return {HTMLElement} generated text to display
   *
   */
  const generateNoOptionsMessage = (
    userSelectedOptions,
    isMultiSelect,
    maxSelectedLimit
  ) =>
    isMultiSelect &&
    maxSelectedLimit &&
    userSelectedOptions.length >= maxSelectedLimit ? (
      <span role="alert">
        <InfoCircleOutlined aria-hidden="true" className="mr-1" />
        You have reached the max of {maxSelectedLimit} selected items
      </span>
    ) : (
      <span role="alert">
        <InfoCircleOutlined aria-hidden="true" className="mr-1" />
        No options available
      </span>
    );

  /**
   * Disable the selectable dropdown options when selected limit is reached
   *
   * @param {string[]} userSelectedOptions - The selected options selected by user
   * @param {boolean} isMultiSelect - is the field configured as multi-select
   * @param {number} maxSelectedLimit - max number of options that can be selected
   * @return {boolean} disabled options
   *
   */
  const isOptionsDisabled = (
    userSelectedOptions,
    isMultiSelect,
    maxSelectedLimit
  ) =>
    isMulti && maxSelectedLimit && selectedOptions.length >= maxSelectedLimit;

  /**
   * Detect whether the typed input value is valid for "creatable react-select"
   *
   * @param {string} userTypedInput - The users input as they type
   * @param {Array.<{value:string, label:string}>} userSelectedOptions - The user selected options
   * @param {boolean} isMultiSelect - is the field configured as multi-select
   * @param {number} maxSelectedLimit - max number of options that can be selected
   * @return {boolean} disabled options
   *
   */
  const isValidInputCreatable = (
    userTypedInput,
    userSelectedOptions,
    isMultiSelect,
    maxSelectedLimit
  ) => {
    // Check whether typed value is either empty or already exists
    if (
      userTypedInput.trim().length === 0 ||
      userSelectedOptions.find((option) => option.value === userTypedInput)
    ) {
      return false;
    }

    // Check whether the number of selected options exceeds max count
    if (
      isMulti &&
      maxSelectedLimit &&
      userSelectedOptions.length >= maxSelectedLimit
    ) {
      return false;
    }

    return true;
  };

  /**
   * Custom styling for "react-select" based on the API provided in the documentation
   * @const {Object}
   */
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
    menu: (provided) => ({
      ...provided,
      marginTop: "3px",
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
    noOptionsMessage: (provided) => ({
      ...provided,
      color: antdStyles["@text-color-secondary"],
    }),
  };

  /**
   * Custom theming for "react-select" based on the API provided in the documentation
   * @const {Object}
   */
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

  return (
    <>
      {isCreatable ? (
        <CreatableSelect
          aria-label={generateAriaLabel(ariaLabel, isRequired)}
          placeholder={placeholderText}
          defaultValue={mapInitialValueCreatable(initialValueId)}
          onChange={(selectValues) =>
            onSelectedValueChange(selectValues, isMulti)
          }
          formatCreateLabel={formatCreateLabelCreatable}
          noOptionsMessage={(typedInputValue) =>
            generateNoOptionsMessageCreatable(
              typedInputValue,
              selectedOptions,
              isMulti,
              maxSelectedOptions
            )
          }
          isMulti
          isValidNewOption={(userTypedValue, selectValues) =>
            isValidInputCreatable(
              userTypedValue,
              selectValues,
              isMulti,
              maxSelectedOptions
            )
          }
          styles={customStyles}
          theme={customTheme}
          className={className}
          aria-live="assertive"
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
          onChange={(selectValues) =>
            onSelectedValueChange(selectValues, isMulti)
          }
          isMulti={isMulti}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isDisabled={isDisabled}
          closeMenuOnSelect={!isMulti}
          blurInputOnSelect={false}
          isOptionDisabled={() =>
            isOptionsDisabled(selectedOptions, isMulti, maxSelectedOptions)
          }
          styles={customStyles}
          theme={customTheme}
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

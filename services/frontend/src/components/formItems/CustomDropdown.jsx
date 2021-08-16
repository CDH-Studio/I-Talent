import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import antdStyles from "../../styling/antdTheme";

const CustomDropdown = ({
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
    onChange(userSelectedOptionValues);
  };

  /**
   * A function that is triggered when the user types or makes a selection
   * using react-select. It extracts the changed values returned by the
   * component based on the dropdown configuration and triggers the onChange
   *
   * @param {Array.<{value:string, label:string}>} userSelectedOptions - an array of selected options
   * @param {boolean} isClearableSelect - is the component configured as a creatable dropdown
   * @param {boolean} isMultiSelect - has the component been configured as a multiselect
   *
   */
  const onSelectedValueChange = (
    userSelectedOptions,
    isMultiSelect,
    isClearableSelect
  ) => {
    if ((userSelectedOptions && isMultiSelect) || isClearableSelect) {
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
  const mapInitialValue = (dropdownOptions, savedValues) => {
    if (isMulti) {
      const savedValuesArray = Array.isArray(savedValues)
        ? savedValues
        : [savedValues];
      return savedValuesArray.map((value) =>
        dropdownOptions.find((option) => option.value === value)
      );
    }
    return (
      dropdownOptions &&
      savedValues &&
      dropdownOptions.find((option) => option.value === savedValues)
    );
  };

  /**
   * Convert the saved values into a objects to be read by "creatable react-select"
   *
   * @param {string[]} savedValues - an array of options for dropdown
   * @return {Array.<{value:string, label:string}>} a list of save option objects
   *
   */
  const mapInitialValueCreatable = (savedValues) =>
    savedValues &&
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
    let selectedItemLimit;

    // set the maximum selectable items
    if (isMultiSelect && maxSelectedLimit) {
      selectedItemLimit = maxSelectedLimit;
    } else if (isMultiSelect && !maxSelectedLimit) {
      selectedItemLimit = undefined;
    } else {
      selectedItemLimit = 1;
    }

    // display message when the limit for the number of selected values has been reached
    if (
      userSelectedOptions &&
      selectedItemLimit &&
      userSelectedOptions.length >= selectedItemLimit
    ) {
      return (
        <span role="alert">
          <InfoCircleOutlined aria-hidden="true" className="mr-1" />
          <FormattedMessage
            id="max.selected.items"
            values={{
              maxItems: selectedItemLimit,
            }}
          />
        </span>
      );
    }

    // display message when the user typed value already exists
    if (
      userSelectedOptions &&
      userSelectedOptions.find((option) => option === inputString)
    ) {
      return (
        <span role="alert">
          <InfoCircleOutlined aria-hidden="true" className="mr-1" />
          <FormattedMessage
            id="already.added"
            values={{
              sampleValue: <strong>{inputString}</strong>,
            }}
          />
        </span>
      );
    }

    return (
      <span role="alert">
        <PlusCircleOutlined aria-hidden="true" className="mr-1" />
        <FormattedMessage id="type.and.enter" />
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
    Array.isArray(userSelectedOptions) &&
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
        <FormattedMessage
          id="max.options.selected"
          values={{
            limitNumber: maxSelectedLimit,
          }}
        />
      </span>
    ) : (
      <span role="alert">
        <InfoCircleOutlined aria-hidden="true" className="mr-1" />
        <FormattedMessage id="no.options.available" />
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

    // Check whether the component is not configured as a multi-select
    if (!isMulti && userSelectedOptions.length >= 1) {
      return false;
    }

    return true;
  };

  /**
   * Disable the selectable dropdown options when selected limit is reached
   *
   * @param {object} option - object describing the dropdown options
   * @param {string} option.label - label to be displayed to user
   * @param {string} option.icon - optional icon to be displayed
   *
   */
  const formatOptionLabel = ({ label, icon }) => (
    <>
      {icon} {label}
    </>
  );

  /**
   * Custom styling for "react-select" based on the API provided in the documentation
   * @const {Object}
   *
   */
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: state.isFocused || state.active ? "#087472" : "#d9d9d9",
      minHeight: "30px",
      boxShadow:
        state.isFocused || state.active
          ? "0px 0px 0px 2px rgb(8 116 114 / 50%)"
          : "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: "30px",
      padding: "0 11px",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "3px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "auto",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    option: (provided) => ({
      ...provided,
      height: "32px",
      padding: "0 11px",
      lineHeight: "32px",
      overflow: "hidden",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: antdStyles["@primary-color-2"],
      borderStyle: "solid",
      borderColor: antdStyles["@primary-color"],
      color: antdStyles["@primary-color"],
      borderWidth: "1px",
      borderRadius: "1rem",
      padding: "0 0 0 5px",
      margin: "3px 6px 3px 0",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      fontSize: "14px",
      lineHeight: "15px",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      borderRadius: "0 1rem  1rem 0",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      color: antdStyles["@text-color-secondary"],
    }),
  };

  /**
   * Custom theming for "react-select" based on the API provided in the documentation
   * @const {Object}
   *
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
          className={className}
          defaultValue={mapInitialValueCreatable(initialValueId)}
          formatCreateLabel={formatCreateLabelCreatable}
          isMulti
          isValidNewOption={(userTypedValue, selectValues) =>
            isValidInputCreatable(
              userTypedValue,
              selectValues,
              isMulti,
              maxSelectedOptions
            )
          }
          noOptionsMessage={(typedInputValue) =>
            generateNoOptionsMessageCreatable(
              typedInputValue,
              selectedOptions,
              isMulti,
              maxSelectedOptions
            )
          }
          onChange={(selectValues) =>
            onSelectedValueChange(selectValues, isMulti, true)
          }
          placeholder={placeholderText}
          styles={customStyles}
          theme={customTheme}
        />
      ) : (
        <Select
          aria-label={generateAriaLabel(ariaLabel, isRequired)}
          blurInputOnSelect={false}
          className={className}
          closeMenuOnSelect={!isMulti}
          defaultValue={mapInitialValue(options, initialValueId)}
          formatOptionLabel={formatOptionLabel}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isOptionDisabled={() =>
            isOptionsDisabled(selectedOptions, isMulti, maxSelectedOptions)
          }
          isSearchable={isSearchable}
          menuPortalTarget={document.body}
          noOptionsMessage={() =>
            generateNoOptionsMessage(
              selectedOptions,
              isMulti,
              maxSelectedOptions
            )
          }
          onChange={(selectValues) =>
            onSelectedValueChange(selectValues, isMulti, false)
          }
          options={generateSelectOptions(
            options,
            selectedOptions,
            isMulti,
            maxSelectedOptions
          )}
          placeholder={placeholderText}
          styles={customStyles}
          theme={customTheme}
          value={mapInitialValue(options, inputValue || selectedOptions)}
        />
      )}
    </>
  );
};

CustomDropdown.propTypes = {
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

CustomDropdown.defaultProps = {
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

export default CustomDropdown;

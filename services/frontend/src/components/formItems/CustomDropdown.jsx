import { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

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
  isGroupedOptions,
  maxSelectedOptions,
  isSearchable,
  isClearable,
  isRequired,
  isCreatable,
  className,
}) => {
  const intl = useIntl();
  const [selectedOptions, setSelectedOptions] = useState(initialValueId);

  const FORMATTED_DROPDOWN_OPTIONS = useMemo(() => {
    if (isGroupedOptions) {
      return options.flatMap((option) => option.options);
    }

    return options;
  }, [isGroupedOptions, options]);

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
   * @param {boolean} isCreatableSelect - is the component configured as a creatable dropdown
   * @param {boolean} isMultiSelect - has the component been configured as a multiselect
   *
   */
  const onSelectedValueChange = (
    userSelectedOptions,
    isMultiSelect,
    isCreatableSelect
  ) => {
    if ((userSelectedOptions && isMultiSelect) || isCreatableSelect) {
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
  const mapInitialValue = (savedValues) => {
    /* eslint-disable */
    // let FORMATTED_DROPDOWN_OPTIONSz = options;

    // // console.log(
    // //   "dev goals is very slow. maybe we should imporvwe this performance nad see. it takes 268ms to render right now when drop down is clicked"
    // // );
    // if (true) {
    //   FORMATTED_DROPDOWN_OPTIONSz = options.flatMap(
    //     (dropdownOption) => dropdownOption.options
    //   );
    // }

    console.log("FORMATTED_DROPDOWN_OPTIONS", FORMATTED_DROPDOWN_OPTIONS);
    // console.log("FORMATTED_DROPDOWN_OPTIONSz", FORMATTED_DROPDOWN_OPTIONSz);

    if (isMulti) {
      const savedValuesArray = Array.isArray(savedValues)
        ? savedValues
        : [savedValues];

      console.log("savedValuesArray", savedValuesArray);

      console.log(
        "mon",
        savedValuesArray.map((value) =>
          FORMATTED_DROPDOWN_OPTIONS.find(
            (option) => option && option.value === value
          )
        )
      );

      return savedValuesArray.map((value) =>
        FORMATTED_DROPDOWN_OPTIONS.find(
          (option) => option && option.value === value
        )
      );
    }

    // console.log(
    //   "vvv",
    //   FORMATTED_DROPDOWN_OPTIONS.find((option) => option.value === savedValues)
    // );

    // console.log("savedValues", savedValues);
    // console.log("initialValueId", initialValueId);

    // console.log(
    //   "vvv",
    //   options.find((option) => option.value === savedValues)
    // );

    // return 1;

    return (
      FORMATTED_DROPDOWN_OPTIONS &&
      savedValues &&
      FORMATTED_DROPDOWN_OPTIONS.find((option) => option.value === savedValues)
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
      label: Id,
      value: Id,
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
    clearIndicator: (provided) => ({
      ...provided,
      paddingBottom: 0,
      paddingTop: 0,
    }),
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: state.isFocused || state.active ? "#087472" : "#d9d9d9",
      boxShadow:
        state.isFocused || state.active
          ? "0px 0px 0px 2px rgb(8 116 114 / 50%)"
          : "none",
      minHeight: "30px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingBottom: 0,
      paddingTop: 0,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "auto",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "3px",
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 999,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: antdStyles["@primary-color-2"],
      borderColor: antdStyles["@primary-color"],
      borderRadius: "1rem",
      borderStyle: "solid",
      borderWidth: "1px",
      color: antdStyles["@primary-color"],
      margin: "3px 6px 3px 0",
      padding: "0 0 0 5px",
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
    option: (provided) => ({
      ...provided,
      height: "32px",
      lineHeight: "32px",
      overflow: "hidden",
      padding: "0 11px",
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: "0px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: "30px",
      padding: "0 11px",
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
      primary: antdStyles["@primary-color-1"],
      primary25: antdStyles["@primary-color-2"],
      primary50: antdStyles["@primary-color-2"],
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
          defaultValue={mapInitialValue(initialValueId)}
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
          value={mapInitialValue(
            inputValue || selectedOptions
            // inputValue || selectedOptions,
            // isGroupedOptions
          )}
        />
      )}
    </>
  );
};

CustomDropdown.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  initialValueId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  inputValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  isClearable: PropTypes.bool,
  isCreatable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isGroupedOptions: PropTypes.bool,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  isSearchable: PropTypes.bool,
  maxSelectedOptions: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholderText: PropTypes.node,
};

CustomDropdown.defaultProps = {
  ariaLabel: "",
  className: "",
  initialValueId: "",
  inputValue: undefined,
  isClearable: true,
  isCreatable: false,
  isDisabled: false,
  isGroupedOptions: false,
  isMulti: false,
  isRequired: false,
  isSearchable: true,
  maxSelectedOptions: undefined,
  onChange: null,
  options: undefined,
  placeholderText: "Select...",
};

export default CustomDropdown;

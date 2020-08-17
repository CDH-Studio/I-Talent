import React, { useState } from "react";
import PropTypes from "prop-types";

import DescriptionFormItemView from "./DescriptionFormItemView";

const DescriptionFormItem = ({
  label,
  name,
  fieldKey,
  isRequired,
  isRequiredMessage,
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  lengthMessage,
  value,
}) => {
  const [charsLeft, setCharsLeft] = useState(
    value ? maxLength - value.length : maxLength
  );

  const handleDescriptionChange = (e) => {
    setCharsLeft(maxLength - e.currentTarget.value.length);
  };

  const rules = [];
  if (minLength) {
    rules.push({ min: minLength, message: minLengthMessage });
  }
  if (maxLength) {
    rules.push({ max: maxLength, message: maxLengthMessage });
  }
  if (isRequired) {
    rules.push({ required: true, message: isRequiredMessage });
  }

  return (
    <DescriptionFormItemView
      label={label}
      name={name}
      fieldKey={fieldKey}
      rules={rules}
      lengthMessage={lengthMessage}
      value={value}
      charsLeft={charsLeft}
      handleDescriptionChange={handleDescriptionChange}
    />
  );
};

DescriptionFormItem.propTypes = {
  label: PropTypes.element,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]).isRequired,
  fieldKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isRequired: PropTypes.bool,
  minLengthMessage: PropTypes.element,
  maxLengthMessage: PropTypes.element,
  isRequiredMessage: PropTypes.element,
  lengthMessage: PropTypes.element.isRequired,
  value: PropTypes.string,
};

DescriptionFormItem.defaultProps = {
  fieldKey: undefined,
  value: undefined,
  label: null,
  minLength: undefined,
  maxLength: 1000,
  isRequired: false,
  minLengthMessage: null,
  maxLengthMessage: null,
  isRequiredMessage: null,
};

export default DescriptionFormItem;

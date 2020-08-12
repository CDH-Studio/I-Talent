import React, { useState } from "react";
import PropTypes from "prop-types";

import DescriptionFormItemView from "./DescriptionFormItemView";

const DescriptionFormItem = ({
  label,
  name,
  fieldKey,
  rules,
  maxLength,
  maxLengthMessage,
  value,
}) => {
  const [charsLeft, setCharsLeft] = useState(
    value ? maxLength - value.length : maxLength
  );

  const handleDescriptionChange = (e) => {
    setCharsLeft(maxLength - e.currentTarget.value.length);
  };

  return (
    <DescriptionFormItemView
      label={label}
      name={name}
      fieldKey={fieldKey}
      rules={rules}
      maxLengthMessage={maxLengthMessage}
      value={value}
      charsLeft={charsLeft}
      handleDescriptionChange={handleDescriptionChange}
    />
  );
};

DescriptionFormItem.propTypes = {
  label: PropTypes.element,
  name: PropTypes.string.isRequired,
  fieldKey: PropTypes.oneOf([PropTypes.string, PropTypes.array]).isRequired,
  rules: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxLength: PropTypes.number,
  maxLengthMessage: PropTypes.element.isRequired,
  value: PropTypes.string,
};

DescriptionFormItem.defaultProps = {
  value: undefined,
  label: null,
  maxLength: 1000,
};

export default DescriptionFormItem;

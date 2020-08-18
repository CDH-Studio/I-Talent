import React, { useState } from "react";
import PropTypes from "prop-types";

import DescriptionFormItemView from "./DescriptionFormItemView";

const DescriptionFormItem = ({
  name,
  fieldKey,
  rules,
  maxLengthMessage,
  value,
  label,
}) => {
  const [charsLeft, setCharsLeft] = useState(
    value ? rules.max - value.length : rules.max
  );

  const handleDescriptionChange = (e) => {
    setCharsLeft(rules.max - e.currentTarget.value.length);
  };

  return (
    <DescriptionFormItemView
      name={name}
      fieldKey={fieldKey}
      rules={rules}
      maxLengthMessage={maxLengthMessage}
      value={value}
      charsLeft={charsLeft}
      handleDescriptionChange={handleDescriptionChange}
      label={label}
    />
  );
};

DescriptionFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  fieldKey: PropTypes.oneOf([PropTypes.string, PropTypes.array]).isRequired,
  rules: PropTypes.shape({ max: PropTypes.number, message: PropTypes.element })
    .isRequired,
  value: PropTypes.string,
  label: PropTypes.element,
  maxLengthMessage: PropTypes.element.isRequired,
};

DescriptionFormItem.defaultProps = {
  value: undefined,
  label: null,
};

export default DescriptionFormItem;

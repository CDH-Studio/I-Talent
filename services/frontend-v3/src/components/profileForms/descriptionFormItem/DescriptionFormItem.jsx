import React, { useState } from "react";
import PropTypes from "prop-types";

import DescriptionFormItemView from "./DescriptionFormItemView";

const DescriptionFormItem = ({ name, fieldKey, rule, value }) => {
  const [charsLeft, setCharsLeft] = useState(
    value ? rule.max - value.length : rule.max
  );

  const handleDescriptionChange = (e) => {
    setCharsLeft(rule.max - e.currentTarget.value.length);
  };

  return (
    <DescriptionFormItemView
      name={name}
      fieldKey={fieldKey}
      rule={rule}
      value={value}
      charsLeft={charsLeft}
      handleDescriptionChange={handleDescriptionChange}
    />
  );
};

DescriptionFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  fieldKey: PropTypes.oneOf([PropTypes.string, PropTypes.array]).isRequired,
  rule: PropTypes.shape({ max: PropTypes.number, message: PropTypes.element })
    .isRequired,
  value: PropTypes.string,
};

DescriptionFormItem.defaultProps = {
  value: undefined,
};

export default DescriptionFormItem;

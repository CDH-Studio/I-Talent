import React, { useState } from "react";
import PropTypes from "prop-types";
import DescriptionTextView from "./DescriptionTextView";

const DescriptionText = ({ text, expandable }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandButtonClick = () => {
    setExpanded((oldValue) => !oldValue);
  };

  return (
    <DescriptionTextView
      text={text}
      expandable={expandable}
      expanded={expanded}
      handleExpandButtonClick={handleExpandButtonClick}
    />
  );
};

DescriptionText.propTypes = {
  text: PropTypes.string,
  expandable: PropTypes.bool.isRequired,
};

DescriptionText.defaultProps = {
  text: null,
};

export default DescriptionText;

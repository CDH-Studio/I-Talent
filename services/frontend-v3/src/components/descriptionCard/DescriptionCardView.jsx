import React from "react";
import PropTypes from "prop-types";

import DescriptionText from "../descriptionText/DescriptionText";

const DescriptionView = ({ data }) => {
  return <DescriptionText text={data} expandable={false} />;
};

DescriptionView.propTypes = {
  data: PropTypes.string,
};

DescriptionView.defaultProps = {
  data: null,
};

export default DescriptionView;

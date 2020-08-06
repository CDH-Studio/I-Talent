import React from "react";
import PropTypes from "prop-types";

import DescriptionText from "../descriptionText/DescriptionText";

const DescriptionView = ({ data }) => {
  /**
   * Generate Competencies Tag List
   *
   * Generate a list of Competency Tags
   * If no competencies are found for the profile then display friendly message
   */

  return <DescriptionText text={data.description} expandable={false} />;
};

DescriptionView.propTypes = {
  data: PropTypes.objectOf({ description: PropTypes.string }),
};

DescriptionView.defaultProps = {
  data: null,
};

export default DescriptionView;

import PropTypes from "prop-types";
import React from "react";
import ResultLayoutView from "./ResultLayoutView";

const ResultLayout = ({ children }) => {
  return <ResultLayoutView>{children}</ResultLayoutView>;
};

ResultLayout.propTypes = {
  children: PropTypes.node,
};

ResultLayout.defaultProps = {
  children: undefined,
};

export default ResultLayout;

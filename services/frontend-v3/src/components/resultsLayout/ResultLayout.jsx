import PropTypes from "prop-types";
import React from "react";
import ResultLayoutView from "./ResultLayoutView";
import { HistoryPropType } from "../../customPropTypes";

const ResultLayout = ({ history, children }) => {
  return <ResultLayoutView history={history}>{children}</ResultLayoutView>;
};

ResultLayout.propTypes = {
  children: PropTypes.node,
  history: HistoryPropType.isRequired,
};

ResultLayout.defaultProps = {
  children: undefined,
};

export default ResultLayout;

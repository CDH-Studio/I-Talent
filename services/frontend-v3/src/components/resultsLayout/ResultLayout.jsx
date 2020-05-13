import PropTypes from "prop-types";
import React from "react";
import ResultLayoutView from "./ResultLayoutView";
import { HistoryPropType } from "../../customPropTypes";

const ResultLayout = ({ changeLanguage, history, children }) => {
  return (
    <ResultLayoutView changeLanguage={changeLanguage} history={history}>
      {children}
    </ResultLayoutView>
  );
};

ResultLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  children: PropTypes.node,
  history: HistoryPropType.isRequired,
};

ResultLayout.defaultProps = {
  children: undefined,
};

export default ResultLayout;

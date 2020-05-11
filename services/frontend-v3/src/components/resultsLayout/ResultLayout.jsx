import PropTypes from "prop-types";
import React from "react";
import ResultLayoutView from "./ResultLayoutView";

const ResultLayout = ({ changeLanguage, history, children }) => {
  return (
    <ResultLayoutView
      changeLanguage={changeLanguage}
      history={history}
    >
      {children}
    </ResultLayoutView>
  );
};

ResultLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.isRequired,
}

export default ResultLayout;

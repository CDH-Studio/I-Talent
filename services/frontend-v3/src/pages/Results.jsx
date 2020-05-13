import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import ResultLayout from "../components/resultsLayout/ResultLayout";
import { HistoryPropType } from "../customPropTypes";

const Results = ({ changeLanguage, history }) => {
  useEffect(() => {
    document.title = "Results | I-Talent";
  }, []);

  return (
    <ResultLayout
      changeLanguage={changeLanguage}
      history={history}
      displaySideBar
    />
  );
};

Results.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  history: HistoryPropType.isRequired,
};

export default injectIntl(Results);

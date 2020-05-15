import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import ResultLayout from "../components/resultsLayout/ResultLayout";
import { HistoryPropType, IntlPropType } from "../customPropTypes";

const Results = ({ changeLanguage, history, intl }) => {
  useEffect(() => {
    document.title = `${intl.formatMessage({ id: "results.title" })} | I-Talent`;
  }, [intl]);

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
  intl: IntlPropType,
};

Results.defaultProps = {
  intl: null,
};

export default injectIntl(Results);

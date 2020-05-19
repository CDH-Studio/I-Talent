import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import ResultLayout from "../components/layouts/resultsLayout/ResultLayout";
import { HistoryPropType, IntlPropType } from "../customPropTypes";

const Results = ({ history, intl }) => {
  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "results.title",
    })} | I-Talent`;
  }, [intl]);

  return <ResultLayout history={history} displaySideBar />;
};

Results.propTypes = {
  history: HistoryPropType.isRequired,
  intl: IntlPropType,
};

Results.defaultProps = {
  intl: null,
};

export default injectIntl(Results);

import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import ResultLayout from "../components/layouts/resultsLayout/ResultLayout";
import { IntlPropType } from "../utils/customPropTypes";

const Results = ({ intl }) => {
  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "results.title",
    })} | I-Talent`;
  }, [intl]);

  return <ResultLayout displaySideBar />;
};

Results.propTypes = {
  intl: IntlPropType,
};

Results.defaultProps = {
  intl: null,
};

export default injectIntl(Results);

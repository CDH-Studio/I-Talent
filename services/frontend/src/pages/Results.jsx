import { useEffect } from "react";
import { useIntl } from "react-intl";
import ResultLayout from "../components/layouts/resultsLayout/ResultLayout";

const Results = () => {
  const intl = useIntl();

  useEffect(() => {
    document.title = `${intl.formatMessage({
      id: "results.title",
    })} | I-Talent`;
  }, [intl]);

  return <ResultLayout />;
};

export default Results;

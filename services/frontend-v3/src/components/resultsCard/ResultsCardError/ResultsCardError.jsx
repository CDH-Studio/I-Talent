import React from "react";
import ResultsCardErrorView from "./ResultsCardErrorView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const ResultsCardError = ({ networkErrors }) => {
  return <ResultsCardErrorView networkErrors={networkErrors} />;
};

ResultsCardError.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default ResultsCardError;

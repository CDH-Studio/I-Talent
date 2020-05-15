import React from "react";
import ResultsCardErrorView from "./ResultsCardErrorView";

const ResultsCardError = ({ networkError }) => {
  return <ResultsCardErrorView networkError={networkError} />;
};

export default ResultsCardError;

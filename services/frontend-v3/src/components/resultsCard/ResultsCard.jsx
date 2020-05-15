import React, { useState, useEffect } from "react";

import "@ant-design/compatible/assets/index.css";
import axios from "axios";
import { HistoryPropType } from "../../customPropTypes";
import config from "../../config";

import ResultsCardView from "./ResultsCardView";

const { backendAddress } = config;

const ResultsCard = ({ history }) => {
  const [results, setResults] = useState(null);
  const [networkError, setNetworkError] = useState(null);

  useEffect(() => {
    const urlSections = window.location.toString().split("?");

    if (urlSections.length === 2) {
      const queryString = urlSections[1];
      const gatherResults = async () => {
        try {
          const result = await axios.get(
            `${backendAddress}api/search/fuzzySearch?${queryString}`
          );
          setResults(result.data);
        } catch (error) {
          setNetworkError(error);
        }
      };
      gatherResults();
    } else {
      setResults(new Error("invalid query"));
    }
  }, []);

  return (
    <ResultsCardView
      history={history}
      results={results}
      networkError={networkError}
    />
  );
};

ResultsCard.propTypes = {
  history: HistoryPropType.isRequired,
};

export default ResultsCard;

import React, { useState, useEffect } from "react";

import "@ant-design/compatible/assets/index.css";
import axios from "axios";
import { HistoryPropType } from "../../customPropTypes";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import config from "../../config";

import ResultsCardView from "./ResultsCardView";

const { backendAddress } = config;

const ResultsCard = ({ history }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const urlSections = window.location.toString().split("?");

    if (urlSections.length === 2) {
      const queryString = urlSections[1];
      axios
        .get(`${backendAddress}api/search/fuzzySearch?${queryString}`)
        .then((result) => setResults(result.data));
    } else {
      setResults(new Error("invalid query"));
    }
  }, []);

  if (!results) {
    return <ProfileSkeleton />;
  }
  if (results instanceof Error) {
    return `An error was encountered! Please try again.\n\n${String(results)}`;
  }
  return <ResultsCardView history={history} results={results} />;
}

ResultsCard.propTypes = {
  history: HistoryPropType.isRequired,
};

export default ResultsCard;

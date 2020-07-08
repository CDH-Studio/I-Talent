import React, { useState, useEffect } from "react";

import "@ant-design/compatible/assets/index.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "../../axios-instance";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";

import ResultsCardView from "./ResultsCardView";
import handleError from "../../functions/handleError";

const ResultsCard = () => {
  const [results, setResults] = useState(null);
  const { locale } = useSelector((state) => state.settings);

  const history = useHistory();

  useEffect(() => {
    const urlSections = window.location.toString().split("?");

    if (urlSections.length === 2) {
      const queryString = urlSections[1];
      if (queryString.includes("searchValue")) {
        axios
          .get(`api/search/fuzzy?${queryString}&language=${locale}`)
          .then((result) => setResults(result.data))
          .catch((error) => handleError(error, "redirect"));
      } else {
        axios
          .get(`api/search/filters?${queryString}&language=${locale}`)
          .then((result) => setResults(result.data))
          .catch((error) => handleError(error, "redirect"));
      }
    } else {
      setResults(new Error("invalid query"));
    }
  }, [locale]);

  if (!results) {
    return <ProfileSkeleton />;
  }
  if (results instanceof Error) {
    return `An error was encountered! Please try again.\n\n${String(results)}`;
  }
  return (
    <ResultsCardView history={history} results={results} locale={locale} />
  );
};

ResultsCard.propTypes = {};

export default ResultsCard;

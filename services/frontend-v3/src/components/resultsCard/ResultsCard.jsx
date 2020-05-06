import React, { useState, useEffect } from "react";

import "@ant-design/compatible/assets/index.css";
import axios from "axios";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import config from "../../config";

import ResultsCardView from "./ResultsCardView";

const backendAddress = config.backendAddress;

function ResultsCard(props) {
  const [results, setResults] = useState(null);

  const gatherResults = async (query) => {
    const results1 = (
      await axios.get(backendAddress + "api/search/fuzzySearch?" + query)
    ).data;
    setResults(results1);
  };

  const urlSections = window.location.toString().split("?");
  useEffect(() => {
    if (urlSections.length === 2) {
      let queryString = urlSections[1];
      axios
        .get(backendAddress + "api/search/fuzzySearch?" + queryString)
        .then((result) => setResults(result.data));
    } else {
      setResults(new Error("invalid query"));
    }
  }, []);

  if (!results) {
    return <ProfileSkeleton />;
  } else if (results instanceof Error) {
    return "An error was encountered! Please try again.\n\n" + String(results);
  } else {
    return (
      <ResultsCardView
        changeLanguage={props.changeLanguage}
        keycloak={props.keycloak}
        history={props.history}
        results={results}
      ></ResultsCardView>
    );
  }
}

export default ResultsCard;

import React, { useState, useEffect } from "react";

import "@ant-design/compatible/assets/index.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Row } from "antd";
import axios from "../../axios-instance";

import ResultsCardView from "./ResultsCardView";
import handleError from "../../functions/handleError";
import { ReactComponent as YourSvg } from "./online_team_meeting_.svg";

const ResultsCard = () => {
  const [results, setResults] = useState(undefined);
  const { locale } = useSelector((state) => state.settings);
  const [emptyQuery, setEmptyQuery] = useState(false);

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
      setEmptyQuery(false);
    } else {
      setEmptyQuery(true);
    }
  }, [locale]);

  if (emptyQuery) {
    return (
      <>
        <Row align="middle" justify="center" style={{ marginTop: 40 }}>
          <YourSvg height={250} />
        </Row>
        <Row align="middle" justify="center" style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center", maxWidth: 250 }}>
            <FormattedMessage id="search.empty.query" />
          </p>
        </Row>
      </>
    );
  }

  return (
    <ResultsCardView
      history={history}
      results={results}
      locale={locale}
      loading={!results && !emptyQuery}
    />
  );
};

ResultsCard.propTypes = {};

export default ResultsCard;

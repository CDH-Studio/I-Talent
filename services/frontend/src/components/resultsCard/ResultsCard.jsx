import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Row } from "antd";
import { map, property } from "lodash";
import useAxios from "../../utils/useAxios";
import ResultsCardView from "./ResultsCardView";
import handleError from "../../functions/handleError";
import EmptyImage from "./online_team_meeting_.svg";

const ResultsCard = () => {
  const [results, setResults] = useState(undefined);
  const [connections, setConnections] = useState([]);
  const [emptyQuery, setEmptyQuery] = useState(false);
  const axios = useAxios();
  const { locale } = useSelector((state) => state.settings);
  const { id } = useSelector((state) => state.user);

  const history = useHistory();

  /**
   * Search based on params in url
   *
   */
  const search = useCallback(async () => {
    setResults(undefined);
    const urlSections = window.location.toString().split("?");

    if (urlSections.length === 2) {
      const queryString = urlSections[1];
      const type = queryString.includes("searchValue") ? "fuzzy" : "filters";
      const result = await axios.get(
        `api/search/${type}?${queryString}&language=${locale}`
      );

      setResults(result.data);
      setEmptyQuery(false);
    } else {
      setEmptyQuery(true);
    }
  }, [axios, locale]);

  /**
   * Get logged in user's connections
   *
   */
  const getConnections = useCallback(async () => {
    const result = await axios.get(
      `api/profile/private/${id}?language=${locale}`
    );

    setConnections(map(result.data.connections, property("id")));
  }, [axios, id, locale]);

  useEffect(() => {
    Promise.all([getConnections(), search()]).catch((e) =>
      handleError(e, "redirect", history)
    );
  }, [getConnections, search, history]);

  useEffect(
    () =>
      history.listen(async () => {
        search().catch((e) => handleError(e, "redirect", history));
      }),
    [history, search]
  );

  /**
   * Added selected profile to users connections
   * @param {String} urlID - selected profiles ID
   */
  const addConnection = async (urlID) => {
    await axios
      .post(`api/connections/${urlID}`)
      .catch((error) => handleError(error, "message", history));
    getConnections();
  };

  /**
   * Remove selected profile as users connections
   * @param {String} urlID - selected profiles ID
   */
  const removeConnection = async (urlID) => {
    await axios
      .delete(`api/connections/${urlID}`)
      .catch((error) => handleError(error, "message", history));
    getConnections();
  };

  if (emptyQuery) {
    return (
      <>
        <Row align="middle" justify="center" style={{ marginTop: 40 }}>
          <img src={EmptyImage} height={250} alt="Empty results page" />
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
      results={results}
      locale={locale}
      emptyQuery={emptyQuery}
      loading={!results && !emptyQuery}
      loggedInUserId={id}
      connections={connections}
      addConnection={addConnection}
      removeConnection={removeConnection}
    />
  );
};

export default ResultsCard;

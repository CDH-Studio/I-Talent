import React, { Component } from "react";
import ResultsLayoutView from "./resultsLayoutView";
import PropTypes from "prop-types";

/** Logic for the /results route layout */
export default class ResultsLayoutController extends Component {
  static propTypes = {
    /** Function used to change the language intl-react is using */
    changeLanguage: PropTypes.func.isRequired,
    /** React-Intl's translation object */
    intl: PropTypes.object.isRequired,
    /** Object representing Keycloak autherization */
    keycloak: PropTypes.object,
    /** Function to change route */
    redirectFunction: PropTypes.func.isRequired,
    /** Array of information on people who showed up on search query */
    results: PropTypes.object
  };

  render() {
    const {
      changeLanguage,
      keycloak,
      redirectFunction,
      results,
      searchQuery
    } = this.props;

    return (
      <ResultsLayoutView
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        redirectFunction={redirectFunction}
        results={results}
        searchQuery={searchQuery}
      />
    );
  }
}

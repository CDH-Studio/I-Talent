import React, { Component } from "react";
import axios from "axios";

import ResultsLayout from "../components/resultsLayout/resultsLayoutController";

import config from "../config";
const { backendAddress } = config;

/** Page rendered on the /results route */
export default class Results extends Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);
    this.state = { results: null };

    const handleResponse = response => {
      this.setState({ results: response });
    };
    this.handleResponse = handleResponse.bind(this);

    const handleError = error => {
      console.error(error);
      this.setState({ results: error });
    };
    this.handleError = handleError.bind(this);
  }

  componentDidMount() {
    const urlSections = window.location.toString().split("?");

    if (urlSections.length === 2) {
      this.queryString = urlSections[1];
      this.gatherResults(urlSections[1]);
    } else {
      this.queryString = "";
      this.setState({ results: new Error("invalid query") });
    }
  }

  async gatherResults(query) {
    const results = (
      await axios.get(backendAddress + "api/search/fuzzySearch?" + query)
    ).data;

    this.setState({ results: results });
  }

  render() {
    const { changeLanguage, keycloak } = this.props;
    let searchQuery = null;
    try {
      searchQuery = this.props.location.state.searchQuery;
    } catch (err) {
      if (!err instanceof ReferenceError) {
        throw err;
      }
    }

    return (
      <ResultsLayout
        results={this.state.results}
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        redirectFunction={this.goto}
        searchQuery={searchQuery}
      />
    );
  }
}

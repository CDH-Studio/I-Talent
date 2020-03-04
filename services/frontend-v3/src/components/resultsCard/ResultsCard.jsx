import React from "react";
import { Form, Col, Input, Switch, Select } from "antd";
import axios from "axios";
import ProfileSkeleton from "../profileSkeleton/ProfileSkeleton";
import {} from "antd";
import config from "../../config";
import queryString from "query-string";
import prepareInfo from "../../functions/prepareInfo";
import { injectIntl } from "react-intl";
import ResultsCardView from "./ResultsCardView";

const backendAddress = config.backendAddress;
const { Option } = Select;

class ResultsCard extends React.Component {
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

  async gatherResults(query) {
    const results1 = (
      await axios.get(backendAddress + "api/search/fuzzySearch?" + query)
    ).data;

    this.setState({ results: results1 });
    console.log("gather results: " + results1);
    console.log("this.state.results: " + this.state.results);
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

  render() {
    const { results } = this.state;
    console.log("the results in the render: " + results);
    if (!results) {
      console.log("results set to !results? " + results);
      return <ProfileSkeleton />;
    }
    if (results instanceof Error) {
      return (
        "An error was encountered! Please try again.\n\n" + String(results)
      );
    }

    return (
      <ResultsCardView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        results={this.state.results}
      ></ResultsCardView>
    );
  }
}
ResultsCard = Form.create({})(ResultsCard);
export default injectIntl(ResultsCard);

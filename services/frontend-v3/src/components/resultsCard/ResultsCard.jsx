import React from "react";
import { Form, Col, Input, Switch, Select } from "antd";
import axios from "axios";
import {} from "antd";
import config from "../../config";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import ResultsCardView from "./ResultsCardView";

const backendAddress = config.backendAddress;
const { Option } = Select;

class ResultsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillOptions: []
    };
  }

  //Fetches options for skills select field in advanced search
  //   async getSkills() {
  //     const lang = localStorage.getItem("lang");
  //     try {
  //       let results = await axios.get(
  //         backendAddress + "api/option/getDevelopmentalGoals"
  //       );
  //     }
  //   }

  //turns search values inputted into children array into query, redirects to results
  //page with query
  handleSearch = e => {
    console.log("");
    var query;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      query = queryString.stringify(values, { arrayFormat: "bracket" });

      let url = "/secured/results?" + encodeURI(query);

      this.props.history.push(url);
    });
  };

  async componentDidMount() {
    let skills = await this.getSkills();

    this.setState({ skillOptions: skills });
  }

  render() {
    return (
      <ResultsCardView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
      ></ResultsCardView>
    );
  }
}
ResultsCard = Form.create({})(ResultsCard);
export default injectIntl(ResultsCard);

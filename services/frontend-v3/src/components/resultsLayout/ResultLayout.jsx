import React from "react";
import {} from "antd";
import ResultLayoutView from "./ResultLayoutView";
import axios from "axios";
import config from "../../config";
const backendAddress = config.backendAddress;
export default class ResultLayout extends React.Component {
  render() {
    return (
      <ResultLayoutView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
      >
        {this.props.children}
      </ResultLayoutView>
    );
  }
}

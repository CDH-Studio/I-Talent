import React from "react";
import {} from "antd";
import { injectIntl } from "react-intl";

import TopNavView from "./TopNavView";

export default class TopNav extends React.Component {
  render() {
    return (
      <TopNavView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
      ></TopNavView>
    );
  }
}

import React from "react";
import {} from "antd";
import { injectIntl } from "react-intl";

import TopNavView from "./TopNavView";

class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }
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

//Needed when using this,props.intl
export default injectIntl(TopNav);

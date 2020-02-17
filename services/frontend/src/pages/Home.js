import React, { Component } from "react";
import { injectIntl } from "react-intl";

import HomeLayoutController from "../components/homeLayout/homeLayoutController";

/** Page rendered on the /home route */
class Home extends Component {
  goto = (link, state) => this.props.history.push(link, state);

  render() {
    const { changeLanguage, keycloak } = this.props;
    return (
      <HomeLayoutController
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        redirectFunction={this.goto}
      />
    );
  }
}

export default injectIntl(Home);

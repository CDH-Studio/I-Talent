import React, { Component } from "react";
import { injectIntl } from "react-intl";

import HomeLayoutController from "../components/homeLayout/homeLayoutController";
//*NOTE: I don't think this is needed any more
class Advanced extends Component {
  goto = (link, state) => this.props.history.push(link, state);

  constructor(props) {
    super(props);
    this.state = { showAdvancedOptions: false };
  }

  render() {
    const { changeLanguage, intl, keycloak } = this.props;
    return (
      <HomeLayoutController
        changeLanguage={changeLanguage}
        keycloak={keycloak}
        redirectFunction={this.goto}
        showAdvancedFields={true}
        typeButtonText={intl.formatMessage({
          id: "button.basic.search"
        })}
        typeButtonURL={"/secured/home"}
      />
    );
  }
}

export default injectIntl(Advanced);

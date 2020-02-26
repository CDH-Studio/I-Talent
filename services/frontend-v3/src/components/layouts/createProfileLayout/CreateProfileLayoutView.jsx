import React, { Component } from "react";
import AppLayout from "../appLayout/AppLayout";

export default class CreateProfileLayoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        sideBarContent={this.props.sideBarContent}
      >
        {this.props.form}
      </AppLayout>
    );
  }
}

/* Component Styles */
const styles = {
  content: {
    padding: "20px 15px",
    margin: 0,
    minHeight: 280
  }
};

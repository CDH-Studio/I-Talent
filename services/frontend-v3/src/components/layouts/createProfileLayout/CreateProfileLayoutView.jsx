import React, { Component } from "react";
import AppLayout from "../appLayout/AppLayout";

export default class CreateProfileLayoutView extends Component {
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

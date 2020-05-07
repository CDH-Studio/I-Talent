import React, { Component } from "react";
import { PageHeader } from "antd";
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
        <PageHeader
          style={{
            padding: "0 0 15px 7px"
          }}
          title="Create Profile"
        />
        {this.props.form}
      </AppLayout>
    );
  }
}

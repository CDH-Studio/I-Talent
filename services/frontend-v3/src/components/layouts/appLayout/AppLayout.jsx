import React from "react";
import AppLayoutView from "./AppLayoutView";

export default class AppLayout extends React.Component {
  render() {
    return (
      <AppLayoutView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={this.props.displaySideBar}
        sideBarContent={this.props.sideBarContent}
      >
        {this.props.children}
      </AppLayoutView>
    );
  }
}

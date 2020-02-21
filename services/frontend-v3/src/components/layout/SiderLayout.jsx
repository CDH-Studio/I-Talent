import React from "react";
import {} from "antd";
import SiderLayoutView from "./SiderLayoutView";

export default class SiderLayout extends React.Component {
  render() {
    return (
      <SiderLayoutView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
      >
        {this.props.children}
      </SiderLayoutView>
    );
  }
}

import React, { Component } from "react";
import { Layout } from "antd";
import TopNav from "./topNav/TopNav";
import SideNav from "../../sideNav/SideNav";

const { Content } = Layout;

export default class AppLayoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  render() {
    return (
      <Layout>
        {/* Render Top Navigation Bar */}
        <TopNav
          changeLanguage={this.props.changeLanguage}
          keycloak={this.props.keycloak}
          history={this.props.history}
        ></TopNav>
        <Layout>
          {/* Render Side Navigation Bar */}
          <SideNav
            sideBarContent={this.props.sideBarContent}
            displaySideBar={this.props.displaySideBar}
          ></SideNav>
          {/* Render content */}
          <Layout>
            <Content style={styles.content}>{this.props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
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

import React, { Component } from "react";
import TopNav from "../../topNav/TopNav";
import SideNav from "../../sideNav/SideNav";
import { Layout, Breadcrumb } from "antd";

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
          {/* Render content */}{" "}
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
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
    background: "#fff",
    padding: 24,
    margin: 0,
    minHeight: 280
  }
};

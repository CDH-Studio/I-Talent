import React, { Component } from "react";

import { Layout } from "antd";

import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";

const { Content } = Layout;

export default class SiderLayoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <SideNav></SideNav>

        <Layout>
          <TopNav
            changeLanguage={this.props.changeLanguage}
            keycloak={this.props.keycloak}
            history={this.props.history}
          ></TopNav>
          <Content style={styles.content}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  userProfileNav: {
    position: "absolute",
    bottom: "0",
    marginBottom: 0,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    paddingTop: "20px",
    height: "80px"
  },
  profileAvatar: {
    margin: "0"
  },
  content: {
    margin: "24px 16px",
    padding: 24,
    background: "#fff",
    minHeight: 280
  }
};

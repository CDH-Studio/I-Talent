import React, { Component } from "react";
import { Affix, Layout, Menu, Icon } from "antd";

import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";

const { Header, Sider, Content } = Layout;

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
          <TopNav></TopNav>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const styles = {
  trigger: {
    fontSize: "18px",
    lineHeight: "64px",
    padding: "0 24px",
    cursor: "pointer",
    transition: "color 0.3s"
  },
  logo: {
    height: "32px",
    background: "rgba(255, 255, 255, 0.2)",
    margin: "16px"
  },
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
  }
};

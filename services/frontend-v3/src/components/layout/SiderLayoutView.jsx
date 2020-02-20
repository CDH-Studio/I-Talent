import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";

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
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              style={styles.trigger}
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
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

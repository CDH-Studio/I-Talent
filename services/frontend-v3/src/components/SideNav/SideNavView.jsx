import React, { Component } from "react";
import { Affix, Layout, Menu, Icon, Button } from "antd";

const { Header, Sider, Content } = Layout;

export default class SideNavView extends Component {
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
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        width="250"
        style={{ minHeight: "100vh" }}
      >
        <Affix offsetTop={this.state.top}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1s</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2s</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "50px" }}
            >
              <Button
                ghost="true"
                type="primary"
                shape="circle"
                size="large"
                icon={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                loading={this.state.iconLoading}
                onClick={this.toggle}
              ></Button>
            </div>
          </Menu>
        </Affix>
      </Sider>
    );
  }
}

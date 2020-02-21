import React, { Component } from "react";
import { Affix, Layout, Menu, Icon, Button } from "antd";
import LogoBig from "./logo_v2.svg"; // Tell webpack this JS file uses this image
import LogoSmall from "./logo_v2_small.svg"; // Tell webpack this JS file uses this image

const { Sider } = Layout;

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

  // Render small or big Logo by detecting the state of the side nav
  logoRender() {
    let logoSelected;
    if (this.state.collapsed) {
      logoSelected = LogoSmall;
    } else {
      logoSelected = LogoBig;
    }
    return <img src={logoSelected} alt="Logo" style={{ height: "40px" }} />;
  }

  render() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        width="250"
        style={styles.sider}
      >
        <Affix offsetTop={this.state.top}>
          <div style={styles.logoDiv}>{this.logoRender()}</div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={styles.siderMenu}
          >
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
            <div style={styles.menuToggleBtnDiv}>
              <Button
                ghost="true"
                type="primary"
                shape="circle"
                size="large"
                icon={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              ></Button>
            </div>
          </Menu>
        </Affix>
      </Sider>
    );
  }
}

const styles = {
  sider: {
    minHeight: "100vh",
    backgroundColor: "#001e1e"
  },
  siderMenu: {
    minHeight: "100vh",
    backgroundColor: "#001e1e"
  },
  logo: {
    height: "40px"
  },
  logoDiv: {
    width: "100%",
    padding: "15px 0",
    textAlign: "center"
  },
  menuToggleBtnDiv: {
    width: "100%",
    textAlign: "center",
    marginTop: "50px"
  }
};

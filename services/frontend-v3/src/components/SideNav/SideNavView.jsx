import React, { Component } from "react";
import { Affix, Layout } from "antd";

const { Sider } = Layout;

export default class SideNavView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  // toggle side nav
  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const displaySideBar = this.props.displaySideBar;
    return (
      <div style={styles.siderDiv}>
        {/* render side bar is user sets showSideBar */}
        {displaySideBar ? (
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            width="250"
            style={styles.sider}
          >
            {/* render content of side bar */}
            <Affix offsetTop={this.state.top}>
              {this.props.sideBarContent}
            </Affix>
          </Sider>
        ) : (
          <Sider width="0" />
        )}
      </div>
    );
  }
}

/* Component Styles */
const styles = {
  siderDiv: {
    minHeight: "100vh",
    background: "#fff"
  },
  sider: {
    minHeight: "100vh",
    background: "#fff"
  },
  siderMenu: {
    minHeight: "100vh"
  }
};

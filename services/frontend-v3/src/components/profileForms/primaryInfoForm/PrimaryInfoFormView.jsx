import React, { Component } from "react";
import { Affix, Layout } from "antd";

const { Sider } = Layout;

export default class PrimaryInfoFormView extends Component {
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
    return "hello form primaryInfo";
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

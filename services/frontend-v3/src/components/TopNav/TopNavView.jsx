import React, { Component } from "react";
import { Affix, Layout, Menu, Icon } from "antd";

const { Header, Sider, Content } = Layout;

export default class TopNavView extends Component {
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
      <Affix offsetTop={this.state.top}>
        <Header style={{ background: "#fff", padding: 0 }}></Header>
      </Affix>
    );
  }
}

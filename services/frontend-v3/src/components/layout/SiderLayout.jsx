import React from "react";
import {} from "antd";
import SiderLayoutView from "./SiderLayoutView";

export default class SiderLayout extends React.Component {
  render() {
    return <SiderLayoutView>{this.props.children}</SiderLayoutView>;
  }
}

import React from "react";
import {} from "antd";
import LayoutView from "./LayoutView";

export default class Layout extends React.Component {
  render() {
    return <LayoutView>{this.props.children}</LayoutView>;
  }
}

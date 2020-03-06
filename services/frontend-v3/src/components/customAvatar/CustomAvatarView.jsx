import React, { Component } from "react";
import { Avatar } from "antd";

export default class CustomAvatarView extends Component {
  render() {
    // set icon color based on name
    var iconColor = {
      backgroundColor: this.props.color,
      color: "#fff"
    };

    // merge component style with styles passed through from parent
    var mergedStyles = {
      ...this.props.style,
      ...componentStyle,
      ...iconColor
    };

    return <Avatar style={mergedStyles}>{this.props.initials}</Avatar>;
  }
}

const componentStyle = {
  verticalAlign: "middle"
};

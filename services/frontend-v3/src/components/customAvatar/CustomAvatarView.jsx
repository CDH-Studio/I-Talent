import React from "react";
import { Avatar } from "antd";

function CustomAvatarView(props) {
  // set icon color based on name
  var iconColor = {
    backgroundColor: props.color,
    color: "#fff"
  };

  const componentStyle = {
    verticalAlign: "middle"
  };

  // merge component style with styles passed through from parent
  var mergedStyles = {
    ...props.style,
    ...componentStyle,
    ...iconColor
  };

  return <Avatar style={mergedStyles}>{props.initials}</Avatar>;
}

export default CustomAvatarView;

import React from "react";
import { Avatar } from "antd";
import { PropTypes } from "prop-types";

function CustomAvatarView({ color, style, initials }) {
  // set icon color based on name
  const iconColor = {
    backgroundColor: color,
    color: "#fff",
  };

  const componentStyle = {
    verticalAlign: "middle",
  };

  // merge component style with styles passed through from parent
  const mergedStyles = {
    ...style,
    ...componentStyle,
    ...iconColor,
  };

  return <Avatar style={mergedStyles}>{initials}</Avatar>;
}

CustomAvatarView.propTypes = {
  color: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.string).isRequired,
  initials: PropTypes.string.isRequired,
};

export default CustomAvatarView;

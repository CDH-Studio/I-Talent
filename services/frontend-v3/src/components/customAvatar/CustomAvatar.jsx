import React from "react";
import {} from "antd";
import CustomAvatarView from "./CustomAvatarView";

function CustomAvatar(props) {
  return (
    <CustomAvatarView
      initials={localStorage.getItem("acronym")}
      color={localStorage.getItem("color")}
      style={props.style}
    ></CustomAvatarView>
  );
}

export default CustomAvatar;

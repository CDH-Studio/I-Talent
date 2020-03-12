import React, { useState } from "react";
import CustomAvatarView from "./CustomAvatarView";

function CustomAvatar(props) {
  return (
    <CustomAvatarView
      initials={localStorage.getItem("acronym")}
      color={localStorage.getItem("color")}
      style={props.style}
    />
  );
}

export default CustomAvatar;

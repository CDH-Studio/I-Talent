import React from "react";
import PropTypes from "prop-types";
import CustomAvatarView from "./CustomAvatarView";

function CustomAvatar({ style }) {
  return (
    <CustomAvatarView
      initials={localStorage.getItem("acronym")}
      color={localStorage.getItem("color")}
      style={style}
    />
  );
}

CustomAvatar.propTypes = {
  style: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CustomAvatar;

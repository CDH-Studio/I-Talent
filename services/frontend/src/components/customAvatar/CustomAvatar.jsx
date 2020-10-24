import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CustomAvatarView from "./CustomAvatarView";

const CustomAvatar = ({ style, hidden }) => {
  const { avatarColor, initials } = useSelector((state) => state.user);

  return (
    <CustomAvatarView
      initials={initials}
      color={avatarColor}
      style={style}
      hidden={hidden}
    />
  );
};

CustomAvatar.propTypes = {
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  hidden: PropTypes.bool,
};

CustomAvatar.defaultProps = {
  hidden: false,
};

export default CustomAvatar;

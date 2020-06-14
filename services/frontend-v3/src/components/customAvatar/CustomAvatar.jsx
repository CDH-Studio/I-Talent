import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CustomAvatarView from "./CustomAvatarView";

const CustomAvatar = ({ style }) => {
  const { avatarColor, initials } = useSelector((state) => state.user);

  return (
    <CustomAvatarView initials={initials} color={avatarColor} style={style} />
  );
};

CustomAvatar.propTypes = {
  style: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CustomAvatar;

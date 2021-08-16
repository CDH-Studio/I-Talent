import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import CustomAvatarView from "./CustomAvatarView";

const CustomAvatar = ({ style, hidden }) => {
  const { avatarColor, initials } = useSelector((state) => state.user);

  return (
    <CustomAvatarView
      color={avatarColor}
      hidden={hidden}
      initials={initials}
      style={style}
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

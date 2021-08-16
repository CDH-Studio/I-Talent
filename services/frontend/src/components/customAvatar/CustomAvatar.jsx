import { useSelector } from "react-redux";
import PropTypes from "prop-types";

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
  hidden: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

CustomAvatar.defaultProps = {
  hidden: false,
};

export default CustomAvatar;

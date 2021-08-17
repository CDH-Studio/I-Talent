import { EyeInvisibleOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { PropTypes } from "prop-types";

const CustomAvatarView = ({ color, style, initials, hidden }) => {
  const styles = {
    avatar: {
      backgroundColor: color,
      color: "#fff",
      fontWeight: "500",
      verticalAlign: "middle",
      ...style,
    },
  };

  return (
    <Avatar style={styles.avatar}>
      {hidden ? <EyeInvisibleOutlined aria-hidden="true" /> : initials}
    </Avatar>
  );
};

CustomAvatarView.propTypes = {
  color: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  initials: PropTypes.string.isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
};

export default CustomAvatarView;

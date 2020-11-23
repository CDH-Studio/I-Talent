import { Avatar } from "antd";
import { PropTypes } from "prop-types";
import { EyeInvisibleOutlined } from "@ant-design/icons";

const CustomAvatarView = ({ color, style, initials, hidden }) => {
  const styles = {
    avatar: {
      backgroundColor: color,
      color: "#fff",
      verticalAlign: "middle",
      ...style,
    },
  };

  return (
    <Avatar style={styles.avatar}>
      {hidden ? <EyeInvisibleOutlined /> : initials}
    </Avatar>
  );
};

CustomAvatarView.propTypes = {
  color: PropTypes.string.isRequired,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  initials: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default CustomAvatarView;

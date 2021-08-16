import {
  EyeInvisibleOutlined,
  EyeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

const CardVisibilityStatusView = ({ visibilityStatus }) => {
  let cardVisibilityMessage = null;
  let cardVisibilityIcon = null;
  switch (visibilityStatus) {
    case "PUBLIC":
      cardVisibilityMessage = (
        <FormattedMessage id="visibility.status.public" />
      );
      cardVisibilityIcon = <EyeOutlined style={{ color: "#A9A9A9" }} />;
      break;
    case "PRIVATE":
      cardVisibilityMessage = (
        <FormattedMessage id="visibility.status.private" />
      );
      cardVisibilityIcon = (
        <EyeInvisibleOutlined style={{ color: "#A9A9A9" }} />
      );
      break;
    case "CONNECTIONS":
      cardVisibilityMessage = (
        <FormattedMessage id="visibility.status.connections" />
      );
      cardVisibilityIcon = <TeamOutlined style={{ color: "#A9A9A9" }} />;
      break;
    default:
      cardVisibilityMessage = null;
  }

  return (
    <Tooltip placement="left" title={cardVisibilityMessage}>
      {cardVisibilityIcon}
    </Tooltip>
  );
};

CardVisibilityStatusView.propTypes = {
  visibilityStatus: PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"])
    .isRequired,
};

export default CardVisibilityStatusView;

import { Tooltip, Typography } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const { Paragraph } = Typography;

const EmailLabel = ({ email }) => {
  const [truncated, setTruncated] = useState(false);

  return (
    <Tooltip title={truncated ? email : undefined}>
      <Paragraph
        /* Hardcoded to match the List.Item.Meta.Description property */
        style={{
          color: "rgba(0, 0, 0, 0.45)",
          "margin-bottom": "0 !important",
        }}
        ellipsis={{
          rows: 1,
          onEllipsis: setTruncated,
        }}
      >
        <>{email}</>
      </Paragraph>
    </Tooltip>
  );
};

EmailLabel.propTypes = {
  email: PropTypes.string.isRequired,
};

export default EmailLabel;

import React from "react";
import {
  EyeInvisibleOutlined,
  TeamOutlined,
  EyeOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Tooltip, Radio, Popconfirm } from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";

const CardVisibilityToggleView = ({ status, handleVisibilityToggle, type }) => (
  <Radio.Group value={status} buttonStyle="solid" size="middle">
    <Popconfirm
      title={
        <FormattedMessage id={`profile.visibility.${type}.show.confirm`} />
      }
      placement="topRight"
      okText={<FormattedMessage id="profile.yes" />}
      cancelText={<FormattedMessage id="profile.no" />}
      icon={<WarningOutlined style={{ color: "orange" }} />}
      onConfirm={() => handleVisibilityToggle("PUBLIC")}
    >
      <Tooltip
        placement="bottom"
        title={<FormattedMessage id={`profile.visibility.${type}.public`} />}
      >
        <Radio.Button value="PUBLIC">
          <EyeOutlined />
        </Radio.Button>
      </Tooltip>
    </Popconfirm>
    <Tooltip
      placement="top"
      title={<FormattedMessage id={`profile.visibility.${type}.connections`} />}
    >
      <Radio.Button
        value="CONNECTIONS"
        onClick={() => handleVisibilityToggle("CONNECTIONS")}
      >
        <TeamOutlined />
      </Radio.Button>
    </Tooltip>
    <Tooltip
      placement="top"
      title={<FormattedMessage id={`profile.visibility.${type}.private`} />}
    >
      <Radio.Button
        value="PRIVATE"
        onClick={() => handleVisibilityToggle("PRIVATE")}
      >
        <EyeInvisibleOutlined />
      </Radio.Button>
    </Tooltip>
  </Radio.Group>
);

CardVisibilityToggleView.propTypes = {
  status: PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]).isRequired,
  handleVisibilityToggle: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["form", "card"]).isRequired,
};

export default CardVisibilityToggleView;

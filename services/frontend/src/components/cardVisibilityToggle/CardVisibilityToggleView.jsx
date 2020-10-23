import React from "react";
import {
  EyeInvisibleOutlined,
  TeamOutlined,
  EyeOutlined,
  WarningOutlined,
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Tooltip,
  Radio,
  Popconfirm,
  Menu,
  Dropdown,
  Button,
  message,
  Select,
} from "antd";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
const { Option } = Select;

const CardVisibilityToggleView = ({ status, handleVisibilityToggle, type }) => {
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="PUBLIC" icon={<EyeOutlined />}>
        Public
      </Menu.Item>
      <Menu.Item key="CONNECTIONS" icon={<TeamOutlined />}>
        Connections
      </Menu.Item>
      <Menu.Item key="PRIVATE" icon={<EyeInvisibleOutlined />}>
        Private
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {/* <Dropdown overlay={menu}>
        <Button>
          Button <DownOutlined />
        </Button>
      </Dropdown> */}
      <Select
        value={status}
        style={{ width: 120 }}
        onChange={handleVisibilityToggle}
      >
        <Option value="PUBLIC">
          <EyeOutlined style={{ marginRight: "3px" }} /> Public
        </Option>
        <Option value="CONNECTIONS">
          <TeamOutlined style={{ marginRight: "3px" }} /> Connections
        </Option>
        <Option value="PRIVATE">
          <EyeInvisibleOutlined style={{ marginRight: "3px" }} /> Private
        </Option>
      </Select>
    </>
  );
};

CardVisibilityToggleView.propTypes = {
  status: PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]).isRequired,
  handleVisibilityToggle: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["form", "card"]).isRequired,
};

export default CardVisibilityToggleView;

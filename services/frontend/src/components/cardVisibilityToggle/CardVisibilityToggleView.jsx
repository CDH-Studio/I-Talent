import React, { useState } from "react";
import { Select, Modal, notification } from "antd";
import {
  EyeInvisibleOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import "./CardVisibilityToggle.scss";

const { Option } = Select;

const CardVisibilityToggleView = ({ status, handleVisibilityToggle, type }) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  /**
   * Open success notification on save
   */
  const openNotification = () => {
    notification.success({
      message: `Visibility Updated`,
      description: "the visibility has been successfully updated",
      placement: "topRight",
    });
  };

  /**
   * Handel selection change in drop down
   * open modal confirmation if "public" is selected
   * @param {Object} value - value selected from dropdown
   */

  const handleSelect = (value) => {
    if (value === "PUBLIC") {
      setModalVisibility(true);
    } else {
      handleVisibilityToggle(value);
      openNotification();
    }
  };

  /**
   * Handel public visibility confirmation
   * save the value, hide modal, and show notification
   */
  const handleVisibilityPublicOk = () => {
    handleVisibilityToggle("PUBLIC");
    setModalVisibility(false);
    openNotification();
  };

  /**
   * Handel public visibility cancellation
   * hide the modal
   */
  const handleVisibilityPublicCancel = () => {
    setModalVisibility(false);
  };

  return (
    <>
      <Select
        value={status}
        className="visibilitySelector"
        style={{ width: 120 }}
        onSelect={handleSelect}
      >
        <Option value="PUBLIC">
          <EyeOutlined />
          <span>Public</span>
        </Option>
        <Option value="CONNECTIONS">
          <TeamOutlined />
          <span>Connections</span>
        </Option>
        <Option value="PRIVATE">
          <EyeInvisibleOutlined />
          <span>Private</span>
        </Option>
      </Select>

      <Modal
        title="Public Visibility Confirmation"
        visible={modalVisibility}
        okText={<FormattedMessage id="profile.yes" />}
        cancelText={<FormattedMessage id="profile.no" />}
        onOk={handleVisibilityPublicOk}
        onCancel={handleVisibilityPublicCancel}
      >
        <FormattedMessage id={`profile.visibility.${type}.show.confirm`} />
      </Modal>
    </>
  );
};

CardVisibilityToggleView.propTypes = {
  status: PropTypes.oneOf(["PRIVATE", "CONNECTIONS", "PUBLIC"]).isRequired,
  handleVisibilityToggle: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["form", "card"]).isRequired,
};

export default CardVisibilityToggleView;

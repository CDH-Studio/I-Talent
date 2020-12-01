import { useState } from "react";
import { Select, Modal, notification } from "antd";
import {
  EyeInvisibleOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import "./CardVisibilityToggle.less";

const { Option } = Select;

const CardVisibilityToggleView = ({ status, handleVisibilityToggle, type }) => {
  const intl = useIntl();
  const [modalVisibility, setModalVisibility] = useState(false);

  /**
   * Open success notification on save
   */
  const openNotification = () => {
    notification.success({
      message: intl.formatMessage({
        id: "visibility.confirmation.title",
      }),
      description: intl.formatMessage({
        id: "visibility.confirmation.message",
      }),
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
          <EyeOutlined className="visibilityOptionIcon" />
          <FormattedMessage id="visibility.card.public" />
        </Option>
        <Option value="CONNECTIONS">
          <TeamOutlined className="visibilityOptionIcon" />
          <FormattedMessage id="visibility.card.connections" />
        </Option>
        <Option value="PRIVATE">
          <EyeInvisibleOutlined className="visibilityOptionIcon" />
          <FormattedMessage id="visibility.card.private" />
        </Option>
      </Select>

      <Modal
        title={<FormattedMessage id="visibility.card.title" />}
        visible={modalVisibility}
        okText={<FormattedMessage id="yes" />}
        cancelText={<FormattedMessage id="no" />}
        onOk={handleVisibilityPublicOk}
        onCancel={handleVisibilityPublicCancel}
      >
        <FormattedMessage id={`visibility.${type}.show.confirm`} />
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

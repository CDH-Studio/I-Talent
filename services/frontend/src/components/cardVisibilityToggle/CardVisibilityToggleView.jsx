import { useState } from "react";
import { Select, Modal, notification, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  TeamOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import PropTypes from "prop-types";
import "./CardVisibilityToggleView.less";

const { Option } = Select;
const { Text } = Typography;

const CardVisibilityToggleView = ({ status, handleVisibilityToggle, type }) => {
  const intl = useIntl();
  const [modalVisibility, setModalVisibility] = useState(false);

  /**
   * Open success notification on save
   */
  const openNotification = () => {
    notification.success({
      message: intl.formatMessage({
        id: "profile.visibility.confirmation.title",
      }),
      description: intl.formatMessage({
        id: "profile.visibility.confirmation.message",
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
        role="listbox"
        aria-label={intl.formatMessage({
          id: "profile.visibility.card.toggle.label",
        })}
        aria-roledescription={intl.formatMessage({
          id: "profile.visibility.card.toggle.description",
        })}
        value={status}
        className="visibilitySelector"
        style={{ width: 120 }}
        onSelect={handleSelect}
      >
        <Option value="PUBLIC">
          <EyeOutlined className="visibilityOptionIcon" />
          <FormattedMessage id="profile.visibility.card.public" />
        </Option>
        <Option value="CONNECTIONS">
          <TeamOutlined className="visibilityOptionIcon" />
          <FormattedMessage id="profile.visibility.card.connections" />
        </Option>
        <Option value="PRIVATE">
          <EyeInvisibleOutlined className="visibilityOptionIcon" />
          <FormattedMessage id="profile.visibility.card.private" />
        </Option>
      </Select>

      <Modal
        role="dialog"
        title={<FormattedMessage id="profile.visibility.card.title" />}
        visible={modalVisibility}
        okText={<FormattedMessage id="profile.yes" />}
        cancelText={<FormattedMessage id="profile.no" />}
        onOk={handleVisibilityPublicOk}
        onCancel={handleVisibilityPublicCancel}
      >
        <Text strong>
          <FormattedMessage id={`profile.visibility.${type}.show.confirm`} />
        </Text>
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

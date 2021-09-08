import { FormattedMessage, useIntl } from "react-intl";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EyeFilled,
  EyeInvisibleFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Modal, Switch, Tooltip } from "antd";
import PropTypes from "prop-types";

import Header from "../../header/Header";
import AppLayout from "../appLayout/AppLayout";

const SettingsLayoutView = ({
  deleteCurrentUser,
  setProfileVisibility,
  profileStatus,
}) => {
  const intl = useIntl();

  /**
   * Generates the modal to confirm "delete account"
   *
   */
  const showDeleteAccountModal = () => {
    Modal.confirm({
      autoFocusButton: null,
      cancelText: intl.formatMessage({ id: "no" }),
      content: intl.formatMessage({
        id: "settings.delete.modal.content",
      }),
      icon: <ExclamationCircleOutlined aria-hidden="true" />,
      keyboard: false,
      okText: intl.formatMessage({ id: "yes" }),
      okType: "danger",
      onOk: deleteCurrentUser,
      title: intl.formatMessage({
        id: "settings.delete.modal.title",
      }),
    });
  };

  const listData = [
    {
      description: <FormattedMessage id="profile.visibility.description" />,
      extra: (
        <Tooltip
          placement="topRight"
          title={() => {
            switch (profileStatus) {
              case "INACTIVE":
                return intl.formatMessage({ id: "settings.inactive.toggle" });
              case "HIDDEN":
                return intl.formatMessage({ id: "settings.visibility.toggle" });
              default:
                return intl.formatMessage({ id: "settings.hidden.toggle" });
            }
          }}
        >
          <Switch
            checkedChildren={<EyeFilled />}
            defaultChecked={profileStatus === "ACTIVE"}
            disabled={profileStatus === "INACTIVE"}
            onChange={setProfileVisibility}
            unCheckedChildren={<EyeInvisibleFilled />}
          />
        </Tooltip>
      ),
      title: <FormattedMessage id="profile.visibility" />,
    },
    {
      description: <FormattedMessage id="delete.account.description" />,
      extra: (
        <>
          <Button
            danger
            icon={<DeleteOutlined aria-hidden="true" className="mr-2" />}
            onClick={showDeleteAccountModal}
          >
            <FormattedMessage id="delete.account" />
          </Button>
        </>
      ),
      title: <FormattedMessage id="permanently.delete.account" />,
    },
  ];

  return (
    <AppLayout>
      <Header
        icon={<SettingOutlined />}
        title={<FormattedMessage id="settings" />}
      />
      <Card>
        <List
          dataSource={listData}
          itemLayout="horizontal"
          renderItem={({ title, description, extra }) => (
            <List.Item extra={extra}>
              <List.Item.Meta description={description} title={title} />
            </List.Item>
          )}
        />
      </Card>
    </AppLayout>
  );
};

SettingsLayoutView.propTypes = {
  deleteCurrentUser: PropTypes.func.isRequired,
  profileStatus: PropTypes.oneOf(["ACTIVE", "INACTIVE", "HIDDEN"]).isRequired,
  setProfileVisibility: PropTypes.func.isRequired,
};

export default SettingsLayoutView;

import { FormattedMessage, useIntl } from "react-intl";
import { Card, List, Button, Modal, Switch, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeInvisibleFilled,
  EyeFilled,
  SettingOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import AppLayout from "../appLayout/AppLayout";
import Header from "../../header/Header";

const SettingsLayoutView = ({
  deleteCurrentUser,
  setProfileVisibility,
  profileStatus,
}) => {
  const intl = useIntl();

  const listData = [
    {
      title: <FormattedMessage id="profile.visibility" />,
      description: <FormattedMessage id="profile.visibility.description" />,
      extra: (
        <Tooltip
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
          placement="topRight"
        >
          <Switch
            checkedChildren={<EyeFilled />}
            unCheckedChildren={<EyeInvisibleFilled />}
            onChange={setProfileVisibility}
            defaultChecked={profileStatus === "ACTIVE"}
            disabled={profileStatus === "INACTIVE"}
          />
        </Tooltip>
      ),
    },
    {
      title: <FormattedMessage id="permanently.delete.account" />,
      description: <FormattedMessage id="delete.account.description" />,
      extra: (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: intl.formatMessage({ id: "settings.delete.modal.title" }),
              content: intl.formatMessage({
                id: "settings.delete.modal.content",
              }),
              okText: intl.formatMessage({ id: "yes" }),
              okType: "danger",
              cancelText: intl.formatMessage({ id: "no" }),
              autoFocusButton: null,
              onOk: deleteCurrentUser,
            });
          }}
        >
          <span>
            <FormattedMessage id="delete.account" />
          </span>
        </Button>
      ),
    },
  ];

  return (
    <AppLayout>
      <Header
        title={<FormattedMessage id="settings" />}
        icon={<SettingOutlined />}
      />
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={({ title, description, extra }) => (
            <List.Item extra={extra}>
              <List.Item.Meta title={title} description={description} />
            </List.Item>
          )}
        />
      </Card>
    </AppLayout>
  );
};

SettingsLayoutView.propTypes = {
  deleteCurrentUser: PropTypes.func.isRequired,
  setProfileVisibility: PropTypes.func.isRequired,
  profileStatus: PropTypes.oneOf(["ACTIVE", "INACTIVE", "HIDDEN"]).isRequired,
};

export default SettingsLayoutView;

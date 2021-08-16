import {
  DeleteOutlined,
  EyeFilled,
  EyeInvisibleFilled,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Modal, Switch, Tooltip } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage, useIntl } from "react-intl";

import Header from "../../header/Header";
import AppLayout from "../appLayout/AppLayout";

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
  setProfileVisibility: PropTypes.func.isRequired,
  profileStatus: PropTypes.oneOf(["ACTIVE", "INACTIVE", "HIDDEN"]).isRequired,
};

export default SettingsLayoutView;

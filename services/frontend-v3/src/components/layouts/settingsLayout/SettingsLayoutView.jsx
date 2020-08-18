import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Card, List, Button, Modal, Switch, Tooltip } from "antd";
import {
  DeleteOutlined,
  EyeInvisibleFilled,
  EyeFilled,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import AppLayout from "../appLayout/AppLayout";
import Header from "../../header/Header";

const StatsLayoutView = ({
  deleteCurrentUser,
  setProfileVisibility,
  profileStatus,
}) => {
  const intl = useIntl();

  const listData = [
    {
      title: <FormattedMessage id="settings.visibility.title" />,
      description: <FormattedMessage id="settings.visibility.description" />,
      extra: (
        <Tooltip
          title={() => {
            switch (profileStatus) {
              case "INACTIVE":
                return intl.formatMessage({ id: "settings.inactive.toggle" });
              case "HIDDEN":
                return intl.formatMessage({ id: "settings.visible.toggle" });
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
      title: <FormattedMessage id="settings.delete.title" />,
      description: <FormattedMessage id="settings.delete.description" />,
      extra: (
        <Button
          danger
          icon={<DeleteOutlined style={{ marginRight: 5 }} />}
          onClick={() => {
            Modal.confirm({
              title: intl.formatMessage({ id: "settings.delete.modal.title" }),
              content: intl.formatMessage({
                id: "settings.delete.modal.content",
              }),
              okText: intl.formatMessage({ id: "profile.yes" }),
              okType: "danger",
              cancelText: intl.formatMessage({ id: "profile.no" }),
              autoFocusButton: null,
              onOk: deleteCurrentUser,
            });
          }}
        >
          <FormattedMessage id="settings.delete.button" />
        </Button>
      ),
    },
  ];

  return (
    <AppLayout>
      <Header title={<FormattedMessage id="settings.title" />} />
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

StatsLayoutView.propTypes = {
  deleteCurrentUser: PropTypes.func.isRequired,
  setProfileVisibility: PropTypes.func.isRequired,
  profileStatus: PropTypes.oneOf(["ACTIVE", "INACTIVE", "HIDDEN"]).isRequired,
};

export default StatsLayoutView;

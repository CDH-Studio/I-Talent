import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Card, List, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AppLayout from "../appLayout/AppLayout";
import Header from "../../header/Header";
import useAxios from "../../../utils/axios-instance";
import handleError from "../../../functions/handleError";

const StatsLayoutView = () => {
  const axios = useAxios();
  const history = useHistory();
  const intl = useIntl();
  const { id } = useSelector((state) => state.user);

  const listData = [
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
              onOk: async () => {
                try {
                  axios.delete(`/api/user/${id}`);
                  history.push("/logout");
                } catch (error) {
                  handleError(error, "message");
                }
              },
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

export default StatsLayoutView;

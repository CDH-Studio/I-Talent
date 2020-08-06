import React from "react";
import { FormattedMessage } from "react-intl";
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
  const { id } = useSelector((state) => state.user);

  const listData = [
    {
      title: "Permanently delete account",
      description:
        "This will delete everything related to your account. Performing this action is irreversable! ",
      extra: (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "Are you sure?",
              content:
                "Proceeding will delete your account and you will be redirected to the home screen",
              okText: "Yes",
              okType: "danger",
              cancelText: "No",
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
          Delete account
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

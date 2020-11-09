import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Modal,
  Form,
  Radio,
  notification,
} from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { EditOutlined, DatabaseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import TextArea from "antd/lib/input/TextArea";
import Header from "../../header/Header";
import useAxios from "../../../utils/useAxios";
import handleError from "../../../functions/handleError";

const tableColumns = (handleEdit) => [
  {
    title: "User",
    key: "user",
    render: (record) => {
      return <Link to={`/profile/${record.userId}`}>{record.userName}</Link>;
    },
  },
  {
    title: "Created at",
    dataIndex: "createdAt",
    key: "createdAt",
    sortDirections: ["descend"],
    defaultSortOrder: "ascend",
    sorter: (a, b) => {
      return dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix();
    },
  },
  {
    title: <FormattedMessage id="admin.last.updated" />,
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => {
      return dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix();
    },
  },
  {
    title: "Application version",
    dataIndex: "appVersion",
    key: "appVersion",
    render: (value) => (value || "-"),
  },
  {
    title: "Bug location",
    filters: [
      {
        text: "Home",
        value: "HOME",
      },
      {
        text: "Search",
        value: "SEARCH",
      },
      {
        text: "Profile",
        value: "PROFILE",
      },
      {
        text: "Forms",
        value: "FORMS",
      },
    ],
    onFilter: (value, record) => record.location === value,
    render: (record) => (
      <>
        <Tag visible={record.location === "HOME"} color="magenta">
          Home
        </Tag>
        <Tag visible={record.location === "SEARCH"} color="geekblue">
          Search
        </Tag>
        <Tag visible={record.location === "PROFILE"} color="green">
          Profile
        </Tag>
        <Tag visible={record.location === "FORMS"} color="green">
          forms
        </Tag>
      </>
    ),
  },
  {
    title: "Bug status",
    filters: [
      {
        text: "Resolved",
        value: "RESOLVED",
      },
      {
        text: "Unresolved",
        value: "UNRESOLVED",
      },
    ],
    onFilter: (value, record) => record.status === value,
    render: (record) => (
      <>
        <Tag visible={record.status === "RESOLVED"} color="magenta">
          Resolved
        </Tag>
        <Tag visible={record.status === "UNRESOLVED"} color="geekblue">
          Unresolved
        </Tag>
      </>
    ),
  },
  {
    title: "Linked GitHub issue",
    dataIndex: "githubIssue",
    key: "githubIssue",
    render: (value) =>
      value ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/CDH-Studio/I-Talent/issues/${value}`}
        >
          #{value}
        </a>
      ) : (
        "-"
      ),
  },
  {
    title: <FormattedMessage id="admin.edit" />,
    key: "edit",
    fixed: "right",
    width: 70,
    render: (record) => (
      <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
      />
    ),
  },
];

const Rules = {
  required: {
    required: true,
    message: <FormattedMessage id="profile.rules.required" />,
  },
  maxChar500: {
    max: 500,
    message: <FormattedMessage id="profile.rules.max" values={{ max: 500 }} />,
  },
};

const BugsTableView = ({ getBugs }) => {
  const [form] = Form.useForm();
  const { data, loading } = useSelector((state) => state.admin.bugs);
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState();
  const axios = useAxios();
  const history = useHistory();
  const intl = useIntl();

  /**
   * Open Notification
   * @param {Object} notification - The notification to be displayed.
   * @param {string} notification.type - The type of notification.
   * @param {string} notification.description - Additional info in notification.
   */
  const openNotificationWithIcon = ({ type, description }) => {
    switch (type) {
      case "success":
        notification.success({
          message: intl.formatMessage({
            id: "profile.edit.save.success",
          }),
        });
        break;
      case "error":
        notification.error({
          message: intl.formatMessage({ id: "profile.edit.save.error" }),
          description,
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({
            id: "profile.edit.save.problem",
          }),
        });
        break;
    }
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
    setEditId(record.id);
  };

  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };

    if (!values.githubIssue || values.githubIssue.length === 0) {
      delete values.githubIssue;
    }

    await axios.put(`api/bugs/${editId}`, values);
  };

  const updateBugReport = () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        openNotificationWithIcon({ type: "success" });
        form.resetFields();
        setVisible(false);
        getBugs();
      })
      .catch((error) => {
        handleError(error, "message", history);
      });
  };

  return (
    <>
      <Header
        title={
          <>
            <DatabaseOutlined />
            User reported bugs
          </>
        }
      />
      <Table
        size="large"
        columns={tableColumns(handleEdit)}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1200 }}
        expandable={{
          rowExpandable: () => true,
          expandRowByClick: true,
          childrenColumnName: "Description",
          defaultExpandAllRows: true,
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <strong>Bug description:</strong> {record.description}
            </p>
          ),
        }}
      />
      <Modal
        visible={visible}
        okText={<FormattedMessage id="admin.apply" />}
        onCancel={() => setVisible(false)}
        onOk={updateBugReport}
        title="Edit bug"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="Status" rules={[Rules.required]}>
            <Radio.Group
              options={[
                { label: "Resolved", value: "RESOLVED" },
                { label: "Unresolved", value: "UNRESOLVED" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item name="location" label="Location" rules={[Rules.required]}>
            <Radio.Group
              options={[
                { label: "Home", value: "HOME" },
                { label: "Profile", value: "PROFILE" },
                { label: "Search", value: "SEARCH" },
                { label: "Forms", value: "FORMS" },
              ]}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item name="githubIssue" label="GitHub issue number">
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[Rules.required, Rules.maxChar500]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

BugsTableView.propTypes = {
  getBugs: PropTypes.func.isRequired,
};

export default BugsTableView;

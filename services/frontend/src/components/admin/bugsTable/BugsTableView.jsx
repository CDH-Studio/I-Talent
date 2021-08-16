import { useState } from "react";
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
import handleError from "../../../functions/handleError";

const tableColumns = (handleEdit) => [
  {
    title: <FormattedMessage id="name" />,
    key: "user",
    render: (record) => (
      <Link to={`/profile/${record.userId}`}>{record.userName}</Link>
    ),
  },
  {
    title: <FormattedMessage id="created.at" />,
    dataIndex: "createdAt",
    key: "createdAt",
    sortDirections: ["descend"],
    defaultSortOrder: "ascend",
    sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
  },
  {
    title: <FormattedMessage id="last.updated" />,
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix(),
  },
  {
    title: <FormattedMessage id="application.version" />,
    dataIndex: "appVersion",
    key: "appVersion",
    render: (value) => value || "-",
  },
  {
    title: <FormattedMessage id="location" />,
    filters: [
      {
        text: <FormattedMessage id="home" />,
        value: "HOME",
      },
      {
        text: <FormattedMessage id="search" />,
        value: "SEARCH",
      },
      {
        text: <FormattedMessage id="profile" />,
        value: "PROFILE",
      },
      {
        text: <FormattedMessage id="bugs.location.forms" />,
        value: "FORMS",
      },
    ],
    onFilter: (value, record) => record.location === value,
    render: (record) => (
      <>
        <Tag color="magenta" visible={record.location === "HOME"}>
          <FormattedMessage id="home" />
        </Tag>
        <Tag color="geekblue" visible={record.location === "SEARCH"}>
          <FormattedMessage id="search" />
        </Tag>
        <Tag color="green" visible={record.location === "PROFILE"}>
          <FormattedMessage id="profile" />
        </Tag>
        <Tag color="orange" visible={record.location === "FORMS"}>
          <FormattedMessage id="bugs.location.forms" />
        </Tag>
      </>
    ),
  },
  {
    title: <FormattedMessage id="bugs.status" />,
    filters: [
      {
        text: <FormattedMessage id="bugs.status.duplicate" />,
        value: "DUPLICATE",
      },
      {
        text: <FormattedMessage id="bugs.status.resolved" />,
        value: "RESOLVED",
      },
      {
        text: <FormattedMessage id="bugs.status.unresolved" />,
        value: "UNRESOLVED",
      },
    ],
    onFilter: (value, record) => record.status === value,
    render: (record) => (
      <>
        <Tag color="orange" visible={record.status === "DUPLICATE"}>
          <FormattedMessage id="bugs.status.duplicate" />
        </Tag>
        <Tag color="magenta" visible={record.status === "RESOLVED"}>
          <FormattedMessage id="bugs.status.resolved" />
        </Tag>
        <Tag color="geekblue" visible={record.status === "UNRESOLVED"}>
          <FormattedMessage id="bugs.status.unresolved" />
        </Tag>
      </>
    ),
  },
  {
    title: <FormattedMessage id="github.issue.link" />,
    dataIndex: "githubIssue",
    key: "githubIssue",
    render: (value) =>
      value ? (
        <a
          href={`https://github.com/CDH-Studio/I-Talent/issues/${value}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          #{value}
        </a>
      ) : (
        "-"
      ),
  },
  {
    title: <FormattedMessage id="edit" />,
    key: "edit",
    fixed: "right",
    width: 70,
    render: (record) => (
      <Button
        icon={<EditOutlined />}
        onClick={() => handleEdit(record)}
        shape="circle"
        type="primary"
      />
    ),
  },
];

const Rules = {
  required: {
    required: true,
    message: <FormattedMessage id="rules.required" />,
  },
  maxChar500: {
    max: 500,
    message: <FormattedMessage id="rules.max" values={{ max: 500 }} />,
  },
};

const BugsTableView = ({ getBugs, saveDataToDB }) => {
  const [form] = Form.useForm();
  const { data, loading } = useSelector((state) => state.admin.bugs);
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState();
  const history = useHistory();
  const intl = useIntl();

  const statusOptions = [
    {
      label: intl.formatMessage({ id: "bugs.status.duplicate" }),
      value: "DUPLICATE",
    },
    {
      label: intl.formatMessage({ id: "bugs.status.resolved" }),
      value: "RESOLVED",
    },
    {
      label: intl.formatMessage({ id: "bugs.status.unresolved" }),
      value: "UNRESOLVED",
    },
  ];

  const locationOptions = [
    {
      label: intl.formatMessage({ id: "home" }),
      value: "HOME",
    },
    {
      label: intl.formatMessage({ id: "profile" }),
      value: "PROFILE",
    },
    {
      label: intl.formatMessage({ id: "search" }),
      value: "SEARCH",
    },
    {
      label: intl.formatMessage({ id: "bugs.location.forms" }),
      value: "FORMS",
    },
  ];

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
            id: "edit.save.success",
          }),
        });
        break;
      case "error":
        notification.error({
          message: intl.formatMessage({ id: "edit.save.error" }),
          description,
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({
            id: "edit.save.problem",
          }),
        });
        break;
    }
  };

  /**
   * Update form and state to show edit modal
   * @param {Object} record Selected edit row bug content
   */
  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setVisible(true);
    setEditId(record.id);
  };

  /**
   * Send API request to backend to update bug report
   */
  const updateBugReport = () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values, editId);
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
        icon={<DatabaseOutlined />}
        title={<FormattedMessage id="user.reported.bugs" />}
      />
      <Table
        columns={tableColumns(handleEdit)}
        dataSource={data}
        expandable={{
          rowExpandable: () => true,
          expandRowByClick: true,
          defaultExpandAllRows: true,
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              <strong>
                <FormattedMessage id="description" />
              </strong>
              {record.description}
            </p>
          ),
        }}
        loading={loading}
        scroll={{ x: 1200 }}
        size="large"
      />
      <Modal
        okText={<FormattedMessage id="save" />}
        onCancel={() => setVisible(false)}
        onOk={updateBugReport}
        title={<FormattedMessage id="edit.bugs" />}
        visible={visible}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label={<FormattedMessage id="bugs.status" />}
            name="status"
            rules={[Rules.required]}
          >
            <Radio.Group
              buttonStyle="solid"
              options={statusOptions}
              optionType="button"
            />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="location" />}
            name="location"
            rules={[Rules.required]}
          >
            <Radio.Group
              buttonStyle="solid"
              options={locationOptions}
              optionType="button"
            />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="github.issue.number" />}
            name="githubIssue"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="description" />}
            name="description"
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
  saveDataToDB: PropTypes.func.isRequired,
};

export default BugsTableView;

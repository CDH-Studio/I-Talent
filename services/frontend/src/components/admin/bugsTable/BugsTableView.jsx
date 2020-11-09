import React from "react";
import { Table, Tag, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Header from "../../header/Header";
import { EditOutlined } from "@ant-design/icons";

const tableColumns = [
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
    // ...getColumnSearchProps(
    //   "formatCreatedAt",
    //   intl.formatMessage({
    //     id: "admin.registered",
    //   })
    // ),
  },
  {
    title: <FormattedMessage id="admin.last.updated" />,
    dataIndex: "updatedAt",
    key: "updatedAt",
    sorter: (a, b) => {
      return dayjs(a.updatedAt).unix() - dayjs(b.updatedAt).unix();
    },
    // ...getColumnSearchProps(
    //   "formatUpdatedAt",
    //   intl.formatMessage({
    //     id: "admin.last.updated",
    //   })
    // ),
  },
  {
    title: "Application version",
    dataIndex: "appVersion",
    key: "appVersion",
    render: (value) => (value ? value : "-"),
    // sorter: (a, b) => {
    //   return dayjs(a.formatCreatedAt).unix() - dayjs(b.formatCreatedAt).unix();
    // },
    // ...getColumnSearchProps(
    //   "formatCreatedAt",
    //   intl.formatMessage({
    //     id: "admin.registered",
    //   })
    // ),
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
    onFilter: (value, record) => record[value],
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
    render: (record) =>
      record && record.githubIssue ? (
        <a
          href={`https://github.com/CDH-Studio/I-Talent/issues/${record.githubIssue}`}
        >
          {record.githubIssue}
        </a>
      ) : (
        "-"
      ),
    // sorter: (a, b) => {
    //   return dayjs(a.formatCreatedAt).unix() - dayjs(b.formatCreatedAt).unix();
    // },
    // ...getColumnSearchProps(
    //   "formatCreatedAt",
    //   intl.formatMessage({
    //     id: "admin.registered",
    //   })
    // ),
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
          onClick={() => {
          }}
        />
    ),
  },
];

const BugsTableView = () => {
  const { data, loading } = useSelector((state) => state.admin.bugs);

  return (
    <>
      <Header title="Bugs" />
      <Table
        size="large"
        columns={tableColumns}
        dataSource={data}
        loading={loading}
        scroll={{ x: 1200 }}
      />
    </>
  );
};

export default BugsTableView;

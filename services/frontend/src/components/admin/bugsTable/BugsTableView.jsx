import React from "react";
import { Table, Tag } from "antd";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Header from "../../header/Header";

const tableColumns = [
  {
    title: "User",
    dataIndex: "userName",
    key: "userName",
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
    dataIndex: "release",
    key: "release",
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
        <Tag visible={record.isAdmin} color="magenta">
          <FormattedMessage id="admin.roles.admin" />
        </Tag>
        <Tag visible={record.isManager} color="geekblue">
          <FormattedMessage id="admin.roles.manager" />
        </Tag>
        <Tag visible={!record.isManager && !record.isAdmin} color="green">
          <FormattedMessage id="admin.roles.standard" />
        </Tag>
      </>
    ),
  },
  {
    title: "Bug status",
    fixed: "right",
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
    // render: (record) => {
    //   return renderStatusDropdown(record.key, record.status);
    // },
  },
  {
    title: "Linked GitHub issue",
    dataIndex: "formatCreatedAt",
    key: "registered",
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
];

const BugsTableView = () => {
  const { data, loading } = useSelector((state) => state.admin.bugs);

  return (
    <>
      <Header title="Bugs" />
      <Table size="large" columns={tableColumns} dataSource={data} loading={loading} />
    </>
  );
};

export default BugsTableView;

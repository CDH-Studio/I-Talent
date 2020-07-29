import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  Button,
  Row,
  Col,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
} from "antd";
import {
  CheckCircleOutlined,
  LinkOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IntlPropType } from "../../../utils/customPropTypes";
import _ from "lodash";
import handleError from "../../../functions/handleError";
import Header from "../../header/Header";
import config from "../../../utils/config";

/**
 *  UserTableView(props)
 *  This component renders the user table for the Admin User Page.
 */
const UserTableView = ({
  intl,
  searchText,
  searchedColumn,
  handleApply,
  handleDropdownChange,
  profileStatusValue,
  handleSearch,
  handleReset,
}) => {
  let searchInput;

  const { Option } = Select;

  const { locale } = useSelector((state) => state.settings);
  const { data, loading, locale: dataLocale } = useSelector(
    (state) => state.admin.users
  );

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      /* eslint-disable react/prop-types */
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      /* eslint-enable react/prop-types */
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`${intl.formatMessage({
            id: "admin.search",
          })} ${title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          <FormattedMessage id="admin.search.button" />
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          <FormattedMessage id="admin.reset.button" />
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  /* Renders the dropdown for profile status options */
  const renderStatusDropdown = (id, status) => {
    return (
      <div>
        <Select
          defaultValue={profileStatusValue(status)}
          style={{ width: 120 }}
          onChange={(value) => {
            handleDropdownChange(value, id);
          }}
        >
          <Option key="active" value="ACTIVE">
            <FormattedMessage id="admin.active" />
          </Option>
          <Option key="inactive" value="INACTIVE">
            <FormattedMessage id="admin.inactive" />
          </Option>
          <Option key="hidden" value="HIDDEN">
            <FormattedMessage id="admin.flagged" />
          </Option>
        </Select>
      </div>
    );
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    message.info(
      intl.formatMessage({
        id: "admin.cancelled",
      })
    );
  };

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    message.success(
      intl.formatMessage({
        id: "admin.success",
      })
    );
  };

  /* Renders the apply button and confirmation prompt */
  const applyButton = () => {
    return (
      <Popconfirm
        placement="left"
        title={<FormattedMessage id="admin.update.confirm" />}
        okText={<FormattedMessage id="admin.update" />}
        cancelText={<FormattedMessage id="admin.cancel" />}
        onConfirm={() => {
          handleApply()
            .then(popUpSuccesss)
            .catch((error) => handleError(error, "message"));
        }}
        onCancel={() => {
          popUpCancel();
        }}
      >
        <Button type="primary">
          <CheckCircleOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="admin.apply" />
        </Button>
      </Popconfirm>
    );
  };

  /* Renders the apply button and confirmation prompt */
  const keycloakButton = () => {
    return (
      <Button href={config.manageKeycloakAddress}>
        <TeamOutlined style={{ marginRight: 10 }} />
        <FormattedMessage id="admin.manage.keycloak" />
      </Button>
    );
  };

  /* Sets up the columns for the user table */
  // Table columns data structure: array of objects

  // Consult: Ant Design table components for further clarification
  const userTableColumns = () => [
    {
      title: <FormattedMessage id="admin.view" />,
      render: (record) => (
        <span>
          <Button
            type="primary"
            shape="circle"
            icon={<LinkOutlined />}
            onClick={() => window.open(record.profileLink)}
          />
        </span>
      ),
    },
    {
      title: <FormattedMessage id="admin.name" />,
      dataIndex: "fullName",
      key: "name",
      sorter: (a, b) => {
        return a.fullName.localeCompare(b.fullName);
      },
      sortDirections: ["descend"],
      ...getColumnSearchProps(
        "fullName",
        intl.formatMessage({
          id: "admin.name",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.job.title" />,
      dataIndex: "jobTitle",
      key: "jobTitle",
      sorter: (a, b) => {
        return a.jobTitle.localeCompare(b.jobTitle);
      },
      ...getColumnSearchProps(
        "jobTitle",
        intl.formatMessage({
          id: "admin.job.title",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.registered" />,
      dataIndex: "formatCreatedAt",
      key: "registered",
      sorter: (a, b) => {
        return (
          moment(a.formatCreatedAt).unix() - moment(b.formatCreatedAt).unix()
        );
      },
      ...getColumnSearchProps(
        "formatCreatedAt",
        intl.formatMessage({
          id: "admin.registered",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.last.updated" />,
      dataIndex: "formatUpdatedAt",
      key: "updated",
      sorter: (a, b) => {
        return (
          moment(a.formatUpdatedAt).unix() - moment(b.formatUpdatedAt).unix()
        );
      },
      ...getColumnSearchProps(
        "formatUpdatedAt",
        intl.formatMessage({
          id: "admin.last.updated",
        })
      ),
    },
    {
      title: <FormattedMessage id="admin.tenure" />,
      dataIndex: "tenure",
      key: "tenure",
      filters: _.uniq(data.map((i) => i.tenure)).map((i) => ({
        text: i,
        value: i,
      })),
      onFilter: (value, record) => record.tenure === value,
    },
    {
      title: <FormattedMessage id="admin.roles" />,
      filters: [
        {
          text: <FormattedMessage id="admin.roles.admin" />,
          value: "isAdmin",
        },
        {
          text: <FormattedMessage id="admin.roles.manager" />,
          value: "isManager",
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
        </>
      ),
    },
    {
      title: <FormattedMessage id="admin.profileStatus" />,
      filters: [
        {
          text: <FormattedMessage id="admin.active" />,
          value: "ACTIVE",
        },
        {
          text: <FormattedMessage id="admin.inactive" />,
          value: "INACTIVE",
        },
        {
          text: <FormattedMessage id="admin.flagged" />,
          value: "HIDDEN",
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (record) => {
        return renderStatusDropdown(record.key, record.status);
      },
    },
  ];

  return (
    <>
      <Header
        title={<FormattedMessage id="admin.user.table" />}
        extra={
          <>
            {keycloakButton()}
            {applyButton()}
          </>
        }
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
            showSorterTooltip={false}
            columns={userTableColumns()}
            dataSource={data}
            loading={loading && locale !== dataLocale}
          />
        </Col>
      </Row>
    </>
  );
};

UserTableView.propTypes = {
  intl: IntlPropType,
  handleSearch: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleApply: PropTypes.func.isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
  profileStatusValue: PropTypes.func.isRequired,
  searchedColumn: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
};

UserTableView.defaultProps = {
  intl: undefined,
};

export default injectIntl(UserTableView);

import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  Button,
  PageHeader,
  Row,
  Col,
  Input,
  Select,
  message,
  Popconfirm,
} from "antd";
import {
  CheckCircleOutlined,
  LinkOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { injectIntl, FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { IntlPropType } from "../../../customPropTypes";
import handleError from "../../../functions/handleError";

/**
 *  UserTableView(props)
 *  This component renders the user table for the Admin User Page.
 */
const UserTableView = ({
  intl,
  size,
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
      // eslint-disable-next-line react/prop-types
      setSelectedKeys,
      // eslint-disable-next-line react/prop-types
      selectedKeys,
      // eslint-disable-next-line react/prop-types
      confirm,
      // eslint-disable-next-line react/prop-types
      clearFilters,
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
    message.error(
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
        <Button type="primary" size={size}>
          <CheckCircleOutlined style={{ marginRight: 10 }} />
          <FormattedMessage id="admin.apply" />
        </Button>
      </Popconfirm>
    );
  };

  /* Sets up the columns for the user table */
  // Consult: Ant Design table components for further clarification
  const userTableColumns = () => {
    // Table columns data structure: array of objects
    const tableColumns = [
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
        title: <FormattedMessage id="admin.tenure" />,
        dataIndex: "tenure",
        key: "tenure",
        sorter: (a, b) => {
          return a.tenure.localeCompare(b.tenure);
        },
        ...getColumnSearchProps(
          "tenure",
          intl.formatMessage({
            id: "admin.tenure",
          })
        ),
      },
      {
        title: <FormattedMessage id="admin.profileStatus" />,
        render: (record) => {
          return renderStatusDropdown(record.key, record.status);
        },
      },
    ];

    return tableColumns;
  };

  return (
    <>
      <PageHeader
        title={<FormattedMessage id="admin.user.table" />}
        extra={applyButton()}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table
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
  size: PropTypes.string.isRequired,
};

UserTableView.defaultProps = {
  intl: undefined,
};

export default injectIntl(UserTableView);

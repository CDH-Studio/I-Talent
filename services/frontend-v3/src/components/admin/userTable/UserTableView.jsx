import React from "react";
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
import { injectIntl } from "react-intl";

/**
 *  UserTableView(props)
 *  This component renders the user table for the Admin User Page.
 */
function UserTableView(props) {
  let searchInput;

  const { Option } = Select;

  const {
    data,
    size,
    searchText,
    searchedColumn,
    handleApply,
    handleDropdownChange,
    profileStatusValue,
    handleSearch,
    handleReset,
  } = props;

  /* Allows for column search functionality */
  // Consult: function taken from Ant Design table components (updated to functional)
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`${props.intl.formatMessage({
            id: "admin.search",
            defaultMessage: "Search for",
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
          {props.intl.formatMessage({
            id: "admin.search.button",
            defaultMessage: "Search",
          })}
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          {props.intl.formatMessage({
            id: "admin.reset.button",
            defaultMessage: "Reset",
          })}
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
  const renderStatusDropdown = (id, inactive, flagged) => {
    return (
      <div>
        <Select
          defaultValue={profileStatusValue(inactive, flagged)}
          style={{ width: 120 }}
          onChange={(value) => {
            handleDropdownChange(value, id);
          }}
        >
          <Option
            key="active"
            value={props.intl.formatMessage({
              id: "admin.active",
              defaultMessage: "Active",
            })}
          >
            {props.intl.formatMessage({
              id: "admin.active",
              defaultMessage: "Active",
            })}
          </Option>
          <Option
            key="inactive"
            value={props.intl.formatMessage({
              id: "admin.inactive",
              defaultMessage: "Inactive",
            })}
          >
            {props.intl.formatMessage({
              id: "admin.inactive",
              defaultMessage: "Inactive",
            })}
          </Option>
          <Option
            key="hidden"
            value={props.intl.formatMessage({
              id: "admin.flagged",
              defaultMessage: "Hidden",
            })}
          >
            {props.intl.formatMessage({
              id: "admin.flagged",
              defaultMessage: "Hidden",
            })}
          </Option>
        </Select>
      </div>
    );
  };

  /* Renders the apply button and confirmation prompt */
  const applyButton = () => {
    return (
      <Popconfirm
        placement="left"
        title={props.intl.formatMessage({
          id: "admin.update.confirm",
          defaultMessage: "Are you sure that you want to update?",
        })}
        okText={props.intl.formatMessage({
          id: "admin.update",
          defaultMessage: "Update",
        })}
        cancelText={props.intl.formatMessage({
          id: "admin.cancel",
          defaultMessage: "Cancel",
        })}
        onConfirm={() => {
          handleApply();
          popUpSuccesss();
        }}
        onCancel={() => {
          popUpCancel();
        }}
      >
        <Button type="primary" icon={<CheckCircleOutlined />} size={size}>
          {props.intl.formatMessage({
            id: "admin.apply",
            defaultMessage: "Apply",
          })}
        </Button>
      </Popconfirm>
    );
  };

  /* Renders the cancel message on top of page */
  const popUpCancel = () => {
    message.error(
      props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled",
      })
    );
  };

  /* Renders the success message on top of page */
  const popUpSuccesss = () => {
    message.success(
      props.intl.formatMessage({
        id: "admin.success",
        defaultMessage: "Successful",
      })
    );
  };

  /* Sets up the columns for the user table */
  // Consult: Ant Design table components for further clarification
  const userTableColumns = () => {
    // Allows for switch between French/English in job title and tenure columns:
    const jobTitleState =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "jobTitleEn"
        : "jobTitleFr";

    const tenureState =
      props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "tenureDescriptionEn"
        : "tenureDescriptionFr";

    // Table columns data structure: array of objects
    const tableColumns = [
      {
        title: props.intl.formatMessage({
          id: "admin.view",
          defaultMessage: "View",
        }),
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
        title: props.intl.formatMessage({
          id: "admin.name",
          defaultMessage: "Name",
        }),
        dataIndex: "fullName",
        key: "name",
        sorter: (a, b) => {
          return a.fullName.localeCompare(b.fullName);
        },
        sortDirections: ["descend"],
        ...getColumnSearchProps(
          "fullName",
          props.intl.formatMessage({
            id: "admin.name",
            defaultMessage: "Name",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.job.title",
          defaultMessage: "Job Title",
        }),
        dataIndex: jobTitleState,
        key: "jobTitle",
        sorter: (a, b) => {
          return a[jobTitleState].localeCompare(b[jobTitleState]);
        },
        ...getColumnSearchProps(
          jobTitleState,
          props.intl.formatMessage({
            id: "admin.job.title",
            defaultMessage: "Job Title",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.registered",
          defaultMessage: "Registered",
        }),
        dataIndex: "formatCreatedAt",
        key: "registered",
        sorter: (a, b) => {
          return (
            moment(a.formatCreatedAt).unix() - moment(b.formatCreatedAt).unix()
          );
        },
        ...getColumnSearchProps(
          "formatCreatedAt",
          props.intl.formatMessage({
            id: "admin.registered",
            defaultMessage: "Registered",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.tenure",
          defaultMessage: "Tenure",
        }),
        dataIndex: tenureState,
        key: "tenure",
        sorter: (a, b) => {
          return a[tenureState].localeCompare(b[tenureState]);
        },
        ...getColumnSearchProps(
          tenureState,
          props.intl.formatMessage({
            id: "admin.tenure",
            defaultMessage: "Tenure",
          })
        ),
      },
      {
        title: props.intl.formatMessage({
          id: "admin.profileStatus",
          defaultMessage: "Profile Status",
        }),
        render: (record) => {
          return renderStatusDropdown(
            record.id,
            record.user.inactive,
            record.flagged
          );
        },
      },
    ];

    return tableColumns;
  };

  return (
    <>
      <PageHeader
        title={props.intl.formatMessage({
          id: "admin.user.table",
          defaultMessage: "Users Table",
        })}
        extra={[applyButton()]}
      />
      <Row gutter={[0, 8]}>
        <Col span={24}>
          <Table columns={userTableColumns()} dataSource={data} />
        </Col>
      </Row>
    </>
  );
}

export default injectIntl(UserTableView);

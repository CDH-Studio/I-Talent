import React, { Component } from "react";
import { Table, Button, PageHeader, Row, Col, Input, Select } from "antd";
import {
  CheckCircleOutlined,
  LinkOutlined,
  SearchOutlined
} from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { injectIntl } from "react-intl";

const { Option } = Select;

class UserTableView extends Component {
  // Column Search Function:
  getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={
            this.props.intl.formatMessage({
              id: "admin.search",
              defaultMessage: "Search for"
            }) +
            " " +
            title
          }
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.props.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            this.props.handleSearch(selectedKeys, confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.props.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.props.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.props.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  // Dropdown for Profile Status:
  renderStatusDropdown = (id, inactive, flagged) => {
    return (
      <div>
        <Select
          key={id}
          style={{ width: 120 }}
          onChange={value => this.props.handleDropdownChange(value, id)}
          value={this.props.profileStatusValue(inactive, flagged)}
        >
          <Option
            key="active"
            value={this.props.intl.formatMessage({
              id: "admin.active",
              defaultMessage: "Active"
            })}
          >
            {this.props.intl.formatMessage({
              id: "admin.active",
              defaultMessage: "Active"
            })}
          </Option>
          <Option
            key="inactive"
            value={this.props.intl.formatMessage({
              id: "admin.inactive",
              defaultMessage: "Inactive"
            })}
          >
            {this.props.intl.formatMessage({
              id: "admin.inactive",
              defaultMessage: "Inactive"
            })}
          </Option>
          <Option
            key="hidden"
            value={this.props.intl.formatMessage({
              id: "admin.flagged",
              defaultMessage: "Hidden"
            })}
          >
            {this.props.intl.formatMessage({
              id: "admin.flagged",
              defaultMessage: "Hidden"
            })}
          </Option>
        </Select>
      </div>
    );
  };

  // Table Column Details:
  tableColumns = () => {
    const jobTitleState =
      this.props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "jobTitleEn"
        : "jobTitleFr";

    const tenureState =
      this.props.intl.formatMessage({ id: "language.code" }) === "en"
        ? "tenureDescriptionEn"
        : "tenureDescriptionFr";

    const user_table_columns = [
      {
        title: this.props.intl.formatMessage({
          id: "admin.view",
          defaultMessage: "View"
        }),
        render: record => (
          <span>
            <Button
              type="primary"
              shape="circle"
              icon={<LinkOutlined />}
              onClick={() => window.open(record.profileLink)}
            />
          </span>
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.name",
          defaultMessage: "Name"
        }),
        dataIndex: "fullName",
        key: "name",
        sorter: (a, b) => {
          return a.fullName.localeCompare(b.fullName);
        },
        sortDirections: ["descend"],
        ...this.getColumnSearchProps(
          "fullName",
          this.props.intl.formatMessage({
            id: "admin.name",
            defaultMessage: "Name"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.job.title",
          defaultMessage: "Job Title"
        }),
        dataIndex: jobTitleState,
        key: "jobTitle",
        sorter: (a, b) => {
          return a[jobTitleState].localeCompare(b[jobTitleState]);
        },
        ...this.getColumnSearchProps(
          jobTitleState,
          this.props.intl.formatMessage({
            id: "admin.job.title",
            defaultMessage: "Job Title"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.registered",
          defaultMessage: "Registered"
        }),
        dataIndex: "formatCreatedAt",
        key: "registered",
        sorter: (a, b) => {
          return (
            moment(a.formatCreatedAt).unix() - moment(b.formatCreatedAt).unix()
          );
        },
        ...this.getColumnSearchProps(
          "formatCreatedAt",
          this.props.intl.formatMessage({
            id: "admin.registered",
            defaultMessage: "Registered"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.tenure",
          defaultMessage: "Tenure"
        }),
        dataIndex: tenureState,
        key: "tenure",
        sorter: (a, b) => {
          return a[tenureState].localeCompare(b[tenureState]);
        },
        ...this.getColumnSearchProps(
          tenureState,
          this.props.intl.formatMessage({
            id: "admin.tenure",
            defaultMessage: "Tenure"
          })
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.profileStatus",
          defaultMessage: "Profile Status"
        }),
        render: record => {
          return this.renderStatusDropdown(
            record.id,
            record.user.inactive,
            record.flagged
          );
        }
      }
    ];

    return user_table_columns;
  };

  render() {
    const { data, size, statuses, handleApply } = this.props;
    return (
      <>
        <PageHeader
          title={this.props.intl.formatMessage({
            id: "admin.user.table",
            defaultMessage: "Users Table"
          })}
          extra={[
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              size={size}
              onClick={handleApply}
              disabled={Object.entries(statuses).length === 0}
            >
              {this.props.intl.formatMessage({
                id: "admin.apply",
                defaultMessage: "Apply"
              })}
            </Button>
          ]}
        />
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Table columns={this.tableColumns()} dataSource={data} />
          </Col>
        </Row>
      </>
    );
  }
}

export default injectIntl(UserTableView);

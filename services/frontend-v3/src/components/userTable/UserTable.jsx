import React, { Component } from "react";
import UserTableView from "./UserTableView";
import { LinkOutlined, SearchOutlined } from "@ant-design/icons";
import { Select, Button, Input, Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Option } = Select;

class UserTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      column: null,
      allData: null,
      data: null,
      direction: null,
      statuses: {},
      loading: true,
      activePage: 1,
      searchText: "",
      searchedColumn: "",
      size: "large"
    };
  }

  // Gets all user information
  componentDidMount() {
    document.title = this.getDisplayType(true) + " - Admin | MyTalent";
    axios
      .get(backendAddress + "api/admin/user")
      .then(res =>
        this.setState({
          allData: res.data,
          data: _.sortBy(res.data, ["firstName"]),
          loading: false,
          column: "name",
          direction: "ascending"
        })
      )
      .catch(function(error) {
        console.error(error);
      });
  }

  // Page Title Translation:
  getDisplayType = plural => {
    if (plural)
      return this.props.intl.formatMessage({
        id: "admin." + this.state.type + ".plural",
        defaultMessage: this.state.type
      });

    return this.props.intl.formatMessage({
      id: "admin." + this.state.type + ".singular",
      defaultMessage: this.state.type
    });
  };

  // Column Search Functions:
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
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
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
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  // Dropdown Profile Status Change:
  handleApply = async () => {
    await axios
      .put(backendAddress + "api/admin/profileStatus", this.state.statuses)
      .then(() => window.location.reload());
  };

  handleDropdownChange = (status, id) => {
    this.setState(({ statuses, allData }) => {
      statuses[id] = status;

      let changedUser = _.remove(allData, user => user.id === id);

      changedUser = changedUser[0];

      if (status === "Active" || status === "Actif") {
        changedUser.flagged = false;
        changedUser.user.inactive = false;
      }

      if (status === "Inactive" || status === "Inactif") {
        changedUser.flagged = false;
        changedUser.user.inactive = true;
      }

      if (status === "Hidden" || status == "Caché") {
        changedUser.flagged = true;
        changedUser.user.inactive = false;
      }

      allData.push(changedUser);

      return { statuses, allData };
    });
  };

  profileStatusValue = (inactive, flagged) => {
    if (inactive)
      return this.props.intl.formatMessage({
        id: "admin.inactive",
        defaultMessage: "Inactive"
      });
    else if (flagged)
      return this.props.intl.formatMessage({
        id: "admin.flagged",
        defaultMessage: "Hidden"
      });
    else
      return this.props.intl.formatMessage({
        id: "admin.active",
        defaultMessage: "Active"
      });
  };

  renderStatusDropdown = (id, inactive, flagged) => {
    return (
      <div>
        <Select
          key={id}
          style={{ width: 120 }}
          onChange={value => this.handleDropdownChange(value, id)}
          value={this.profileStatusValue(inactive, flagged)}
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

  // Get Profile Information for table rows:
  getProfileInformation(data) {
    data.map(function(e) {
      e.fullName = e.user.name;
      e.formatCreatedAt = moment(e.createdAt).format("LLL");
      e.profileLink = "/secured/profile/" + e.id;
      if (e.tenure === null) {
        e.tenureDescriptionEn = "None Specified";
        e.tenureDescriptionFr = "Aucun spécifié";
      } else {
        e.tenureDescriptionEn = e.tenure.descriptionEn;
        e.tenureDescriptionFr = e.tenure.descriptionFr;
      }
    });

    return data;
  }

  // Table Column Details:
  tableColumns() {
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
  }

  render() {
    const { data, loading, size, statuses } = this.state;

    console.log(loading, data);

    if (loading) {
      return <Skeleton active />;
    }

    return (
      <UserTableView
        data={this.getProfileInformation(data)}
        columns={this.tableColumns()}
        size={size}
        statuses={statuses}
        handleApply={this.handleApply}
      />
    );
  }
}

export default injectIntl(UserTable);

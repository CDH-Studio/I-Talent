import React from "react";
import AppLayout from "../../components/layouts/appLayout/AppLayout";
import axios from "axios";
import { Typography, Skeleton, Icon, Table, Input, Button } from "antd";
import _ from "lodash";
import moment from "moment";
import { injectIntl } from "react-intl";
import Highlighter from "react-highlight-words";
import config from "../../config";

const backendAddress = config.backendAddress;

const { Title } = Typography;

class AdminUser extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Admin | UpSkill";

    this.state = {
      type: "user",
      column: null,
      allData: null,
      data: null,
      direction: null,
      statuses: {},
      loading: true,
      activePage: 1,
      searchText: "",
      searchedColumn: ""
    };
  }

  // Gets all user information
  componentDidMount() {
    axios
      .get(backendAddress + "api/admin/user")
      .then(res =>
        this.setState({
          data: res.data,
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

  getColumnSearchProps = dataIndex => ({
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
          placeholder={`Search ${dataIndex}`}
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
          icon={<Icon type="search" />}
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
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
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

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return (
        <AppLayout>
          <Skeleton active />
        </AppLayout>
      );
    }

    let allUsers = data;

    allUsers.map(function(e) {
      e.fullName = e.user.name;
      e.formatCreatedAt = moment(e.createdAt).format("LLL");
      if (e.tenure === null) {
        e.tenureDescriptionEn = "None Specified";
        e.tenureDescriptionFr = "Aucun spécifié";
      } else {
        e.tenureDescriptionEn = e.tenure.descriptionEn;
        e.tenureDescriptionFr = e.tenure.descriptionFr;
      }
    });

    // console.log(allUsers);

    const user_table_columns = [
      {
        title: this.props.intl.formatMessage({
          id: "admin.name",
          defaultMessage: "Name"
        }),
        dataIndex: "fullName",
        key: "name",
        ...this.getColumnSearchProps("fullName")
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.job.title",
          defaultMessage: "Job Title"
        }),
        dataIndex:
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? "jobTitleEn"
            : "jobTitleFr",
        key: "jobTitle",
        ...this.getColumnSearchProps(
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? "jobTitleEn"
            : "jobTitleFr"
        )
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.registered",
          defaultMessage: "Registered"
        }),
        dataIndex: "formatCreatedAt",
        key: "registered",
        ...this.getColumnSearchProps("formatCreatedAt")
      },
      {
        title: this.props.intl.formatMessage({
          id: "admin.tenure",
          defaultMessage: "Tenure"
        }),
        dataIndex:
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? "tenureDescriptionEn"
            : "tenureDescriptionFr",
        key: "tenure",
        ...this.getColumnSearchProps(
          this.props.intl.formatMessage({ id: "language.code" }) === "en"
            ? "tenureDescriptionEn"
            : "tenureDescriptionFr"
        )
      }
    ];

    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
      >
        <Title>Users</Title>
        <Table columns={user_table_columns} dataSource={allUsers} />
      </AppLayout>
    );
  }
}

export default injectIntl(AdminUser);

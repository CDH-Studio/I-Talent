import React, { Component } from "react";
import UserTableView from "./UserTableView";
import { Skeleton } from "antd";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

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

      if (status === "Hidden" || status === "Caché") {
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

  render() {
    const {
      data,
      loading,
      size,
      statuses,
      searchText,
      searchedColumn
    } = this.state;

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
        searchText={searchText}
        searchedColumn={searchedColumn}
        handleApply={this.handleApply}
        handleDropdownChange={this.handleDropdownChange}
        profileStatusValue={this.profileStatusValue}
        handleSearch={this.handleSearch}
        handleReset={this.handleReset}
      />
    );
  }
}

export default injectIntl(UserTable);

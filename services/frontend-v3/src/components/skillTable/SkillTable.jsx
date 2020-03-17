import React from "react";
import SkillTableView from "./SkillTableView";
import { Skeleton, message } from "antd";
import axios from "axios";
import _ from "lodash";
import { injectIntl } from "react-intl";
import config from "../../config";

const backendAddress = config.backendAddress;

class SkillTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      column: null,
      allData: null,
      allCategories: null,
      data: null,
      direction: null,
      loading: true,
      searchText: "",
      searchedColumn: "",
      size: "large",
      selectedRowKeys: [],
      id: null,
      confirm: null,
      english: null,
      french: null,
      category: null,
      visible: false,
      record: null
    };
  }

  componentDidMount() {
    document.title = this.getDisplayType(true) + " - Admin | MyTalent";
    axios
      .get(backendAddress + "api/admin/options/" + this.state.type)
      .then(res =>
        this.setState({
          allData: res.data,
          data: _.sortBy(res.data, ["descriptionEn"]),
          loading: false,
          column: "english",
          direction: "ascending"
        })
      )
      .catch(function(error) {
        console.error(error);
      });
    axios
      .get(backendAddress + "api/admin/options/categories/" + this.state.type)
      .then(res =>
        this.setState({
          allCategories: res.data
        })
      )
      .catch(function(error) {
        console.error(error);
      });
  }

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

  handleClick = (type, id, en, fr, categoryId) => {
    this.setState({
      id: id,
      confirm: type,
      english: en,
      french: fr,
      category: categoryId
    });
  };

  // handleSubmitAdd = () => {
  //   const { type, english, french } = this.state;

  //   const url = backendAddress + "api/admin/options/" + type;
  //   axios
  //   .post(url, )
  // };

  handleSubmitDelete = () => {
    const { type, selectedRowKeys } = this.state;
    console.log("Delete Values: ", selectedRowKeys);
    const url = backendAddress + "api/admin/delete/" + type;
    axios.post(url, { ids: selectedRowKeys }).then(() => {
      this.setState({
        deleteValues: [],
        english: null,
        french: null,
        confirm: null,
        category: null
      });

      axios
        .get(backendAddress + "api/admin/options/" + this.state.type)
        .then(res =>
          this.setState({
            allData: res.data,
            data: res.data
          })
        )
        .catch(function(error) {
          console.error(error);
        });
    });
    this.setState(({ selectedRowKeys }) => {
      selectedRowKeys = [];
      return { selectedRowKeys };
    });
    message.success(
      this.props.intl.formatMessage({
        id: "admin.success",
        defaultMessage: "Successful"
      })
    );
  };

  handleSubmitCancel = () => {
    this.setState({ confirm: null, id: null });
    message.error(
      this.props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled"
      })
    );
  };

  rowSelection() {
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.onSelectChange(selectedRowKeys);
      }
    };
    return rowSelection;
  }

  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  showEditModal = record => {
    this.setState({ record });
    //console.log(record);
    this.setState({
      visible: true
    });
  };

  showAddModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
    message.success(
      this.props.intl.formatMessage({
        id: "admin.success",
        defaultMessage: "Successful"
      })
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
    message.error(
      this.props.intl.formatMessage({
        id: "admin.cancelled",
        defaultMessage: "Cancelled"
      })
    );
  };

  getSkillInformation(data) {
    let allSkills = data;

    for (let i = 0; i < allSkills.length; i++) {
      allSkills[i].key = allSkills[i].id;
    }

    allSkills.map(function(e) {
      e.categoryNameEn = e.category.descriptionEn;
      e.categoryNameFr = e.category.descriptionFr;
    });

    console.log(allSkills);

    return allSkills;
  }

  render() {
    const {
      data,
      loading,
      size,
      selectedRowKeys,
      visible,
      searchedColumn,
      searchText,
      record,
      allCategories
    } = this.state;

    if (loading) {
      return <Skeleton active />;
    }

    console.log(allCategories);

    return (
      <SkillTableView
        data={this.getSkillInformation(data)}
        allCategories={allCategories}
        selectedRowKeys={selectedRowKeys}
        visible={visible}
        record={record}
        handleSearch={this.handleSearch}
        handleReset={this.handleReset}
        size={size}
        handleClick={this.handleClick}
        handleSubmitDelete={this.handleSubmitDelete}
        handleSubmitCancel={this.handleSubmitCancel}
        rowSelection={this.rowSelection()}
        showEditModal={this.showEditModal}
        showAddModal={this.showAddModal}
        handleOk={this.handleOk}
        handleCancel={this.handleCancel}
        searchedColumn={searchedColumn}
        searchText={searchText}
      />
    );
  }
}

export default injectIntl(SkillTable);

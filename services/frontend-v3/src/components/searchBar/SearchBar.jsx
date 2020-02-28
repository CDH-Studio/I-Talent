import React from "react";
import prepareInfo from "../../functions/prepareInfo";
import { Form, Col, Input, Switch, Select } from "antd";
import axios from "axios";
import {} from "antd";
import config from "../../config";
import queryString from "query-string";
import { injectIntl } from "react-intl";
import SearchBarView from "./SearchBarView";
const backendAddress = config.backendAddress;
const { Option } = Select;
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      skillOptions: [],
      branchOptions: [],
      locationOptions: [],
      classOptions: []
    };
    //this.getAdvancedOptions = this.getAdvancedOptions.bind(this);
    this.getFields = this.getFields.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getBasicField = this.getBasicField.bind(this);
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  async getSkills() {
    const lang = localStorage.getItem("lang");
    try {
      let results = await axios.get(
        backendAddress + "api/option/getDevelopmentalGoals"
      );

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async getBranch() {
    try {
      let results = await axios
        .get(backendAddress + "api/option/getBranch")
        .data.filter(elem => elem.description && elem.description.en);
      console.log("getBranch(): " + results.data);
      return results;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
  async getLocation() {
    try {
      let results = await axios.get(backendAddress + "api/option/getLocation");

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
  async getClassification() {
    try {
      let results = await axios.get(
        backendAddress + "api/option/getGroupLevel"
      );

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  getBasicField(data) {
    const children = [];
    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });
    const { getFieldDecorator } = this.props.form;
    children.push(
      <Form.Item label={"Search"}>
        {getFieldDecorator("Search", {})(<Input placeholder={searchLabel} />)}
      </Form.Item>
    );
    return children;
  }

  getFields(data) {
    const count = this.state.expand ? 6 : 0;

    const { getFieldDecorator } = this.props.form;
    const children = [];
    var fieldCounter = 0;
    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });
    const labelArr = [
      this.props.intl.formatMessage({
        id: "advanced.search.form.name",
        defaultMessage: "Name"
      }),
      this.props.intl.formatMessage({
        id: "advanced.search.form.skills",
        defaultMessage: "Skills"
      }),
      this.props.intl.formatMessage({
        id: "advanced.search.form.branch",
        defaultMessage: "Branch"
      }),
      this.props.intl.formatMessage({
        id: "advanced.search.form.location",
        defaultMessage: "Location"
      }),
      this.props.intl.formatMessage({
        id: "advanced.search.form.classification",
        defaultMessage: "Classification"
      }),
      this.props.intl.formatMessage({
        id: "advanced.search.form.ex.feeder",
        defaultMessage: "Ex Feeder"
      })
    ];
    for (let i = 0; i < 10; i++) {
      fieldCounter++;
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          {fieldCounter == 1 ? (
            <Form.Item label={labelArr[i]}>
              {getFieldDecorator(
                "" + labelArr[i],
                {}
              )(<Input placeholder={searchLabel} />)}
            </Form.Item>
          ) : fieldCounter == 6 ? (
            <Form.Item style={{ textAlign: "center" }} label={labelArr[i]}>
              {getFieldDecorator("Switch", { valuePropName: "checked" })(
                <Switch />
              )}
            </Form.Item>
          ) : fieldCounter == 2 ? (
            <Form.Item label={labelArr[i]}>
              {getFieldDecorator(
                "" + labelArr[i],
                {}
              )(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder={searchLabel}
                >
                  {this.state.skillOptions.map((value, index) => {
                    return (
                      <Option key={value.id}>{value.description.en}</Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          ) : fieldCounter == 3 ? (
            <Form.Item label={labelArr[i]}>
              {getFieldDecorator(
                "" + labelArr[i],
                {}
              )(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder={searchLabel}
                >
                  {this.state.branchOptions.map((value, index) => {
                    console.log("Branches: " + value.description.en);
                    console.log("Branch Values: " + value.id);
                    return (
                      <Option key={value.id}>{value.description.en}</Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          ) : fieldCounter == 4 ? (
            <Form.Item label={labelArr[i]}>
              {getFieldDecorator(
                "" + labelArr[i],
                {}
              )(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder={searchLabel}
                >
                  {this.state.locationOptions.map((value, index) => {
                    return (
                      <Option key={value.id}>{value.description.en}</Option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
          ) : (
            <Form.Item label={labelArr[i]}>
              {getFieldDecorator(
                "" + labelArr[i],
                {}
              )(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder={searchLabel}
                >
                  {this.state.classOptions.map((value, index) => {
                    return <Option key={value.id}>{value.description}</Option>;
                  })}
                </Select>
              )}
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  }

  handleSearch = e => {
    console.log("");
    var query;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      query = queryString.stringify(values, { arrayFormat: "bracket" });

      let url = "/secured/results?" + encodeURI(query);

      this.props.history.push(url);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  async componentDidMount() {
    let skills = await this.getSkills();
    let branches = await this.getBranch();
    let locations = await this.getLocation();
    let classifications = await this.getClassification();
    this.setState({ skillOptions: skills });
    //this.setState({ branchOptions: branches });
    this.setState({ locationOptions: locations });
    this.setState({ classOptions: classifications });
  }

  render() {
    console.log(this.state.branchOptions);
    return (
      <SearchBarView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        advancedOptions={this.state.advancedOptions}
        getFields={this.getFields}
        handleReset={this.handleReset}
        handleSearch={this.handleSearch}
        toggle={this.toggle}
        getBasicField={this.getBasicField}
      ></SearchBarView>
    );
  }
}
SearchBar = Form.create({})(SearchBar);
export default injectIntl(SearchBar);

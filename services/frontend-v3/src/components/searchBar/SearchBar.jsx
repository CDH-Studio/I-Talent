import React from "react";
import { Form } from "antd";
//import "@ant-design/compaible/assets/index.css";
import { Col, Input, Switch, Select } from "antd";
import axios from "axios";
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
    this.getFields = this.getFields.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getBasicField = this.getBasicField.bind(this);
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  //Fetches options for skills select field in advanced search
  async getSkills() {
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

  //Fetches options for branches select field in advanced search
  async getBranch() {
    try {
      let results = await await axios.get(
        backendAddress + "api/option/getBranch"
      );
      return results.data.filter(
        elem => elem.description && elem.description.en
      );
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  //Fetches options for locations select field in advanced search
  async getLocation() {
    try {
      let results = await axios.get(backendAddress + "api/option/getLocation");

      return results.data;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  //Fetches options for classifications select field in advanced search
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

  //Creates the basic input field for basic search and puts its data into children array
  getBasicField(data) {
    // const onFinish = values => {
    //   this.handleSearch(values);
    // };
    const children = [];
    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });
    //const { getFieldDecorator } = this.props.form;
    children.push(
      <Form.Item style={{ width: "100%" }} label={""} name="searchValue">
        <Input placeholder={searchLabel} />
      </Form.Item>
    );
    return children;
  }

  //Creates the six fields for advanced search, along with their bilingual titles
  getFields(data) {
    const onFinish = values => {
      this.handleSearch(values);
    };
    const count = this.state.expand ? 6 : 0;
    const children = [];
    let fieldCounter = 0;
    let locale = this.props.intl.formatMessage({
      id: "language.code",
      defaultMessage: "en"
    });
    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });
    const searchTitles = [
      "name",
      "skills",
      "branch",
      "location",
      "classification",
      "exFeeder"
    ];
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
          {fieldCounter === 1 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Input placeholder={searchLabel} />
            </Form.Item>
          ) : fieldCounter === 6 ? (
            <Form.Item
              name={searchTitles[i]}
              label={labelArr[i]}
              //rules={(valuePropName = "checked")}
            >
              <Switch />
            </Form.Item>
          ) : fieldCounter === 2 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 171 }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {this.state.skillOptions.map(value => {
                  return (
                    <Option key={value.id}>{value.description[locale]}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : fieldCounter === 3 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 171 }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {this.state.branchOptions.map(value => {
                  return (
                    <Option key={value.description.en}>
                      {value.description[locale]}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : fieldCounter === 4 ? (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 171 }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {this.state.locationOptions.map(value => {
                  return (
                    <Option key={value.id}>{value.description[locale]}</Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item label={labelArr[i]} name={searchTitles[i]}>
              <Select
                style={{ width: 171 }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                mode="multiple"
                placeholder={searchLabel}
              >
                {this.state.classOptions.map(value => {
                  return <Option key={value.id}>{value.description}</Option>;
                })}
              </Select>
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  }

  //turns search values inputted into children array into query, redirects to results
  //page with query
  handleSearch = values => {
    console.log("values entered into handleSearch: " + Object.values(values));
    var query;
    // e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    query = queryString.stringify(values, { arrayFormat: "bracket" });
    console.log(
      "query: " + queryString.stringify(values, { arrayFormat: "bracket" })
    );
    let url = "/secured/results?" + encodeURI(query);
    this.props.history.push(url);
  };

  //clears all fields
  handleReset = () => {
    console.log("this.props.form: " + this.props.form);
    this.props.form.resetFields();
  };

  async componentDidMount() {
    let skills = await this.getSkills();
    let branches = await this.getBranch();
    let locations = await this.getLocation();
    let classifications = await this.getClassification();

    this.setState({
      skillOptions: skills,
      branchOptions: branches,
      locationOptions: locations,
      classOptions: classifications
    });
  }
  render() {
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

export default injectIntl(SearchBar);

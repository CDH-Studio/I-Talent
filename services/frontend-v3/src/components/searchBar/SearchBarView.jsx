import React from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Input, Button, Icon, Switch, Card } from "antd";
import prepareInfo from "../../functions/prepareInfo";
import axios from "axios";
import config from "../../config";
import queryString from "query-string";
import logo from "../SideNav/logo_v2.svg";

import { injectIntl } from "react-intl";
const backendAddress = config.backendAddress;
class SearchBarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
      //   advancedOptions: null
    };
    //this.getAdvancedOptions = this.getAdvancedOptions.bind(this);
  }

  //   async getAdvancedOptions() {
  //     const lang = localStorage.getItem("lang");
  //     let advancedOptions = {
  //       classification: prepareInfo(
  //         (await axios.get(backendAddress + "api/option/getGroupLevel")).data,
  //         lang
  //       ).map(obj => ({
  //         key: obj.id,
  //         text: obj.description,
  //         value: obj.id
  //       })),
  //       skills: prepareInfo(
  //         (await axios.get(backendAddress + "api/option/getDevelopmentalGoals"))
  //           .data,
  //         lang
  //       ).map(obj => ({
  //         key: obj.id,
  //         text: obj.description,
  //         value: obj.id
  //       })),
  //       location: prepareInfo(
  //         (await axios.get(backendAddress + "api/option/getLocation")).data,
  //         lang
  //       ).map(obj => ({
  //         key: obj.id,
  //         text: obj.description,
  //         value: obj.id
  //       })),
  //       branch: (await axios.get(backendAddress + "api/option/getBranch")).data
  //         .filter(elem => elem.description && elem.description.en)
  //         .map(obj => ({
  //           key: obj.description.en,
  //           text: obj.description[lang],
  //           value: obj.description.en
  //         }))
  //     };
  //   }

  getFields(data) {
    const count = this.state.expand ? 6 : 0;
    const { advancedOptions } = this.props;
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
          {fieldCounter !== 6 ? (
            <Form.Item
              //options={advancedOptions.classification}
              label={labelArr[i]}
            >
              {getFieldDecorator(
                "" + labelArr[i],
                {}
              )(<Input placeholder={searchLabel} />)}
            </Form.Item>
          ) : (
            <Form.Item style={{ textAlign: "center" }} label={labelArr[i]}>
              {getFieldDecorator("Switch", { valuePropName: "checked" })(
                <Switch />
              )}
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  }

  handleSearch = e => {
    var query;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      var basicSearch = values[0];
      var searchName = values[1];
      var searchSkills = values[2];
      var searchBranch = values[3];
      var searchLocation = values[4];
      var searchClassification = values[5];
      var searchSwitch = values[6];
      query = queryString.stringify(values, { arrayFormat: "bracket" });

      let url = "/secured/results?" + encodeURI(query);

      this.props.history.push(url);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const { data } = this.props;
    const { getFieldDecorator } = this.props.form;
    const searchLabel = this.props.intl.formatMessage({
      id: "button.search",
      defaultMessage: "Search"
    });

    return (
      <Form onSubmit={this.handleSearch}>
        <div
          style={{
            paddingTop: "80px",
            paddingLeft: "20%",
            paddingRight: "20%",
            paddingBottom: "20px"
          }}
        >
          <div
            style={{
              backgroundColor: "#001C1A",
              borderRadius: "5px",
              paddingTop: "80px",
              paddingLeft: "80px",
              paddingRight: "80px",
              paddingBottom: "80px",
              boxShadow: "5px 5px 5px #cccccc"
            }}
          >
            <header
              style={{
                paddingBottom: "20px",
                textAlign: "center"
              }}
            >
              <img src={logo} alt="UpSkill Logo" style={{ height: "80px" }} />;
            </header>
            <div style={{ paddingBottom: "20px" }}>
              {getFieldDecorator(
                "Search",
                {}
              )(<Input placeholder={searchLabel} />)}
            </div>
            <Col span={24} style={{ textAlign: "right", paddingTop: "0px" }}>
              <Button
                shape="round"
                size="large"
                type="primary"
                htmlType="submit"
              >
                {searchLabel}
              </Button>
              <Button
                ghost
                shape="round"
                size="large"
                style={{ marginLeft: 8 }}
                onClick={this.handleReset}
              >
                {this.props.intl.formatMessage({
                  id: "button.clear",
                  defaultMessage: "Clear"
                })}
              </Button>
            </Col>
          </div>
          <Card
            style={{ boxShadow: "5px 5px 5px #e6e6e6", borderRadius: "5px" }}
          >
            <Row gutter={24}>{this.getFields(data)}</Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <a
                  style={{ marginLeft: 8, fontSize: 14 }}
                  onClick={this.toggle}
                >
                  {this.props.intl.formatMessage({
                    id: "advanced.search.button.text",
                    defaultMessage: "Advanced Search"
                  })}{" "}
                  <Icon type={this.state.expand ? "up" : "down"} />
                </a>
              </Col>
            </Row>
          </Card>
        </div>
      </Form>
    );
  }
}

SearchBarView = Form.create({})(SearchBarView);
export default injectIntl(SearchBarView);

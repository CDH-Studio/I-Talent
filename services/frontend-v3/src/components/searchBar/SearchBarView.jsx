import React from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Input, Button, Icon, Switch } from "antd";
import queryString from "query-string";
import logo from "../SideNav/logo_v2.svg";

import { injectIntl } from "react-intl";
class SearchBarView extends React.Component {
  state = {
    expand: false
  };
  constructor(props) {
    super(props);
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
          {fieldCounter !== 6 ? (
            <Form.Item label={labelArr[i]}>
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
      console.log("Received values of form: ", values);
      console.log(query);
      let url = "/secured/results?" + encodeURI(query);
      this.props.history.push(url);

      console.log(url);
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
    const { name, data, avatar, locale } = this.props;
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
              paddingTop: "60px",
              paddingLeft: "60px",
              paddingRight: "60px",
              paddingBottom: "40px"
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
          </div>

          <Row gutter={24}>{this.getFields(data)}</Row>
          <Row>
            <Col span={24} style={{ textAlign: "right", paddingTop: "10px" }}>
              <Button type="primary" htmlType="submit">
                {searchLabel}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                {this.props.intl.formatMessage({
                  id: "button.clear",
                  defaultMessage: "Clear"
                })}
              </Button>
              <a style={{ marginLeft: 8, fontSize: 14 }} onClick={this.toggle}>
                {this.props.intl.formatMessage({
                  id: "advanced.search.button.text",
                  defaultMessage: "Advanced Search"
                })}{" "}
                <Icon type={this.state.expand ? "up" : "down"} />
              </a>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}
SearchBarView = Form.create({})(SearchBarView);
export default injectIntl(SearchBarView);

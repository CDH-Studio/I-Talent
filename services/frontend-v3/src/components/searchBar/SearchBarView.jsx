import React from "react";
import { Form, Row, Col, Input, Button, Icon } from "antd";

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
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <Form.Item label={labelArr[i]}>
            {getFieldDecorator(
              "label: " + labelArr[i],
              {}
            )(<Input placeholder={"Enter a value"} />)}
          </Form.Item>
        </Col>
      );
    }
    return children;
  }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log("Received values of form: ", values);
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
            paddingTop: "20px",
            paddingLeft: "20%",
            paddingRight: "20%",
            paddingBottom: "20px"
          }}
        >
          <header style={{ paddingLeft: "43%", paddingBottom: "20px" }}>
            UPSKILL :)
          </header>
          <div style={{ paddingBottom: "20px" }}>
            {getFieldDecorator(
              "label: Search",
              {}
            )(<Input placeholder={searchLabel} />)}
          </div>

          <Row gutter={24}>{this.getFields(data)}</Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
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

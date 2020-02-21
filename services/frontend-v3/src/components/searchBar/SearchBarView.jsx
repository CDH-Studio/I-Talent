import React from "react";
import { Form, Row, Col, Input, Button, Icon } from "antd";

export default class SearchBarView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false
    };
  }

  getFields() {
    const count = this.state.expand ? 5 : 0;
    //const { getFieldDecorator } = this.props.form;
    const children = [];
    for (let i = 0; i < 10; i++) {
      children.push(
        <Col span={8} key={i} style={{ display: i < count ? "block" : "none" }}>
          <Form.Item label={`Field ${i}`}>
            <Input placeholder="" />
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
            <Input placeholder="Search" />
          </div>

          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                Clear
              </Button>
              <a style={{ marginLeft: 8, fontSize: 14 }} onClick={this.toggle}>
                Advanced Search{" "}
                <Icon type={this.state.expand ? "up" : "down"} />
              </a>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

import React, { Component } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider
} from "antd";
import { FormattedMessage } from "react-intl";

const { Option } = Select;
const { Title } = Typography;

export default class PrimaryInfoFormView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    console.log(this.props.locationOptions);
    return (
      <div style={styles.content}>
        <Title level={2} style={styles.formTitle}>
          1. <FormattedMessage id="setup.primary.information" />
        </Title>
        <Divider style={styles.headerDiv} />
        <Form
          layout="vertical"
          // labelCol={{ span: 5 }}
          //wrapperCol={{ span: 22 }}
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label={<FormattedMessage id="profile.first.name" />}
                style={styles.formItem}
              >
                {getFieldDecorator("firstName", {
                  rules: [
                    {
                      required: true,
                      message: "Required"
                    },
                    {
                      max: 50,
                      message: "Max length 50 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<FormattedMessage id="profile.last.name" />}
                style={styles.formItem}
              >
                {getFieldDecorator("lastName", {
                  rules: [
                    {
                      required: true,
                      message: "Required"
                    },
                    {
                      max: 50,
                      message: "Max length 50 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item
                label={<FormattedMessage id="profile.telephone" />}
                style={styles.formItem}
              >
                {getFieldDecorator("telephone", {
                  rules: [
                    {
                      pattern: /^\d{3}-\d{3}-\d{4}$/i, // prettier-ignore
                      message: "required format: 111-222-3333"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label={<FormattedMessage id="profile.cellphone" />}
                style={styles.formItem}
              >
                {getFieldDecorator("cellphone", {
                  rules: [
                    {
                      pattern: /\d{3}-\d{3}-\d{4}/i, // prettier-ignore
                      message: "required format: 111-222-3333"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<FormattedMessage id="profile.email" />}
                style={styles.formItem}
              >
                {getFieldDecorator("email", {
                  rules: [
                    {
                      pattern: /\S+@\S+\.ca/i, // prettier-ignore
                      message: "Please Provide a valid Gov. Canada email"
                    },
                    {
                      max: 50,
                      message: "Max length 50 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label={<FormattedMessage id="profile.location" />}
                style={styles.formItem}
              >
                {getFieldDecorator("location", {
                  rules: [
                    { required: true, message: "Please select your location" }
                  ]
                })(
                  <Select
                    placeholder="choose location"
                    onChange={this.handleSelectChange}
                  >
                    {this.props.locationOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description.en}</Option>
                      );
                    })}
                    {/* <Option value="male">male</Option>
                    <Option value="female">female</Option> */}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<FormattedMessage id="profile.team" />}
                style={styles.formItem}
              >
                {getFieldDecorator("team", {
                  rules: [
                    {
                      max: 50,
                      message: "Max length 50 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="LinkedIn URL:" style={styles.formItem}>
                {getFieldDecorator("linkedin", {
                  rules: [
                    {
                      max: 100,
                      message: "Max length 100 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Github URL:" style={styles.formItem}>
                {getFieldDecorator("github", {
                  rules: [
                    {
                      max: 100,
                      message: "Max length 100 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="GCconnex URL:" style={styles.formItem}>
                {getFieldDecorator("gcConnect", {
                  rules: [
                    {
                      max: 100,
                      message: "Max length 100 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
PrimaryInfoFormView = Form.create({})(PrimaryInfoFormView);

/* Component Styles */
const styles = {
  content: {
    textAlign: "left",
    width: "100%",
    maxWidth: "900px",
    minHeight: "400px",
    background: "#fff",
    padding: "30px 30px"
  },
  formTitle: {
    fontSize: "1.2em"
  },
  headerDiv: {
    margin: "15px 0 15px 0"
  },
  formItem: {
    margin: "10px 0 10px 0",
    padding: "0 20px 0 0",
    textAlign: "left"
  },
  subHeading: {
    fontSize: "1.3em"
  }
};

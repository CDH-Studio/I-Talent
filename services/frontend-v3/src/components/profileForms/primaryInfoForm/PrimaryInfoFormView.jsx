import React, { Component } from "react";
//import { Form } from '@ant-design/compatible';
import "@ant-design/compatible/assets/index.css";
import {
  Select,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Form
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
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

  handleSubmit = values => {
    console.log("Received values of form: ", values);
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    //console.log(this.props.locationOptions);
    //console.log(@light-primary-color);
    return (
      <div style={styles.content}>
        <Title level={2} style={styles.formTitle}>
          1. <FormattedMessage id="setup.primary.information" />
        </Title>
        <Divider style={styles.headerDiv} />
        <Form name="basicForm" layout="vertical" onFinish={this.handleSubmit}>
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="firstName"
                label={<FormattedMessage id="profile.first.name" />}
                value={this.props.profileInfo.firstName}
                rules={[Rules.required, Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={12}>
              <Form.Item
                name="lastName"
                label={<FormattedMessage id="profile.last.name" />}
                rules={[Rules.required, Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Two */}
          <Row gutter={24}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="telephone"
                label={<FormattedMessage id="profile.telephone" />}
                value={this.props.profileInfo.telephone}
                rules={[Rules.telephoneFormat]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={8}>
              <Form.Item
                name="cellphone"
                label={<FormattedMessage id="profile.cellphone" />}
                value={this.props.profileInfo.cellphone}
                rules={[Rules.telephoneFormat]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={8}>
              <Form.Item
                name="email"
                label={<FormattedMessage id="profile.email" />}
                value={this.props.profileInfo.email}
                rules={[Rules.emailFormat, Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="location"
                label={<FormattedMessage id="profile.location" />}
                value={this.props.profileInfo.firstName}
                rules={[Rules.required, Rules.maxChar50]}
              >
                <Select
                  placeholder="choose location"
                  onChange={this.handleSelectChange}
                >
                  {this.props.locationOptions.map((value, index) => {
                    return (
                      <Option key={value.id}>{value.description.en}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={12}>
              <Form.Item
                name="team"
                label={<FormattedMessage id="profile.team" />}
                rules={[Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Four */}
          <Row
            gutter={24}
            style={{
              backgroundColor: "#dfe5e4",
              paddingTop: "15px",
              marginBottom: "20px",
              marginTop: "10px"
            }}
          >
            <Col className="gutter-row" span={24}>
              <LinkOutlined /> <FormattedMessage id="setup.link.profiles" />
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="lastName"
                label={<FormattedMessage id="profile.gcconnex.url" />}
                rules={[Rules.maxChar100]}
                style={{ padding: "0px" }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="lastName"
                label={<FormattedMessage id="profile.linkedin.url" />}
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="lastName"
                label={<FormattedMessage id="profile.github.url" />}
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>

        {/* <Form
          layout="vertical"
          // labelCol={{ span: 5 }}
          //wrapperCol={{ span: 22 }}
          onSubmit={this.handleSubmit}
        >
         

          <Row>
            <Col span={12}> */}
        {/* <Form.Item
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
                    <Option value="female">female</Option>
                  </Select>
                )}
              </Form.Item> */}
        {/* </Col>
            <Col span={12}> */}
        {/* <Form.Item
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
              </Form.Item> */}
        {/* </Col>
          </Row> */}
        {/* <Row>
            <Col span={8}> */}
        {/* <Form.Item label="LinkedIn URL:" style={styles.formItem}>
                {getFieldDecorator("linkedin", {
                  rules: [
                    {
                      max: 100,
                      message: "Max length 100 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item> */}
        {/* </Col>
            <Col span={8}> */}
        {/* <Form.Item label="Github URL:" style={styles.formItem}>
                {getFieldDecorator("github", {
                  rules: [
                    {
                      max: 100,
                      message: "Max length 100 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item> */}
        {/* </Col>
            <Col span={8}> */}
        {/* <Form.Item label="GCconnex URL:" style={styles.formItem}>
                {getFieldDecorator("gcConnect", {
                  rules: [
                    {
                      max: 100,
                      message: "Max length 100 characters"
                    }
                  ]
                })(<Input />)}
              </Form.Item> */}
        {/* </Col>
          </Row> */}
        {/* 

        </Form> */}
      </div>
    );
  }
}

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

const Rules = {
  required: {
    required: true,
    message: "Required"
  },
  maxChar50: {
    max: 50,
    message: "Max length 50 characters"
  },
  maxChar100: {
    max: 50,
    message: "Max length 100 characters"
  },
  telephoneFormat: {
    pattern: /^\d{3}-\d{3}-\d{4}$/i, // prettier-ignore
    message: "required format: 111-222-3333"
  },
  emailFormat: {
    pattern: /\S+@\S+\.ca/i, // prettier-ignore
    message: "Please Provide a valid Gov. Canada email"
  }
};

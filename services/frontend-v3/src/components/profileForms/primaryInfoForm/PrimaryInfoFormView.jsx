import React, { Component } from "react";
import TextField from "../TextField";
import "@ant-design/compatible/assets/index.css";
import {
  Select,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Form,
  Skeleton
} from "antd";
import { LinkOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const { Option } = Select;
const { Title } = Typography;

export default class PrimaryInfoFormView extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = values => {
    console.log("Received values of form: ", values);
  };

  getLocationField(defaultLocation, locationOptions) {
    let defaultValue;
    if (defaultLocation) {
      defaultValue = defaultLocation.id;
    } else {
      defaultValue = "";
    }

    return (
      <Form.Item
        name="location"
        label={<FormattedMessage id="profile.location" />}
        rules={[Rules.required, Rules.maxChar50]}
      >
        <Select
          placeholder="choose location"
          onChange={this.handleSelectChange}
          defaultValue={defaultValue}
        >
          {locationOptions.map((value, index) => {
            return <Option key={value.id}>{value.description.en}</Option>;
          })}
        </Select>
      </Form.Item>
    );
  }

  render() {
    // // const { getFieldDecorator } = this.props.form;
    // console.log(this.props.profileInfo.location || "");
    // console.log("rendering");
    // let ll = this.props.profileInfo.firstName;
    // console.log(ll);
    console.log("inview");
    console.log(this.props.load);
    console.log(this.props.profileInfo);
    if (this.props.load) {
      let defaultValue;
      if (this.props.profileInfo.location) {
        defaultValue = this.props.profileInfo.location.id;
      } else {
        defaultValue = "";
      }
      return (
        <div style={styles.content}>
          <Title level={2} style={styles.formTitle}>
            1. <FormattedMessage id="setup.primary.information" />
          </Title>
          <Divider style={styles.headerDiv} />
          <div key={this.props.profileInfo}>
            <Form
              name="basicForm"
              initialValues={{
                firstname: this.props.profileInfo.firstName,
                lastname: this.props.profileInfo.lastName,
                telephone: this.props.profileInfo.telephone,
                cellphone: this.props.profileInfo.cellphone,
                email: this.props.profileInfo.email,
                location: defaultValue,
                team: this.props.profileInfo.team,
                gcConnex: "ddd",
                linkedinUrl: this.props.profileInfo.linkedinUrl,
                githubUrl: this.props.profileInfo.githubUrl
              }}
              layout="vertical"
              onFinish={this.handleSubmit}
            >
              {/* Form Row One */}
              <Row gutter={24}>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name="firstname"
                    label={<FormattedMessage id="profile.first.name" />}
                    rules={[Rules.required, Rules.maxChar50]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={12}>
                  <Form.Item
                    name="lastname"
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
                    rules={[Rules.telephoneFormat]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name="cellphone"
                    label={<FormattedMessage id="profile.cellphone" />}
                    rules={[Rules.telephoneFormat]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name="email"
                    label={<FormattedMessage id="profile.email" />}
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
                    name="gcConnex"
                    label={<FormattedMessage id="profile.gcconnex.url" />}
                    rules={[Rules.maxChar100]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name="linkedinUrl"
                    label={<FormattedMessage id="profile.linkedin.url" />}
                    rules={[Rules.maxChar100]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={8}>
                  <Form.Item
                    name="githubUrl"
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
          </div>
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
    } else {
      return (
        <div style={styles.content}>
          <Skeleton />
        </div>
      );
    }
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

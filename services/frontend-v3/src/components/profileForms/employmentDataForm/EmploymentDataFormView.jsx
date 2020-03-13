import React, { useState, useEffect } from "react";
import "@ant-design/compatible/assets/index.css";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Input,
  Switch,
  Tooltip,
  Button
} from "antd";
import {
  LinkOutlined,
  RightOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import config from "../../../config";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";

const { backendAddress } = config;

const { Option } = Select;
const { Title } = Typography;

function EmploymentDataFormView(props) {
  const [displayTempRoleForm, setDisplayTempRoleForm] = useState();

  const toggleTempRoleForm = () => {
    setDisplayTempRoleForm(!displayTempRoleForm);
  };

  const getTempRoleForm = expandTempRoleForm => {
    console.log("yooooooo");
    if (expandTempRoleForm) {
      return (
        // <div style={{ width: "100%" }}>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="team"
              label={<FormattedMessage id="profile.team" />}
              rules={[Rules.maxChar50]}
            >
              <Input />
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
        // </div>
      );
    } else {
      return <div />;
    }
  };

  /* Handle form submission */
  const handleSubmit = async values => {
    if (props.profileInfo) {
      //If profile exists then update profile
      try {
        await axios.put(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      //If profile does not exists then create profile
      try {
        await axios.post(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* Get the initial values for the form */
  const getInitialValues = profile => {
    if (profile) {
      return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        telephone: profile.telephone,
        cellphone: profile.cellphone,
        email: profile.email,
        location: profile.location.id,
        team: profile.team,
        gcConnex: "ddd",
        linkedinUrl: profile.linkedinUrl,
        githubUrl: profile.githubUrl
      };
    } else {
      return {};
    }
  };

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

  /* Component Rules for form fields */
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

  if (!props.load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.content}>
        <Skeleton active />
      </div>
    );
  } else {
    /* Once data had loaded display form */
    return (
      <div style={styles.content}>
        <Title level={2} style={styles.formTitle}>
          3. <FormattedMessage id="setup.employment" />
        </Title>
        <Divider style={styles.headerDiv} />
        <div key={props.profileInfo}>
          {/* Create for with initial values */}
          <Form
            name="basicForm"
            initialValues={getInitialValues(props.profileInfo)}
            layout="vertical"
            onFinish={handleSubmit}
          >
            {/* Form Row One */}
            <Row gutter={24}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="substantive"
                  label={<FormattedMessage id="profile.substantive" />}
                  rules={[Rules.required, Rules.maxChar50]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="choose substantive"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.substantiveOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description.en}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="classification"
                  label={<FormattedMessage id="profile.classification" />}
                  rules={[Rules.required, Rules.maxChar50]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="choose classification"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.classificationOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Two */}{" "}
            <Row gutter={24}>
              <Col className="gutter-row" span={24}>
                <Form.Item
                  name="security"
                  label={<FormattedMessage id="profile.security" />}
                  rules={[Rules.required, Rules.maxChar50]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    placeholder="choose security"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {props.securityOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description.en}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Three */}{" "}
            <Row gutter={24}>
              <Col className="gutter-row" span={24}>
                <Form.Item
                  name="manager"
                  label={<FormattedMessage id="profile.manager" />}
                  rules={[Rules.required, Rules.maxChar50]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Three */}
            <Row
              style={{
                backgroundColor: "#dfe5e4",
                paddingTop: "15px",
                paddingBottom: "15px",
                marginBottom: "20px",
                marginTop: "10px"
              }}
              gutter={24}
            >
              <Col className="gutter-row" span={24}>
                <FormLabelTooltip
                  labelText={<FormattedMessage id="profile.temporary.role" />}
                  tooltipText="Extra information"
                />
                <Switch default={false} onChange={toggleTempRoleForm} />
              </Col>
              {getTempRoleForm(displayTempRoleForm)}
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
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item>
                  <Button
                    style={{ float: "right" }}
                    type="primary"
                    htmlType="submit"
                  >
                    {<FormattedMessage id="setup.save.and.next" />}{" "}
                    <RightOutlined />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}

export default EmploymentDataFormView;

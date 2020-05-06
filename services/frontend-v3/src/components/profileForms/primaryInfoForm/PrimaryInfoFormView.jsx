import React from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Input,
  Button,
  message,
} from "antd";
import { useHistory } from "react-router-dom";
import { LinkOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;

function PrimaryInfoFormView(props) {
  const history = useHistory();
  const [form] = Form.useForm();

  /* Component Styles */
  const styles = {
    skeleton: {
      minHeight: "400px",
      maxWidth: "900px",
      background: "#fff",
      padding: "30px 30px",
    },
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    formTitle: {
      fontSize: "1.2em",
    },
    headerDiv: {
      margin: "15px 0 15px 0",
    },
    formItem: {
      margin: "10px 0 10px 0",
      padding: "0 20px 0 0",
      textAlign: "left",
    },
    subHeading: {
      fontSize: "1.3em",
    },
    finishAndSaveBtn: {
      float: "left",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
    clearBtn: { float: "left", marginBottom: "1rem" },
    finishAndNextBtn: {
      width: "100%",
      float: "right",
      marginBottom: "1rem",
    },
    saveBtn: {
      float: "right",
      marginBottom: "1rem",
      width: "100%",
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: "Required",
    },
    maxChar50: {
      max: 50,
      message: "Max length 50 characters",
    },
    maxChar100: {
      max: 50,
      message: "Max length 100 characters",
    },
    telephoneFormat: {
      pattern: /^\d{3}-\d{3}-\d{4}$/i, // prettier-ignore
      message: "required format: 111-222-3333",
    },
    emailFormat: {
      pattern: /\S+@\S+\.ca/i, // prettier-ignore
      message: "Please Provide a valid Gov. Canada email",
    },
  };

  /*
   * Get Form Control Buttons
   *
   * Get Form Control Buttons based on form type (edit or create)
   */
  const getFormControlButtons = (formType) => {
    if (formType === "create") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
            <Button
              style={styles.finishAndSaveBtn}
              onClick={onSaveAndFinish}
              htmlType="button"
            >
              <CheckOutlined style={{ marginRight: "0.2rem" }} />
              {<FormattedMessage id="setup.save.and.finish" />}
            </Button>
            <Button
              style={styles.clearBtn}
              htmlType="button"
              onClick={onReset}
              danger
            >
              {<FormattedMessage id="button.clear" />}
            </Button>
          </Col>
          <Col xs={24} md={24} lg={6} xl={6}>
            <Button
              style={styles.finishAndNextBtn}
              type="primary"
              onClick={onSaveAndNext}
            >
              {<FormattedMessage id="setup.save.and.next" />} <RightOutlined />
            </Button>
          </Col>
        </Row>
      );
    } else if (formType === "edit") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
            <Button
              style={styles.clearBtn}
              htmlType="button"
              onClick={onReset}
              danger
            >
              {<FormattedMessage id="button.clear" />}
            </Button>
          </Col>
          <Col xs={24} md={24} lg={6} xl={6}>
            <Button style={styles.saveBtn} type="primary" onClick={onSave}>
              {<FormattedMessage id="setup.save" />}
            </Button>
          </Col>
        </Row>
      );
    } else {
      console.log("Error Getting Action Buttons");
    }
  };

  /* Save data */
  const saveDataToDB = async (values) => {
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

  /* show message */
  const openNotificationWithIcon = (type) => {
    switch (type) {
      case "success":
        message.success("Changes Saved");
        break;
      case "error":
        message.error("Data Not Saved");
        break;
      default:
        message.warning("There may be a problem");
        break;
    }
  };

  /* save and show success notification */
  const onSave = async (values) => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        openNotificationWithIcon("success");
      })
      .catch(() => {
        console.log("validation failure");
        openNotificationWithIcon("error");
      });
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async (values) => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/3");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/8");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    message.info("Form Cleared");
  };

  /* Generate form header based on form type */
  const getFormHeader = (formType) => {
    if (formType == "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          2. <FormattedMessage id="setup.primary.information" />
        </Title>
      );
    } else {
      return (
        <Title level={2} style={styles.formTitle}>
          <FormattedMessage id="setup.primary.information" />
        </Title>
      );
    }
  };

  /* Get the initial values for the form */
  const getInitialValues = (profile) => {
    if (profile) {
      return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        telephone: profile.telephone,
        cellphone: profile.cellphone,
        email: profile.email,
        location: profile.location.id ? profile.location.id : undefined,
        team: profile.team,
        gcconnexUrl: profile.gcconnexUrl,
        linkedinUrl: profile.linkedinUrl,
        githubUrl: profile.githubUrl,
      };
    } else {
      return { email: localStorage.getItem("email") };
    }
  };

  /************************************
   ********* Render Component *********
   ************************************/
  if (!props.load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.skeleton}>
        <Skeleton active />
      </div>
    );
  } else {
    /* Once data had loaded display form */
    return (
      <div style={styles.content}>
        {/* get form title */}
        {getFormHeader(props.formType)}
        <Divider style={styles.headerDiv} />
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          initialValues={getInitialValues(props.profileInfo)}
          layout="vertical"
          form={form}
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="firstName"
                label={<FormattedMessage id="profile.first.name" />}
                rules={[Rules.required, Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
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
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="telephone"
                label={<FormattedMessage id="profile.telephone" />}
                rules={[Rules.telephoneFormat]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="cellphone"
                label={<FormattedMessage id="profile.cellphone" />}
                rules={[Rules.telephoneFormat]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="email"
                label={<FormattedMessage id="profile.email" />}
                rules={[Rules.emailFormat, Rules.maxChar50]}
              >
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="location"
                label={<FormattedMessage id="profile.location" />}
                rules={[Rules.required, Rules.maxChar50]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.locationOptions.map((value, index) => {
                    return (
                      <Option key={value.id}>{value.description.en}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
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
              marginTop: "10px",
            }}
          >
            <Col className="gutter-row" span={24}>
              <LinkOutlined /> <FormattedMessage id="setup.link.profiles" />
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="gcconnexUrl"
                label={<FormattedMessage id="profile.gcconnex.url" />}
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="linkedinUrl"
                label={<FormattedMessage id="profile.linkedin.url" />}
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="githubUrl"
                label={<FormattedMessage id="profile.github.url" />}
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {getFormControlButtons(props.formType)}
        </Form>
      </div>
    );
  }
}

export default PrimaryInfoFormView;

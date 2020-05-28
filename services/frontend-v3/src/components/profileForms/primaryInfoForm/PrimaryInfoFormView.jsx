import React, { useState } from "react";
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
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import _ from "lodash";
import PropTypes from "prop-types";
import {
  IdDescriptionPropType,
  ProfileInfoPropType,
  IntlPropType,
} from "../../../customPropTypes";
import config from "../../../config";
import handleError from "../../../functions/handleError";

const { backendAddress } = config;
const { Option } = Select;
const { Title, Text } = Typography;

const PrimaryInfoFormView = ({
  locationOptions,
  profileInfo,
  load,
  formType,
  intl,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);

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
    unsavedText: {
      marginLeft: "10px",
      fontWeight: "normal",
      fontStyle: "italic",
      opacity: 0.5,
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="profile.rules.max.50" />,
    },
    maxChar100: {
      max: 100,
      message: <FormattedMessage id="profile.rules.max.100" />,
    },
    telephoneFormat: {
      pattern: /^\d{3}-\d{3}-\d{4}$/i,
      message: <FormattedMessage id="profile.rules.phone.number" />,
    },
    emailFormat: {
      pattern: /\S+@\S+\.ca/i,
      message: <FormattedMessage id="profile.rules.email" />,
    },
  };

  /* Save data */
  const saveDataToDB = async values => {
    if (profileInfo) {
      // If profile exists then update profile
      try {
        await axios.put(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          values
        );
      } catch (error) {
        throw error;
      }
    } else {
      // If profile does not exists then create profile
      try {
        await axios.post(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          values
        );
      } catch (error) {
        throw error;
      }
    }
  };

  /* show message */
  const openNotificationWithIcon = type => {
    switch (type) {
      case "success":
        message.success(
          intl.formatMessage({ id: "profile.edit.save.success" })
        );
        break;
      case "error":
        message.error(intl.formatMessage({ id: "profile.edit.save.error" }));
        break;
      default:
        message.warning(
          intl.formatMessage({ id: "profile.edit.save.problem" })
        );
        break;
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
        location: profile.location.id ? profile.location.id : undefined,
        team: profile.team,
        gcconnexUrl: profile.gcconnexUrl,
        linkedinUrl: profile.linkedinUrl,
        githubUrl: profile.githubUrl,
      };
    }
    return { email: localStorage.getItem("email") };
  };

  /**
   * Returns true if the values in the form have changed based on its initial values
   *
   * _.pickBy({}, _.identity) is used to omit falsey values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = () => {
    const formValues = _.pickBy(form.getFieldsValue(), _.identity);
    const initialValues = _.pickBy(getInitialValues(profileInfo), _.identity);

    setFieldsChanged(!_.isEqual(formValues, initialValues));
  };

  /* save and show success notification */
  const onSave = async () => {
    form
      .validateFields()
      .then(async values => await saveDataToDB(values))
      .then(() => {
        openNotificationWithIcon("success");
        checkIfFormValuesChanged();
      })
      .catch(error => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon("error");
        }
      });
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async values => {
        await saveDataToDB(values);
      })
      .then(() => history.push("/secured/profile/create/step/3"))
      .catch(error => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon("error");
        }
      });
  };

  // redirect to profile
  const onFinish = () => {
    history.push(`/secured/profile/${localStorage.getItem("userId")}`);
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async values => {
        await saveDataToDB(values);
      })
      .then(() => {
        if (formType === "create") {
          history.push("/secured/profile/create/step/8");
        } else {
          onFinish();
        }
      })
      .catch(error => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon("error");
        }
      });
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    message.info(intl.formatMessage({ id: "profile.form.clear" }));
    checkIfFormValuesChanged();
  };

  /* Generate form header based on form type */
  const getFormHeader = _formType => {
    if (_formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          2. <FormattedMessage id="setup.primary.information" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="setup.primary.information" />
        {fieldsChanged && <Text style={styles.unsavedText}>(unsaved)</Text>}
      </Title>
    );
  };

  /*
   * Get Form Control Buttons
   *
   * Get Form Control Buttons based on form type (edit or create)
   */
  const getFormControlButtons = _formType => {
    if (_formType === "create") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
            <Button
              style={styles.finishAndSaveBtn}
              onClick={onSaveAndFinish}
              htmlType="button"
            >
              <CheckOutlined style={{ marginRight: "0.2rem" }} />
              <FormattedMessage id="setup.save.and.finish" />
            </Button>
            <Button
              style={styles.clearBtn}
              htmlType="button"
              onClick={onReset}
              danger
            >
              <FormattedMessage id="button.clear" />
            </Button>
          </Col>
          <Col xs={24} md={24} lg={6} xl={6}>
            <Button
              style={styles.finishAndNextBtn}
              type="primary"
              onClick={onSaveAndNext}
            >
              <FormattedMessage id="setup.save.and.next" /> <RightOutlined />
            </Button>
          </Col>
        </Row>
      );
    }
    if (_formType === "edit") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
            <Button
              style={styles.finishAndSaveBtn}
              onClick={onSave}
              disabled={!fieldsChanged}
            >
              <FormattedMessage id="setup.save" />
            </Button>
            <Button
              style={styles.clearBtn}
              htmlType="button"
              onClick={onReset}
              danger
              disabled={!fieldsChanged}
            >
              <FormattedMessage id="button.clear" />
            </Button>
          </Col>
          <Col xs={24} md={24} lg={6} xl={6}>
            <Button
              style={styles.saveBtn}
              type="primary"
              onClick={fieldsChanged ? onSaveAndFinish : onFinish}
            >
              <CheckOutlined style={{ marginRight: "0.2rem" }} />
              {fieldsChanged ? (
                <FormattedMessage id="setup.save.and.finish" />
              ) : (
                <FormattedMessage id="button.finish" />
              )}
            </Button>
          </Col>
        </Row>
      );
    }
    // eslint-disable-next-line no-console
    console.log("Error Getting Action Buttons");
    return undefined;
  };

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.skeleton}>
        <Skeleton active />
      </div>
    );
  }
  /* Once data had loaded display form */
  return (
    <div style={styles.content}>
      {/* get form title */}
      {getFormHeader(formType)}
      <Divider style={styles.headerDiv} />
      {/* Create for with initial values */}
      <Form
        name="basicForm"
        initialValues={getInitialValues(profileInfo)}
        layout="vertical"
        form={form}
        onValuesChange={checkIfFormValuesChanged}
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
              <Input disabled />
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
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {locationOptions.map(value => {
                  return <Option key={value.id}>{value.description.en}</Option>;
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
        {getFormControlButtons(formType)}
      </Form>
    </div>
  );
};

PrimaryInfoFormView.propTypes = {
  locationOptions: IdDescriptionPropType,
  profileInfo: ProfileInfoPropType,
  load: PropTypes.bool.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  intl: IntlPropType,
};

PrimaryInfoFormView.defaultProps = {
  locationOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(PrimaryInfoFormView);

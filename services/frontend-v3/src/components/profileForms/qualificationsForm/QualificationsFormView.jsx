import React from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Button,
  message,
} from "antd";
import { useHistory } from "react-router-dom";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import PropTypes from "prop-types";
import EducationForm from "./educationForm/EducationForm";
import ExperienceForm from "./experienceForm/ExperienceForm";
import { ProfileInfoPropType, IntlPropType } from "../../../customPropTypes";
import config from "../../../config";

const { backendAddress } = config;
const { Title } = Typography;

/**
 *  QualificationsFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const QualificationsFormView = ({
  profileInfo,
  savedEducation,
  savedExperience,
  savedProjects,
  formType,
  load,
  intl,
}) => {
  const history = useHistory();
  const [form] = Form.useForm();

  /* Component Styles */
  const styles = {
    skeleton: {
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      background: "#fff",
      padding: "30px 30px",
    },
    formTitle: {
      fontSize: "1.2em",
    },
    entryTitle: {
      fontSize: "1em",
    },
    headerDiv: {
      margin: "15px 0 15px 0",
    },
    datePicker: { width: "100%" },
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

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };
    // format education date for DB storage
    if (values.education) {
      for (let i = 0; i < values.education.length; i += 1) {
        if (values.education[i].startDate) {
          values.education[i].startDate = values.education[i].startDate.startOf(
            "month"
          );
        }
        if (values.education[i].endDate) {
          values.education[i].endDate = values.education[i].endDate.startOf(
            "month"
          );
        }
      }
    }

    if (values.experience) {
      for (let i = 0; i < values.experience.length; i += 1) {
        if (values.experience[i].startDate) {
          values.experience[i].startDate = values.experience[
            i
          ].startDate.startOf("month");
        }
        if (values.experience[i].endDate) {
          values.experience[i].endDate = values.experience[i].endDate.startOf(
            "month"
          );
        }
      }
    }

    if (profileInfo) {
      // If profile exists then update profile
      try {
        await axios.put(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          values
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      // If profile does not exists then create profile
      try {
        await axios.post(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          values
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  /* show message */
  const openNotificationWithIcon = (type) => {
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

  /*
   * save
   *
   * save and show success notification
   */
  const onSave = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        openNotificationWithIcon("success");
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("validation failure");
        openNotificationWithIcon("error");
      });
  };

  /*
   * save and finish
   *
   * Save form data and redirect home
   */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        if (formType === "create") {
          history.push("/secured/profile/create/step/8");
        } else {
          history.push(`/secured/profile/${localStorage.getItem("userId")}`);
        }
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("validation failure");
      });
  };

  /*
   * On Reset
   *
   * reset form fields to state when page was loaded
   */
  const onReset = () => {
    form.resetFields();
    message.info(intl.formatMessage({ id: "profile.form.clear" }));
  };

  /*
   * Get Form Control Buttons
   *
   * Get Form Control Buttons based on form type (edit or create)
   */
  const getFormControlButtons = (_formType) => {
    if (_formType === "create") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
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
              style={styles.saveBtn}
              onClick={onSaveAndFinish}
              type="primary"
            >
              <CheckOutlined style={{ marginRight: "0.2rem" }} />
              <FormattedMessage id="setup.save.and.finish" />
            </Button>
          </Col>
        </Row>
      );
    }
    if (_formType === "edit") {
      return (
        <Row gutter={24} style={{ marginTop: "20px" }}>
          <Col xs={24} md={24} lg={18} xl={18}>
            <Button style={styles.finishAndSaveBtn} onClick={onSave}>
              <FormattedMessage id="setup.save" />
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
              style={styles.saveBtn}
              type="primary"
              onClick={onSaveAndFinish}
            >
              <CheckOutlined style={{ marginRight: "0.2rem" }} />
              <FormattedMessage id="setup.save.and.finish" />
            </Button>
          </Col>
        </Row>
      );
    }
    // eslint-disable-next-line no-console
    console.log("Error Getting Action Buttons");
    return undefined;
  };

  /*
   * Get form header
   *
   * Generates the form header (title)
   */
  const getFormHeader = (_formType) => {
    if (_formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          7. <FormattedMessage id="profile.employee.qualifications" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="profile.employee.qualifications" />
      </Title>
    );
  };

  /*
   * Get the initial values for the form
   *
   */
  const getInitialValues = (profile) => {
    const hasRequiredProps = () => {
      return savedEducation && savedExperience && savedProjects;
    };
    if (profile && hasRequiredProps()) {
      return {
        education: savedEducation,
        experience: savedExperience,
        projects: savedProjects,
      };
    }
    return {};
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

      {/* Create form with initial values */}
      <Form
        name="QualificationForm"
        form={form}
        initialValues={getInitialValues(profileInfo)}
        layout="vertical"
      >
        {/* *************** Education ************** */}
        <Title level={3} style={styles.formTitle}>
          <FormattedMessage id="setup.education" />
        </Title>
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.List name="education">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {/* generate education form for each education item */}
                    {fields.map((field) => (
                      <EducationForm
                        key={field.fieldKey}
                        form={form}
                        field={field}
                        remove={remove}
                        profileInfo={profileInfo}
                        style={styles}
                      />
                    ))}
                    <Form.Item>
                      {/* add education field button */}
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "100%" }}
                      >
                        <PlusOutlined />
                        <FormattedMessage id="setup.add.item" />
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Col>
        </Row>
        {/* *************** Work Experience ************** */}
        <Divider style={styles.headerDiv} />
        <Title level={3} style={styles.formTitle}>
          <FormattedMessage id="setup.experience" />
        </Title>
        {/* Form Row One: Remote Work */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.List name="experience">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {/* generate education form for each education item */}
                    {fields.map((field) => (
                      <ExperienceForm
                        key={field.fieldKey}
                        form={form}
                        field={field}
                        remove={remove}
                        profileInfo={profileInfo}
                        style={styles}
                      />
                    ))}
                    <Form.Item>
                      {/* add education field button */}
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        style={{ width: "100%" }}
                      >
                        <PlusOutlined />
                        <FormattedMessage id="setup.add.item" />
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </Col>
        </Row>
        {/* *************** Projects ************** */}
        <Divider style={styles.headerDiv} />
        <Title level={3} style={styles.formTitle}>
          <FormattedMessage id="setup.projects" />
        </Title>
        {/* Form Row Three: career mobility */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="projects"
              label={<FormattedMessage id="setup.projects" />}
              className="custom-bubble-select-style"
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                notFoundContent={
                  <FormattedMessage id="setup.projects.placeholder" />
                }
              />
            </Form.Item>
          </Col>
        </Row>
        {/* *************** Control Buttons ************** */}
        {/* Form Row Four: Submit button */}
        {getFormControlButtons(formType)}
      </Form>
    </div>
  );
};

QualificationsFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  savedEducation: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      endDate: PropTypes.PropTypes.object,
      school: PropTypes.string,
      startDate: PropTypes.object,
    })
  ),
  savedExperience: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,

      // Note: PropTypes doesn't have a good way to specify null, you have to use number instead
      endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),

      header: PropTypes.string,
      startDate: PropTypes.object,
      subheader: PropTypes.string,
    })
  ),
  savedProjects: PropTypes.arrayOf(PropTypes.string),
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  load: PropTypes.bool.isRequired,
  intl: IntlPropType,
};

QualificationsFormView.defaultProps = {
  profileInfo: null,
  savedEducation: [],
  savedExperience: [],
  savedProjects: [],
  intl: null,
};

export default injectIntl(QualificationsFormView);

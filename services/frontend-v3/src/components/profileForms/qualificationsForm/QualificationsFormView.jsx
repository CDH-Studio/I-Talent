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
} from "antd";
import { useHistory } from "react-router-dom";
import { RightOutlined, CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import EducationFrom from "./educationForm/EducationForm";
import ExperienceFrom from "./experienceForm/ExperienceForm";
import config from "../../../config";

const { backendAddress } = config;
const { Title } = Typography;
const { Option } = Select;

/**
 *  QualificationsFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const QualificationsFormView = (props) => {
  const history = useHistory();
  const [form] = Form.useForm();

  /* Component Styles */
  const styles = {
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
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async (values) => {
    // format education date for DB storage
    if (values.education) {
      for (let i = 0; i < values.education.length; i++) {
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
      for (let i = 0; i < values.experience.length; i++) {
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

    if (props.profileInfo) {
      // If profile exists then update profile
      try {
        await axios.put(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      // If profile does not exists then create profile
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

  /*
   * save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async (values) => {
    await saveDataToDB(values);
    history.push("/secured/profile/create/step/7");
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
        history.push("/secured/home");
      })
      .catch(() => {
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
  };

  /*
   * Get the initial values for the form
   *
   */
  const getInitialValues = (profile) => {
    if (profile && props) {
      return {
        education: props.savedEducation,
        experience: props.savedExperience,
        projects: props.savedProjects,
      };
    } else {
      return {};
    }
  };

  /************************************
   ********* Render Component *********
   ************************************/
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
          5. <FormattedMessage id="profile.employee.growth.interests" />
        </Title>
        <Divider style={styles.headerDiv} />
        <div key={props.profileInfo}>
          {/* Create form with initial values */}
          <Form
            name="QualificationForm"
            form={form}
            initialValues={getInitialValues(props.profileInfo)}
            layout="vertical"
            onFinish={onSaveAndNext}
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
                        {fields.map((field, index) => (
                          <EducationFrom
                            key={field.fieldKey}
                            form={form}
                            field={field}
                            remove={remove}
                            profileInfo={props.profileInfo}
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
                            <PlusOutlined /> Add field
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
              <FormattedMessage id="setup.career.interests" />
            </Title>
            {/* Form Row One: Remote Work */}
            <Row gutter={24}>
              <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                <Form.List name="experience">
                  {(fields, { add, remove }) => {
                    return (
                      <div>
                        {/* generate education form for each education item */}
                        {fields.map((field, index) => (
                          <ExperienceFrom
                            key={field.fieldKey}
                            form={form}
                            field={field}
                            remove={remove}
                            profileInfo={props.profileInfo}
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
                            <PlusOutlined /> Add field
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
                    notFoundContent={"click enter to add"}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* *************** Control Buttons ************** */}
            {/* Form Row Four: Submit button */}
            <Row gutter={24}>
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
                  htmlType="submit"
                >
                  {<FormattedMessage id="setup.save.and.next" />}{" "}
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
};

export default QualificationsFormView;

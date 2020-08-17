import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Button,
  Tabs,
  notification,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { isEqual, identity, pickBy, size, filter } from "lodash";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Prompt } from "react-router";
import useAxios from "../../../utils/axios-instance";
import handleError from "../../../functions/handleError";
import EducationForm from "./educationForm/EducationForm";
import ExperienceForm from "./experienceForm/ExperienceForm";
import {
  ProfileInfoPropType,
  HistoryPropType,
} from "../../../utils/customPropTypes";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import FormControlButton from "../formControlButtons/FormControlButtons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

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
  currentTab,
  load,
  history,
  userId,
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const axios = useAxios();
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const [tabErrorsBool, setTabErrorsBool] = useState({});

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
      margin: 0,
    },
    sectionHeader: {
      marginBottom: 10,
    },
    entryTitle: {
      fontSize: "1em",
    },
    headerDiv: {
      margin: "15px 0 15px 0",
    },
    datePicker: {
      width: "100%",
    },
    unsavedText: {
      marginLeft: "10px",
      fontWeight: "normal",
      fontStyle: "italic",
      opacity: 0.5,
    },
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };
    await axios.put(`api/profile/${userId}?language=${locale}`, values);
  };

  /**
   * Open Notification
   * @param {Object} notification - The notification to be displayed.
   * @param {string} notification.type - The type of notification.
   * @param {string} notification.description - Additional info in notification.
   */
  const openNotificationWithIcon = ({ type, description }) => {
    switch (type) {
      case "success":
        notification.success({
          message: intl.formatMessage({ id: "profile.edit.save.success" }),
        });
        break;
      case "error":
        notification.error({
          message: intl.formatMessage({ id: "profile.edit.save.error" }),
          description,
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({ id: "profile.edit.save.problem" }),
        });
        break;
    }
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * pickBy({}, identity) is used to omit falsey values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = () => {
    const formValues = pickBy(form.getFieldsValue(), identity);
    const dbValues = pickBy(savedValues || initialValues, identity);

    // This needs to be done since the remove from the Form.List does not delete the
    // object, but rather returns an object that contains undefined values
    if (formValues.educations) {
      formValues.educations = formValues.educations.map((i) =>
        pickBy(i, identity)
      );

      formValues.educations = filter(formValues.educations, size);
    }

    if (formValues.experiences) {
      formValues.experiences = formValues.experiences.map((i) =>
        pickBy(i, identity)
      );

      formValues.experiences = filter(formValues.experiences, size);
    }

    if (dbValues.educations) {
      dbValues.educations = dbValues.educations.map((i) => pickBy(i, identity));
      dbValues.educations = filter(dbValues.educations, size);
    }

    if (dbValues.experiences) {
      dbValues.experiences = dbValues.experiences.map((i) =>
        pickBy(i, identity)
      );

      dbValues.experiences = filter(dbValues.experiences, size);
    }

    setFieldsChanged(!isEqual(formValues, dbValues));
  };

  /*
   * Find Error Tabs
   *
   * Find all tabs that have validation errors
   */
  const findErrorTabs = () => {
    const errorObject = form
      .getFieldsError()
      .reduce((acc, { name, errors }) => {
        if (errors.length > 0) {
          acc[name[0]] = true;
        }
        return acc;
      }, {});

    // save results to state
    if (!isEqual(errorObject, tabErrorsBool)) {
      setTabErrorsBool(errorObject);
    }
    return errorObject;
  };

  /*
   * Get All Validation Errors
   *
   * Print out list of validation errors in a list for notification
   */
  const getAllValidationErrorMessages = (formsWithErrorsList) => {
    const messages = [];
    if (formsWithErrorsList.experiences) {
      messages.push(intl.formatMessage({ id: "profile.experience" }));
    }
    if (formsWithErrorsList.educations) {
      messages.push(intl.formatMessage({ id: "profile.education" }));
    }
    return (
      <div>
        <strong>
          {intl.formatMessage({ id: "profile.edit.save.error.intro" })}
        </strong>
        <ul>
          {messages.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </div>
    );
  };

  const onFieldsChange = () => {
    findErrorTabs();
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
        setFieldsChanged(false);
        setSavedValues(values);
        await saveDataToDB(values);
        openNotificationWithIcon({ type: "success" });
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getAllValidationErrorMessages(findErrorTabs()),
          });
        }
      });
  };

  // redirect to profile
  const onFinish = () => {
    history.push(`/profile/${userId}`);
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
        setFieldsChanged(false);
        if (formType === "create") {
          history.push("/profile/create/step/8");
        } else {
          dispatch(setSavedFormContent(true));
          onFinish();
        }
      })
      .catch((error) => {
        dispatch(setSavedFormContent(false));
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getAllValidationErrorMessages(findErrorTabs()),
          });
        }
      });
  };

  /*
   * On Reset
   *
   * reset form fields to state when page was loaded
   */
  const onReset = () => {
    form.resetFields();
    notification.info({
      message: intl.formatMessage({ id: "profile.form.clear" }),
    });
    checkIfFormValuesChanged();
    setTabErrorsBool({});
  };

  /**
   * Get Tab Title
   * @param {Object} tabTitleInfo - tab title info.
   * @param {string} tabTitleInfo.message - Tab title.
   * @param {bool} tabTitleInfo.errorBool - Bool to show error in tab.
   */
  const getTabTitle = ({ message, errorBool }) => {
    if (errorBool) {
      return <div style={{ color: "red" }}>{message}</div>;
    }
    return message;
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
        {fieldsChanged && (
          <Text style={styles.unsavedText}>
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
  };

  const getSectionHeader = (titleId, cardName) => (
    <Row justify="space-between" style={styles.sectionHeader} align="middle">
      <Title level={3} style={styles.formTitle}>
        <FormattedMessage id={titleId} />
      </Title>
      <CardVisibilityToggle
        visibleCards={profileInfo.visibleCards}
        cardName={cardName}
        type="form"
      />
    </Row>
  );

  /**
   * Get the initial values for the form (once)
   */
  useEffect(() => {
    if (
      !initialValues &&
      savedEducation &&
      savedExperience &&
      savedProjects &&
      profileInfo
    ) {
      setInitialValues({
        educations: savedEducation,
        experiences: savedExperience,
        projects: savedProjects,
      });
    }
  }, [
    savedEducation,
    savedExperience,
    savedProjects,
    profileInfo,
    initialValues,
  ]);

  /**
   * Sets the value of the form according to the initial values (once, when the initial values are initially set)
   */
  useEffect(() => {
    if (initialValues) {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

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
    <>
      <Prompt
        when={fieldsChanged}
        message={intl.formatMessage({ id: "profile.form.unsaved.alert" })}
      />
      <div style={styles.content}>
        {/* get form title */}
        {getFormHeader(formType)}
        <Divider style={styles.headerDiv} />

        {/* Create form with initial values */}
        <Form
          name="QualificationForm"
          form={form}
          initialValues={savedValues || initialValues}
          layout="vertical"
          onValuesChange={checkIfFormValuesChanged}
          onFieldsChange={onFieldsChange}
        >
          <Tabs type="card" defaultActiveKey={currentTab}>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="setup.education" />,
                errorBool: tabErrorsBool.educations,
              })}
              key="education"
            >
              {getSectionHeader("setup.education", "education")}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.List name="educations">
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
                              checkIfFormValuesChanged={
                                checkIfFormValuesChanged
                              }
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
            </TabPane>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="setup.experience" />,
                errorBool: tabErrorsBool.experiences,
              })}
              key="experience"
            >
              {getSectionHeader("setup.experience", "experience")}
              {/* Form Row One: Remote Work */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.List name="experiences">
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
                              checkIfFormValuesChanged={
                                checkIfFormValuesChanged
                              }
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
              {getSectionHeader("setup.projects", "projects")}
              {/* Form Row Three: career mobility */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="projects"
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
            </TabPane>
          </Tabs>
          <FormControlButton
            formType={formType}
            onSave={onSave}
            onSaveAndFinish={onSaveAndFinish}
            onReset={onReset}
            onFinish={onFinish}
            fieldsChanged={fieldsChanged}
          />
        </Form>
      </div>
    </>
  );
};

QualificationsFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  savedEducation: PropTypes.arrayOf(
    PropTypes.shape({
      diploma: PropTypes.string,
      endDate: PropTypes.oneOfType([PropTypes.object]),
      startDate: PropTypes.oneOfType([PropTypes.object]),
      school: PropTypes.string,
    })
  ),
  savedExperience: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      endDate: PropTypes.oneOfType([PropTypes.object]),
      header: PropTypes.string,
      startDate: PropTypes.oneOfType([PropTypes.object]),
      subheader: PropTypes.string,
    })
  ),
  savedProjects: PropTypes.arrayOf(PropTypes.string),
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  currentTab: PropTypes.string,
  load: PropTypes.bool.isRequired,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
};

QualificationsFormView.defaultProps = {
  currentTab: null,
  profileInfo: null,
  savedEducation: undefined,
  savedExperience: undefined,
  savedProjects: undefined,
};

export default QualificationsFormView;

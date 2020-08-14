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
  message,
  Tabs,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { isEqual, identity, pickBy, size, filter } from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Prompt } from "react-router";
import handleError from "../../../functions/handleError";
import EducationForm from "./educationForm/EducationForm";
import ExperienceForm from "./experienceForm/ExperienceForm";
import {
  ProfileInfoPropType,
  IntlPropType,
  HistoryPropType,
  KeyNameOptionsPropType,
  KeyTitleOptionsPropType,
} from "../../../utils/customPropTypes";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import FormControlButton from "../formControlButtons/FormControlButtons";
import "./QualificationsFormView.scss";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const QualificationsFormView = ({
  profileInfo,
  savedEducation,
  savedExperience,
  savedProjects,
  formType,
  currentTab,
  load,
  intl,
  history,
  userId,
  attachmentNamesTypeEduOptions,
  attachmentNamesTypeExpOptions,
  diplomaOptions,
  schoolOptions,
  saveDataToDB,
}) => {
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const dispatch = useDispatch();

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
        openNotificationWithIcon("success");
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon("error");
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
          openNotificationWithIcon("error");
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
    message.info(intl.formatMessage({ id: "profile.form.clear" }));
    checkIfFormValuesChanged();
  };

  /*
   * Get form header
   *
   * Generates the form header (title)
   */
  const getFormHeader = (_formType) => {
    if (_formType === "create") {
      return (
        <Title level={2} className="formTitle">
          7. <FormattedMessage id="profile.employee.qualifications" />
        </Title>
      );
    }
    return (
      <Title level={2} className="formTitle">
        <FormattedMessage id="profile.employee.qualifications" />
        {fieldsChanged && (
          <Text className="unsavedText">
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
  };

  const getSectionHeader = (titleId, cardName) => (
    <Row justify="space-between" className="sectionHeader" align="middle">
      <Title level={3} className="formTitle">
        <FormattedMessage id={titleId} />
      </Title>
      <CardVisibilityToggle
        visibleCards={profileInfo.visibleCards}
        cardName={cardName}
        type="form"
      />
    </Row>
  );

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!load) {
    return (
      <div className="skeleton">
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
      <div className="content">
        {/* get form title */}
        {getFormHeader(formType)}
        <Divider className="headerDiv" />

        {/* Create form with initial values */}
        <Form
          name="QualificationForm"
          form={form}
          initialValues={savedValues || initialValues}
          layout="vertical"
          onValuesChange={checkIfFormValuesChanged}
        >
          <Tabs type="card" defaultActiveKey={currentTab}>
            <TabPane
              tab={<FormattedMessage id="setup.education" />}
              key="education"
            >
              {getSectionHeader("setup.education", "education")}

              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.List name="educations">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field) => (
                            <EducationForm
                              key={field.fieldKey}
                              form={form}
                              fieldElement={field}
                              removeElement={remove}
                              profileInfo={profileInfo}
                              diplomaOptions={diplomaOptions}
                              schoolOptions={schoolOptions}
                              attachmentNamesTypeEduOptions={
                                attachmentNamesTypeEduOptions
                              }
                              checkIfFormValuesChanged={
                                checkIfFormValuesChanged
                              }
                            />
                          ))}
                          <Form.Item>
                            {/* add education field button */}
                            <Button
                              type="dashed"
                              disabled={fields.length === 3}
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
              tab={<FormattedMessage id="setup.experience" />}
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
                              fieldElement={field}
                              removeElement={remove}
                              profileInfo={profileInfo}
                              checkIfFormValuesChanged={
                                checkIfFormValuesChanged
                              }
                              attachmentNamesTypeExpOptions={
                                attachmentNamesTypeExpOptions
                              }
                            />
                          ))}
                          <Form.Item>
                            {/* add education field button */}
                            <Button
                              type="dashed"
                              disabled={fields.length === 3}
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
              <Divider className="headerDiv" />
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
  intl: IntlPropType,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
  attachmentNamesTypeEduOptions: KeyNameOptionsPropType,
  attachmentNamesTypeExpOptions: KeyNameOptionsPropType,
  diplomaOptions: KeyTitleOptionsPropType,
  schoolOptions: KeyTitleOptionsPropType,
  saveDataToDB: PropTypes.func.isRequired,
};

QualificationsFormView.defaultProps = {
  currentTab: null,
  profileInfo: null,
  savedEducation: undefined,
  savedExperience: undefined,
  savedProjects: undefined,
  intl: null,
  attachmentNamesTypeEduOptions: undefined,
  attachmentNamesTypeExpOptions: undefined,
  diplomaOptions: undefined,
  schoolOptions: undefined,
};

export default injectIntl(QualificationsFormView);

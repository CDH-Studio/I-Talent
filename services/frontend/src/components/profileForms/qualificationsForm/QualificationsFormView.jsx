import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Row,
  Col,
  Skeleton,
  Divider,
  Form,
  Button,
  Tabs,
  notification,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { pickBy, size, identity, isEqual, filter } from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Prompt } from "react-router";
import handleError from "../../../functions/handleError";
import ExperienceForm from "./experienceForm/ExperienceForm";
import EducationForm from "./educationForm/EducationForm";
import FormTitle from "../formTitle/FormTitle";
import FormSubTitle from "../formSubTitle/FormSubTitleView";
import FormControlButton from "../formControlButtons/FormControlButtons";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import {
  ProfileInfoPropType,
  HistoryPropType,
  KeyNameOptionsPropType,
  KeyTitleOptionsPropType,
} from "../../../utils/customPropTypes";

import "./QualificationsFormView.less";

const { TabPane } = Tabs;

const QualificationsFormView = ({
  profileInfo,
  initialValues,
  formType,
  currentTab,
  load,
  history,
  options,
  saveDataToDB,
}) => {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1);
  const [tabErrorsBool, setTabErrorsBool] = useState({});
  const dispatch = useDispatch();

  /* Values for tabs */
  const tabs = useMemo(() => ({ 1: "education", 2: "experience" }), []);
  const MAXTAB = 2;

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
          message: intl.formatMessage({
            id: "edit.save.success",
          }),
        });
        break;
      case "error":
        notification.error({
          message: intl.formatMessage({ id: "edit.save.error" }),
          description,
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({
            id: "edit.save.problem",
          }),
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
      messages.push(intl.formatMessage({ id: "experience" }));
    }
    if (formsWithErrorsList.educations) {
      messages.push(intl.formatMessage({ id: "education" }));
    }
    return (
      <div>
        <strong>{intl.formatMessage({ id: "edit.save.error.intro" })}</strong>
        {messages.map((value) => (
          <p style={{ marginBottom: 0, marginLeft: "0.5em" }}>
            {"- "}
            {value} {intl.formatMessage({ id: "form" })}
          </p>
        ))}
      </div>
    );
  };

  /*
   * Get Tab Key
   *
   * Get tab number from name
   */
  const getTabValue = useCallback(
    (value) => Object.keys(tabs).find((key) => tabs[key] === value) || 1,
    [tabs]
  );

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
        await saveDataToDB(values);
        setFieldsChanged(false);
        setSavedValues(values);
        openNotificationWithIcon({ type: "success" });
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message", history);
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getAllValidationErrorMessages(findErrorTabs()),
          });
        }
      });
  };

  /*
   * save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async () => {
        const values = form.getFieldValue();
        await saveDataToDB(values);
        setFieldsChanged(false);
        if (selectedTab < MAXTAB) {
          setSelectedTab(parseInt(selectedTab, 10) + 1);
        } else {
          history.push("/profile/create/step/7");
        }
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message", history);
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
    history.push(`/profile/edit/finish`);
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
          handleError(error, "message", history);
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
      message: intl.formatMessage({ id: "form.clear" }),
    });
    checkIfFormValuesChanged();
    setTabErrorsBool({});
  };

  /*
   * On Tab Change
   *
   * on change of tab of the form
   */
  const onTabChange = (activeTab) => {
    setSelectedTab(getTabValue(activeTab));
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

  useEffect(() => {
    setSelectedTab(getTabValue(currentTab));
  }, [currentTab, getTabValue]);

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!load) {
    return (
      <div className="qual-skeleton">
        <Skeleton active />
      </div>
    );
  }
  /* Once data had loaded display form */
  return (
    <>
      <Prompt
        when={fieldsChanged}
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
      />
      <div className="qual-content">
        {/* get form title */}
        <FormTitle
          title={<FormattedMessage id="employee.qualifications" />}
          formType={formType}
          stepNumber={6}
          fieldsChanged={fieldsChanged}
        />

        <Divider className="qual-headerDiv" />
        {/* Create form with initial values */}
        <Form
          name="QualificationForm"
          form={form}
          initialValues={savedValues || initialValues}
          layout="vertical"
          onValuesChange={checkIfFormValuesChanged}
          onFieldsChange={onFieldsChange}
        >
          <Tabs
            type="card"
            activeKey={tabs[selectedTab]}
            onChange={onTabChange}
          >
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="education" />,
                errorBool: tabErrorsBool.educations,
              })}
              key="education"
            >
              <FormSubTitle
                title={<FormattedMessage id="education" />}
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="education"
                    type="form"
                  />
                }
              />
              <Row gutter={24}>
                <Col
                  className="qual-gutter-row"
                  xs={24}
                  md={24}
                  lg={24}
                  xl={24}
                >
                  <Form.List name="educations">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <EducationForm
                            key={field.fieldKey}
                            form={form}
                            fieldElement={field}
                            removeElement={remove}
                            diplomaOptions={options.diplomas}
                            schoolOptions={options.schools}
                            attachmentNames={options.attachmentNamesEdu}
                          />
                        ))}
                        <Form.Item>
                          {/* add education field button */}
                          <Button
                            type="dashed"
                            disabled={fields.length === 3}
                            onClick={() => add()}
                            style={{ width: "100%" }}
                          >
                            <PlusOutlined />
                            <FormattedMessage id="add" />
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="experience" />,
                errorBool: tabErrorsBool.experiences,
              })}
              key="experience"
            >
              <FormSubTitle
                title={<FormattedMessage id="experience" />}
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="experience"
                    type="form"
                  />
                }
              />
              {/* Form Row One: Remote Work */}
              <Row gutter={24}>
                <Col
                  className="qual-gutter-row"
                  xs={24}
                  md={24}
                  lg={24}
                  xl={24}
                >
                  <Form.List name="experiences">
                    {(fields, { add, remove }) => (
                      <div>
                        {/* generate education form for each education item */}
                        {fields.map((field) => (
                          <ExperienceForm
                            key={field.fieldKey}
                            form={form}
                            fieldElement={field}
                            removeElement={remove}
                            attachmentNames={options.attachmentNamesExp}
                            checkIfFormValuesChanged={checkIfFormValuesChanged}
                          />
                        ))}
                        <Form.Item>
                          {/* add education field button */}
                          <Button
                            type="dashed"
                            disabled={fields.length === 3}
                            onClick={() => add()}
                            style={{ width: "100%" }}
                          >
                            <PlusOutlined />
                            <FormattedMessage id="add" />
                          </Button>
                        </Form.Item>
                      </div>
                    )}
                  </Form.List>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
          <FormControlButton
            formType={formType}
            onSave={onSave}
            onSaveAndFinish={onSaveAndFinish}
            onSaveAndNext={onSaveAndNext}
            onReset={onReset}
            onFinish={onFinish}
            fieldsChanged={fieldsChanged}
            visibleCards={profileInfo.visibleCards}
          />
        </Form>
      </div>
    </>
  );
};

QualificationsFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  initialValues: PropTypes.shape({
    educations: PropTypes.arrayOf(
      PropTypes.shape({
        diploma: PropTypes.string,
        endDate: PropTypes.oneOfType([PropTypes.object]),
        startDate: PropTypes.oneOfType([PropTypes.object]),
        school: PropTypes.string,
      })
    ),
    experiences: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string,
        endDate: PropTypes.oneOfType([PropTypes.object]),
        header: PropTypes.string,
        startDate: PropTypes.oneOfType([PropTypes.object]),
        subheader: PropTypes.string,
      })
    ),
  }),
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  currentTab: PropTypes.string,
  load: PropTypes.bool.isRequired,
  history: HistoryPropType.isRequired,
  options: PropTypes.shape({
    diplomas: KeyTitleOptionsPropType,
    schools: KeyTitleOptionsPropType,
    attachmentNamesEdu: KeyNameOptionsPropType,
    attachmentNamesExp: KeyNameOptionsPropType,
  }),
  saveDataToDB: PropTypes.func.isRequired,
};

QualificationsFormView.defaultProps = {
  currentTab: null,
  profileInfo: null,
  initialValues: undefined,
  options: undefined,
};

export default QualificationsFormView;

import React, { useState } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Button,
  Checkbox,
  Popover,
  TreeSelect,
  Tabs,
  notification,
} from "antd";
import {
  RightOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Prompt } from "react-router";
import { Link } from "react-router-dom";
import useAxios from "../../../utils/axios-instance";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  IntlPropType,
  HistoryPropType,
} from "../../../utils/customPropTypes";
import handleError from "../../../functions/handleError";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import filterOption from "../../../functions/filterSelectInput";

const { Option } = Select;
const { Title, Text } = Typography;
const { SHOW_CHILD } = TreeSelect;
const { TabPane } = Tabs;

/**
 *  TalentFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const PersonalGrowthFormView = ({
  profileInfo,
  developmentalGoalOptions,
  savedDevelopmentalGoals,
  interestedInRemoteOptions,
  relocationOptions,
  savedRelocationLocations,
  lookingForNewJobOptions,
  savedLookingForNewJob,
  careerMobilityOptions,
  savedCareerMobility,
  talentMatrixResultOptions,
  savedTalentMatrixResult,
  savedExFeederBool,
  formType,
  currentTab,
  load,
  intl,
  history,
  userId,
}) => {
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [tabErrorsBool, setTabErrorsBool] = useState([]);
  const axios = useAxios();

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Component Styles */
  const styles = {
    skeleton: {
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px",
    },
    formTitle: {
      fontSize: "1.2em",
      margin: 0,
    },
    infoIcon: {
      paddingLeft: "5px",
    },
    sectionHeader: {
      marginBottom: 10,
    },
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      background: "#fff",
      padding: "30px 30px",
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
    secondLangRow: {
      backgroundColor: "#dfe5e4",
      paddingTop: "15px",
      paddingBottom: "15px",
      marginBottom: "20px",
      marginTop: "10px",
    },
    finishAndSaveBtn: {
      float: "left",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
    clearBtn: {
      float: "left",
      marginBottom: "1rem",
    },
    finishAndNextBtn: {
      width: "100%",
      float: "right",
      marginBottom: "1rem",
    },
    saveBtn: {
      float: "right",
      marginBottom: "1rem",
      minWidth: "100%",
    },
    TMTooltip: {
      paddingLeft: "5px",
    },
    unsavedText: {
      marginLeft: "10px",
      fontWeight: "normal",
      fontStyle: "italic",
      opacity: 0.5,
    },
    iconAfterTitle: {
      paddingLeft: "5px",
    },
    exFeeder: {
      margin: "5px 0",
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async (unalteredValues) => {
    const values = {
      ...unalteredValues,
    };

    if (unalteredValues.interestedInRemote === undefined) {
      values.interestedInRemote = null;
    }

    if (!unalteredValues.talentMatrixResultId) {
      values.talentMatrixResultId = null;
    }

    if (!unalteredValues.careerMobilityId) {
      values.careerMobilityId = null;
    }

    if (!unalteredValues.lookingForANewJobId) {
      values.lookingForANewJobId = null;
    }

    await axios.put(`api/profile/${userId}?language=${locale}`, values);
  };

  /*
   * Open Notification
   *
   * open notification to show status to user
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

  /*
   * Get the initial values for the form
   */
  const getInitialValues = (profile) => {
    if (profile) {
      return {
        developmentalGoals: savedDevelopmentalGoals,
        interestedInRemote:
          profile.interestedInRemote === null
            ? undefined
            : profile.interestedInRemote,
        relocationLocations: savedRelocationLocations,
        lookingForANewJobId: savedLookingForNewJob,
        careerMobilityId: savedCareerMobility,
        talentMatrixResultId: savedTalentMatrixResult,
        exFeeder: savedExFeederBool,
      };
    }
    return {};
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * _.pickBy({}, _.identity) is used to omit falsey values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = () => {
    const formValues = _.pickBy(form.getFieldsValue(), _.identity);
    const dbValues = _.omitBy(
      savedValues || getInitialValues(profileInfo),
      _.isNil
    );

    setFieldsChanged(!_.isEqual(formValues, dbValues));
  };

  /*
   * Find Error Tabs
   *
   * Find all tabs that have validation errors
   */
  const findErrorTabs = () => {
    const errors = form.getFieldsError();
    let errorArray = [];
    // loop through errors to see where each error belongs
    // (this is not functional for this for since there are no current validations)
    errors.forEach((value) => {
      errorArray["learningDevelopment"] =
        errorArray["learningDevelopment"] ||
        (String(value.name).includes("learning") && value.errors.length > 0);
      errorArray["careerInterests"] =
        errorArray["careerInterests"] ||
        (String(value.name).includes("career") && value.errors.length > 0);
      errorArray["talentManagement"] =
        errorArray["talentManagement"] ||
        (String(value.name).includes("talent") && value.errors.length > 0);
      errorArray["exFeeder"] =
        errorArray["exFeeder"] ||
        (String(value.name).includes("ex") && value.errors.length > 0);
    });

    // save results to state
    setTabErrorsBool(errorArray);
    return errorArray;
  };

  /*
   * Get All Validation Errors
   *
   * Print out list of validation errors in a list for notification
   */
  const getAllValidationErrorMessages = (formsWithErrorsList) => {
    let messages = [];
    if (formsWithErrorsList["learningDevelopment"]) {
      messages.push(intl.formatMessage({ id: "profile.learning.development" }));
    }
    if (formsWithErrorsList["careerInterests"]) {
      messages.push(intl.formatMessage({ id: "setup.career.interests" }));
    }
    if (formsWithErrorsList["talentManagement"]) {
      messages.push(
        intl.formatMessage({ id: "setup.talent.management.title" })
      );
    }
    if (formsWithErrorsList["exFeeder"]) {
      messages.push(intl.formatMessage({ id: "profile.ex.feeder.title" }));
    }
    return (
      <div>
        <strong>
          {intl.formatMessage({ id: "profile.edit.save.error.intro" })}
        </strong>
        <ul>
          {messages.map((value) => {
            return <li key={value}>{value}</li>;
          })}
        </ul>
      </div>
    );
  };

  const onFieldsChange = () => {
    findErrorTabs();
  };

  /*
   * Save
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

  /*
   * save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        setFieldsChanged(false);
        history.push("/profile/create/step/7");
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

  /*
   * Finish
   *
   * redirect to profile
   */
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
  };

  /*
   * Get Tab Title
   *
   * Get formatted tab title base on existence of error in the contained form
   */
  const getTabTitle = ({ message, errorBool }) => {
    if (errorBool) {
      return <div style={{ color: "red" }}>{message}</div>;
    }
    return message;
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

  /*
   * Get form header
   *
   * Generates the form header (title)
   */
  const getFormHeader = () => {
    if (formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          6. <FormattedMessage id="profile.employee.growth.interests" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="profile.employee.growth.interests" />
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
        <Popover
          content={
            <div>
              <FormattedMessage id="tooltip.extra.info.help" />
              <Link to="/about/help">
                <FormattedMessage id="footer.contact.link" />
              </Link>
            </div>
          }
        >
          <InfoCircleOutlined style={styles.infoIcon} />
        </Popover>
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
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          form={form}
          initialValues={savedValues || getInitialValues(profileInfo)}
          layout="vertical"
          onValuesChange={checkIfFormValuesChanged}
          onFieldsChange={onFieldsChange}
        >
          <Tabs type="card" defaultActiveKey={currentTab}>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="profile.learning.development" />,
                errorBool: tabErrorsBool["learningDevelopment"],
              })}
              key="learning-development"
            >
              {/* *************** Developmental ************** */}
              {getSectionHeader(
                "setup.developmental.goals",
                "developmentalGoals"
              )}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    className="custom-bubble-select-style"
                    name="developmentalGoals"
                  >
                    <TreeSelect
                      className="custom-bubble-select-style"
                      treeData={developmentalGoalOptions}
                      treeCheckable
                      showCheckedStrategy={SHOW_CHILD}
                      placeholder={<FormattedMessage id="setup.select" />}
                      treeNodeFilterProp="title"
                      showSearch
                      maxTagCount={15}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="setup.career.interests" />,
                errorBool: tabErrorsBool["careerInterests"],
              })}
              key="career-interests"
            >
              {/* *************** Career Interest ************** */}

              {getSectionHeader("setup.career.interests", "careerInterests")}
              {/* Form Row One: Remote Work */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="interestedInRemote"
                    label={
                      <FormattedMessage id="profile.interested.in.remote" />
                    }
                  >
                    <Select
                      showSearch
                      placeholder={<FormattedMessage id="setup.select" />}
                      allowClear
                      filterOption={filterOption}
                    >
                      {interestedInRemoteOptions.map(({ key, value, text }) => (
                        <Option key={key} value={value}>
                          {text}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Two: Relocation */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    className="custom-bubble-select-style"
                    name="relocationLocations"
                    label={
                      <FormattedMessage id="profile.willing.to.relocate.to" />
                    }
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder={<FormattedMessage id="setup.select" />}
                      filterOption={filterOption}
                    >
                      {relocationOptions.map((value) => {
                        return (
                          <Option key={value.id}>
                            {value.streetNumber} {value.streetName},{" "}
                            {value.city}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: new job */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="lookingForANewJobId"
                    label={
                      <FormattedMessage id="profile.looking.for.new.job" />
                    }
                  >
                    <Select
                      showSearch
                      placeholder={<FormattedMessage id="setup.select" />}
                      allowClear
                      filterOption={filterOption}
                    >
                      {lookingForNewJobOptions.map((value) => {
                        return (
                          <Option key={value.id}>{value.description}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={getTabTitle({
                message: (
                  <FormattedMessage id="setup.talent.management.title" />
                ),
                errorBool: tabErrorsBool["talentManagement"],
              })}
              key="talent-management"
            >
              {/* *************** Talent Management ************** */}

              <Row justify="space-between" align="middle">
                <Title level={3} style={styles.formTitle}>
                  <FormattedMessage id="setup.talent.management" />
                  <Popover
                    content={
                      <div>
                        <FormattedMessage id="profile.talent.management.tooltip" />
                        {locale === "ENGLISH" ? (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://icweb.ic.gc.ca/eic/site/078.nsf/eng/h_00075.html"
                          >
                            <FormattedMessage id="profile.talent.management.link" />
                          </a>
                        ) : (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://icweb.ic.gc.ca/eic/site/078.nsf/fra/h_00075.html"
                          >
                            <FormattedMessage id="profile.talent.management.link" />
                          </a>
                        )}
                      </div>
                    }
                  >
                    <ExclamationCircleOutlined style={styles.TMTooltip} />
                  </Popover>
                </Title>
                <CardVisibilityToggle
                  visibleCards={profileInfo.visibleCards}
                  cardName="talentManagement"
                  type="form"
                />
              </Row>
              {/* Form Row Three: career mobility */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="careerMobilityId"
                    label={<FormattedMessage id="profile.career.mobility" />}
                  >
                    <Select
                      showSearch
                      placeholder={<FormattedMessage id="setup.select" />}
                      allowClear
                      filterOption={filterOption}
                    >
                      {careerMobilityOptions.map((value) => {
                        return (
                          <Option key={value.id}>{value.description}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: talent matrix */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="talentMatrixResultId"
                    label={
                      <FormattedMessage id="profile.talent.matrix.result" />
                    }
                  >
                    <Select
                      showSearch
                      placeholder={<FormattedMessage id="setup.select" />}
                      allowClear
                      filterOption={filterOption}
                    >
                      {talentMatrixResultOptions.map((value) => {
                        return (
                          <Option key={value.id}>{value.description}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="profile.ex.feeder.title" />,
                errorBool: tabErrorsBool["exFeeder"],
              })}
              key="ex-feeder"
            >
              {/* Form Row Three: ex feeder */}
              {getSectionHeader("profile.ex.feeder.title", "exFeeder")}
              <Row style={styles.exFeeder} justify="space-between">
                <Col className="gutter-row">
                  <Form.Item name="exFeeder" valuePropName="checked">
                    <Checkbox>
                      <FormattedMessage id="profile.ex.feeder" />
                    </Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
          {/* Form Row Four: Submit button */}
          {getFormControlButtons(formType)}
        </Form>
      </div>
    </>
  );
};

PersonalGrowthFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  developmentalGoalOptions: KeyTitleOptionsPropType,
  savedDevelopmentalGoals: PropTypes.arrayOf(PropTypes.string),
  interestedInRemoteOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, text: PropTypes.string })
  ),
  relocationOptions: KeyTitleOptionsPropType,
  savedRelocationLocations: PropTypes.arrayOf(PropTypes.string),
  lookingForNewJobOptions: KeyTitleOptionsPropType,
  savedLookingForNewJob: PropTypes.string,
  careerMobilityOptions: KeyTitleOptionsPropType,
  savedCareerMobility: PropTypes.string,
  talentMatrixResultOptions: KeyTitleOptionsPropType,
  savedTalentMatrixResult: PropTypes.string,
  savedExFeederBool: PropTypes.bool,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  currentTab: PropTypes.string,
  load: PropTypes.bool.isRequired,
  intl: IntlPropType,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
};

PersonalGrowthFormView.defaultProps = {
  currentTab: null,
  careerMobilityOptions: [],
  developmentalGoalOptions: [],
  interestedInRemoteOptions: [],
  lookingForNewJobOptions: [],
  profileInfo: null,
  relocationOptions: [],
  savedCareerMobility: undefined,
  savedDevelopmentalGoals: [],
  savedExFeederBool: undefined,
  savedLookingForNewJob: undefined,
  savedRelocationLocations: [],
  savedTalentMatrixResult: undefined,
  talentMatrixResultOptions: [],
  intl: null,
};

export default injectIntl(PersonalGrowthFormView);

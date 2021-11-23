import { useCallback, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  notification,
  Row,
  Skeleton,
  Tabs,
} from "antd";
import { identity, isEqual, isNil, omitBy, pickBy } from "lodash";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import {
  HistoryPropType,
  KeyNameOptionsPropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
} from "../../../utils/customPropTypes";
import useAxios from "../../../utils/useAxios";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import Fieldset from "../../fieldset/Fieldset";
import CustomDropdown from "../../formItems/CustomDropdown";
import FormControlButton from "../formControlButtons/FormControlButtons";
import FormSubTitle from "../formSubTitle/FormSubTitle";
import FormTitle from "../formTitle/FormTitle";
import LinkAttachment from "../linkAttachment/LinkAttachment";
import QualifiedPoolsForm from "./qualifiedPoolsForm/QualifiedPoolsForm";

import "./CareerManagementFormView.less";

const { TabPane } = Tabs;

/**
 *  TalentFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const CareerManagementFormView = ({
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
  history,
  userId,
  attachmentOptions,
  savedAttachments,
  classificationOptions,
  savedQualifiedPools,
}) => {
  const [form] = Form.useForm();
  const intl = useIntl();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [selectedTab, setSelectedTab] = useState(1);
  const [tabErrorsBool, setTabErrorsBool] = useState({});
  const axios = useAxios();

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Values for tabs */
  const tabs = useMemo(
    () => ({
      1: "learning-development",
      2: "qualified-pools",
      3: "career-interests",
      4: "talent-management",
      5: "ex-feeder",
    }),
    []
  );
  const MAXTAB = 5;

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

    await axios.put(`profile/${userId}?language=${locale}`, values);
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
          message: intl.formatMessage({ id: "edit.save.success" }),
        });
        break;
      case "error":
        notification.error({
          description,
          message: intl.formatMessage({ id: "edit.save.error" }),
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({ id: "edit.save.problem" }),
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
        careerMobilityId: savedCareerMobility,
        developmentalGoals: savedDevelopmentalGoals,
        developmentalGoalsAttachments: savedAttachments,
        exFeeder: savedExFeederBool,
        interestedInRemote:
          profile.interestedInRemote === null
            ? undefined
            : profile.interestedInRemote,
        lookingForANewJobId: savedLookingForNewJob,
        qualifiedPools: savedQualifiedPools,
        relocationLocations: savedRelocationLocations,
        talentMatrixResultId: savedTalentMatrixResult,
      };
    }
    return {};
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * pickBy({}, identity) is used to omit falsey values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = () => {
    const formValues = pickBy(form.getFieldsValue(), identity);
    const dbValues = omitBy(
      savedValues || getInitialValues(profileInfo),
      isNil
    );

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
    if (formsWithErrorsList.qualifiedPools) {
      messages.push(intl.formatMessage({ id: "qualified.pools" }));
    }

    if (formsWithErrorsList.developmentalGoalsAttachments) {
      messages.push(intl.formatMessage({ id: "learning.development" }));
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
   * Save
   *
   * save and show success notification
   */
  const onSave = async () => {
    form
      .validateFields()
      .then(async () => {
        const values = form.getFieldValue();
        await saveDataToDB(values);
        setFieldsChanged(false);
        setSavedValues(values);
        window.location.reload(false);
        openNotificationWithIcon({ type: "success" });
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message", history);
        } else {
          openNotificationWithIcon({
            description: getAllValidationErrorMessages(findErrorTabs()),
            type: "error",
          });
        }
      });
  };

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
            description: getAllValidationErrorMessages(findErrorTabs()),
            type: "error",
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
      .then(async () => {
        const values = form.getFieldValue();
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
            description: getAllValidationErrorMessages(findErrorTabs()),
            type: "error",
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
  };

  /*
   * On Tab Change
   *
   * on change of tab of the form
   */
  const onTabChange = (activeTab) => {
    history.push(`/profile/edit/career-management?tab=${activeTab}`);
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
      /* If form data is loading then wait */
      <div className="pgf-skeleton">
        <Skeleton active />
      </div>
    );
  }

  /* Once data had loaded display form */
  return (
    <>
      <Prompt
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
        when={fieldsChanged}
      />
      <div className="pgf-content">
        {/* get form title */}
        <FormTitle
          fieldsChanged={fieldsChanged}
          formType={formType}
          stepNumber={7}
          title={<FormattedMessage id="employee.growth.interests" />}
        />
        <Divider className="pgf-headerDiv" />
        {/* Create for with initial values */}
        <Form
          form={form}
          initialValues={savedValues || getInitialValues(profileInfo)}
          layout="vertical"
          name="PersonalGrowth"
          onFieldsChange={onFieldsChange}
          onValuesChange={checkIfFormValuesChanged}
        >
          <Tabs
            activeKey={tabs[selectedTab]}
            onChange={onTabChange}
            type="card"
          >
            {/* ===== Developmental Goals Tab ===== */}
            <TabPane
              key="learning-development"
              tab={getTabTitle({
                errorBool: tabErrorsBool.developmentalGoalsAttachments,
                message: <FormattedMessage id="learning.development" />,
              })}
            >
              <FormSubTitle
                extra={
                  <CardVisibilityToggle
                    ariaLabel={intl.formatMessage({
                      id: "developmental.goals",
                    })}
                    cardName="developmentalGoals"
                    type="form"
                    visibleCards={profileInfo.visibleCards}
                  />
                }
                title={<FormattedMessage id="developmental.goals" />}
              />
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Form.Item
                    className="custom-bubble-select-style"
                    label={<FormattedMessage id="developmental.goals" />}
                    name="developmentalGoals"
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "developmental.goals",
                      })}
                      initialValueId={
                        getInitialValues(profileInfo).developmentalGoals
                      }
                      isGroupedOptions
                      isMulti
                      options={developmentalGoalOptions}
                      placeholderText={<FormattedMessage id="type.to.search" />}
                    />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Fieldset
                    title={<FormattedMessage id="supporting.document" />}
                  >
                    <Form.List name="developmentalGoalsAttachments">
                      {(fields, { add, remove }) => (
                        <div>
                          {fields.map((field) => (
                            <LinkAttachment
                              key={field.fieldKey}
                              attachmentNameDefault={form.getFieldValue([
                                "developmentalGoalsAttachments",
                                field.fieldKey,
                                "nameId",
                              ])}
                              attachmentNamesOptions={attachmentOptions}
                              fieldElement={field}
                              removeElement={remove}
                            />
                          ))}
                          <Form.Item>
                            <Button
                              disabled={fields.length === 6}
                              onClick={() => add()}
                              style={{
                                width: "100%",
                              }}
                              type="dashed"
                            >
                              <PlusOutlined
                                aria-hidden="true"
                                className="mr-1"
                              />
                              <FormattedMessage id="supporting.document.add" />
                            </Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </Fieldset>
                </Col>
              </Row>
            </TabPane>

            {/* ===== Qualified Pools Tab ===== */}
            <TabPane
              key="qualified-pools"
              tab={getTabTitle({
                errorBool: tabErrorsBool.qualifiedPools,
                message: <FormattedMessage id="qualified.pools" />,
              })}
            >
              <FormSubTitle
                extra={
                  <CardVisibilityToggle
                    ariaLabel={intl.formatMessage({
                      id: "qualified.pools",
                    })}
                    cardName="qualifiedPools"
                    type="form"
                    visibleCards={profileInfo.visibleCards}
                  />
                }
                title={<FormattedMessage id="qualified.pools" />}
              />
              <Row gutter={24}>
                <Col
                  className="qual-gutter-row"
                  lg={24}
                  md={24}
                  xl={24}
                  xs={24}
                >
                  <Form.List name="qualifiedPools">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <QualifiedPoolsForm
                            key={field.fieldKey}
                            classificationOptions={classificationOptions}
                            fieldElement={field}
                            form={form}
                            removeElement={remove}
                            savedQualifiedPools={savedQualifiedPools}
                          />
                        ))}
                        <Form.Item>
                          {/* add qualified pools field button */}
                          <Button
                            disabled={fields.length === 3}
                            onClick={() => add()}
                            style={{ width: "100%" }}
                            type="dashed"
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

            {/* ===== Job Mobility Tab ===== */}
            <TabPane
              key="career-interests"
              tab={getTabTitle({
                message: <FormattedMessage id="career.interests" />,
              })}
            >
              <FormSubTitle
                extra={
                  <CardVisibilityToggle
                    ariaLabel={intl.formatMessage({
                      id: "career.interests",
                    })}
                    cardName="careerInterests"
                    type="form"
                    visibleCards={profileInfo.visibleCards}
                  />
                }
                title={<FormattedMessage id="career.interests" />}
              />
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Form.Item
                    label={<FormattedMessage id="edit.interested.in.remote" />}
                    name="interestedInRemote"
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "edit.interested.in.remote",
                      })}
                      initialValueId={
                        getInitialValues(profileInfo).interestedInRemote
                      }
                      isSearchable={false}
                      options={interestedInRemoteOptions}
                      placeholderText={<FormattedMessage id="select" />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Two: Relocation */}
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Form.Item
                    className="custom-bubble-select-style"
                    label={
                      <FormattedMessage id="edit.willing.to.relocate.to" />
                    }
                    name="relocationLocations"
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "edit.willing.to.relocate.to",
                      })}
                      initialValueId={savedRelocationLocations}
                      isMulti
                      isSearchable
                      options={relocationOptions}
                      placeholderText={<FormattedMessage id="type.to.search" />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: new job */}
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Form.Item
                    label={<FormattedMessage id="edit.looking.for.new.job" />}
                    name="lookingForANewJobId"
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "edit.looking.for.new.job",
                      })}
                      initialValueId={
                        getInitialValues(profileInfo).lookingForANewJobId
                      }
                      isSearchable={false}
                      options={lookingForNewJobOptions}
                      placeholderText={<FormattedMessage id="select" />}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* ===== Talent Management Tab ===== */}
            <TabPane
              key="talent-management"
              tab={getTabTitle({
                message: <FormattedMessage id="talent.management" />,
              })}
            >
              <FormSubTitle
                extra={
                  <CardVisibilityToggle
                    ariaLabel={intl.formatMessage({
                      id: "talent.management",
                    })}
                    cardName="talentManagement"
                    type="form"
                    visibleCards={profileInfo.visibleCards}
                  />
                }
                popoverMessage={
                  <>
                    <FormattedMessage id="talent.management.tooltip" />
                    {locale === "ENGLISH" ? (
                      <a
                        href="http://icweb.ic.gc.ca/eic/site/078.nsf/eng/h_00075.html"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FormattedMessage id="talent.management.link" />
                      </a>
                    ) : (
                      <a
                        href="http://icweb.ic.gc.ca/eic/site/078.nsf/fra/h_00075.html"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FormattedMessage id="talent.management.link" />
                      </a>
                    )}
                  </>
                }
                title={<FormattedMessage id="talent.management" />}
              />

              {/* Form Row Three: career mobility */}
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Form.Item
                    label={<FormattedMessage id="career.mobility" />}
                    name="careerMobilityId"
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "career.mobility",
                      })}
                      initialValueId={
                        getInitialValues(profileInfo).careerMobilityId
                      }
                      isSearchable={false}
                      options={careerMobilityOptions}
                      placeholderText={<FormattedMessage id="select" />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: talent matrix */}
              <Row gutter={24}>
                <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
                  <Form.Item
                    label={<FormattedMessage id="talent.matrix.result" />}
                    name="talentMatrixResultId"
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "talent.matrix.result",
                      })}
                      initialValueId={
                        getInitialValues(profileInfo).talentMatrixResultId
                      }
                      isSearchable={false}
                      options={talentMatrixResultOptions}
                      placeholderText={<FormattedMessage id="select" />}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* ===== Talent Management Tab ===== */}
            <TabPane
              key="ex-feeder"
              tab={getTabTitle({
                message: <FormattedMessage id="ex.feeder" />,
              })}
            >
              {/* Form Row Three: ex feeder */}
              <FormSubTitle
                extra={
                  <CardVisibilityToggle
                    ariaLabel={intl.formatMessage({
                      id: "ex.feeder",
                    })}
                    cardName="exFeeder"
                    type="form"
                    visibleCards={profileInfo.visibleCards}
                  />
                }
                title={<FormattedMessage id="ex.feeder" />}
              />
              <Row className="pgf-exFeeder" justify="space-between">
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
          <FormControlButton
            fieldsChanged={fieldsChanged}
            formType={formType}
            onFinish={onFinish}
            onReset={onReset}
            onSave={onSave}
            onSaveAndFinish={onSaveAndFinish}
            onSaveAndNext={selectedTab < MAXTAB ? onSaveAndNext : null}
            visibleCards={profileInfo.visibleCards}
          />
        </Form>
      </div>
    </>
  );
};

CareerManagementFormView.propTypes = {
  attachmentOptions: KeyNameOptionsPropType.isRequired,
  careerMobilityOptions: KeyTitleOptionsPropType,
  classificationOptions: KeyNameOptionsPropType,
  currentTab: PropTypes.string,
  developmentalGoalOptions: KeyTitleOptionsPropType,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  history: HistoryPropType.isRequired,
  interestedInRemoteOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, text: PropTypes.string })
  ),
  load: PropTypes.bool.isRequired,
  lookingForNewJobOptions: KeyTitleOptionsPropType,
  profileInfo: ProfileInfoPropType,
  relocationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string,
      id: PropTypes.string,
      province: PropTypes.string,
    })
  ),
  savedAttachments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      nameId: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  savedCareerMobility: PropTypes.string,
  savedDevelopmentalGoals: PropTypes.arrayOf(PropTypes.string),
  savedExFeederBool: PropTypes.bool,
  savedLookingForNewJob: PropTypes.string,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      classificationId: PropTypes.string,
      id: PropTypes.string,
      jobPosterLink: PropTypes.string,
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
    })
  ),
  savedRelocationLocations: PropTypes.arrayOf(PropTypes.string),
  savedTalentMatrixResult: PropTypes.string,
  talentMatrixResultOptions: KeyTitleOptionsPropType,
  userId: PropTypes.string.isRequired,
};

CareerManagementFormView.defaultProps = {
  careerMobilityOptions: [],
  classificationOptions: [],
  currentTab: null,
  developmentalGoalOptions: [],
  interestedInRemoteOptions: [],
  lookingForNewJobOptions: [],
  profileInfo: null,
  relocationOptions: [],
  savedAttachments: undefined,
  savedCareerMobility: undefined,
  savedDevelopmentalGoals: [],
  savedExFeederBool: undefined,
  savedLookingForNewJob: undefined,
  savedQualifiedPools: undefined,
  savedRelocationLocations: [],
  savedTalentMatrixResult: undefined,
  talentMatrixResultOptions: [],
};

export default CareerManagementFormView;

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
  TreeSelect,
} from "antd";
import { identity, isEqual, isNil, omitBy, pickBy } from "lodash";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router";
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

const { SHOW_CHILD } = TreeSelect;
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
          message: intl.formatMessage({ id: "edit.save.success" }),
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
        developmentalGoals: savedDevelopmentalGoals,
        developmentalGoalsAttachments: savedAttachments,
        interestedInRemote:
          profile.interestedInRemote === null
            ? undefined
            : profile.interestedInRemote,
        relocationLocations: savedRelocationLocations,
        lookingForANewJobId: savedLookingForNewJob,
        careerMobilityId: savedCareerMobility,
        talentMatrixResultId: savedTalentMatrixResult,
        exFeeder: savedExFeederBool,
        qualifiedPools: savedQualifiedPools,
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
        when={fieldsChanged}
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
      />
      <div className="pgf-content">
        {/* get form title */}
        <FormTitle
          title={<FormattedMessage id="employee.growth.interests" />}
          formType={formType}
          stepNumber={7}
          fieldsChanged={fieldsChanged}
        />
        <Divider className="pgf-headerDiv" />
        {/* Create for with initial values */}
        <Form
          name="PersonalGrowth"
          form={form}
          initialValues={savedValues || getInitialValues(profileInfo)}
          layout="vertical"
          onValuesChange={checkIfFormValuesChanged}
          onFieldsChange={onFieldsChange}
        >
          <Tabs
            type="card"
            activeKey={tabs[selectedTab]}
            onChange={onTabChange}
          >
            {/* ===== Developmental Goals Tab ===== */}
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="learning.development" />,
                errorBool: tabErrorsBool.developmentalGoalsAttachments,
              })}
              key="learning-development"
            >
              <FormSubTitle
                title={<FormattedMessage id="developmental.goals" />}
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="developmentalGoals"
                    type="form"
                    ariaLabel={intl.formatMessage({
                      id: "developmental.goals",
                    })}
                  />
                }
              />
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    className="custom-bubble-select-style"
                    name="developmentalGoals"
                    label={<FormattedMessage id="developmental.goals" />}
                  >
                    <TreeSelect
                      className="custom-bubble-select-style"
                      treeData={developmentalGoalOptions}
                      treeCheckable
                      showCheckedStrategy={SHOW_CHILD}
                      placeholder={<FormattedMessage id="search" />}
                      treeNodeFilterProp="title"
                      showSearch
                      maxTagCount={15}
                    />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Fieldset
                    title={<FormattedMessage id="supporting.document" />}
                  >
                    <Form.List name="developmentalGoalsAttachments">
                      {(fields, { add, remove }) => (
                        <div>
                          {fields.map((field) => (
                            <LinkAttachment
                              key={field.fieldKey}
                              fieldElement={field}
                              removeElement={remove}
                              attachmentNamesOptions={attachmentOptions}
                              attachmentNameDefault={form.getFieldValue([
                                "developmentalGoalsAttachments",
                                field.fieldKey,
                                "nameId",
                              ])}
                            />
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              disabled={fields.length === 6}
                              style={{
                                width: "100%",
                              }}
                            >
                              <PlusOutlined
                                className="mr-1"
                                aria-hidden="true"
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
              tab={getTabTitle({
                message: <FormattedMessage id="qualified.pools" />,
                errorBool: tabErrorsBool.qualifiedPools,
              })}
              key="qualified-pools"
            >
              <FormSubTitle
                title={<FormattedMessage id="qualified.pools" />}
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="qualifiedPools"
                    type="form"
                    ariaLabel={intl.formatMessage({
                      id: "qualified.pools",
                    })}
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
                  <Form.List name="qualifiedPools">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field) => (
                          <QualifiedPoolsForm
                            key={field.fieldKey}
                            form={form}
                            fieldElement={field}
                            removeElement={remove}
                            savedQualifiedPools={savedQualifiedPools}
                            classificationOptions={classificationOptions}
                          />
                        ))}
                        <Form.Item>
                          {/* add qualified pools field button */}
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

            {/* ===== Job Mobility Tab ===== */}
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="career.interests" />,
              })}
              key="career-interests"
            >
              <FormSubTitle
                title={<FormattedMessage id="career.interests" />}
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="careerInterests"
                    type="form"
                    ariaLabel={intl.formatMessage({
                      id: "career.interests",
                    })}
                  />
                }
              />
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="interestedInRemote"
                    label={<FormattedMessage id="edit.interested.in.remote" />}
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "edit.interested.in.remote",
                      })}
                      initialValueId={form.getFieldValue("interestedInRemote")}
                      placeholderText={<FormattedMessage id="select" />}
                      isSearchable={false}
                      options={interestedInRemoteOptions}
                    />
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
                      <FormattedMessage id="edit.willing.to.relocate.to" />
                    }
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "edit.willing.to.relocate.to",
                      })}
                      initialValueId={form.getFieldValue("relocationLocations")}
                      placeholderText={<FormattedMessage id="type.to.search" />}
                      isSearchable
                      options={relocationOptions}
                      isMulti
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: new job */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="lookingForANewJobId"
                    label={<FormattedMessage id="edit.looking.for.new.job" />}
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "edit.looking.for.new.job",
                      })}
                      initialValueId={form.getFieldValue("lookingForANewJobId")}
                      placeholderText={<FormattedMessage id="select" />}
                      isSearchable={false}
                      options={lookingForNewJobOptions}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* ===== Talent Management Tab ===== */}
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="talent.management" />,
              })}
              key="talent-management"
            >
              <FormSubTitle
                title={<FormattedMessage id="talent.management" />}
                popoverMessage={
                  <>
                    <FormattedMessage id="talent.management.tooltip" />
                    {locale === "ENGLISH" ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://icweb.ic.gc.ca/eic/site/078.nsf/eng/h_00075.html"
                      >
                        <FormattedMessage id="talent.management.link" />
                      </a>
                    ) : (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://icweb.ic.gc.ca/eic/site/078.nsf/fra/h_00075.html"
                      >
                        <FormattedMessage id="talent.management.link" />
                      </a>
                    )}
                  </>
                }
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="talentManagement"
                    type="form"
                    ariaLabel={intl.formatMessage({
                      id: "talent.management",
                    })}
                  />
                }
              />

              {/* Form Row Three: career mobility */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="careerMobilityId"
                    label={<FormattedMessage id="career.mobility" />}
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "career.mobility",
                      })}
                      initialValueId={form.getFieldValue("careerMobilityId")}
                      placeholderText={<FormattedMessage id="select" />}
                      isSearchable={false}
                      options={careerMobilityOptions}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: talent matrix */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="talentMatrixResultId"
                    label={<FormattedMessage id="talent.matrix.result" />}
                  >
                    <CustomDropdown
                      ariaLabel={intl.formatMessage({
                        id: "talent.matrix.result",
                      })}
                      initialValueId={form.getFieldValue(
                        "talentMatrixResultId"
                      )}
                      placeholderText={<FormattedMessage id="select" />}
                      options={talentMatrixResultOptions}
                      isSearchable={false}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* ===== Talent Management Tab ===== */}
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="ex.feeder" />,
              })}
              key="ex-feeder"
            >
              {/* Form Row Three: ex feeder */}
              <FormSubTitle
                title={<FormattedMessage id="ex.feeder" />}
                extra={
                  <CardVisibilityToggle
                    visibleCards={profileInfo.visibleCards}
                    cardName="exFeeder"
                    type="form"
                    ariaLabel={intl.formatMessage({
                      id: "ex.feeder",
                    })}
                  />
                }
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
            formType={formType}
            onSave={onSave}
            onSaveAndFinish={onSaveAndFinish}
            onSaveAndNext={selectedTab < MAXTAB ? onSaveAndNext : null}
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

CareerManagementFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  developmentalGoalOptions: KeyTitleOptionsPropType,
  savedDevelopmentalGoals: PropTypes.arrayOf(PropTypes.string),
  interestedInRemoteOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, text: PropTypes.string })
  ),
  relocationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
    })
  ),
  savedRelocationLocations: PropTypes.arrayOf(PropTypes.string),
  lookingForNewJobOptions: KeyTitleOptionsPropType,
  savedLookingForNewJob: PropTypes.string,
  careerMobilityOptions: KeyTitleOptionsPropType,
  savedCareerMobility: PropTypes.string,
  talentMatrixResultOptions: KeyTitleOptionsPropType,
  savedTalentMatrixResult: PropTypes.string,
  savedExFeederBool: PropTypes.bool,
  classificationOptions: KeyNameOptionsPropType,
  savedQualifiedPools: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      classificationId: PropTypes.string,
      jobTitle: PropTypes.string,
      selectionProcessNumber: PropTypes.string,
      jobPosterLink: PropTypes.string,
    })
  ),
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  currentTab: PropTypes.string,
  load: PropTypes.bool.isRequired,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
  attachmentOptions: KeyNameOptionsPropType.isRequired,
  savedAttachments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      nameId: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

CareerManagementFormView.defaultProps = {
  currentTab: null,
  careerMobilityOptions: [],
  developmentalGoalOptions: [],
  interestedInRemoteOptions: [],
  lookingForNewJobOptions: [],
  classificationOptions: [],
  profileInfo: null,
  relocationOptions: [],
  savedCareerMobility: undefined,
  savedDevelopmentalGoals: [],
  savedExFeederBool: undefined,
  savedLookingForNewJob: undefined,
  savedRelocationLocations: [],
  savedTalentMatrixResult: undefined,
  savedQualifiedPools: undefined,
  talentMatrixResultOptions: [],
  savedAttachments: undefined,
};

export default CareerManagementFormView;

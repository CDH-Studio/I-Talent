import React, { useState } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Checkbox,
  Popover,
  TreeSelect,
  Tabs,
  notification,
} from "antd";
import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { isEqual, isNil, pickBy, omitBy, identity } from "lodash";
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
import FormControlButton from "../formControlButtons/FormControlButtons";

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
  const axios = useAxios();

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Component Styles */
  const styles = {
    skeleton: {
      width: "100%",
      maxWidth: "900px",
      minHeight: "324px",
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
   * Save
   *
   * save and show success notification
   */
  const onSave = async () => {
    form
      .validateFields()
      .then(async () => {
        const values = form.getFieldValue();
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
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
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
      message: intl.formatMessage({ id: "profile.form.clear" }),
    });
    checkIfFormValuesChanged();
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
  const getFormHeader = () => {
    if (formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          7. <FormattedMessage id="profile.employee.growth.interests" />
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
        >
          <Tabs type="card" defaultActiveKey={currentTab}>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="profile.learning.development" />,
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
                      <FormattedMessage id="profile.edit.interested.in.remote" />
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
                      <FormattedMessage id="profile.edit.willing.to.relocate.to" />
                    }
                  >
                    <Select
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder={<FormattedMessage id="setup.select" />}
                      filterOption={filterOption}
                      options={relocationOptions.map((value) => ({
                        label: `${value.city}, ${value.province}`,
                        value: value.id,
                      }))}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Form Row Three: new job */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <Form.Item
                    name="lookingForANewJobId"
                    label={
                      <FormattedMessage id="profile.edit.looking.for.new.job" />
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

PersonalGrowthFormView.propTypes = {
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

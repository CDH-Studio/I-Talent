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
  Checkbox,
  message,
  Popover,
} from "antd";
import { useHistory } from "react-router-dom";
import {
  RightOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import PropTypes from "prop-types";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  IntlPropType,
} from "../../../customPropTypes";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";

import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;

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
    TMTooltip: { paddingLeft: "5px" },
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };
    // set cleared field to null to clear DB data
    values.interestedInRemote = values.interestedInRemote
      ? values.interestedInRemote
      : null;
    values.lookingForNewJob = values.lookingForNewJob
      ? values.lookingForNewJob
      : null;
    values.careerMobility = values.careerMobility
      ? values.careerMobility
      : null;
    values.talentMatrixResult = values.talentMatrixResult
      ? values.talentMatrixResult
      : null;

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
        message.error(
          intl.formatMessage({ id: "profile.edit.save.error" })
        );
        break;
      default:
        message.warning(
          intl.formatMessage({ id: "profile.edit.save.problem" })
        );
        break;
    }
  };

  /* save and show success notification */
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
   * save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/7");
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("validation failure");
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
        history.push("/secured/profile/create/step/8");
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
              style={styles.clearBtn}
              htmlType="button"
              onClick={onReset}
              danger
            >
              <FormattedMessage id="button.clear" />
            </Button>
          </Col>
          <Col xs={24} md={24} lg={6} xl={6}>
            <Button style={styles.saveBtn} type="primary" onClick={onSave}>
              <FormattedMessage id="setup.save" />
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
      </Title>
    );
  };

  /*
   * Get the initial values for the form
   *
   */
  const getInitialValues = (profile) => {
    const hasRequiredProps = () => {
      return (
        savedDevelopmentalGoals !== undefined &&
        savedRelocationLocations !== undefined &&
        // TODO: decide how to alter props so unset savedLookingForNewJob isn't the same as undefined prop
        // savedLookingForNewJob !== undefined &&
        savedCareerMobility !== undefined &&
        savedTalentMatrixResult !== undefined &&
        savedExFeederBool !== undefined
      );
    };

    if (profile && hasRequiredProps()) {
      return {
        developmentalGoals: savedDevelopmentalGoals,
        interestedInRemote: profile.interestedInRemote
          ? profile.interestedInRemote.toString()
          : undefined,
        relocationLocations: savedRelocationLocations,
        lookingForNewJob: savedLookingForNewJob,
        careerMobility: savedCareerMobility,
        talentMatrixResult: savedTalentMatrixResult,
        exFeeder: savedExFeederBool,
      };
    }
    return {};
  };

  /* TODO: check if user has a skills to mentor 
  useEffect(() => {
  }, []);
  */

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
        form={form}
        initialValues={getInitialValues(profileInfo)}
        layout="vertical"
      >
        {/* *************** Developmental ************** */}
        {/* Form Row One: Developmental Goals */}
        <Title level={3} style={styles.formTitle}>
          <FormattedMessage id="setup.developmental.goals" />
        </Title>
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              className="custom-bubble-select-style"
              name="developmentalGoals"
              label={
                <FormLabelTooltip
                  labelText={
                    <FormattedMessage id="setup.developmental.goals" />
                  }
                  tooltipText="Extra information"
                />
              }
            >
              <Select
                mode="multiple"
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                style={{ width: "100%" }}
              >
                {developmentalGoalOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* *************** Career Interest ************** */}
        <Divider style={styles.headerDiv} />
        <Title level={3} style={styles.formTitle}>
          <FormattedMessage id="setup.career.interests" />
        </Title>
        {/* Form Row One: Remote Work */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="interestedInRemote"
              label={<FormattedMessage id="profile.interested.in.remote" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
              >
                {interestedInRemoteOptions.map((value) => {
                  return <Option key={value.key}>{value.text}</Option>;
                })}
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
                <FormLabelTooltip
                  labelText={
                    <FormattedMessage id="profile.willing.to.relocate.to" />
                  }
                  tooltipText="Extra information"
                />
              }
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder={<FormattedMessage id="setup.select" />}
                optionFilterProp="children"
              >
                {relocationOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Form Row Three: new job */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="lookingForNewJob"
              label={<FormattedMessage id="profile.looking.for.new.job" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
              >
                {lookingForNewJobOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* *************** Talent Management ************** */}
        <Divider style={styles.headerDiv} />
        <Title level={3} style={styles.formTitle}>
          <FormattedMessage id="setup.talent.management" />
          <Popover
            content={
              <div>
                <FormattedMessage id="profile.talent.management.tooltip" />
                <a href="http://icintra.ic.gc.ca/eforms/forms/ISED-ISDE3730E.pdf">
                  Talent Management Tool
                </a>
              </div>
            }
            trigger="hover"
          >
            <ExclamationCircleOutlined style={styles.TMTooltip} />
          </Popover>
        </Title>

        {/* Form Row Three: career mobility */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="careerMobility"
              label={<FormattedMessage id="profile.career.mobility" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
              >
                {careerMobilityOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Form Row Three: talent matrix */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="talentMatrixResult"
              label={<FormattedMessage id="profile.talent.matrix.result" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
              >
                {talentMatrixResultOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Form Row Three: ex feeder */}
        <Row gutter={24} style={{ marginBottom: "15px" }}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item name="exFeeder" valuePropName="checked">
              <Checkbox>
                <FormattedMessage id="profile.ex.feeder" />
              </Checkbox>
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

PersonalGrowthFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  developmentalGoalOptions: KeyTitleOptionsPropType,
  savedDevelopmentalGoals: PropTypes.arrayOf(PropTypes.string),
  interestedInRemoteOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.bool, text: PropTypes.string })
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
  load: PropTypes.bool.isRequired,
  intl: IntlPropType,
};

PersonalGrowthFormView.defaultProps = {
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

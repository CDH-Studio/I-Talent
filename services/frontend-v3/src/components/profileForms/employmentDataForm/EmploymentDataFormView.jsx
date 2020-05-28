import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Input,
  Switch,
  DatePicker,
  Checkbox,
  Button,
  message,
} from "antd";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  IntlPropType,
} from "../../../customPropTypes";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title, Text } = Typography;

/**
 *  EmploymentDataFormView(props)
 *  this component renders the employment information form.
 *  It contains a toggle to set the acting role
 */
const EmploymentDataFormView = (props) => {
  const {
    classificationOptions,
    formType,
    load,
    profileInfo,
    securityOptions,
    substantiveOptions,
    intl,
  } = props;

  const history = useHistory();
  const [form] = Form.useForm();
  const [displayActingRoleForm, setDisplayActingRoleForm] = useState(false);
  const [enableEndDate, setEnableEndDate] = useState();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);

  /* Component Styles */
  const styles = {
    skeleton: {
      minHeight: "400px",
      maxWidth: "900px",
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
    tempRoleRow: {
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
    datePicker: { width: "100%" },
    saveBtn: {
      float: "right",
      marginBottom: "1rem",
      width: "100%",
    },
    unsavedText: {
      marginLeft: "10px",
      fontWeight: "normal",
      fontStyle: "italic",
      opacity: 0.5,
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="profile.rules.max.50" />,
    },
  };

  /* Save data */
  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };
    // If dropdown value is undefined then clear value in DB
    values.tenureId = values.tenureId ? values.tenureId : null;
    values.groupLevelId = values.groupLevelId ? values.groupLevelId : null;
    values.securityClearanceId = values.securityClearanceId
      ? values.securityClearanceId
      : null;

    if (!displayActingRoleForm) {
      // if temp role toggle isn't active clear data
      values.actingId = null;
      values.actingStartDate = null;
      values.actingEndDate = null;
    } else {
      // format dates before submit
      if (values.actingStartDate) {
        values.actingStartDate = values.actingStartDate.startOf("day");
      }
      if (values.actingEndDate) {
        values.actingEndDate = values.actingEndDate.endOf("day");
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

  /* toggle temporary role form */
  const toggleTempRoleForm = () => {
    setDisplayActingRoleForm(!displayActingRoleForm);
  };

  /* enable or disable end date field */
  const toggleTempEndDate = () => {
    // reset end date value
    if (enableEndDate) {
      form.setFieldsValue({
        actingEndDate: null,
      });
    }
    setEnableEndDate(!enableEndDate);
  };

  /* Disable all dates before start date */
  const disabledDatesBeforeStart = (current) => {
    if (form.getFieldValue("actingStartDate")) {
      return current && current < moment(form.getFieldValue("actingStartDate"));
    }
    return undefined;
  };

  /* Disable all dates after end date */
  const disabledDatesAfterEnd = (current) => {
    if (form.getFieldValue("actingEndDate")) {
      return current && current > moment(form.getFieldValue("actingEndDate"));
    }
    return undefined;
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

  /* Get the initial values for the form */
  const getInitialValues = (profile) => {
    if (profile) {
      return {
        groupLevelId: profile.classification.id
          ? profile.classification.id
          : undefined,
        tenureId: profile.temporaryRole.id
          ? profile.temporaryRole.id
          : undefined,
        securityClearanceId: profile.security.id
          ? profile.security.id
          : undefined,
        manager: profile.manager,
        actingId: profile.acting.id ? profile.acting.id : undefined,
        actingStartDate: profile.actingPeriodStartDate
          ? moment(profile.actingPeriodStartDate)
          : undefined,
        actingEndDate: profile.actingPeriodEndDate
          ? moment(profile.actingPeriodEndDate)
          : undefined,
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
    const dbValues = _.pickBy(
      savedValues || getInitialValues(profileInfo),
      _.identity
    );

    setFieldsChanged(!_.isEqual(formValues, dbValues));
  };

  /* save and show success notification */
  const onSave = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setFieldsChanged(false);
        setSavedValues(values);
        await saveDataToDB(values);
        openNotificationWithIcon("success");
      })
      .catch(() => {
        openNotificationWithIcon("error");
      });
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/4");
      })
      .catch(() => {
        openNotificationWithIcon("error");
      });
  };

  // redirect to profile
  const onFinish = () => {
    history.push(`/secured/profile/${localStorage.getItem("userId")}`);
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        if (formType === "create") {
          history.push("/secured/profile/create/step/8");
        } else {
          onFinish();
        }
      })
      .catch(() => {
        openNotificationWithIcon("error");
      });
  };

  /* on form reset */
  const onReset = () => {
    // reset form fields
    form.resetFields();

    // check if user has acting information in db to expand acting form
    setDisplayActingRoleForm(
      profileInfo && profileInfo.acting && !!profileInfo.acting.id
    );

    message.info(intl.formatMessage({ id: "profile.form.clear" }));
    checkIfFormValuesChanged();
  };

  /* Get temporary role form based on if the form switch is toggled */
  const getTempRoleForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <Row gutter={24} style={{ marginTop: "10px" }}>
          <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
            <Form.Item
              name="actingId"
              label={<FormattedMessage id="profile.acting" />}
              rules={[Rules.required]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {classificationOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={6} xl={6}>
            <Form.Item
              name="actingStartDate"
              label={<FormattedMessage id="profile.acting.period.start.date" />}
              rules={[Rules.required]}
            >
              <DatePicker
                disabledDate={disabledDatesAfterEnd}
                style={styles.datePicker}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={6} xl={6}>
            <Form.Item
              name="actingEndDate"
              label={<FormattedMessage id="profile.acting.period.end.date" />}
              rules={enableEndDate ? [Rules.required] : undefined}
            >
              <DatePicker
                style={styles.datePicker}
                disabledDate={disabledDatesBeforeStart}
                disabled={!enableEndDate}
                placeholder="unknown"
              />
            </Form.Item>
            <div style={{ marginTop: "-10px" }}>
              <Checkbox
                onChange={toggleTempEndDate}
                defaultChecked={enableEndDate}
              >
                <FormattedMessage id="profile.acting.has.end.date" />
              </Checkbox>
            </div>
          </Col>
        </Row>
      );
    }
    return <div />;
  };

  /* Generate form header based on form type */
  const getFormHeader = (_formType) => {
    if (_formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          3. <FormattedMessage id="setup.employment" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="setup.employment" />
        {fieldsChanged && <Text style={styles.unsavedText}>(unsaved)</Text>}
      </Title>
    );
  };

  useEffect(() => {
    /* check if user has acting information in db to expand acting form */
    setDisplayActingRoleForm(
      profileInfo && profileInfo.acting && !!profileInfo.acting.id
    );

    /* check if user has acting end date to enable the date felid on load */
    setEnableEndDate(
      profileInfo ? Boolean(profileInfo.actingPeriodEndDate) : false
    );

    // if props change then reset form fields
    if (load) {
      form.resetFields();
    }
  }, [load, form, profileInfo]);

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
        initialValues={savedValues || getInitialValues(profileInfo)}
        layout="vertical"
        onValuesChange={checkIfFormValuesChanged}
      >
        {/* Form Row One */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="tenureId"
              label={<FormattedMessage id="profile.substantive" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {substantiveOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="groupLevelId"
              label={<FormattedMessage id="profile.classification" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {classificationOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* Form Row Two */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="securityClearanceId"
              label={<FormattedMessage id="profile.security" />}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {securityOptions.map((value) => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* Form Row Three */}
        <Row gutter={24}>
          <Col className="gutter-row" span={24}>
            <Form.Item
              name="manager"
              label={<FormattedMessage id="profile.manager" />}
              rules={[Rules.maxChar50]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Form Row Four: Temporary role */}
        <Row style={styles.tempRoleRow} gutter={24}>
          <Col className="gutter-row" span={24}>
            <FormLabelTooltip
              labelText={<FormattedMessage id="profile.temporary.role" />}
              tooltipText="Extra information"
            />
            <Switch
              checked={displayActingRoleForm}
              onChange={toggleTempRoleForm}
            />
            {getTempRoleForm(displayActingRoleForm)}
          </Col>
        </Row>
        {getFormControlButtons(formType)}
      </Form>
    </div>
  );
};

EmploymentDataFormView.propTypes = {
  classificationOptions: KeyTitleOptionsPropType,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  load: PropTypes.bool.isRequired,
  profileInfo: ProfileInfoPropType,
  securityOptions: KeyTitleOptionsPropType,
  substantiveOptions: KeyTitleOptionsPropType,
  intl: IntlPropType,
};

EmploymentDataFormView.defaultProps = {
  classificationOptions: [],
  securityOptions: [],
  substantiveOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(EmploymentDataFormView);

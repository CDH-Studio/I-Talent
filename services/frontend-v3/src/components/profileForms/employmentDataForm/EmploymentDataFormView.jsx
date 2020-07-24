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
  Popover,
} from "antd";
import PropTypes from "prop-types";
import {
  RightOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import _ from "lodash";
import { useSelector } from "react-redux";
import { Prompt } from "react-router";
import { Link } from "react-router-dom";
import axios from "../../../axios-instance";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  IntlPropType,
  HistoryPropType,
} from "../../../customPropTypes";
import handleError from "../../../functions/handleError";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";

const { Option } = Select;
const { Title, Text } = Typography;

/**
 *  EmploymentDataFormView(props)
 *  this component renders the employment information form.
 *  It contains a toggle to set the acting role
 */
const EmploymentDataFormView = ({
  classificationOptions,
  formType,
  load,
  profileInfo,
  securityOptions,
  substantiveOptions,
  intl,
  history,
  userId,
}) => {
  const [form] = Form.useForm();
  const [displayActingRoleForm, setDisplayActingRoleForm] = useState(false);
  const [enableEndDate, setEnableEndDate] = useState();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);

  const { locale } = useSelector((state) => state.settings);

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
      margin: 0,
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
      minWidth: "100%",
    },
    unsavedText: {
      marginLeft: "10px",
      fontWeight: "normal",
      fontStyle: "italic",
      opacity: 0.5,
    },
    iconBySwitch: {
      paddingLeft: "5px",
      paddingRight: "5px",
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
    const values = {
      ...unalteredValues,
    };

    if (!unalteredValues.securityClearanceId) {
      values.securityClearanceId = null;
    }

    if (!unalteredValues.tenureId) {
      values.tenureId = null;
    }

    if (!unalteredValues.groupLevelId) {
      values.groupLevelId = null;
    }

    if (!unalteredValues.actingLevelId) {
      values.actingLevelId = null;
      values.actingStartDate = null;
      values.actingEndDate = null;
    }

    await axios.put(`api/profile/${userId}?language=${locale}`, values);
  };

  /* toggle temporary role form */
  const toggleTempRoleForm = () => {
    setDisplayActingRoleForm((prev) => !prev);
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
        groupLevelId: profile.groupLevel ? profile.groupLevel.id : undefined,
        tenureId: profile.tenure ? profile.tenure.id : undefined,
        securityClearanceId: profile.securityClearance
          ? profile.securityClearance.id
          : undefined,
        manager: profile.manager,
        actingLevelId: profile.actingLevel ? profile.actingLevel.id : undefined,
        actingStartDate: profile.actingStartDate
          ? moment.utc(profile.actingStartDate)
          : undefined,
        actingEndDate: profile.actingStartDate
          ? moment.utc(profile.actingStartDate)
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
    if (_.isEmpty(formValues)) {
      return false;
    }

    const dbValues = _.pickBy(
      savedValues || getInitialValues(profileInfo),
      _.identity
    );

    return !_.isEqual(formValues, dbValues);
  };

  const updateIfFormValuesChanged = () => {
    setFieldsChanged(checkIfFormValuesChanged());
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
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon("error");
        }
      });
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        setFieldsChanged(false);
        history.push("/secured/profile/create/step/4");
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
    history.push(`/secured/profile/${userId}`);
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        setFieldsChanged(false);
        if (formType === "create") {
          history.push("/secured/profile/create/step/8");
        } else {
          onFinish();
        }
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon("error");
        }
      });
  };

  /* on form reset */
  const onReset = () => {
    // reset form fields
    form.resetFields();

    // check if user has acting information in db to expand acting form
    setDisplayActingRoleForm(
      profileInfo && profileInfo.actingLevel && !!profileInfo.actingLevel.id
    );

    message.info(intl.formatMessage({ id: "profile.form.clear" }));
    updateIfFormValuesChanged();
  };

  /* Get temporary role form based on if the form switch is toggled */
  const getTempRoleForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <Row gutter={24} style={{ marginTop: "10px" }}>
          <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
            <Form.Item
              name="actingLevelId"
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
                  return <Option key={value.id}>{value.name}</Option>;
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
                placeholder={intl.formatMessage({
                  id: "profile.select.date",
                })}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={6} xl={6}>
            <Form.Item
              name="actingEndDate"
              label={<FormattedMessage id="profile.acting.period.end.date" />}
              rules={enableEndDate ? [Rules.required] : undefined}
            >
              {enableEndDate && (
                <DatePicker
                  style={styles.datePicker}
                  disabledDate={disabledDatesBeforeStart}
                  disabled={!enableEndDate}
                  placeholder={intl.formatMessage({
                    id: "profile.select.date",
                  })}
                />
              )}
            </Form.Item>
            <div style={{ marginTop: !enableEndDate ? "-38px" : "-10px" }}>
              <Checkbox
                tabIndex="0"
                onChange={toggleTempEndDate}
                onKeyDown={enableEndDate}
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
        {fieldsChanged && (
          <Text style={styles.unsavedText}>
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
  };

  useEffect(() => {
    /* check if user has acting information in db to expand acting form */
    setDisplayActingRoleForm(
      profileInfo && profileInfo.actingLevel && !!profileInfo.actingLevel.id
    );

    /* check if user has acting end date to enable the date felid on load */
    setEnableEndDate(profileInfo ? Boolean(profileInfo.actingEndDate) : false);

    // if props change then reset form fields
    if (load) {
      form.resetFields();
    }
  }, [load, form, profileInfo]);

  // Updates the unsaved indicator based on the toggle and form values
  useEffect(() => {
    const data = savedValues || getInitialValues(profileInfo);
    const oppositeInitialToggle =
      !!data.actingLevelId !== !!displayActingRoleForm;

    setFieldsChanged(oppositeInitialToggle || checkIfFormValuesChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayActingRoleForm]);

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
    <>
      <Prompt
        when={fieldsChanged}
        message={intl.formatMessage({ id: "profile.form.unsaved.alert" })}
      />
      <div style={styles.content}>
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -5 }}>
          {getFormHeader(formType)}
          <div style={{ marginTop: -5 }}>
            <CardVisibilityToggle
              visibleCards={profileInfo.visibleCards}
              cardName="info"
              type="form"
            />
          </div>
        </Row>
        <Divider style={styles.headerDiv} />
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          form={form}
          initialValues={savedValues || getInitialValues(profileInfo)}
          layout="vertical"
          onValuesChange={updateIfFormValuesChanged}
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                tabIndex="0"
                name="tenureId"
                label={<FormattedMessage id="profile.substantive" />}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {substantiveOptions.map((value) => {
                    return <Option key={value.id}>{value.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                tabIndex="0"
                name="groupLevelId"
                label={<FormattedMessage id="profile.classification" />}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {classificationOptions.map((value) => {
                    return <Option key={value.id}>{value.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Two */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
              <Form.Item
                tabIndex="0"
                name="securityClearanceId"
                label={<FormattedMessage id="profile.security" />}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {securityOptions.map((value) => {
                    return <Option key={value.id}>{value.description}</Option>;
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
              <Text>
                <FormattedMessage id="profile.willing.to.relocate.to" />
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
                  <InfoCircleOutlined style={styles.iconBySwitch} />
                </Popover>
              </Text>
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
    </>
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
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
};

EmploymentDataFormView.defaultProps = {
  classificationOptions: [],
  securityOptions: [],
  substantiveOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(EmploymentDataFormView);

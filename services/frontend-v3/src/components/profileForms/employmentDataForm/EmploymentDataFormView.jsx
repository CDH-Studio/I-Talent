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
  notification,
  Popover,
} from "antd";
import PropTypes from "prop-types";
import { InfoCircleOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import { isEqual, identity, pickBy } from "lodash";
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
import DescriptionFormItem from "../descriptionFormItem/DescriptionFormItem";
import filterOption from "../../../functions/filterSelectInput";
import FormControlButton from "../formControlButtons/FormControlButtons";

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
  const axios = useAxios();
  const [form] = Form.useForm();
  const [displayActingRoleForm, setDisplayActingRoleForm] = useState(false);
  const [enableEndDate, setEnableEndDate] = useState();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [loadedData, setLoadedData] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Component Styles */
  const styles = {
    skeleton: {
      minHeight: "658px",
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
    datePicker: { width: "100%" },
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
    space: {
      paddingLeft: "0.25em",
    },
    sectionHeader: {
      marginBottom: 10,
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
      message: (
        <FormattedMessage
          id="profile.rules.max"
          values={{
            max: 50,
          }}
        />
      ),
    },
    maxChar1000: {
      max: 1000,
      message: (
        <FormattedMessage
          id="profile.rules.max"
          values={{
            max: 1000,
          }}
        />
      ),
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

  /* Get the initial values for the form */
  const getInitialValues = (profile) => {
    if (profile) {
      return {
        description: profile.description,
        groupLevelId: profile.groupLevel ? profile.groupLevel.id : undefined,
        tenureId: profile.tenure ? profile.tenure.id : undefined,
        securityClearanceId: profile.securityClearance
          ? profile.securityClearance.id
          : undefined,
        manager: profile.manager,
        actingLevelId: profile.actingLevel ? profile.actingLevel.id : undefined,
        actingStartDate: profile.actingStartDate
          ? moment(profile.actingStartDate)
          : undefined,
        actingEndDate: profile.actingStartDate
          ? moment(profile.actingStartDate)
          : undefined,
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

    const dbValues = pickBy(
      savedValues || getInitialValues(profileInfo),
      identity
    );

    return !isEqual(formValues, dbValues);
  };

  const updateIfFormValuesChanged = () => {
    setFieldsChanged(checkIfFormValuesChanged());
  };

  /*
   * Get All Validation Errors
   *
   * Print out list of validation errors in a list for notification
   */
  const getAllValidationErrorMessages = () => {
    return (
      <div>
        <strong>
          {intl.formatMessage({ id: "profile.edit.save.error.intro" })}
        </strong>
        <ul>
          <li key="1">{intl.formatMessage({ id: "setup.employment" })}</li>
        </ul>
      </div>
    );
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
            description: getAllValidationErrorMessages(),
          });
        }
      });
  };

  /*
   * Save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        setFieldsChanged(false);
        history.push("/profile/create/step/4");
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getAllValidationErrorMessages(),
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
   * Save and finish
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
            description: getAllValidationErrorMessages(),
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
    // reset form fields
    form.resetFields();

    // check if user has acting information in db to expand acting form
    setDisplayActingRoleForm(
      profileInfo && profileInfo.actingLevel && !!profileInfo.actingLevel.id
    );

    notification.info({
      message: intl.formatMessage({ id: "profile.form.clear" }),
    });
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
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
                filterOption={filterOption}
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
          3. <FormattedMessage id="profile.employee.status" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="profile.employee.status" />
        {fieldsChanged && (
          <Text style={styles.unsavedText}>
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
  };

  useEffect(() => {
    if (!loadedData && load) {
      /* check if user has acting information in db to expand acting form */
      setDisplayActingRoleForm(
        profileInfo && profileInfo.actingLevel && !!profileInfo.actingLevel.id
      );

      /* check if user has acting end date to enable the date felid on load */
      setEnableEndDate(
        profileInfo ? Boolean(profileInfo.actingEndDate) : false
      );

      // Makes the subform not reset on language change
      setLoadedData(true);
    }
  }, [load, form, profileInfo, loadedData]);

  // Updates the unsaved indicator based on the toggle and form values
  useEffect(() => {
    const data = savedValues || getInitialValues(profileInfo);
    const oppositeInitialToggle =
      !!data.actingLevelId !== !!displayActingRoleForm;

    setFieldsChanged(oppositeInitialToggle || checkIfFormValuesChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayActingRoleForm]);

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
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
                <FormattedMessage id="profile.temporary.role" />
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

          <Divider style={styles.headerDiv} />
          <Row
            justify="space-between"
            style={styles.sectionHeader}
            align="middle"
          >
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="profile.description" />
            </Title>
            <CardVisibilityToggle
              visibleCards={profileInfo.visibleCards}
              cardName="description"
              type="form"
            />
          </Row>

          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <DescriptionFormItem
                name="description"
                maxLength={Rules.maxChar1000.max}
                maxLengthMessage={Rules.maxChar1000.message}
                lengthMessage={<FormattedMessage id="profile.rules.max.1000" />}
                value={profileInfo.description}
              />
            </Col>
          </Row>

          <FormControlButton
            formType={formType}
            onSave={onSave}
            onSaveAndNext={onSaveAndNext}
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

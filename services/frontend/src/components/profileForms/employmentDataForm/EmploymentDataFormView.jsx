import { useState, useEffect } from "react";
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
  notification,
  Space,
} from "antd";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import { isEqual, identity, pickBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Prompt } from "react-router";
import useAxios from "../../../utils/useAxios";
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
import FormTitle from "../formTitle/FormTitle";
import FormSubTitle from "../formSubTitle/FormSubTitle";

import "./EmploymentDataFormView.less";

const { Option } = Select;
const { Text } = Typography;

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
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [loadedData, setLoadedData] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="rules.required" />,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="rules.max" values={{ max: 50 }} />,
    },
    maxChar1000: {
      max: 1000,
      message: <FormattedMessage id="rules.max" values={{ max: 1000 }} />,
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
    }

    await axios.put(`api/profile/${userId}?language=${locale}`, values);
  };

  /* toggle temporary role form */
  const toggleTempRoleForm = () => {
    setDisplayActingRoleForm((prev) => !prev);
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
      };
    }
    return {};
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * pickBy({}, identity) is used to omit falsely values from the object - https://stackoverflow.com/a/33432857
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
  const getAllValidationErrorMessages = () => (
    <div>
      <strong>{intl.formatMessage({ id: "edit.save.error.intro" })}</strong>
      <ul>
        <li key="1">{intl.formatMessage({ id: "employment.data" })}</li>
      </ul>
    </div>
  );

  /*
   * Save
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
          handleError(error, "message", history);
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
          handleError(error, "message", history);
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
      message: intl.formatMessage({ id: "form.clear" }),
    });
    updateIfFormValuesChanged();
  };

  /* Get temporary role form based on if the form switch is toggled */
  const getTempRoleForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <Form.Item
          name="actingLevelId"
          label={<FormattedMessage id="acting" />}
          rules={[Rules.required]}
        >
          <Select
            showSearch
            placeholder={<FormattedMessage id="input.placeholder.select" />}
            allowClear
            filterOption={filterOption}
          >
            {classificationOptions.map((value) => (
              <Option key={value.id}>{value.name}</Option>
            ))}
          </Select>
        </Form.Item>
      );
    }
    return <div />;
  };

  useEffect(() => {
    if (!loadedData && load) {
      /* check if user has acting information in db to expand acting form */
      setDisplayActingRoleForm(
        profileInfo && profileInfo.actingLevel && !!profileInfo.actingLevel.id
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
      <div className="employment-skeleton">
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
      <div className="employment-content">
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -5 }}>
          <FormTitle
            title={<FormattedMessage id="employment.status" />}
            formType={formType}
            stepNumber={3}
            fieldsChanged={fieldsChanged}
            extra={
              <div style={{ marginTop: -5 }}>
                <CardVisibilityToggle
                  visibleCards={profileInfo.visibleCards}
                  cardName="info"
                  type="form"
                />
              </div>
            }
          />
        </Row>
        <Divider className="employment-headerDiv" />
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
                name="tenureId"
                label={<FormattedMessage id="profile.substantive" />}
              >
                <Select
                  showSearch
                  placeholder={
                    <FormattedMessage id="input.placeholder.select" />
                  }
                  allowClear
                  filterOption={filterOption}
                >
                  {substantiveOptions.map((value) => (
                    <Option key={value.id}>{value.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="groupLevelId"
                label={<FormattedMessage id="classification" />}
              >
                <Select
                  showSearch
                  placeholder={
                    <FormattedMessage id="input.placeholder.select" />
                  }
                  allowClear
                  filterOption={filterOption}
                >
                  {classificationOptions.map((value) => (
                    <Option key={value.id}>{value.name}</Option>
                  ))}
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
                  placeholder={
                    <FormattedMessage id="input.placeholder.select" />
                  }
                  allowClear
                  filterOption={filterOption}
                >
                  {securityOptions.map((value) => (
                    <Option key={value.id}>{value.description}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                name="manager"
                label={<FormattedMessage id="employee.manager" />}
                rules={[Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Four: Temporary role */}
          <Row gutter={24}>
            <Col className="gutter-row employment-tempRoleRow" span={24}>
              <Row>
                <Space>
                  <Text>
                    <FormattedMessage id="presently.acting" />
                  </Text>
                  <Switch
                    checked={displayActingRoleForm}
                    onChange={toggleTempRoleForm}
                  />
                </Space>
              </Row>
              {getTempRoleForm(displayActingRoleForm)}
            </Col>
          </Row>

          <Divider className="employment-headerDiv" />

          <FormSubTitle
            title={<FormattedMessage id="about.me" />}
            extra={
              <CardVisibilityToggle
                visibleCards={profileInfo.visibleCards}
                cardName="description"
                type="form"
              />
            }
          />

          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item name="description">
                <Input.TextArea showCount maxLength={1000} />
              </Form.Item>
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
            visibleCards={profileInfo.visibleCards}
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

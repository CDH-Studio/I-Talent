import "./EmploymentDataFormView.less";

import {
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Skeleton,
  Switch,
} from "antd";
import { identity, isEqual, pickBy } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router";

import handleError from "../../../functions/handleError";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import {
  HistoryPropType,
  IntlPropType,
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

  /**
   * Save data to backend
   * @param {Object} unalteredValues - Values to be saved.
   *
   */
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

  /**
   * extract the initial values from the profile
   * @param {Object} profile - user profile
   *
   */
  const getInitialValues = ({ profile }) => {
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
   * pickBy({}, identity) is used to omit falsely values from the object - https://stackoverflow.com/a/33432857
   * @return {boolean} return true if any of the form inputs have changed
   *
   */
  const checkIfFormValuesChanged = () => {
    const formValues = pickBy(form.getFieldsValue(), identity);

    const dbValues = pickBy(
      savedValues || getInitialValues({ profile: profileInfo }),
      identity
    );

    return !isEqual(formValues, dbValues);
  };

  /**
   * update state if form values have changed from the initial state
   *
   */
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
      <p>
        {"- "}
        {intl.formatMessage({ id: "employment.data" })}{" "}
        {intl.formatMessage({ id: "form" })}
      </p>
    </div>
  );

  /**
   * Action to take "on save"
   *
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

  /**
   * Action to take "on save and next".
   * redirects to next step of form
   *
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

  /**
   * Action to take "on finish".
   * redirects to last page of profile forms
   *
   */
  const onFinish = () => {
    history.push(`/profile/edit/finish`);
  };

  /**
   * Action to take "on Save and finish".
   * Save form data and redirect to last page of profile forms
   *
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

  /**
   * Action to take "On Reset"
   * reset form fields to state when page was loaded
   *
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

  /**
   *  Get temporary role form based on if the form switch is toggled
   * @param {boolean} expandMentorshipForm - should menu be rendered
   * @return {HTMLElement} return the form
   *
   */
  const getTempRoleForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <Form.Item
          label={<FormattedMessage id="acting" />}
          name="actingLevelId"
          rules={[Rules.required]}
        >
          <CustomDropdown
            ariaLabel={intl.formatMessage({
              id: "acting",
            })}
            initialValueId={
              getInitialValues({ profile: profileInfo }).actingLevelId
            }
            isRequired
            isSearchable
            options={classificationOptions}
            placeholderText={<FormattedMessage id="type.to.search" />}
          />
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
    const data = savedValues || getInitialValues({ profile: profileInfo });
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
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
        when={fieldsChanged}
      />
      <div className="employment-content">
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -5 }}>
          <FormTitle
            extra={
              <div style={{ marginTop: -5 }}>
                <CardVisibilityToggle
                  ariaLabel={intl.formatMessage({
                    id: "employment.status",
                  })}
                  cardName="info"
                  type="form"
                  visibleCards={profileInfo.visibleCards}
                />
              </div>
            }
            fieldsChanged={fieldsChanged}
            formType={formType}
            stepNumber={3}
            title={<FormattedMessage id="employment.status" />}
          />
        </Row>
        <Divider className="employment-headerDiv" />
        {/* Create for with initial values */}
        <Form
          form={form}
          initialValues={
            savedValues || getInitialValues({ profile: profileInfo })
          }
          layout="vertical"
          name="basicForm"
          onValuesChange={updateIfFormValuesChanged}
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                label={<FormattedMessage id="profile.substantive" />}
                name="tenureId"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "profile.substantive",
                  })}
                  initialValueId={
                    getInitialValues({ profile: profileInfo }).tenureId
                  }
                  isSearchable={false}
                  options={substantiveOptions}
                  placeholderText={<FormattedMessage id="select" />}
                />
              </Form.Item>
            </Col>

            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                label={<FormattedMessage id="classification" />}
                name="groupLevelId"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "classification",
                  })}
                  initialValueId={
                    getInitialValues({ profile: profileInfo }).groupLevelId
                  }
                  isSearchable
                  options={classificationOptions}
                  placeholderText={<FormattedMessage id="type.to.search" />}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Two */}
          <Row gutter={24}>
            <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
              <Form.Item
                label={<FormattedMessage id="profile.security" />}
                name="securityClearanceId"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "profile.security",
                  })}
                  initialValueId={
                    getInitialValues({ profile: profileInfo })
                      .securityClearanceId
                  }
                  isSearchable={false}
                  options={securityOptions}
                  placeholderText={<FormattedMessage id="select" />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label={<FormattedMessage id="employee.manager" />}
                name="manager"
                rules={[Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Four: Temporary role */}
          <Row className="employment-tempRoleRow">
            <Fieldset
              title={
                <>
                  <FormattedMessage id="presently.acting" />
                  <Switch
                    checked={displayActingRoleForm}
                    className="ml-2 mb-1"
                    onChange={toggleTempRoleForm}
                  />
                </>
              }
            >
              <Col span={24}>{getTempRoleForm(displayActingRoleForm)}</Col>
            </Fieldset>
          </Row>

          <Divider className="employment-headerDiv" />

          <FormSubTitle
            extra={
              <CardVisibilityToggle
                ariaLabel={intl.formatMessage({
                  id: "about.me",
                })}
                cardName="description"
                type="form"
                visibleCards={profileInfo.visibleCards}
              />
            }
            title={<FormattedMessage id="about.me" />}
          />

          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item name="description">
                <Input.TextArea
                  aria-label={intl.formatMessage({ id: "about.me" })}
                  maxLength={1000}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>

          <FormControlButton
            fieldsChanged={fieldsChanged}
            formType={formType}
            onFinish={onFinish}
            onReset={onReset}
            onSave={onSave}
            onSaveAndFinish={onSaveAndFinish}
            onSaveAndNext={onSaveAndNext}
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

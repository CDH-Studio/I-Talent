import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router";
import { LinkOutlined, SyncOutlined } from "@ant-design/icons";
import { useKeycloak } from "@react-keycloak/web";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Skeleton,
} from "antd";
import { identity, isEqual, pickBy } from "lodash";
import PropTypes from "prop-types";
import { isMobilePhone } from "validator";

import store from "../../../redux";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import { setUserSignupStep } from "../../../redux/slices/userSlice";
import {
  HistoryPropType,
  IdDescriptionPropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
} from "../../../utils/customPropTypes";
import login from "../../../utils/login";
import useAxios from "../../../utils/useAxios";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import Fieldset from "../../fieldset/Fieldset";
import CustomDropdown from "../../formItems/CustomDropdown";
import FormControlButton from "../formControlButtons/FormControlButtons";
import FormSubTitle from "../formSubTitle/FormSubTitle";
import FormTitle from "../formTitle/FormTitle";
import GedsUpdateModal from "./gedsUpdateModal/GedsUpdateModal";

import "./PrimaryInfoFormView.less";

/**
 * Open Notification pop up with message
 * @param {Object} notification - The notification to be displayed.
 * @param {string} notification.type - The type of notification.
 * @param {string} notification.description - Additional info in notification.
 * @param {Object} intl - intl object
 */
const openNotificationWithIcon = ({ type, description }, intl) => {
  switch (type) {
    case "success":
      notification.success({
        message: intl.formatMessage({ id: "edit.save.success" }),
      });
      break;
    case "jobTitleLangEN":
      notification.warning({
        description: intl.formatMessage({
          id: "edit.save.jobTitle.warning.en",
        }),
      });
      break;
    case "jobTitleLangFR":
      notification.warning({
        description: intl.formatMessage({
          id: "edit.save.jobTitle.warning.fr",
        }),
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
        description,
        message: intl.formatMessage({ id: "edit.save.problem" }),
      });
      break;
  }
};

/**
 * Extract initial values of the form from profile
 * @param {Object} profile - User Profile
 * @param {string} email - User's email
 * @returns {Object} - Object containing the initial values for the Primary Info form
 */
const getInitialValues = ({ profile }, email) => {
  if (profile) {
    return {
      cellphone: profile.cellphone,
      email: profile.email,
      employmentEquityGroups: profile.employmentEquityGroups,
      firstName: profile.firstName,
      gcconnex: profile.gcconnex,
      github: profile.github,
      jobTitle: profile.jobTitle,
      lastName: profile.lastName,
      linkedin: profile.linkedin,
      locationId: profile.officeLocation
        ? profile.officeLocation.id
        : undefined,
      pri: profile.pri,
      teams: profile.teams,
      telephone: profile.telephone,
    };
  }
  return { email };
};

/**
 * Generate error description to display in notification
 * @param {Object} intl - intl object
 * @returns {React.ReactElement} - React Element
 */
/* eslint-disable react/prop-types */
const ErrorMessages = ({ intl }) => (
  <div>
    <strong>{intl.formatMessage({ id: "edit.save.error.intro" })}</strong>
    <p>
      {"- "}
      {intl.formatMessage({ id: "primary.contact.information" })}{" "}
      {intl.formatMessage({ id: "form" })}
    </p>
  </div>
);
/* eslint-enable react/prop-types */

const PrimaryInfoFormView = ({
  locationOptions,
  profileInfo,
  isLoading,
  formType,
  history,
  userId,
  email,
  employmentEquityOptions,
}) => {
  const { keycloak } = useKeycloak();
  const axios = useAxios();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [gedsModalVisible, setGedsModalVisible] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Component Rules for form fields */
  const FORM_RULES = {
    emailFormat: {
      message: <FormattedMessage id="rules.email" />,
      pattern: /\S+@\S+\.ca/i,
    },
    maxChar100: {
      max: 100,
      message: <FormattedMessage id="rules.max" values={{ max: 100 }} />,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="rules.max" values={{ max: 50 }} />,
    },
    nameFormat: {
      message: <FormattedMessage id="rules.name" />,
      pattern:
        /^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$|^([a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+(-|\s)[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+)*$/,
    },
    priFormat: {
      message: <FormattedMessage id="rules.valid.pri" />,
      pattern: /(?=^[0-9]{8}$)(?=^(?!.*(\w)\1{1,}).+$)/,
    },
    required: {
      message: <FormattedMessage id="rules.required" />,
      required: true,
    },
    telephoneFormat: [
      {
        message: <FormattedMessage id="rules.phone.number" />,
        pattern: /^\d{3}-\d{3}-\d{4}$/i,
      },
      {
        validator(rule, value) {
          if (!value || isMobilePhone(value, "en-CA")) {
            return Promise.resolve();
          }

          return Promise.reject(
            intl.formatMessage({ id: "rules.valid.phone.number" })
          );
        },
      },
    ],
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   * pickBy({}, identity) is used to omit falsey values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = async () => {
    const formValues = pickBy(form.getFieldsValue(), identity);
    const dbValues = pickBy(
      savedValues || getInitialValues({ profile: profileInfo }, email),
      identity
    );
    setFieldsChanged(!isEqual(formValues, dbValues));
  };

  /**
   * Save Data to DB by sending to backend API
   * @param {Object} formValues - Data from primary info form.
   */
  const saveDataToDB = async (formValues) => {
    const dbValues = {
      ...formValues,
    };
    delete dbValues.jobTitle;
    await axios.put(`profile/${userId}?language=${locale}`, dbValues);
    await login(keycloak, axios);
  };

  /**
   * Action to complete when "save" Btn is used
   * save changes (display any errors) but stay on form upon success
   */
  const onSave = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        setFieldsChanged(false);
        setSavedValues(values);
        openNotificationWithIcon({ type: "success" }, intl);
      })
      .catch((error) => {
        if (error.isAxiosError) {
          openNotificationWithIcon(
            {
              type: "warning",
            },
            intl
          );
        } else {
          openNotificationWithIcon(
            {
              description: <ErrorMessages intl={intl} />,
              type: "error",
            },
            intl
          );
        }
      });
  };

  /**
   * Action to complete when "save and next" Btn is used
   * save changes (display any errors) and go to next form upon success
   */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        Promise.all([
          store.dispatch(setUserSignupStep(3)),
          saveDataToDB({ ...values, signupStep: 3 }),
        ]);
        setFieldsChanged(false);
      })
      .then(() => history.push("/profile/create/step/3"))
      .catch((error) => {
        if (error.isAxiosError) {
          openNotificationWithIcon({ type: "warning" }, intl);
        } else {
          openNotificationWithIcon(
            {
              description: <ErrorMessages intl={intl} />,
              type: "error",
            },
            intl
          );
        }
      });
  };

  /**
   * Redirect to profile
   */
  const onFinish = async () => {
    history.push(`/profile/edit/finish`);
  };

  /**
   * Action to complete when "save and finish" Btn is used
   * save changes (display any errors) and go to user profile upon success
   */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async (values) => {
        if (formType === "create") {
          Promise.all([
            store.dispatch(setUserSignupStep(8)),
            saveDataToDB({ ...values, signupStep: 8 }),
          ]);
          setFieldsChanged(false);
          history.push("/profile/create/step/8");
        } else {
          Promise.all([
            saveDataToDB(values),
            dispatch(setSavedFormContent(true)),
          ]);
          setFieldsChanged(false);
          onFinish();
        }
      })
      .catch((error) => {
        dispatch(setSavedFormContent(false));
        if (error.isAxiosError) {
          openNotificationWithIcon({ type: "warning" }, intl);
        } else {
          openNotificationWithIcon(
            {
              description: <ErrorMessages intl={intl} />,
              type: "error",
            },
            intl
          );
        }
      });
  };

  /**
   * Action to complete when "clear" Btn is used
   * clear all changes since last change
   */
  const onReset = () => {
    form.resetFields();
    notification.info({
      message: intl.formatMessage({ id: "form.clear" }),
    });
    checkIfFormValuesChanged();
  };

  const initialValues = getInitialValues(profileInfo, email);

  /* Once data had loaded display form */
  return isLoading ? (
    <div className="prim-skeleton">
      <Skeleton active />
    </div>
  ) : (
    <>
      <Prompt
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
        when={fieldsChanged}
      />
      <div className="prim-content">
        <GedsUpdateModal profile={profileInfo} visibility={gedsModalVisible} />
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -5 }}>
          <FormTitle
            extra={
              <>
                {formType === "edit" && (
                  <Button
                    aria-label={intl.formatMessage({ id: "geds.sync.button" })}
                    onClick={() => {
                      setGedsModalVisible(true);
                    }}
                  >
                    <SyncOutlined />
                    <span>
                      <FormattedMessage id="geds.sync.button" />
                    </span>
                  </Button>
                )}
              </>
            }
            fieldsChanged={fieldsChanged}
            formType={formType}
            stepNumber={2}
            title={<FormattedMessage id="primary.contact.information" />}
          />
        </Row>

        <Divider className="prim-headerDiv" />
        {/* Create for with initial values */}
        <Form
          form={form}
          initialValues={savedValues || initialValues}
          layout="vertical"
          name="basicForm"
          onValuesChange={checkIfFormValuesChanged}
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                label={<FormattedMessage id="first.name" />}
                name="firstName"
                rules={[
                  FORM_RULES.required,
                  FORM_RULES.maxChar50,
                  FORM_RULES.nameFormat,
                ]}
              >
                <Input aria-required="true" />
              </Form.Item>
            </Col>

            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              {" "}
              // TODO: remove unnecessary rules
              <Form.Item
                label={<FormattedMessage id="last.name" />}
                name="lastName"
                rules={[
                  FORM_RULES.required,
                  FORM_RULES.maxChar50,
                  FORM_RULES.nameFormat,
                ]}
              >
                <Input aria-required="true" />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Two */}
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                extra={
                  <div id="email-extra-info">
                    <FormattedMessage id="email.tooltip" />
                  </div>
                }
                label={<FormattedMessage id="email" />}
                name="email"
                rules={[FORM_RULES.emailFormat, FORM_RULES.maxChar50]}
              >
                <Input aria-describedby="email-extra-info" readOnly />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                extra={
                  <div id="job-title-extra-info">
                    <FormattedMessage id="job.title.tooltip" />
                  </div>
                }
                label={<FormattedMessage id="job.title" />}
                name="jobTitle"
                rules={[FORM_RULES.maxChar50]}
              >
                <Input aria-describedby="job-title-extra-info" readOnly />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Four */}
          <Row gutter={24}>
            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                extra={
                  <div id="pri-extra-info">
                    <FormattedMessage id="pri.private" />
                  </div>
                }
                label={<FormattedMessage id="pri" />}
                name="pri"
                rules={[FORM_RULES.required, FORM_RULES.priFormat]}
              >
                <Input aria-describedby="pri-extra-info" aria-required="true" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                label={<FormattedMessage id="location" />}
                name="locationId"
                rules={[FORM_RULES.required, FORM_RULES.maxChar50]}
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({ id: "location" })}
                  initialValueId={initialValues.locationId}
                  isRequired
                  options={locationOptions}
                  placeholderText={<FormattedMessage id="search" />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Five */}
          <Row gutter={24}>
            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                label={<FormattedMessage id="profile.telephone" />}
                name="telephone"
                rules={FORM_RULES.telephoneFormat}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
              <Form.Item
                label={<FormattedMessage id="work.cellphone" />}
                name="cellphone"
                rules={FORM_RULES.telephoneFormat}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Six */}
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                label={<FormattedMessage id="employee.work.unit" />}
                name="teams"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "employee.work.unit",
                  })}
                  initialValueId={initialValues.teams}
                  isCreatable
                  isMulti
                  placeholderText={<FormattedMessage id="press.enter.to.add" />}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Form Row Seven */}
          <Row className="prim-externalProfileSection">
            <Fieldset
              title={
                <>
                  <LinkOutlined aria-hidden="true" className="mr-1" />
                  <FormattedMessage id="setup.link.profiles" />
                </>
              }
            >
              <Col span={24}>
                <Form.Item
                  label={<FormattedMessage id="gcconnex.username" />}
                  name="gcconnex"
                  rules={[FORM_RULES.maxChar100]}
                >
                  <Input
                    addonBefore="https://gcconnex.gc.ca/profile/"
                    aria-label={`${intl.formatMessage({
                      id: "gcconnex.username",
                    })} https://gcconnex.gc.ca/profile/`}
                    placeholder={intl.formatMessage({ id: "username" })}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={<FormattedMessage id="linkedin.username" />}
                  name="linkedin"
                  rules={[FORM_RULES.maxChar100]}
                >
                  <Input
                    addonBefore="https://linkedin.com/in/"
                    aria-describedby="linkedin-field-info"
                    aria-label={`${intl.formatMessage({
                      id: "linkedin.username",
                    })} https://linkedin.com/in/`}
                    placeholder={intl.formatMessage({ id: "username" })}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={<FormattedMessage id="github.username" />}
                  name="github"
                  rules={[FORM_RULES.maxChar100]}
                >
                  <Input
                    addonBefore="https://github.com/"
                    aria-describedby="github-field-info"
                    aria-label={`${intl.formatMessage({
                      id: "github.username",
                    })} https://github.com/`}
                    placeholder={intl.formatMessage({ id: "username" })}
                  />
                </Form.Item>
              </Col>
            </Fieldset>
          </Row>

          <Divider className="prim-headerDiv" />
          <FormSubTitle
            extra={
              <CardVisibilityToggle
                ariaLabel={intl.formatMessage({
                  id: "employment.equity.groups",
                })}
                cardName="employmentEquityGroup"
                type="form"
                visibleCards={profileInfo.visibleCards}
              />
            }
            title={<FormattedMessage id="employment.equity.groups" />}
          />
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item name="employmentEquityGroups">
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "employment.equity.groups",
                  })}
                  initialValueId={initialValues.employmentEquityGroups}
                  isMulti
                  isSearchable={false}
                  options={employmentEquityOptions}
                  placeholderText={<FormattedMessage id="select" />}
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

PrimaryInfoFormView.propTypes = {
  email: PropTypes.string.isRequired,
  employmentEquityOptions: KeyTitleOptionsPropType.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  history: HistoryPropType.isRequired,
  isLoading: PropTypes.bool.isRequired,
  locationOptions: IdDescriptionPropType,
  profileInfo: ProfileInfoPropType,
  userId: PropTypes.string.isRequired,
};

PrimaryInfoFormView.defaultProps = {
  locationOptions: [],
  profileInfo: null,
};

export default PrimaryInfoFormView;

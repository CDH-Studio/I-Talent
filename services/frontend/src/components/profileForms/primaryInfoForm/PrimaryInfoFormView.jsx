import { useState } from "react";
import {
  Row,
  Col,
  Skeleton,
  Select,
  Divider,
  Form,
  Input,
  Button,
  notification,
  Popover,
} from "antd";
import {
  LinkOutlined,
  InfoCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
// import Select from "react-select";
import { FormattedMessage, useIntl } from "react-intl";
import { pickBy, identity, isEqual } from "lodash";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { isMobilePhone } from "validator";
import { Prompt } from "react-router";
import { useKeycloak } from "@react-keycloak/web";
import useAxios from "../../../utils/useAxios";
import AliSelect from "../../formItems/AliSelect";
import {
  IdDescriptionPropType,
  ProfileInfoPropType,
  HistoryPropType,
  KeyTitleOptionsPropType,
} from "../../../utils/customPropTypes";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
// import filterOption from "../../../functions/filterSelectInput";
import FormControlButton from "../formControlButtons/FormControlButtons";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import GedsUpdateModal from "./gedsUpdateModal/GedsUpdateModal";
import FormTitle from "../formTitle/FormTitle";
import FormSubTitle from "../formSubTitle/FormSubTitle";
import login from "../../../utils/login";

import "./PrimaryInfoFormView.less";

// const { Option } = Select;

const PrimaryInfoFormView = ({
  locationOptions,
  profileInfo,
  load,
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
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="rules.required" />,
    },
    maxChar50: {
      max: 50,
      message: <FormattedMessage id="rules.max" values={{ max: 50 }} />,
    },
    maxChar100: {
      max: 100,
      message: <FormattedMessage id="rules.max" values={{ max: 100 }} />,
    },
    telephoneFormat: [
      {
        pattern: /^\d{3}-\d{3}-\d{4}$/i,
        message: <FormattedMessage id="rules.phone.number" />,
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
    emailFormat: {
      pattern: /\S+@\S+\.ca/i,
      message: <FormattedMessage id="rules.email" />,
    },
    nameFormat: {
      pattern:
        /^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$|^([a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+(-|\s)[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+)*$/,
      message: <FormattedMessage id="rules.name" />,
    },
    priFormat: {
      pattern: /(?=^[0-9]{8}$)(?=^(?!.*(\w)\1{1,}).+$)/,
      message: <FormattedMessage id="rules.valid.pri" />,
    },
  };

  /**
   * Open Notification pop up with message
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
          message: intl.formatMessage({ id: "edit.save.error" }),
          description,
        });
        break;
      default:
        notification.warning({
          message: intl.formatMessage({ id: "edit.save.problem" }),
          description,
        });
        break;
    }
  };

  /**
   * Extract initial values of the form from profile
   * @param {Object} profile - User Profile
   */
  const getInitialValues = ({ profile }) => {
    if (profile) {
      return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        telephone: profile.telephone,
        jobTitle: profile.jobTitle,
        cellphone: profile.cellphone,
        pri: profile.pri,
        email: profile.email,
        locationId: profile.officeLocation
          ? profile.officeLocation.id
          : undefined,
        teams: profile.teams,
        gcconnex: profile.gcconnex,
        linkedin: profile.linkedin,
        github: profile.github,
        employmentEquityGroups: profile.employmentEquityGroups,
      };
    }
    return { email };
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * pickBy({}, identity) is used to omit false values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = async () => {
    const formValues = pickBy(form.getFieldsValue(), identity);
    const dbValues = pickBy(
      savedValues || getInitialValues({ profile: profileInfo }),
      identity
    );
    console.log("initial", getInitialValues({ profile: profileInfo }));
    console.log(
      "employmentEquityGroups",
      form.getFieldValue("employmentEquityGroups")
    );
    setFieldsChanged(!isEqual(formValues, dbValues));
  };

  /**
   * Generate error description to display in notification
   */
  const getErrorMessages = () => (
    <div>
      <strong>{intl.formatMessage({ id: "edit.save.error.intro" })}</strong>
      <p>
        {"- "}
        {intl.formatMessage({ id: "primary.contact.information" })}{" "}
        {intl.formatMessage({ id: "form" })}
      </p>
    </div>
  );

  /**
   * Save Data to DB by sending to backend API
   * @param {Object} formValues - Data from primary info form.
   */
  const saveDataToDB = async (formValues) => {
    const dbValues = {
      ...formValues,
    };

    delete dbValues.jobTitle;
    await axios.put(`api/profile/${userId}?language=${locale}`, dbValues);
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
        openNotificationWithIcon({ type: "success" });
      })
      .catch((error) => {
        if (error.isAxiosError) {
          openNotificationWithIcon({
            type: "warning",
          });
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getErrorMessages(),
          });
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
        await saveDataToDB(values);
        setFieldsChanged(false);
      })
      .then(() => history.push("/profile/create/step/3"))
      .catch((error) => {
        if (error.isAxiosError) {
          openNotificationWithIcon({
            type: "warning",
          });
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getErrorMessages(),
          });
        }
      });
  };

  /**
   * Redirect to profile
   */
  const onFinish = () => {
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
          openNotificationWithIcon({
            type: "warning",
          });
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getErrorMessages(),
          });
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

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!load) {
    return (
      /* If form data is loading then wait */
      <div className="prim-skeleton">
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
      <div className="prim-content">
        <GedsUpdateModal visibility={gedsModalVisible} profile={profileInfo} />
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -5 }}>
          <FormTitle
            title={<FormattedMessage id="primary.contact.information" />}
            formType={formType}
            stepNumber={2}
            fieldsChanged={fieldsChanged}
            extra={
              <>
                {formType === "edit" && (
                  <Button
                    onClick={() => {
                      setGedsModalVisible(true);
                    }}
                    aria-label={intl.formatMessage({ id: "geds.sync.button" })}
                  >
                    <SyncOutlined />
                    <span>
                      <FormattedMessage id="geds.sync.button" />
                    </span>
                  </Button>
                )}
              </>
            }
          />
        </Row>

        <Divider className="prim-headerDiv" />
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          initialValues={
            savedValues || getInitialValues({ profile: profileInfo })
          }
          layout="vertical"
          form={form}
          onValuesChange={checkIfFormValuesChanged}
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="firstName"
                label={<FormattedMessage id="first.name" />}
                rules={[Rules.required, Rules.maxChar50, Rules.nameFormat]}
              >
                <Input aria-required="true" />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="lastName"
                label={<FormattedMessage id="last.name" />}
                rules={[Rules.required, Rules.maxChar50, Rules.nameFormat]}
              >
                <Input aria-required="true" />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Two */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="jobTitle"
                label={
                  <>
                    <FormattedMessage id="job.title" />
                    <div className="prim-popoverStyleCareer">
                      <Popover
                        trigger={["focus", "click"]}
                        content={
                          <div className="prim-popoverStyle">
                            <FormattedMessage id="job.title.tooltip" />
                          </div>
                        }
                        id="job-title-popover"
                        role="button"
                      >
                        <InfoCircleOutlined
                          tabIndex={0}
                          aria-describedby="job-title-popover"
                          aria-label={intl.formatMessage({
                            id: "job.title.popover.arialabel",
                          })}
                        />
                      </Popover>
                    </div>
                  </>
                }
                rules={[Rules.maxChar50]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="email"
                label={<FormattedMessage id="email" />}
                rules={[Rules.emailFormat, Rules.maxChar50]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="pri"
                extra={
                  <div className="prim-popoverStyle" id="pri-extra-info">
                    <FormattedMessage id="pri.private" />
                  </div>
                }
                label={<FormattedMessage id="pri" />}
                rules={[Rules.required, Rules.priFormat]}
              >
                <Input aria-describedby="pri-extra-info" aria-required="true" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                id="zkzzz"
                name="locationId"
                label={
                  <span id="zzzz">
                    <FormattedMessage id="location" />
                  </span>
                }
                rules={[Rules.required, Rules.maxChar50]}
              >
                {/* <Select
                  showSearch
                  placeholder={<FormattedMessage id="search" />}
                  allowClear
                  filterOption={filterOption}
                  aria-required="true"
                >
                  {locationOptions.map((value) => (
                    <Option key={value.id}>
                      {value.streetNumber} {value.streetName}, {value.city},{" "}
                      {value.province}
                    </Option>
                  ))}
                </Select> */}
                {/* <Select
                  aria-labelledby="zzzz"
                  aria-required="true"
                  options={locationOptions}
                  placeholderText="jjjj"
                  // isSearchable
                /> */}
                <AliSelect
                  // aria-labelledby="zzzz"
                  // aria-required="true"
                  // aria-label="this is a label for location"
                  placeholderText={<FormattedMessage id="search" />}
                  initialValueId={
                    getInitialValues({ profile: profileInfo }).locationId
                  }
                  options={locationOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="telephone"
                label={<FormattedMessage id="profile.telephone" />}
                rules={Rules.telephoneFormat}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="cellphone"
                label={<FormattedMessage id="work.cellphone" />}
                rules={Rules.telephoneFormat}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Four */}
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item
                name="teams"
                label={<FormattedMessage id="employee.work.unit" />}
                className="custom-bubble-select-style"
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  notFoundContent={<FormattedMessage id="press.enter.to.add" />}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Five */}
          <Row
            gutter={24}
            style={{
              backgroundColor: "#dfe5e4",
              paddingTop: "15px",
              marginBottom: "20px",
              marginTop: "10px",
              borderRadius: 5,
            }}
          >
            <Col className="gutter-row mb-1" span={24}>
              <LinkOutlined aria-hidden="true" className="mr-1" />
              <FormattedMessage id="setup.link.profiles" />
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="gcconnex"
                label={<FormattedMessage id="gcconnex.username" />}
                rules={[Rules.maxChar100]}
              >
                <Input
                  aria-label={`${intl.formatMessage({
                    id: "gcconnex.username",
                  })} https://gcconnex.gc.ca/profile/`}
                  addonBefore="https://gcconnex.gc.ca/profile/"
                  placeholder={intl.formatMessage({ id: "username" })}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="linkedin"
                label={<FormattedMessage id="linkedin.username" />}
                rules={[Rules.maxChar100]}
              >
                <Input
                  aria-label={`${intl.formatMessage({
                    id: "linkedin.username",
                  })} https://linkedin.com/in/`}
                  addonBefore="https://linkedin.com/in/"
                  aria-describedby="linkedin-field-info"
                  placeholder={intl.formatMessage({ id: "username" })}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="github"
                label={<FormattedMessage id="github.username" />}
                rules={[Rules.maxChar100]}
              >
                <Input
                  aria-label={`${intl.formatMessage({
                    id: "github.username",
                  })} https://github.com/`}
                  addonBefore="https://github.com/"
                  aria-describedby="github-field-info"
                  placeholder={intl.formatMessage({ id: "username" })}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider className="prim-headerDiv" />
          <FormSubTitle
            title={<FormattedMessage id="employment.equity.groups" />}
            extra={
              <CardVisibilityToggle
                visibleCards={profileInfo.visibleCards}
                cardName="employmentEquityGroup"
                type="form"
              />
            }
          />
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item name="employmentEquityGroups">
                <AliSelect
                  initialValueId={
                    getInitialValues({ profile: profileInfo })
                      .employmentEquityGroups
                  }
                  placeholderText={<FormattedMessage id="select" />}
                  options={employmentEquityOptions}
                  isSearchable={false}
                  isMulti
                />
                {/* <Select
                  showSearch
                  mode="multiple"
                  placeholder={<FormattedMessage id="search" />}
                  allowClear
                  filterOption={filterOption}
                  className="custom-bubble-select-style"
                  aria-label={intl.formatMessage({
                    id: "employment.equity.groups",
                  })}
                >
                  {employmentEquityOptions.map(({ key, text }) => (
                    <Option key={key}>{text}</Option>
                  ))}
                </Select> */}
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

PrimaryInfoFormView.propTypes = {
  locationOptions: IdDescriptionPropType,
  profileInfo: ProfileInfoPropType,
  load: PropTypes.bool.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  employmentEquityOptions: KeyTitleOptionsPropType.isRequired,
};

PrimaryInfoFormView.defaultProps = {
  locationOptions: [],
  profileInfo: null,
};

export default PrimaryInfoFormView;

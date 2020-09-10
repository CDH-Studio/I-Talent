import React, { useState } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Input,
  Button,
  notification,
  List,
  Popover,
  Modal,
  Spin,
} from "antd";
import {
  LinkOutlined,
  LoadingOutlined,
  InfoCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import { isEqual, identity, pickBy, find } from "lodash";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { isMobilePhone } from "validator";
import { Prompt } from "react-router";
import useAxios from "../../../utils/axios-instance";
import {
  IdDescriptionPropType,
  ProfileInfoPropType,
  IntlPropType,
  HistoryPropType,
  KeyTitleOptionsPropType,
} from "../../../utils/customPropTypes";
import handleError from "../../../functions/handleError";
import OrgTree from "../../orgTree/OrgTree";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import filterOption from "../../../functions/filterSelectInput";
import FormControlButton from "../formControlButtons/FormControlButtons";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";

const { Option } = Select;
const { Title, Text } = Typography;

const PrimaryInfoFormView = ({
  locationOptions,
  profileInfo,
  load,
  formType,
  intl,
  history,
  userId,
  email,
  employmentEquityOptions,
}) => {
  const axios = useAxios();
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [newGedsValues, setNewGedsValues] = useState(null);
  const [gatheringGedsData, setGatheringGedsData] = useState(null);

  const { locale } = useSelector((state) => state.settings);
  const { id, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  /* Component Styles */
  const styles = {
    skeleton: {
      minHeight: "621px",
      maxWidth: "900px",
      background: "#fff",
      padding: "30px 30px",
    },
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
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
    unsavedText: {
      marginLeft: "10px",
      fontWeight: "normal",
      fontStyle: "italic",
      opacity: 0.5,
    },
    gedsInfoLink: {
      display: "inline",
      float: "right",
    },
    popoverStyle: {
      maxWidth: "430px",
    },
    rightSpacedButton: {
      marginRight: "1em",
    },
    infoIcon: {
      marginLeft: "5px",
    },
    popoverStyleCareer: {
      marginLeft: "8px",
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
      message: <FormattedMessage id="profile.rules.max.50" />,
    },
    maxChar100: {
      max: 100,
      message: <FormattedMessage id="profile.rules.max.100" />,
    },
    telephoneFormat: [
      {
        pattern: /^\d{3}-\d{3}-\d{4}$/i,
        message: <FormattedMessage id="profile.rules.phone.number" />,
      },
      {
        validator(rule, value) {
          if (!value || isMobilePhone(value, "en-CA")) {
            return Promise.resolve();
          }

          return Promise.reject(
            intl.formatMessage({ id: "profile.rules.valid.phone.number" })
          );
        },
      },
    ],
    emailFormat: {
      pattern: /\S+@\S+\.ca/i,
      message: <FormattedMessage id="profile.rules.email" />,
    },
    nameFormat: {
      pattern: /^[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+$|^([a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+-[a-zA-ZàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]+)*$/,
      message: <FormattedMessage id="profile.rules.name" />,
    },
  };

  /* Save data */
  const saveDataToDB = async (values) => {
    const dbValues = {
      ...values,
    };
    if (values.jobTitle) {
      dbValues.jobTitle = {
        [locale]: values.jobTitle,
      };
    }
    try {
      await axios.put(`api/profile/${userId}?language=${locale}`, dbValues);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
      case "jobTitleLangEN":
        notification.warning({
          description: intl.formatMessage({
            id: "profile.edit.save.jobTitle.warning.en",
          }),
        });
        break;
      case "jobTitleLangFR":
        notification.warning({
          description: intl.formatMessage({
            id: "profile.edit.save.jobTitle.warning.fr",
          }),
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
        firstName: profile.firstName,
        lastName: profile.lastName,
        telephone: profile.telephone,
        jobTitle: profile.jobTitle,
        cellphone: profile.cellphone,
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
      savedValues || getInitialValues(profileInfo),
      identity
    );

    setFieldsChanged(!isEqual(formValues, dbValues));
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
          <li key="1">
            {intl.formatMessage({ id: "setup.primary.information" })}
          </li>
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
      })
      .then(() => history.push("/profile/create/step/3"))
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
      })
      .then(() => {
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

  const onSyncGedsInfo = async () => {
    setGatheringGedsData(true);
    await axios
      .get(`api/profGen/sync/${id}`, {
        params: {
          name,
        },
      })
      .then((result) => {
        if (Object.keys(result.data).length) {
          setNewGedsValues(result.data);
        } else {
          notification.info({
            message: intl.formatMessage({ id: "profile.geds.up.to.date" }),
          });
        }
      })
      .catch(() =>
        notification.warning({
          message: intl.formatMessage({
            id: "profile.geds.failed.to.retrieve",
          }),
        })
      );
    setGatheringGedsData(false);
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    notification.info({
      message: intl.formatMessage({ id: "profile.form.clear" }),
    });
    checkIfFormValuesChanged();
  };

  /* Generate form header based on form type */
  const getFormHeader = (_formType) => {
    if (_formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          2. <FormattedMessage id="setup.primary.information" />
          <div style={styles.gedsInfoLink}>
            <Popover
              content={
                <div style={styles.popoverStyle}>
                  <FormattedMessage id="profile.geds.edit.info1" />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://userprofile.prod.prv/icpup.asp?lang=E"
                  >
                    <FormattedMessage id="profile.geds.edit.info.link" />
                  </a>
                  <FormattedMessage id="profile.geds.edit.info2" />
                </div>
              }
            >
              <InfoCircleOutlined />
            </Popover>
          </div>
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="setup.primary.information" />
        <div style={styles.gedsInfoLink}>
          <Button onClick={onSyncGedsInfo} style={styles.rightSpacedButton}>
            <SyncOutlined />
            <span>
              <FormattedMessage id="profile.geds.sync.button" />
            </span>
          </Button>
          <Popover
            content={
              <div style={styles.popoverStyle}>
                <FormattedMessage id="profile.geds.edit.info1" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://userprofile.prod.prv/icpup.asp?lang=E"
                >
                  <FormattedMessage id="profile.geds.edit.info.link" />
                </a>
                <FormattedMessage id="profile.geds.edit.info2" />
              </div>
            }
          >
            <InfoCircleOutlined />
          </Popover>
        </div>
        {fieldsChanged && (
          <Text style={styles.unsavedText}>
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
  };

  const handleGedsConfirm = async () => {
    await axios
      .put(`api/profile/${userId}?language=ENGLISH`, newGedsValues)
      .then(() => {
        const possibleKeys = [
          "firstName",
          "lastName",
          "cellphone",
          "telephone",
          "jobTitle",
          "locationId",
        ];

        const newFieldVals = [];
        possibleKeys.forEach((key) => {
          if (key in newGedsValues) {
            if (key === "jobTitle") {
              const tempVal = newGedsValues[key];
              newFieldVals.push({ name: key, value: tempVal[locale] });
            } else {
              newFieldVals.push({ name: key, value: newGedsValues[key] });
            }
          }
        });
        form.setFields(newFieldVals);
      })
      .catch((error) => handleError(error, "message"));
    setNewGedsValues(null);
  };

  const generateGedsModal = () => {
    const changes = [];

    if (newGedsValues) {
      if (newGedsValues.firstName) {
        changes.push({
          title: <FormattedMessage id="profile.first.name" />,
          description: profileInfo.firstName,
        });
      }

      if (newGedsValues.lastName) {
        changes.push({
          title: <FormattedMessage id="profile.last.name" />,
          description: profileInfo.lastName,
        });
      }

      if (newGedsValues.locationId) {
        const locationOption = find(
          locationOptions,
          (option) => option.id === newGedsValues.locationId
        );
        changes.push({
          title: <FormattedMessage id="profile.location" />,
          description: `${locationOption.streetNumber} ${locationOption.streetName}
                  ${locationOption.city}, ${locationOption.province}`,
        });
      }

      if (newGedsValues.email) {
        changes.push({
          title: <FormattedMessage id="profile.telephone" />,
          description: profileInfo.email,
        });
      }

      if (newGedsValues.cellphone) {
        changes.push({
          title: <FormattedMessage id="profile.cellphone" />,
          description: profileInfo.cellphone,
        });
      }

      if (newGedsValues.telephone) {
        changes.push({
          title: <FormattedMessage id="profile.telephone" />,
          description: profileInfo.telephone,
        });
      }

      if (newGedsValues.jobTitle) {
        changes.push({
          title: <FormattedMessage id="profile.career.header.name" />,
          description: newGedsValues.jobTitle[locale],
        });
      }

      if (newGedsValues.branch) {
        changes.push({
          title: <FormattedMessage id="profile.branch" />,
          description: newGedsValues.branch[locale],
        });
      }

      if (newGedsValues.organizations) {
        changes.push({
          title: <FormattedMessage id="profile.branch" />,
          description: <OrgTree data={newGedsValues} />,
        });
      }
    }

    // Fixes scrollbar disabling after pressing ok button
    if (!(gatheringGedsData || newGedsValues)) {
      return undefined;
    }

    return (
      <Modal
        title={<FormattedMessage id="profile.geds.changes" />}
        visibility={gatheringGedsData || newGedsValues}
        onOk={handleGedsConfirm}
        onCancel={() => {
          setNewGedsValues(null);
          setGatheringGedsData(null);
        }}
        okButtonProps={!newGedsValues ? { disabled: true } : null}
      >
        {newGedsValues ? (
          <List>
            {changes.map((item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            ))}
          </List>
        ) : (
          <div style={{ textAlign: "center" }}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          </div>
        )}
      </Modal>
    );
  };

  const urlPopover = (url) => (
    <Popover
      content={
        <div style={{ textAlign: "center" }}>
          <FormattedMessage
            id="profile.username.help"
            values={{
              url,
              b: (chunks) => <b>{chunks}</b>,
              br: () => <br />,
            }}
          />
        </div>
      }
    >
      <InfoCircleOutlined style={styles.infoIcon} />
    </Popover>
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
        {generateGedsModal()}
        {/* get form title */}
        {getFormHeader(formType)}
        <Divider style={styles.headerDiv} />
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          initialValues={savedValues || getInitialValues(profileInfo)}
          layout="vertical"
          form={form}
          onValuesChange={checkIfFormValuesChanged}
        >
          {/* Form Row One */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="firstName"
                label={<FormattedMessage id="profile.first.name" />}
                rules={[Rules.required, Rules.maxChar50, Rules.nameFormat]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
              <Form.Item
                name="lastName"
                label={<FormattedMessage id="profile.last.name" />}
                rules={[Rules.required, Rules.maxChar50, Rules.nameFormat]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Two */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="jobTitle"
                label={
                  <>
                    <FormattedMessage id="profile.career.header.name" />
                    <div style={styles.popoverStyleCareer}>
                      <Popover
                        content={
                          <div style={styles.popoverStyle}>
                            <FormattedMessage id="profile.career.header.tooltip" />
                          </div>
                        }
                      >
                        <InfoCircleOutlined />
                      </Popover>
                    </div>
                  </>
                }
                rules={[Rules.maxChar50]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="email"
                label={<FormattedMessage id="profile.email" />}
                rules={[Rules.emailFormat, Rules.maxChar50]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="teams"
                label={<FormattedMessage id="profile.teams" />}
                className="custom-bubble-select-style"
              >
                <Select
                  mode="tags"
                  style={{ width: "100%" }}
                  notFoundContent={
                    <FormattedMessage id="setup.teams.placeholder" />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Three */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="locationId"
                label={<FormattedMessage id="profile.location" />}
                rules={[Rules.required, Rules.maxChar50]}
              >
                <Select
                  showSearch
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
                >
                  {locationOptions.map((value) => {
                    return (
                      <Option key={value.id}>
                        {value.streetNumber} {value.streetName}, {value.city},{" "}
                        {value.province}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="telephone"
                label={<FormattedMessage id="profile.telephone" />}
                rules={Rules.telephoneFormat}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
              <Form.Item
                name="cellphone"
                label={<FormattedMessage id="profile.cellphone" />}
                rules={[Rules.telephoneFormat]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Four */}
          <Row
            gutter={24}
            style={{
              backgroundColor: "#dfe5e4",
              paddingTop: "15px",
              marginBottom: "20px",
              marginTop: "10px",
            }}
          >
            <Col className="gutter-row" span={24}>
              <LinkOutlined /> <FormattedMessage id="setup.link.profiles" />
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="gcconnex"
                label={
                  <>
                    <FormattedMessage id="profile.gcconnex.username" />
                    {urlPopover("https://gcconnex.gc.ca/profile/")}
                  </>
                }
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="linkedin"
                label={
                  <>
                    <FormattedMessage id="profile.linkedin.username" />
                    {urlPopover("https://linkedin.com/in/")}
                  </>
                }
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
              <Form.Item
                name="github"
                label={
                  <>
                    <FormattedMessage id="profile.github.username" />
                    {urlPopover("https://github.com/")}
                  </>
                }
                rules={[Rules.maxChar100]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Divider style={styles.headerDiv} />
          <Row
            justify="space-between"
            style={styles.sectionHeader}
            align="middle"
          >
            <Title level={3} style={styles.formTitle}>
              <FormattedMessage id="profile.employment.equity.groups" />
            </Title>
            <CardVisibilityToggle
              visibleCards={profileInfo.visibleCards}
              cardName="employmentEquityGroup"
              type="form"
            />
          </Row>
          <Row gutter={24}>
            <Col className="gutter-row" span={24}>
              <Form.Item name="employmentEquityGroups">
                <Select
                  showSearch
                  mode="multiple"
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
                  className="custom-bubble-select-style"
                >
                  {employmentEquityOptions.map(({ key, text }) => (
                    <Option key={key}>{text}</Option>
                  ))}
                </Select>
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
  intl: IntlPropType,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  employmentEquityOptions: KeyTitleOptionsPropType.isRequired,
};

PrimaryInfoFormView.defaultProps = {
  locationOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(PrimaryInfoFormView);

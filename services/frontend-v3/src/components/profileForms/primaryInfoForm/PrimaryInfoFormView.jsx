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
  message,
  List,
  Popover,
  Modal,
  Spin,
} from "antd";
import {
  LinkOutlined,
  RightOutlined,
  CheckOutlined,
  QuestionCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import axios from "axios";
import _ from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { isMobilePhone } from "validator";
import {
  IdDescriptionPropType,
  ProfileInfoPropType,
  IntlPropType,
  HistoryPropType,
} from "../../../customPropTypes";
import config from "../../../config";
import handleError from "../../../functions/handleError";
import OrgTree from "../../orgTree/OrgTree";

const { backendAddress } = config;
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
}) => {
  const [form] = Form.useForm();
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [newGedsValues, setNewGedsValues] = useState(null);
  const [gatheringGedsData, setGatheringGedsData] = useState(null);

  const { locale } = useSelector((state) => state.settings);
  const { id, name } = useSelector((state) => state.user);

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
      minWidth: "100%",
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
  };

  /* Save data */
  const saveDataToDB = async (values) => {
    try {
      await axios.put(
        `${backendAddress}api/profile/${userId}?language=${locale}`,
        values
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
        firstName: profile.firstName,
        lastName: profile.lastName,
        telephone: profile.telephone,
        cellphone: profile.cellphone,
        email: profile.email,
        locationId: profile.officeLocation
          ? profile.officeLocation.id
          : undefined,
        teams: profile.teams,
        gcconnex: profile.gcconnex,
        linkedin: profile.linkedin,
        github: profile.github,
      };
    }
    return { email };
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
      })
      .then(() => history.push("/secured/profile/create/step/3"))
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
      })
      .then(() => {
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

  const onSyncGedsInfo = async () => {
    setGatheringGedsData(true);
    await axios
      .get(`${backendAddress}api/profGen/${id}`, {
        params: {
          name,
        },
      })
      .then((result) => {
        if (result) {
          const newGedsData = {};
          Object.keys(result.data).forEach((key) => {
            if (result.data[key]) {
              if (key === "locationId") {
                if (
                  result.data.locationId !==
                  (profileInfo.officeLocation && profileInfo.officeLocation.id)
                ) {
                  newGedsData.locationId = result.data.locationId;
                }
              } else if (key === "jobTitle") {
                if (result.data.jobTitle[locale] !== profileInfo.jobTitle) {
                  newGedsData.jobTitle = result.data.jobTitle;
                }
              } else if (key === "organizations") {
                //Check for same amount of organizations
                let identical =
                  profileInfo.organizations &&
                  result.data.organizations.length ===
                    profileInfo.organizations.length;
                if (identical) {
                  //Check each organization chain is the same length
                  for (
                    let i = 0;
                    i < profileInfo.organizations.length;
                    i += 1
                  ) {
                    identical =
                      result.data.organizations[i].length ===
                      profileInfo.organizations[i].length;
                    if (identical) {
                      //Check each organization chain has the same title
                      for (
                        let j = 0;
                        j < profileInfo.organizations[i].length;
                        j += 1
                      ) {
                        identical =
                          profileInfo.organizations[i][j].title ===
                          result.data.organizations[i][j].title[locale];
                        if (!identical) {
                          break;
                        }
                      }
                    } else {
                      break;
                    }
                  }
                }
                if (!identical) {
                  newGedsData.organizations = result.data.organizations;
                }
              } else if (result.data[key] !== profileInfo[key]) {
                newGedsData[key] = result.data[key];
              }
            }
          });
          if (Object.keys(newGedsData).length) {
            setNewGedsValues(newGedsData);
          } else {
            message.info(<FormattedMessage id="data.up.to.date" />);
          }
        }
      })
      .catch((error) => handleError(error, "message"));
    setGatheringGedsData(false);
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    message.info(intl.formatMessage({ id: "profile.form.clear" }));
    checkIfFormValuesChanged();
  };

  /* Generate form header based on form type */
  const getFormHeader = (_formType) => {
    if (_formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          2. <FormattedMessage id="setup.primary.information" />
          <div style={styles.gedsInfoLink}>
            <Button onClick={onSyncGedsInfo} style={styles.rightSpacedButton}>
              Update GEDS info
            </Button>
            <Popover
              trigger="click"
              tabIndex="0"
              content={
                <div style={styles.popoverStyle}>
                  <FormattedMessage id="profile.geds.edit.info1" />
                  <a href="https://userprofile.prod.prv/icpup.asp?lang=E">
                    <FormattedMessage id="profile.geds.edit.info.link" />
                  </a>
                  <FormattedMessage id="profile.geds.edit.info2" />
                </div>
              }
            >
              <QuestionCircleOutlined />
            </Popover>
          </div>
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="setup.primary.information" />
        <div style={styles.gedsInfoLink}>
          <Popover
            trigger="click"
            tabIndex="0"
            content={
              <div style={styles.popoverStyle}>
                <FormattedMessage id="profile.geds.edit.info1" />
                <a href="https://userprofile.prod.prv/icpup.asp?lang=E">
                  <FormattedMessage id="profile.geds.edit.info.link" />
                </a>
                <FormattedMessage id="profile.geds.edit.info2" />
              </div>
            }
          >
            <QuestionCircleOutlined />
          </Popover>
        </div>
        {fieldsChanged && <Text style={styles.unsavedText}>(unsaved)</Text>}
      </Title>
    );
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

  const handleGedsConfirm = async () => {
    await axios
      .put(
        `${backendAddress}api/profile/${userId}?language=ENGLISH`,
        newGedsValues
      )
      .then(() => {
        if (gatheringGedsData) {
          const newFormValues = Object.keys(
            Object.keys(newGedsValues).map((key) => ({
              name: key,
              value: newGedsValues[key],
            }))
          );
          form.setFields(newFormValues);
        }
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
        const locationOption = _.find(
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

      if (newGedsValues.phoneNumber) {
        changes.push({
          title: <FormattedMessage id="profile.cellphone" />,
          description: profileInfo.phoneNumber,
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
          title: <FormattedMessage id="profile.job.title" />,
          description: newGedsValues.jobTitle[locale],
        });
      }

      if (newGedsValues.organizations) {
        changes.push({
          title: <FormattedMessage id="profile.branch" />,
          description: <OrgTree data={newGedsValues} />,
        });
      }
    }

    return (
      <Modal
        title={<FormattedMessage id="profile.geds.changes" />}
        visible={gatheringGedsData || newGedsValues}
        onOk={handleGedsConfirm && handleGedsConfirm}
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
              rules={[Rules.required, Rules.maxChar50]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="lastName"
              label={<FormattedMessage id="profile.last.name" />}
              rules={[Rules.required, Rules.maxChar50]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {/* Form Row Two */}
        <Row gutter={24}>
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

          <Col className="gutter-row" xs={24} md={8} lg={8} xl={8}>
            <Form.Item
              name="email"
              label={<FormattedMessage id="profile.email" />}
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
              name="locationId"
              label={<FormattedMessage id="profile.location" />}
              rules={[Rules.required, Rules.maxChar50]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                allowClear
                filterOption={(input, option) =>
                  option.children
                    .join("")
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
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
          <Col className="gutter-row" xs={24} md={12} lg={12} xl={12}>
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
              label={<FormattedMessage id="profile.gcconnex.url" />}
              rules={[Rules.maxChar100]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
            <Form.Item
              name="linkedin"
              label={<FormattedMessage id="profile.linkedin.url" />}
              rules={[Rules.maxChar100]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
            <Form.Item
              name="github"
              label={<FormattedMessage id="profile.github.url" />}
              rules={[Rules.maxChar100]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        {getFormControlButtons(formType)}
      </Form>
    </div>
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
};

PrimaryInfoFormView.defaultProps = {
  locationOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(PrimaryInfoFormView);

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Switch,
  DatePicker,
  Button,
  message,
} from "antd";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import _ from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import axios from "../../../axios-instance";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  IntlPropType,
  HistoryPropType,
} from "../../../customPropTypes";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import handleError from "../../../functions/handleError";

const { Option } = Select;
const { Title, Text } = Typography;

/**
 *  LangProficiencyFormView(props)
 *  this component renders the language proficiency form.
 *  It contains a toggle to set the second language
 */
const LangProficiencyFormView = ({
  formType,
  languageOptions,
  load,
  proficiencyOptions,
  profileInfo,
  intl,
  history,
  userId,
}) => {
  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);

  const { locale } = useSelector((state) => state.settings);

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
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="profile.rules.required" />,
    },
  };

  /* Save data */
  const saveDataToDB = async (values) => {
    const dbValues = {
      secondLangProfs: [],
    };

    // If firstLanguage is undefined then clear value in DB
    if (values.firstLanguage) {
      dbValues.firstLanguage = values.firstLanguage;
    } else {
      dbValues.firstLanguage = null;
    }

    if (displayMentorshipForm) {
      // set second language based on first language
      dbValues.secondLanguage =
        values.firstLanguage === "ENGLISH" ? "FRENCH" : "ENGLISH";

      if (
        values.oralProficiency ||
        values.writingProficiency ||
        values.readingProficiency
      ) {
        if (values.oralProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "ORAL",
            level: values.oralProficiency,
            date: values.secondaryOralDate,
          });
        }

        if (values.writingProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "WRITING",
            level: values.writingProficiency,
            date: values.secondaryWritingDate,
          });
        }

        if (values.readingProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "READING",
            level: values.readingProficiency,
            date: values.secondaryReadingDate,
          });
        }
      }
    }

    await axios.put(`api/profile/${userId}?language=${locale}`, dbValues);
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
    // Get default language from API and convert to dropdown key
    if (profile) {
      const data = {
        firstLanguage: profile.firstLanguage,
      };

      if (profile.secondLangProfs) {
        profile.secondLangProfs.forEach(({ date, level, proficiency }) => {
          switch (proficiency) {
            case "ORAL":
              data.oralProficiency = level;
              data.secondaryOralDate = date ? moment(date) : undefined;
              break;

            case "WRITING":
              data.writingProficiency = level;
              data.secondaryWritingDate = date ? moment(date) : undefined;
              break;

            case "READING":
              data.readingProficiency = level;
              data.secondaryReadingDate = date ? moment(date) : undefined;
              break;

            default:
              break;
          }
        });
      }

      return data;
    }
    return {};
  };

  /* toggle temporary role form */
  const toggleSecLangForm = () => {
    setDisplayMentorshipForm((prev) => !prev);
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
        history.push("/secured/profile/create/step/5");
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

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    message.info(intl.formatMessage({ id: "profile.form.clear" }));

    const data = savedValues || getInitialValues(profileInfo);
    setDisplayMentorshipForm(data.oralProficiency);
    setFieldsChanged(false);
  };

  // Updates the unsaved indicator based on the toggle and form values
  useEffect(() => {
    const data = savedValues || getInitialValues(profileInfo);
    const oppositeInitialToggle =
      !!data.oralProficiency !== displayMentorshipForm;

    setFieldsChanged(oppositeInitialToggle || checkIfFormValuesChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMentorshipForm]);

  /*
   * Get Form Control Buttons
   *
   * Get Form Control Buttons based on form type (edit or create)
   */
  const getFormControlButtons = () => {
    if (formType === "create") {
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
    if (formType === "edit") {
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

  /* Get temporary role form based on if the form switch is toggled */
  const getSecondLanguageForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <div>
          {/* Reading Proficiency */}
          <Row gutter={24} style={{ marginTop: "10px" }}>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="readingProficiency"
                label={
                  <FormattedMessage id="profile.secondary.reading.proficiency" />
                }
                rules={[Rules.required]}
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
                  {proficiencyOptions.map((value) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="secondaryReadingDate"
                label={<FormattedMessage id="profile.secondary.writing.date" />}
              >
                <DatePicker style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>

          {/* Writing Proficiency */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="writingProficiency"
                label={
                  <FormattedMessage id="profile.secondary.writing.proficiency" />
                }
                rules={[Rules.required]}
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
                  {proficiencyOptions.map((value) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="secondaryWritingDate"
                label={<FormattedMessage id="profile.secondary.writing.date" />}
              >
                <DatePicker style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>

          {/* Oral Proficiency */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="oralProficiency"
                label={
                  <FormattedMessage id="profile.secondary.oral.proficiency" />
                }
                rules={[Rules.required]}
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
                  {proficiencyOptions.map((value) => {
                    return <Option key={value.key}>{value.text}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
              <Form.Item
                name="secondaryOralDate"
                label={<FormattedMessage id="profile.secondary.writing.date" />}
              >
                <DatePicker style={styles.datePicker} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    }
    return <div />;
  };

  /* Generate form header based on form type */
  const getFormHeader = () => {
    if (formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          4. <FormattedMessage id="setup.language.proficiency" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="setup.language.proficiency" />
        {fieldsChanged && (
          <Text style={styles.unsavedText}>
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
  };

  useEffect(() => {
    /* check if user has a second language */
    setDisplayMentorshipForm(
      profileInfo ? profileInfo.secondLangProfs.length !== 0 : false
    );
  }, [profileInfo]);

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
        onValuesChange={updateIfFormValuesChanged}
      >
        {/* Form Row One */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="firstLanguage"
              label={<FormattedMessage id="profile.first.language" />}
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
                {languageOptions.map((value) => {
                  return <Option key={value.key}>{value.text}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* Form Row Four: Temporary role */}
        <Row style={styles.secondLangRow} gutter={24}>
          <Col className="gutter-row" span={24}>
            <FormLabelTooltip
              labelText={
                <FormattedMessage id="profile.graded.on.second.language" />
              }
              tooltipText="Extra information"
            />
            <Switch
              checked={displayMentorshipForm}
              onChange={toggleSecLangForm}
            />
            {getSecondLanguageForm(displayMentorshipForm)}
          </Col>
        </Row>
        {/* Form Row Five: Submit button */}
        {getFormControlButtons(formType)}
      </Form>
    </div>
  );
};

LangProficiencyFormView.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  languageOptions: KeyTitleOptionsPropType,
  load: PropTypes.bool.isRequired,
  proficiencyOptions: KeyTitleOptionsPropType,
  profileInfo: ProfileInfoPropType,
  intl: IntlPropType,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
};

LangProficiencyFormView.defaultProps = {
  languageOptions: [],
  proficiencyOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(LangProficiencyFormView);

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
  Popover,
  Checkbox,
} from "antd";
import {
  RightOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import { pickBy, identity, isEqual } from "lodash";
import PropTypes from "prop-types";
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
import filterOption from "../../../functions/filterSelectInput";

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
  expiredGrades,
  setExpiredGrades,
}) => {
  const axios = useAxios();
  const [form] = Form.useForm();
  const [displaySecondLangForm, setDisplaySecondLangForm] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [loadedData, setLoadedData] = useState(false);

  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

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
      margin: 0,
    },
    headerDiv: {
      margin: "15px 0 15px 0",
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

    if (displaySecondLangForm) {
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
            date: values.secondaryOralExpired
              ? moment.unix(0)
              : values.secondaryOralDate,
          });
        }

        if (values.writingProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "WRITING",
            level: values.writingProficiency,
            date: values.secondaryWritingExpired
              ? moment.unix(0)
              : values.secondaryWritingDate,
          });
        }

        if (values.readingProficiency) {
          dbValues.secondLangProfs.push({
            proficiency: "READING",
            level: values.readingProficiency,
            date: values.secondaryReadingExpired
              ? moment.unix(0)
              : values.secondaryReadingDate,
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
        profile.secondLangProfs.forEach(
          ({ date, level, expired, proficiency }) => {
            switch (proficiency) {
              case "ORAL":
                data.oralProficiency = level;
                data.secondaryOralDate = date ? moment(date) : undefined;
                data.secondaryOralExpired = expired;
                break;

              case "WRITING":
                data.writingProficiency = level;
                data.secondaryWritingDate = date ? moment(date) : undefined;
                data.secondaryWritingExpired = expired;
                break;

              case "READING":
                data.readingProficiency = level;
                data.secondaryReadingDate = date ? moment(date) : undefined;
                data.secondaryReadingExpired = expired;
                break;

              default:
                break;
            }
          }
        );
      }

      return data;
    }
    return {};
  };

  /* toggle temporary role form */
  const toggleSecLangForm = () => {
    setDisplaySecondLangForm((prev) => !prev);
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
    const formFields = form.getFieldsValue();
    setExpiredGrades({
      reading: formFields.secondaryReadingExpired,
      writing: formFields.secondaryWritingExpired,
      oral: formFields.secondaryOralExpired,
    });
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
        history.push("/profile/create/step/5");
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
    history.push(`/profile/${userId}`);
  };

  /* save and redirect to home */
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
          openNotificationWithIcon("error");
        }
      });
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
    message.info(intl.formatMessage({ id: "profile.form.clear" }));

    const data = savedValues || getInitialValues(profileInfo);
    setDisplaySecondLangForm(data.oralProficiency);
    setFieldsChanged(false);
  };

  // Updates the unsaved indicator based on the toggle and form values
  useEffect(() => {
    const data = savedValues || getInitialValues(profileInfo);
    const oppositeInitialToggle =
      !!data.oralProficiency !== displaySecondLangForm;
    setFieldsChanged(oppositeInitialToggle || checkIfFormValuesChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySecondLangForm]);

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
    let formValues = form.getFieldsValue();

    if (expandMentorshipForm) {
      formValues = Object.assign(getInitialValues(profileInfo), formValues);

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
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
                className="language-date-item"
              >
                <DatePicker
                  disabled={expiredGrades.reading}
                  style={styles.datePicker}
                />
              </Form.Item>
              <Form.Item name="secondaryReadingExpired" valuePropName="checked">
                <Checkbox
                  valuePropName="checked"
                  defaultChecked={formValues.secondaryReadingDate}
                >
                  <FormattedMessage id="date.unknown.expired" />
                </Checkbox>
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
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
                className="language-date-item"
              >
                <DatePicker
                  disabled={expiredGrades.writing}
                  style={styles.datePicker}
                />
              </Form.Item>
              <Form.Item name="secondaryWritingExpired" valuePropName="checked">
                <Checkbox
                  valuePropName="checked"
                  defaultChecked={formValues.secondaryWritingDate}
                >
                  <FormattedMessage id="date.unknown.expired" />
                </Checkbox>
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
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
                label={<FormattedMessage id="profile.secondary.oral.date" />}
                className="language-date-item"
              >
                <DatePicker
                  disabled={expiredGrades.oral}
                  style={styles.datePicker}
                />
              </Form.Item>
              <Form.Item name="secondaryOralExpired" valuePropName="checked">
                <Checkbox
                  valuePropName="checked"
                  defaultChecked={formValues.secondaryOralDate}
                >
                  <FormattedMessage id="date.unknown.expired" />
                </Checkbox>
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
    if (!loadedData && load) {
      /* check if user has a second language */
      const hasSubformData = profileInfo
        ? profileInfo.secondLangProfs.length !== 0
        : false;
      setDisplaySecondLangForm(hasSubformData);

      // Makes the subform not reset on language change
      setLoadedData(true);
    }
  }, [displaySecondLangForm, load, loadedData, profileInfo]);

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
              cardName="officialLanguage"
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
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="firstLanguage"
                label={<FormattedMessage id="profile.first.language" />}
              >
                <Select
                  showSearch
                  placeholder={<FormattedMessage id="setup.select" />}
                  allowClear
                  filterOption={filterOption}
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
              <Text>
                <FormattedMessage id="profile.graded.on.second.language" />
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
                checked={displaySecondLangForm}
                onChange={toggleSecLangForm}
              />
              {getSecondLanguageForm(displaySecondLangForm)}
            </Col>
          </Row>
          {/* Form Row Five: Submit button */}
          {getFormControlButtons(formType)}
        </Form>
      </div>
    </>
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
  expiredGrades: PropTypes.shape({
    reading: PropTypes.bool,
    writing: PropTypes.bool,
    oral: PropTypes.bool,
  }).isRequired,
  setExpiredGrades: PropTypes.func.isRequired,
};

LangProficiencyFormView.defaultProps = {
  languageOptions: [],
  proficiencyOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(LangProficiencyFormView);

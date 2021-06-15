import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Switch,
  notification,
  Space,
} from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { identity, pickBy } from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Prompt } from "react-router";
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
import "./LangProficiencyFormView.less";

const { Option } = Select;
const { Text } = Typography;

/**
 *  LangProficiencyFormView(props)
 *  this component renders the language proficiency form.
 *  It contains a toggle to set the second language
 */
const LangProficiencyFormView = ({
  formType,
  languageOptions,
  statusOptions,
  load,
  proficiencyOptions,
  profileInfo,
  intl,
  history,
  userId,
  saveDataToDB,
}) => {
  const [form] = Form.useForm();
  const [displaySecondLangForm, setDisplaySecondLangForm] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [loadedData, setLoadedData] = useState(false);
  const dispatch = useDispatch();

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="rules.required" />,
    },
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
    // Get default language from API and convert to dropdown key
    if (profile) {
      const data = {
        firstLanguage: profile.firstLanguage,
      };
      if (profile.secondLangProfs) {
        profile.secondLangProfs.forEach(({ status, level, proficiency }) => {
          if (proficiency === "ORAL") {
            data.oralProficiency = level;
            data.secondaryOralStatus = status;
          } else if (proficiency === "WRITING") {
            data.writingProficiency = level;
            data.secondaryWritingStatus = status;
          } else if (proficiency === "READING") {
            data.readingProficiency = level;
            data.secondaryReadingStatus = status;
          }
        });
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

    // Check each field of the form to see if there are changed values
    if (formValues) {
      if (formValues.firstLanguage) {
        if (formValues.firstLanguage !== dbValues.firstLanguage) return true;
      } else if (dbValues.firstLanguage) return true;

      if (formValues.readingProficiency) {
        if (formValues.readingProficiency !== dbValues.readingProficiency)
          return true;
      } else if (dbValues.readingProficiency) return true;

      if (formValues.writingProficiency) {
        if (formValues.writingProficiency !== dbValues.writingProficiency)
          return true;
      } else if (dbValues.writingProficiency) return true;

      if (formValues.oralProficiency) {
        if (formValues.oralProficiency !== dbValues.oralProficiency)
          return true;
      } else if (dbValues.oralProficiency) return true;

      if (formValues.secondaryOralStatus) {
        if (formValues.secondaryOralStatus !== dbValues.secondaryOralStatus)
          return true;
      } else if (dbValues.secondaryOralStatus) return true;

      if (formValues.secondaryReadingStatus) {
        if (
          formValues.secondaryReadingStatus !== dbValues.secondaryReadingStatus
        )
          return true;
      } else if (dbValues.secondaryReadingStatus) return true;

      if (formValues.secondaryWritingStatus) {
        if (
          formValues.secondaryWritingStatus !== dbValues.secondaryWritingStatus
        )
          return true;
      } else if (dbValues.secondaryWritingStatus) return true;
    }
    return false;
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
        <li key="1">{intl.formatMessage({ id: "official.languages" })}</li>
      </ul>
    </div>
  );

  /*
   * Finish
   *
   * redirect to profile
   */
  const onFinish = () => {
    history.push(`/profile/${userId}`);
  };

  /*
   * Save options:
   * num = 1 : save
   * num = 2 : save and next
   * num = 3 : save and finish
   */
  const onSave = async (num) => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values, displaySecondLangForm);
        setFieldsChanged(false);
        if (num === 1) {
          setSavedValues(values);
          openNotificationWithIcon({ type: "success" });
        } else if (num === 2) {
          history.push("/profile/create/step/5");
        } else if (num === 3) {
          if (formType === "create") {
            history.push("/profile/create/step/8");
          } else {
            dispatch(setSavedFormContent(true));
            onFinish();
          }
        }
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
   * On Reset
   *
   * reset form fields to state when page was loaded
   */
  const onReset = () => {
    form.resetFields();
    notification.info({
      message: intl.formatMessage({ id: "form.clear" }),
    });

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

  const getSecondLangRows = (name, label, statusName) => (
    <Row gutter={24} style={{ marginTop: "10px" }}>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name={name}
          label={<FormattedMessage id={label} />}
          rules={[Rules.required]}
        >
          <Select
            showSearch
            placeholder={<FormattedMessage id="search" />}
            allowClear
            filterOption={filterOption}
          >
            {proficiencyOptions.map((value) => (
              <Option key={value.key}>{value.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" xs={24} md={24} lg={12} xl={12}>
        <Form.Item
          name={statusName}
          label={<FormattedMessage id="lang.status" />}
        >
          <Select
            showSearch
            placeholder={<FormattedMessage id="search" />}
            allowClear
            filterOption={filterOption}
          >
            {statusOptions.map((value) => (
              <Option key={value.key}>{value.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );

  /* Get temporary role form based on if the form switch is toggled */
  const getSecondLanguageForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      const formValues = form.getFieldsValue();
      Object.assign(getInitialValues(profileInfo), formValues);
      return (
        <>
          {/* Reading Proficiency */}
          {getSecondLangRows(
            "readingProficiency",
            "secondary.reading.proficiency",
            "secondaryReadingStatus"
          )}
          {/* Writing Proficiency */}
          {getSecondLangRows(
            "writingProficiency",
            "secondary.writing.proficiency",
            "secondaryWritingStatus"
          )}
          {/* Oral Proficiency */}
          {getSecondLangRows(
            "oralProficiency",
            "secondary.oral.proficiency",
            "secondaryOralStatus"
          )}
        </>
      );
    }
    return <></>;
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
      <div className="lang-skeleton">
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
      <div className="lang-content">
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -9 }}>
          <FormTitle
            title={<FormattedMessage id="official.languages" />}
            formType={formType}
            stepNumber={4}
            fieldsChanged={fieldsChanged}
            extra={
              <div style={{ marginTop: -5 }}>
                <CardVisibilityToggle
                  visibleCards={profileInfo.visibleCards}
                  cardName="officialLanguage"
                  type="form"
                />
              </div>
            }
          />
        </Row>
        <Divider className="lang-headerDiv" />
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
                label={<FormattedMessage id="first.official.language" />}
              >
                <Select
                  showSearch
                  placeholder={<FormattedMessage id="search" />}
                  allowClear
                  filterOption={filterOption}
                >
                  {languageOptions.map((value) => (
                    <Option key={value.key}>{value.text}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Four: Temporary role */}
          <Row className="lang-secondLangRow" gutter={24}>
            <Col className="gutter-row" span={24}>
              <Row>
                <Space>
                  <Text>
                    <FormattedMessage id="graded.on.second.language" />
                  </Text>
                  <Switch
                    checked={displaySecondLangForm}
                    onChange={toggleSecLangForm}
                  />
                </Space>
              </Row>
              {getSecondLanguageForm(displaySecondLangForm)}
            </Col>
          </Row>
          {/* Form Row Five: Submit button */}
          <FormControlButton
            formType={formType}
            onSave={() => onSave(1)}
            onSaveAndNext={() => onSave(2)}
            onSaveAndFinish={() => onSave(3)}
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

LangProficiencyFormView.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  languageOptions: KeyTitleOptionsPropType,
  proficiencyOptions: KeyTitleOptionsPropType,
  statusOptions: KeyTitleOptionsPropType,
  load: PropTypes.bool.isRequired,
  profileInfo: ProfileInfoPropType,
  intl: IntlPropType,
  history: HistoryPropType.isRequired,
  userId: PropTypes.string.isRequired,
  saveDataToDB: PropTypes.func.isRequired,
};

LangProficiencyFormView.defaultProps = {
  languageOptions: [],
  proficiencyOptions: [],
  statusOptions: [],
  profileInfo: null,
  intl: null,
};

export default injectIntl(LangProficiencyFormView);

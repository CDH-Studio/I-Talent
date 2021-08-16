import { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Prompt } from "react-router";
import {
  Col,
  Divider,
  Form,
  notification,
  Row,
  Skeleton,
  Switch,
  Typography,
} from "antd";
import { identity, pickBy } from "lodash";
import PropTypes from "prop-types";

import handleError from "../../../functions/handleError";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import {
  HistoryPropType,
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
} from "../../../utils/customPropTypes";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import Fieldset from "../../fieldset/Fieldset";
import CustomDropdown from "../../formItems/CustomDropdown";
import FormControlButton from "../formControlButtons/FormControlButtons";
import FormTitle from "../formTitle/FormTitle";

import "./LangProficiencyFormView.less";

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
  history,
  saveDataToDB,
}) => {
  const [form] = Form.useForm();
  const [displaySecondLangForm, setDisplaySecondLangForm] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [loadedData, setLoadedData] = useState(false);
  const dispatch = useDispatch();
  const intl = useIntl();

  /* Component Rules for form fields */
  const Rules = {
    required: {
      message: <FormattedMessage id="rules.required" />,
      required: true,
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
          description,
          message: intl.formatMessage({ id: "edit.save.error" }),
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

  /**
   * toggle second language form visibility
   *
   */
  const toggleSecLangForm = () => {
    setDisplaySecondLangForm((prev) => !prev);
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   * pickBy({}, identity) is used to omit falsey values from the object - https://stackoverflow.com/a/33432857
   * @return {boolean} return true if any of the form inputs have changed
   *
   */
  const checkIfFormValuesChanged = () => {
    const formValues = pickBy(form.getFieldsValue(), identity);
    const dbValues = pickBy(
      savedValues || getInitialValues({ profile: profileInfo }),
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

  /**
   * update state if form values have changed from the initial state
   *
   */
  const updateIfFormValuesChanged = () => {
    setFieldsChanged(checkIfFormValuesChanged());
  };

  /*
   * Get All Validation Errors
   * Print out list of validation errors in a list for notification
   *
   */
  const getAllValidationErrorMessages = () => (
    <div>
      <strong>{intl.formatMessage({ id: "edit.save.error.intro" })}</strong>
      <p>
        {"- "}
        {intl.formatMessage({ id: "official.languages" })}{" "}
        {intl.formatMessage({ id: "form" })}
      </p>
    </div>
  );

  /**
   * Action to take "on finish".
   * redirects to last page of profile forms
   *
   */
  const onFinish = () => {
    history.push(`/profile/edit/finish`);
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
            description: getAllValidationErrorMessages(),
            type: "error",
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
    form.resetFields();
    notification.info({
      message: intl.formatMessage({ id: "form.clear" }),
    });

    const data = savedValues || getInitialValues({ profile: profileInfo });
    setDisplaySecondLangForm(data.oralProficiency);
    setFieldsChanged(false);
  };

  // Updates the unsaved indicator based on the toggle and form values
  useEffect(() => {
    const data = savedValues || getInitialValues({ profile: profileInfo });
    const oppositeInitialToggle =
      !!data.oralProficiency !== displaySecondLangForm;
    setFieldsChanged(oppositeInitialToggle || checkIfFormValuesChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displaySecondLangForm]);

  const getSecondLangRows = ({ name, label, statusName }) => (
    <Row gutter={24}>
      <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
        <Form.Item
          aria-required="true"
          label={<FormattedMessage id={label} />}
          name={name}
          rules={[Rules.required]}
        >
          <CustomDropdown
            ariaLabel={intl.formatMessage({
              id: label,
            })}
            initialValueId={getInitialValues({ profile: profileInfo })[name]}
            isRequired // TODO: need to figure out how ot get value using "name"
            isSearchable={false}
            options={proficiencyOptions}
            placeholderText={<FormattedMessage id="select" />}
          />
        </Form.Item>
      </Col>
      <Col className="gutter-row" lg={12} md={12} xl={12} xs={24}>
        <Form.Item
          aria-required="true"
          label={<FormattedMessage id="lang.status" />}
          name={statusName}
          rules={[Rules.required]}
        >
          <CustomDropdown
            ariaLabel={`${intl.formatMessage({
              id: label,
            })}: ${intl.formatMessage({
              id: "lang.status",
            })}`}
            initialValueId={
              getInitialValues({ profile: profileInfo })[statusName]
            }
            isRequired
            isSearchable={false}
            options={statusOptions}
            placeholderText={<FormattedMessage id="select" />}
          />
        </Form.Item>
      </Col>
    </Row>
  );

  /* Get temporary role form based on if the form switch is toggled */
  const getSecondLanguageForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      const formValues = form.getFieldsValue();
      Object.assign(getInitialValues({ profile: profileInfo }), formValues);
      return (
        <>
          {/* Reading Proficiency */}
          {getSecondLangRows({
            label: "secondary.reading.proficiency",
            name: "readingProficiency",
            statusName: "secondaryReadingStatus",
          })}
          <Divider className="mt-0 mb-2" />
          {/* Writing Proficiency */}
          {getSecondLangRows({
            label: "secondary.writing.proficiency",
            name: "writingProficiency",
            statusName: "secondaryWritingStatus",
          })}
          <Divider className="mt-0 mb-2" />
          {/* Oral Proficiency */}
          {getSecondLangRows({
            label: "secondary.oral.proficiency",
            name: "oralProficiency",
            statusName: "secondaryOralStatus",
          })}
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
        message={intl.formatMessage({ id: "form.unsaved.alert" })}
        when={fieldsChanged}
      />
      <div className="lang-content">
        {/* get form title */}
        <Row justify="space-between" style={{ marginBottom: -9 }}>
          <FormTitle
            extra={
              <div style={{ marginTop: -5 }}>
                <CardVisibilityToggle
                  ariaLabel={intl.formatMessage({
                    id: "official.languages",
                  })}
                  cardName="officialLanguage"
                  type="form"
                  visibleCards={profileInfo.visibleCards}
                />
              </div>
            }
            fieldsChanged={fieldsChanged}
            formType={formType}
            stepNumber={4}
            title={<FormattedMessage id="official.languages" />}
          />
        </Row>
        <Divider className="lang-headerDiv" />
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
            <Col className="gutter-row" lg={24} md={24} xl={24} xs={24}>
              <Form.Item
                label={<FormattedMessage id="first.official.language" />}
                name="firstLanguage"
              >
                <CustomDropdown
                  ariaLabel={intl.formatMessage({
                    id: "first.official.language",
                  })}
                  initialValueId={
                    getInitialValues({ profile: profileInfo }).firstLanguage
                  }
                  isSearchable={false}
                  options={languageOptions}
                  placeholderText={<FormattedMessage id="select" />}
                />
              </Form.Item>
            </Col>
          </Row>
          {/* Form Row Four: Temporary role */}
          <Row className="lang-secondLangRow">
            <Fieldset
              title={
                <>
                  <Text>
                    <FormattedMessage id="graded.on.second.language" />
                  </Text>
                  <Switch
                    checked={displaySecondLangForm}
                    className="ml-2 mb-1"
                    onChange={toggleSecLangForm}
                  />
                </>
              }
            >
              <Col span={24}>
                {getSecondLanguageForm(displaySecondLangForm)}
              </Col>
            </Fieldset>
          </Row>
          {/* Form Row Five: Submit button */}
          <FormControlButton
            fieldsChanged={fieldsChanged}
            formType={formType}
            onFinish={onFinish}
            onReset={onReset}
            onSave={() => onSave(1)}
            onSaveAndFinish={() => onSave(3)}
            onSaveAndNext={() => onSave(2)}
            visibleCards={profileInfo.visibleCards}
          />
        </Form>
      </div>
    </>
  );
};

LangProficiencyFormView.propTypes = {
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  history: HistoryPropType.isRequired,
  languageOptions: KeyTitleOptionsPropType,
  load: PropTypes.bool.isRequired,
  proficiencyOptions: KeyTitleOptionsPropType,
  profileInfo: ProfileInfoPropType,
  saveDataToDB: PropTypes.func.isRequired,
  statusOptions: KeyTitleOptionsPropType,
};

LangProficiencyFormView.defaultProps = {
  languageOptions: [],
  proficiencyOptions: [],
  profileInfo: null,
  statusOptions: [],
};

export default LangProficiencyFormView;

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Row,
  Col,
  Skeleton,
  Typography,
  Divider,
  Form,
  Select,
  Switch,
  TreeSelect,
  Tabs,
  notification,
} from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { pickBy, isEmpty, identity, isEqual } from "lodash";
import PropTypes from "prop-types";
import { useHistory, Prompt } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../../../utils/useAxios";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
} from "../../../utils/customPropTypes";
import handleError from "../../../functions/handleError";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import filterOption from "../../../functions/filterSelectInput";
import FormControlButton from "../formControlButtons/FormControlButtons";
import FormTitle from "../formTitle/FormTitle";
import FormSubTitle from "../formSubTitle/FormSubTitle";
import config from "../../../utils/runtimeConfig";

import "./TalentFormView.less";

const { Option } = Select;
const { Text } = Typography;
const { SHOW_CHILD } = TreeSelect;
const { TabPane } = Tabs;

/**
 *  TalentFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const TalentFormView = ({
  profileInfo,
  skillOptions,
  competencyOptions,
  savedCompetencies,
  savedSkills,
  savedMentorshipSkills,
  formType,
  currentTab,
  load,
  userId,
}) => {
  const history = useHistory();
  const axios = useAxios();
  const intl = useIntl();
  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [savedValues, setSavedValues] = useState(null);
  const [loadedData, setLoadedData] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const [tabErrorsBool, setTabErrorsBool] = useState([]);
  const { drupalSite } = config;
  const { locale } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  /* Values for tabs */
  const tabs = useMemo(
    () => ({ 1: "skills", 2: "mentorship", 3: "competencies" }),
    []
  );
  const MAXTAB = 3;

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: <FormattedMessage id="rules.required" />,
    },
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async (unalteredValues) => {
    const values = { ...unalteredValues };
    if (!displayMentorshipForm) {
      // clear mentorship skills before submission
      values.mentorshipSkills = [];
    }

    await axios.put(`api/profile/${userId}?language=${locale}`, values);
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

  /*
   * Get the initial values for the form
   */
  const getInitialValues = () => {
    const hasRequiredProps = () =>
      savedCompetencies !== undefined &&
      savedSkills !== undefined &&
      savedMentorshipSkills !== undefined;
    if (hasRequiredProps()) {
      return {
        competencies: savedCompetencies,
        skills: savedSkills,
        mentorshipSkills: savedMentorshipSkills,
      };
    }
    return {};
  };

  /*
   * Get Tab Key
   *
   * Get tab number from name
   */
  const getTabValue = useCallback(
    (value) => Object.keys(tabs).find((key) => tabs[key] === value) || 1,
    [tabs]
  );

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * pickBy({}, identity) is used to omit false values from the object - https://stackoverflow.com/a/33432857
   */
  const checkIfFormValuesChanged = () => {
    const formValues = pickBy(form.getFieldsValue(), identity);
    if (isEmpty(formValues)) {
      return false;
    }

    const dbValues = pickBy(savedValues || getInitialValues(), identity);

    // Cleans up the object for following comparison
    if (
      formValues.mentorshipSkills === undefined &&
      dbValues.mentorshipSkills &&
      dbValues.mentorshipSkills.length === 0
    ) {
      delete dbValues.mentorshipSkills;
    }

    return !isEqual(formValues, dbValues);
  };

  const updateIfFormValuesChanged = () => {
    setFieldsChanged(checkIfFormValuesChanged());
  };

  /*
   * Find Error Tabs
   *
   * Find all tabs that have validation errors
   */
  const findErrorTabs = () => {
    const errorObject = form
      .getFieldsError()
      .reduce((acc, { name, errors }) => {
        if (errors.length > 0) {
          acc[name[0]] = true;
        }
        return acc;
      }, {});

    // save results to state
    if (!isEqual(errorObject, tabErrorsBool)) {
      setTabErrorsBool(errorObject);
    }

    return errorObject;
  };

  /*
   * Get All Validation Errors
   *
   * Print out list of validation errors in a list for notification
   */
  const getAllValidationErrorMessages = (formsWithErrorsList) => {
    const messages = [];
    if (formsWithErrorsList.mentorshipSkills) {
      messages.push(intl.formatMessage({ id: "mentorship.skills" }));
    }
    if (formsWithErrorsList.skills) {
      messages.push(intl.formatMessage({ id: "skills" }));
    }
    if (formsWithErrorsList.competencies) {
      messages.push(intl.formatMessage({ id: "competencies" }));
    }
    return (
      <div>
        <strong>{intl.formatMessage({ id: "edit.save.error.intro" })}</strong>
        {messages.map((value) => (
          <p style={{ marginBottom: 0, marginLeft: "0.5em" }}>
            {"- "}
            {value} {intl.formatMessage({ id: "form" })}
          </p>
        ))}
      </div>
    );
  };

  const onFieldsChange = () => {
    findErrorTabs();
  };

  /*
   * toggle mentorship form
   *
   * toggle state that controls mentorship form visibility
   */
  const toggleMentorshipForm = () => {
    findErrorTabs();
    setDisplayMentorshipForm((prev) => !prev);
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
        await saveDataToDB(values);
        setSavedValues(values);
        setFieldsChanged(false);
        openNotificationWithIcon({ type: "success" });
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message", history);
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getAllValidationErrorMessages(findErrorTabs()),
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
        if (selectedTab < MAXTAB) {
          setSelectedTab(parseInt(selectedTab, 10) + 1);
        } else {
          history.push("/profile/create/step/6");
        }
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message", history);
        } else {
          openNotificationWithIcon({
            type: "error",
            description: getAllValidationErrorMessages(findErrorTabs()),
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
    history.push(`/profile/edit/finish`);
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
            description: getAllValidationErrorMessages(findErrorTabs()),
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
    // reset mentorship toggle switch
    setDisplayMentorshipForm(savedMentorshipSkills.length > 0);
    notification.info({
      message: intl.formatMessage({ id: "form.clear" }),
    });
    updateIfFormValuesChanged();
    setTabErrorsBool([]);
  };

  /**
   * Get Tab Title
   * @param {Object} tabTitleInfo - tab title info.
   * @param {string} tabTitleInfo.message - Tab title.
   * @param {bool} tabTitleInfo.errorBool - Bool to show error in tab.
   */
  const getTabTitle = ({ message, errorBool }) => {
    if (errorBool) {
      return <div style={{ color: "red" }}>{message}</div>;
    }
    return message;
  };

  /*
   * Get Mentorship Options
   *
   * generate a list of skills the user can mentor
   * (limited to the skills the user has chosen)
   */
  const generateMentorshipOptions = (
    fullSkillsOptionsList,
    selectedSkillValues
  ) => {
    const dataTree = [];
    let numbCategories = 0;
    // iterate through all possible skill categories
    for (let i = 0; i < fullSkillsOptionsList.length; i += 1) {
      let itemsFoundInCategory = 0;
      // iterate through all possible skills in each categories
      for (let w = 0; w < fullSkillsOptionsList[i].children.length; w += 1) {
        // iterate through selected skills
        for (let k = 0; k < selectedSkillValues.length; k += 1) {
          // if selected skill matches item in all skills list
          if (
            fullSkillsOptionsList[i].children[w].value ===
            selectedSkillValues[k]
          ) {
            itemsFoundInCategory += 1;
            // if first find in skill category save the category as parent
            if (itemsFoundInCategory === 1) {
              numbCategories += 1;
              const parent = {
                title: fullSkillsOptionsList[i].title,
                value: fullSkillsOptionsList[i].value,
                children: [],
                selectable: false,
                checkable: false,
                disableCheckbox: true,
              };
              dataTree.push(parent);
            }
            // save skill as child in parent
            const child = {
              title: fullSkillsOptionsList[i].children[w].title,
              value: fullSkillsOptionsList[i].children[w].value,
              key: fullSkillsOptionsList[i].children[w].value,
            };
            dataTree[numbCategories - 1].children.push(child);
          }
        }
      }
    }
    return dataTree;
  };

  /*
   * Remove Invalid Mentorship Options
   *
   * compares mentorship skills against skills and removes mentorship skills that are not part of skills
   * this is used when skills are removed and mentorship skills need to be updated
   */
  const removeInvalidMentorshipOptions = (skills, mentorshipSkills) => {
    const validatedMentorshipSkills = [];
    // iterate through selected mentorship skill
    for (let i = 0; i < mentorshipSkills.length; i += 1) {
      // iterate through selected skills
      for (let w = 0; w < skills.length; w += 1) {
        if (mentorshipSkills[i] === skills[w]) {
          validatedMentorshipSkills.push(mentorshipSkills[i]);
        }
      }
    }
    return validatedMentorshipSkills;
  };

  /*
   * On Change Skills
   *
   * on change of skills field auto update mentorship options
   */
  const onChangeSkills = (skillsValues) => {
    // generate options for mentorship based on skills
    const selectedSkillsOnChangeSkills = generateMentorshipOptions(
      skillOptions,
      skillsValues
    );
    // get selected mentorship skills
    const mentorshipValues = form.getFieldValue("mentorshipSkills");
    // validate selected mentorship against skills incase skills were deleted
    const validatedMentorshipSkills = removeInvalidMentorshipOptions(
      mentorshipValues,
      skillsValues
    );
    // Update the mentorship field selected values automatically
    form.setFieldsValue({
      mentorshipSkills: validatedMentorshipSkills,
    });
    // Update states
    setSelectedSkills(selectedSkillsOnChangeSkills);
  };

  /*
   * On Tab Change
   *
   * on change of tab of the form
   */
  const onTabChange = (activeTab) => {
    setSelectedTab(getTabValue(activeTab));
  };

  /*
   * Get mentorship form
   *
   * Get mentorship role form based on if the form switch is toggled
   */
  const getMentorshipForm = (expandMentorshipForm) => {
    if (expandMentorshipForm) {
      return (
        <div>
          {/* Select Mentorship Skills */}
          <Row gutter={24} style={{ marginTop: "10px" }}>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="mentorshipSkills"
                label={<FormattedMessage id="mentorship.skills" />}
                rules={[Rules.required]}
                extra={
                  selectedSkills.length === 0 ? (
                    <FormattedMessage id="mentorship.skills.empty" />
                  ) : undefined
                }
              >
                <TreeSelect
                  className="custom-bubble-select-style"
                  treeData={selectedSkills}
                  treeCheckable
                  showCheckedStrategy={SHOW_CHILD}
                  placeholder={<FormattedMessage id="search" />}
                  treeNodeFilterProp="title"
                  showSearch
                  maxTagCount={15}
                  disabled={!selectedSkills.length > 0}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    }
    return <div style={{ height: "15px" }} />;
  };

  useEffect(() => {
    // set to page loaded if data comes in
    if (!loadedData) {
      setLoadedData(true);
    }
    // toggle mentorship switch if there are mentorship skills saved
    setDisplayMentorshipForm(savedMentorshipSkills.length > 0);
  }, [loadedData, savedMentorshipSkills, savedSkills]);

  useEffect(() => {
    // generate a treeData to represent the skills chosen
    const generatedSelectedSkills = generateMentorshipOptions(
      skillOptions,
      form.getFieldsValue().mentorshipSkills || savedSkills
    );

    setSelectedSkills(generatedSelectedSkills);
  }, [form, savedSkills, skillOptions]);

  // Updates the unsaved indicator based on the toggle and form values
  useEffect(() => {
    const hasMentorshipSkills = savedMentorshipSkills.length > 0;
    const oppositeInitialToggle = hasMentorshipSkills !== displayMentorshipForm;

    setFieldsChanged(oppositeInitialToggle || checkIfFormValuesChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMentorshipForm]);

  useEffect(() => {
    setSelectedTab(getTabValue(currentTab));
  }, [currentTab, getTabValue]);

  /** **********************************
   ********* Render Component *********
   *********************************** */
  if (!load) {
    return (
      /* If form data is loading then wait */
      <div className="tal-skeleton">
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
      <div className="tal-content">
        <FormTitle
          title={<FormattedMessage id="skills.and.competencies" />}
          formType={formType}
          stepNumber={5}
          fieldsChanged={fieldsChanged}
        />
        <Divider className="tal-headerDiv" />
        {/* Create for with initial values */}
        <Form
          name="basicForm"
          form={form}
          initialValues={savedValues || getInitialValues()}
          layout="vertical"
          onValuesChange={updateIfFormValuesChanged}
          onFieldsChange={onFieldsChange}
        >
          <Tabs
            type="card"
            activeKey={tabs[selectedTab]}
            onChange={onTabChange}
          >
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="skills" />,
                errorBool: tabErrorsBool.skills,
              })}
              key="skills"
            >
              {/* Form Row Two: skills */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <FormSubTitle
                    title={<FormattedMessage id="skills" />}
                    popoverMessage={
                      <>
                        <FormattedMessage
                          id="tooltip.extra.info.help"
                          values={{
                            helpUrl: (
                              <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${drupalSite}${
                                  locale === "ENGLISH" ? "en" : "fr"
                                }help`}
                              >
                                <FormattedMessage id="footer.contact.link" />
                              </a>
                            ),
                          }}
                        />
                      </>
                    }
                    extra={
                      <CardVisibilityToggle
                        visibleCards={profileInfo.visibleCards}
                        cardName="skills"
                        type="form"
                      />
                    }
                  />
                  <Form.Item name="skills">
                    <TreeSelect
                      className="custom-bubble-select-style"
                      treeData={skillOptions}
                      onChange={onChangeSkills}
                      treeCheckable
                      showCheckedStrategy={SHOW_CHILD}
                      placeholder={<FormattedMessage id="search" />}
                      treeNodeFilterProp="title"
                      showSearch
                      maxTagCount={15}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="mentorship.skills" />,
                errorBool: tabErrorsBool.mentorshipSkills,
              })}
              key="mentorship"
            >
              {/* Form Row Two: skills */}
              <Row gutter={24}>
                <Col className="gutter-row" span={24}>
                  <FormSubTitle
                    title={<FormattedMessage id="mentorship.skills" />}
                    popoverMessage={
                      <>
                        <FormattedMessage
                          id="tooltip.extra.info.help"
                          values={{
                            helpUrl: (
                              <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${drupalSite}${
                                  locale === "ENGLISH" ? "en" : "fr"
                                }help`}
                              >
                                <FormattedMessage id="footer.contact.link" />
                              </a>
                            ),
                          }}
                        />
                      </>
                    }
                    extra={
                      <CardVisibilityToggle
                        visibleCards={profileInfo.visibleCards}
                        cardName="mentorshipSkills"
                        type="form"
                      />
                    }
                  />
                  <Text>
                    <FormattedMessage id="mentorship.availability" />
                  </Text>
                  <Switch
                    checked={displayMentorshipForm}
                    onChange={toggleMentorshipForm}
                    className="tal-mentorshipToggle"
                  />

                  {getMentorshipForm(displayMentorshipForm)}
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={getTabTitle({
                message: <FormattedMessage id="competencies" />,
                errorBool: tabErrorsBool.competencies,
              })}
              key="competencies"
            >
              {/* Form Row Three: competencies */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  <FormSubTitle
                    title={<FormattedMessage id="competencies" />}
                    popoverMessage={
                      <>
                        <FormattedMessage
                          id="tooltip.extra.info.help"
                          values={{
                            helpUrl: (
                              <a
                                className="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`${drupalSite}${
                                  locale === "ENGLISH" ? "en" : "fr"
                                }help`}
                              >
                                <FormattedMessage id="footer.contact.link" />
                              </a>
                            ),
                          }}
                        />
                      </>
                    }
                    extra={
                      <CardVisibilityToggle
                        visibleCards={profileInfo.visibleCards}
                        cardName="competencies"
                        type="form"
                      />
                    }
                  />
                  <Form.Item name="competencies">
                    <Select
                      className="custom-bubble-select-style"
                      mode="multiple"
                      placeholder={<FormattedMessage id="search" />}
                      style={{ width: "100%" }}
                      filterOption={filterOption}
                    >
                      {competencyOptions.map((value) => (
                        <Option key={value.id}>{value.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>

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

TalentFormView.propTypes = {
  profileInfo: ProfileInfoPropType,
  skillOptions: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          value: PropTypes.string,
          key: PropTypes.string,
        })
      ),
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  competencyOptions: KeyTitleOptionsPropType,
  savedCompetencies: PropTypes.arrayOf(PropTypes.string),
  savedSkills: PropTypes.arrayOf(PropTypes.string),
  savedMentorshipSkills: PropTypes.arrayOf(PropTypes.string),
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  currentTab: PropTypes.string,
  load: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
};

TalentFormView.defaultProps = {
  profileInfo: null,
  currentTab: null,
  skillOptions: [],
  competencyOptions: [],
  savedCompetencies: [],
  savedSkills: [],
  savedMentorshipSkills: [],
};

export default TalentFormView;

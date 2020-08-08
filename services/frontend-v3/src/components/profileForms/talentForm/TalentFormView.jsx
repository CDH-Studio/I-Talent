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
  Button,
  TreeSelect,
  message,
  Popover,
  Tabs,
  notification,
} from "antd";
import {
  RightOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { FormattedMessage, injectIntl } from "react-intl";
import _ from "lodash";
import PropTypes from "prop-types";
import { useHistory, Prompt, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../../../utils/axios-instance";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
  IntlPropType,
} from "../../../utils/customPropTypes";
import handleError from "../../../functions/handleError";
import CardVisibilityToggle from "../../cardVisibilityToggle/CardVisibilityToggle";
import { setSavedFormContent } from "../../../redux/slices/stateSlice";
import filterOption from "../../../functions/filterSelectInput";

const { Option } = Select;
const { Title, Text } = Typography;
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
  intl,
  userId,
}) => {
  const history = useHistory();
  const axios = useAxios();

  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(false);
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
    sectionHeader: {
      marginBottom: 10,
    },
    headerDiv: {
      margin: "15px 0 15px 0",
    },
    finishAndSaveBtn: {
      float: "left",
      marginRight: "1rem",
      marginBottom: "1rem",
    },
    clearBtn: {
      float: "left",
      marginBottom: "1rem",
    },
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
    infoIcon: {
      paddingLeft: "5px",
    },
    mentorshipToggle: {
      marginLeft: "7px",
      paddingRight: "7px",
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
    },
  };

  const validateMessages = {
    required: "'${label}' is required!",
  };

  /*
   * toggle mentorship form
   *
   * toggle state that controls mentorship form visibility
   */
  const toggleMentorshipForm = () => {
    setDisplayMentorshipForm((prev) => !prev);
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

  /* show message */
  const openNotificationWithIcon = ({ type, description }) => {
    switch (type) {
      case "success":
        notification.success({
          message: intl.formatMessage({ id: "profile.edit.save.success" }),
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

  /*
   * Get the initial values for the form
   */
  const getInitialValues = () => {
    const hasRequiredProps = () => {
      return (
        savedCompetencies !== undefined &&
        savedSkills !== undefined &&
        savedMentorshipSkills !== undefined
      );
    };
    if (hasRequiredProps()) {
      return {
        competencies: savedCompetencies,
        skills: savedSkills,
        mentorshipSkills: savedMentorshipSkills,
      };
    }
    return {};
  };

  /**
   * Returns true if the values in the form have changed based on its initial values or the saved values
   *
   * _.pickBy({}, _.identity) is used to omit false values from the object - https://stackoverflow.com/a/33432857
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

    // Cleans up the object for following comparison
    if (
      formValues.mentorshipSkills === undefined &&
      dbValues.mentorshipSkills &&
      dbValues.mentorshipSkills.length === 0
    ) {
      delete dbValues.mentorshipSkills;
    }

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
        openNotificationWithIcon({ type: "success" });
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
            type: "error",
            description: form.getFieldError("mentorshipSkills"),
          });
        }
      });
  };

  /*
   * save and next
   *
   * save and redirect to next step in setup
   */
  const onSaveAndNext = async () => {
    form
      .validateFields()
      .then(async (values) => {
        await saveDataToDB(values);
        setFieldsChanged(false);
        history.push("/profile/create/step/6");
      })
      .catch((error) => {
        if (error.isAxiosError) {
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
            type: "error",
            description: form.getFieldError("mentorshipSkills"),
          });
        }
      });
  };

  // redirect to profile
  const onFinish = () => {
    history.push(`/profile/${userId}`);
  };

  /*
   * save and finish
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
          handleError(error, "message");
        } else {
          openNotificationWithIcon({
            type: "error",
            description: form.getFieldError("mentorshipSkills"),
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
    message.info(intl.formatMessage({ id: "profile.form.clear" }));
    updateIfFormValuesChanged();
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
                label="Mentorship Skills"
                rules={[Rules.required]}
                extra={
                  selectedSkills.length === 0 ? (
                    <FormattedMessage id="profile.mentorship.skills.empty" />
                  ) : undefined
                }
              >
                <TreeSelect
                  className="custom-bubble-select-style"
                  treeData={selectedSkills}
                  treeCheckable
                  showCheckedStrategy={SHOW_CHILD}
                  placeholder={<FormattedMessage id="setup.select" />}
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

  /*
   * Get form header
   *
   * Generates the form header (title)
   */
  const getFormHeader = (_formType) => {
    if (_formType === "create") {
      return (
        <Title level={2} style={styles.formTitle}>
          5. <FormattedMessage id="setup.talent" />
        </Title>
      );
    }
    return (
      <Title level={2} style={styles.formTitle}>
        <FormattedMessage id="setup.talent" />
        {fieldsChanged && (
          <Text style={styles.unsavedText}>
            (<FormattedMessage id="profile.form.unsaved" />)
          </Text>
        )}
      </Title>
    );
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

  const getSectionHeader = (titleId, cardName) => (
    <Row justify="space-between" style={styles.sectionHeader} align="middle">
      <Title level={3} style={styles.formTitle}>
        <FormattedMessage id={titleId} />
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
          <InfoCircleOutlined style={styles.infoIcon} />
        </Popover>
      </Title>
      <CardVisibilityToggle
        visibleCards={profileInfo.visibleCards}
        cardName={cardName}
        type="form"
      />
    </Row>
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
          validateMessages={validateMessages}
        >
          <Tabs type="card" defaultActiveKey={currentTab}>
            <TabPane tab={<FormattedMessage id="setup.skills" />} key="skills">
              {/* Form Row Two: skills */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  {getSectionHeader("setup.skills", "skills")}
                  <Form.Item name="skills">
                    <TreeSelect
                      className="custom-bubble-select-style"
                      treeData={skillOptions}
                      onChange={onChangeSkills}
                      treeCheckable
                      showCheckedStrategy={SHOW_CHILD}
                      placeholder={<FormattedMessage id="setup.select" />}
                      treeNodeFilterProp="title"
                      showSearch
                      maxTagCount={15}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={<FormattedMessage id="profile.mentorship.skills" />}
              key="mentorship"
            >
              {/* Form Row Two: skills */}
              <Row gutter={24}>
                <Col className="gutter-row" span={24}>
                  {getSectionHeader(
                    "profile.mentorship.skills",
                    "mentorshipSkills"
                  )}
                  <Text>
                    <FormattedMessage id="profile.mentorship.available" />
                  </Text>
                  <Switch
                    checked={displayMentorshipForm}
                    onChange={toggleMentorshipForm}
                    style={styles.mentorshipToggle}
                  />

                  {getMentorshipForm(displayMentorshipForm)}
                </Col>
              </Row>
            </TabPane>
            <TabPane
              tab={<FormattedMessage id="setup.competencies" />}
              key="competencies"
            >
              {/* Form Row Three: competencies */}
              <Row gutter={24}>
                <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
                  {getSectionHeader("setup.competencies", "competencies")}
                  <Form.Item name="competencies" label="Competencies">
                    <Select
                      className="custom-bubble-select-style"
                      mode="multiple"
                      placeholder={<FormattedMessage id="setup.select" />}
                      style={{ width: "100%" }}
                      filterOption={filterOption}
                    >
                      {competencyOptions.map((value) => {
                        return <Option key={value.id}>{value.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>

          {/* Form Row Four: Submit button */}
          {getFormControlButtons(formType)}
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
  intl: IntlPropType,
  userId: PropTypes.string.isRequired,
};

TalentFormView.defaultProps = {
  profileInfo: null,
  skillOptions: [],
  competencyOptions: [],
  savedCompetencies: [],
  savedSkills: [],
  savedMentorshipSkills: [],
  currentTab: null,
  intl: null,
};

export default injectIntl(TalentFormView);

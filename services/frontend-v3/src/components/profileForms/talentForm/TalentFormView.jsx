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
} from "antd";
import { useHistory } from "react-router-dom";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import PropTypes from "prop-types";
import {
  KeyTitleOptionsPropType,
  ProfileInfoPropType,
} from "../../../customPropTypes";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;
const { SHOW_CHILD } = TreeSelect;

/**
 *  TalentFormView(props)
 *  this component renders the talent form.
 *  It contains competencies, skills, and mentorship TreeSelects.
 */
const TalentFormView = props => {
  const {
    profileInfo,
    skillOptions,
    competencyOptions,
    savedCompetencies,
    savedSkills,
    savedMentorshipSkills,
    formType,
    load,
  } = props;

  const history = useHistory();
  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(false);

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
    saveBtn: {
      float: "right",
      marginBottom: "1rem",
    },
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: "Required",
    },
  };

  /*
   * toggle mentorship form
   *
   * toggle state that controls mentorship form visibility
   */
  const toggleMentorshipForm = () => {
    setDisplayMentorshipForm(!displayMentorshipForm);
  };

  /*
   * save data to DB
   *
   * update profile in DB or create profile if it is not found
   */
  const saveDataToDB = async unalteredValues => {
    const values = { ...unalteredValues };
    if (!displayMentorshipForm) {
      // clear mentorship skills before submission
      values.mentorshipSkills = [];
    }

    if (profileInfo) {
      // If profile exists then update profile
      try {
        await axios.put(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          values
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    } else {
      // If profile does not exists then create profile
      try {
        await axios.post(
          `${backendAddress}api/profile/${localStorage.getItem("userId")}`,
          values
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
  };

  /* show message */
  const openNotificationWithIcon = type => {
    switch (type) {
      case "success":
        message.success("Changes Saved");
        break;
      case "error":
        message.error("Data Not Saved");
        break;
      default:
        message.warning("There may be a problem");
        break;
    }
  };

  /* save and show success notification */
  const onSave = async () => {
    form
      .validateFields()
      .then(async values => {
        await saveDataToDB(values);
        openNotificationWithIcon("success");
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("validation failure");
        openNotificationWithIcon("error");
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
      .then(async values => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/6");
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("validation failure");
      });
  };
  /*
   * save and finish
   *
   * Save form data and redirect home
   */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async values => {
        await saveDataToDB(values);
        history.push("/secured/profile/create/step/8");
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("validation failure");
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
    message.info("Form Cleared");
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
  const onChangeSkills = skillsValues => {
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
  const getMentorshipForm = expandMentorshipForm => {
    if (expandMentorshipForm) {
      return (
        <div>
          {/* Select Mentorship Skills */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="mentorshipSkills"
                label={
                  <FormLabelTooltip
                    labelText={
                      <FormattedMessage id="profile.mentorship.skills" />
                    }
                    tooltipText="Extra information"
                  />
                }
                rules={[Rules.required]}
                extra={
                  selectedSkills.length === 0 ? (
                    <FormattedMessage id="profile.mentorship.skills.empty" />
                  ) : undefined
                }
              >
                <TreeSelect
                  className="talent-skill-select"
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
    return <div />;
  };

  /*
   * Get form header
   *
   * Generates the form header (title)
   */
  const getFormHeader = _formType => {
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
      </Title>
    );
  };

  /*
   * Get the initial values for the form
   *
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

  useEffect(() => {
    /* check if user has a skills to mentor */
    if (savedMentorshipSkills) {
      // toggle mentorship switch if there are mentorship skills saved
      setDisplayMentorshipForm(savedMentorshipSkills.length > 0);

      // generate a treeData to represent the skills chosen
      const generatedSelectedSkills = generateMentorshipOptions(
        skillOptions,
        savedSkills
      );

      setSelectedSkills(generatedSelectedSkills);
    }

    // if props change then reset form fields
    if (load) {
      form.resetFields();
    }
  }, [load, form, savedMentorshipSkills, skillOptions, savedSkills]);

  /*
   * Get Form Control Buttons
   *
   * Get Form Control Buttons based on form type (edit or create)
   */
  const getFormControlButtons = _formType => {
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
              style={styles.clearBtn}
              htmlType="button"
              onClick={onReset}
              danger
            >
              <FormattedMessage id="button.clear" />
            </Button>
          </Col>
          <Col xs={24} md={24} lg={6} xl={6}>
            <Button style={styles.saveBtn} type="primary" onClick={onSave}>
              <FormattedMessage id="setup.save" />
            </Button>
          </Col>
        </Row>
      );
    }
    // eslint-disable-next-line no-console
    console.log("Error Getting Action Buttons");
    return undefined;
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
      {/* get form title */}
      {getFormHeader(formType)}
      <Divider style={styles.headerDiv} />
      {/* Create for with initial values */}
      <Form
        name="basicForm"
        form={form}
        initialValues={getInitialValues(profileInfo)}
        layout="vertical"
      >
        {/* Form Row One:competencies */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="competencies"
              label={
                <FormLabelTooltip
                  labelText={<FormattedMessage id="setup.competencies" />}
                  tooltipText="Extra information"
                />
              }
            >
              <Select
                className="custom-bubble-select-style"
                mode="multiple"
                optionFilterProp="children"
                placeholder={<FormattedMessage id="setup.select" />}
                style={{ width: "100%" }}
              >
                {competencyOptions.map(value => {
                  return <Option key={value.key}>{value.title}</Option>;
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* Form Row Two: skills */}
        <Row gutter={24}>
          <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="skills"
              label={
                <FormLabelTooltip
                  labelText={<FormattedMessage id="setup.skills" />}
                  tooltipText="Extra information"
                />
              }
            >
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
        {/* Form Row Three: mentorship role */}
        <Row style={styles.secondLangRow} gutter={24}>
          <Col className="gutter-row" span={24}>
            <FormLabelTooltip
              labelText={<FormattedMessage id="profile.mentorship.available" />}
              tooltipText="Extra information"
            />
            <Switch
              checked={displayMentorshipForm}
              onChange={toggleMentorshipForm}
            />
            {getMentorshipForm(displayMentorshipForm)}
          </Col>
        </Row>
        {/* Form Row Four: Submit button */}
        {getFormControlButtons(formType)}
      </Form>
    </div>
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
      value: PropTypes.number,
    })
  ),
  competencyOptions: KeyTitleOptionsPropType,
  savedCompetencies: PropTypes.arrayOf(PropTypes.string),
  savedSkills: PropTypes.arrayOf(PropTypes.string),
  savedMentorshipSkills: PropTypes.arrayOf(PropTypes.string),
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  load: PropTypes.bool.isRequired,
};

TalentFormView.defaultProps = {
  profileInfo: null,
  skillOptions: null,
  competencyOptions: null,
  savedCompetencies: undefined,
  savedSkills: undefined,
  savedMentorshipSkills: undefined,
};

export default TalentFormView;

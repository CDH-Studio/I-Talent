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
  Checkbox,
  TreeSelect
} from "antd";
import { useHistory } from "react-router-dom";
import { RightOutlined, CheckOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import moment from "moment";
import FormLabelTooltip from "../../formLabelTooltip/FormLabelTooltip";
import config from "../../../config";

const { backendAddress } = config;
const { Option } = Select;
const { Title } = Typography;
const { SHOW_CHILD } = TreeSelect;

/**
 *  LangProficiencyFormView(props)
 *  this component renders the language proficiency form.
 *  It contains a toggle to set the second language
 */
const TalentFormView = props => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [displayMentorshipForm, setDisplayMentorshipForm] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState(false);

  /* Component Styles */
  const styles = {
    content: {
      textAlign: "left",
      width: "100%",
      maxWidth: "900px",
      minHeight: "400px",
      background: "#fff",
      padding: "30px 30px"
    },
    formTitle: {
      fontSize: "1.2em"
    },
    headerDiv: {
      margin: "15px 0 15px 0"
    },
    formItem: {
      margin: "10px 0 10px 0",
      padding: "0 20px 0 0",
      textAlign: "left"
    },
    subHeading: {
      fontSize: "1.3em"
    },
    secondLangRow: {
      backgroundColor: "#dfe5e4",
      paddingTop: "15px",
      paddingBottom: "15px",
      marginBottom: "20px",
      marginTop: "10px"
    },
    finishAndSaveBtn: {
      float: "left",
      marginRight: "1rem",
      marginBottom: "1rem"
    },
    clearBtn: { float: "left", marginBottom: "1rem" },
    finishAndNextBtn: {
      width: "100%",
      float: "right",
      marginBottom: "1rem"
    },
    datePicker: { width: "100%" }
  };

  /* Component Rules for form fields */
  const Rules = {
    required: {
      required: true,
      message: "Required"
    }
  };

  /* toggle temporary role form */
  const toggleSecLangForm = () => {
    setDisplayMentorshipForm(!displayMentorshipForm);
  };

  /* Save data */
  const saveDataToDB = async values => {
    if (!displayMentorshipForm) {
      // clear values before submission
      values.secondLanguage = null;
      values.readingProficiency = null;
      values.writingProficiency = null;
      values.oralProficiency = null;
      values.secondaryReadingDate = null;
      values.secondaryWritingDate = null;
      values.secondaryOralDate = null;
    } else {
      // set second language based on first language
      values.secondLanguage = values.firstLanguage === "en" ? "fr" : "en";

      // format dates before submit
      if (values.secondaryReadingDate) {
        values.secondaryReadingDate = values.secondaryReadingDate.startOf(
          "day"
        );
      }
      if (values.secondaryWritingDate) {
        values.secondaryWritingDate = values.secondaryWritingDate.startOf(
          "day"
        );
      }
      if (values.secondaryOralDate) {
        values.secondaryWritingDate = values.secondaryOralDate.startOf("day");
      }
    }

    if (props.profileInfo) {
      // If profile exists then update profile
      try {
        await axios.put(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      // If profile does not exists then create profile
      try {
        await axios.post(
          backendAddress + "api/profile/" + localStorage.getItem("userId"),
          values
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* save and redirect to next step in setup */
  const onSaveAndNext = async values => {
    await saveDataToDB(values);
    history.push("/secured/profile/create/step/6");
  };

  /* save and redirect to home */
  const onSaveAndFinish = async () => {
    form
      .validateFields()
      .then(async values => {
        await saveDataToDB(values);
        history.push("/secured/home");
      })
      .catch(() => {
        console.log("validation failure");
      });
  };

  /* reset form fields */
  const onReset = () => {
    form.resetFields();
  };

  const onChange = value => {
    let kk = [];
    let dataTree = [];
    setSelectedSkills([]);
    let numbCategories = 0;

    // iterate through all possible skill categories
    for (var i = 0; i < props.skillOptions.length; i++) {
      let itemsFoundInCategory = 0;

      // iterate through all possible skills in each categories
      for (var w = 0; w < props.skillOptions[i].children.length; w++) {
        // iterate through selected skills
        for (var k = 0; k < value.length; k++) {
          // if selected skill matches item in all skills list
          if (props.skillOptions[i].children[w].value === value[k]) {
            itemsFoundInCategory++;
            if (itemsFoundInCategory === 1) {
              numbCategories++;
              var parent = {
                title: props.skillOptions[i].title,
                value: props.skillOptions[i].value,
                children: []
              };
              dataTree.push(parent);
            }

            var child = {
              title: props.skillOptions[i].children[w].title,
              value: props.skillOptions[i].children[w].value,
              key: props.skillOptions[i].children[w].value
            };

            dataTree[numbCategories - 1].children.push(child);
          }
        }
      }
    }
    setSelectedSkills(dataTree);
  };

  /* Get temporary role form based on if the form switch is toggled */
  const getMentorshipForm = expandMentorshipForm => {
    if (expandMentorshipForm) {
      return (
        <div>
          {/* Select Mentorship Skills */}
          <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={24} xl={24}>
              <Form.Item
                name="mentorship"
                label={
                  <FormLabelTooltip
                    labelText={<FormattedMessage id="setup.skills" />}
                    tooltipText="Extra information"
                  />
                }
              >
                <TreeSelect
                  className="talent-skill-select"
                  treeData={selectedSkills}
                  //onChange={onChange}
                  treeCheckable={true}
                  showCheckedStrategy={SHOW_CHILD}
                  placeholder={"Please select"}
                  treeNodeFilterProp="title"
                  showSearch={true}
                  maxTagCount={15}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <div />;
    }
  };

  /* Get the initial values for the form */
  const getInitialValues = profile => {
    // Get default language from API and convert to dropdown key
    let firstLanguage = null;
    if (profile) {
      if (profile.firstLanguage) {
        firstLanguage = profile.firstLanguage.en === "English" ? "en" : "fr";
      }
      console.log(props.savedSkills);
      return {
        competencies: props.savedCompetencies,
        skills: props.savedSkills,
        firstLanguage: firstLanguage,
        ...(profile.secondaryReadingProficiency && {
          readingProficiency: profile.secondaryReadingProficiency
        }),
        ...(profile.secondaryWritingProficiency && {
          writingProficiency: profile.secondaryWritingProficiency
        }),
        ...(profile.secondaryOralProficiency && {
          oralProficiency: profile.secondaryOralProficiency
        }),
        ...(profile.secondaryReadingDate && {
          secondaryReadingDate: moment(profile.secondaryReadingDate)
        }),
        ...(profile.secondaryWritingDate && {
          secondaryWritingDate: moment(profile.secondaryWritingDate)
        }),
        ...(profile.secondaryOralDate && {
          secondaryOralDate: moment(profile.secondaryOralDate)
        })
      };
    } else {
      return {};
    }
  };

  // Just show the latest item.
  const displayRender = label => {
    return label[label.length - 1];
  };

  useEffect(() => {
    /* check if user has a second language */
    setDisplayMentorshipForm(
      props.profileInfo ? Boolean(props.profileInfo.secondLanguage) : false
    );
  }, [props.profileInfo]);

  /************************************
   ********* Render Component *********
   ************************************/
  if (!props.load) {
    return (
      /* If form data is loading then wait */
      <div style={styles.content}>
        <Skeleton active />
      </div>
    );
  } else {
    /* Once data had loaded display form */
    return (
      <div style={styles.content}>
        <Title level={2} style={styles.formTitle}>
          5. <FormattedMessage id="setup.talent" />
        </Title>
        <Divider style={styles.headerDiv} />
        <div key={props.profileInfo}>
          {/* Create for with initial values */}
          <Form
            className="talent-skill-select"
            name="basicForm"
            form={form}
            initialValues={getInitialValues(props.profileInfo)}
            layout="vertical"
            onFinish={onSaveAndNext}
          >
            {/* Form Row One */}
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
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    //onChange={handleChange}
                  >
                    {props.competencyOptions.map((value, index) => {
                      return (
                        <Option key={value.id}>{value.description.en}</Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row One */}
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
                    className="talent-skill-select"
                    treeData={props.skillOptions}
                    onChange={onChange}
                    treeCheckable={true}
                    showCheckedStrategy={SHOW_CHILD}
                    placeholder={"Please select"}
                    treeNodeFilterProp="title"
                    showSearch={true}
                    maxTagCount={15}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* Form Row Four: Temporary role */}
            <Row style={styles.secondLangRow} gutter={24}>
              <Col className="gutter-row" span={24}>
                <FormLabelTooltip
                  labelText={
                    <FormattedMessage id="profile.mentorship.available" />
                  }
                  tooltipText="Extra information"
                />
                <Switch
                  defaultChecked={displayMentorshipForm}
                  onChange={toggleSecLangForm}
                />
                {getMentorshipForm(displayMentorshipForm)}
              </Col>
            </Row>
            {/* Form Row Five: Submit button */}
            <Row gutter={24}>
              <Col xs={24} md={24} lg={18} xl={18}>
                <Button
                  style={styles.finishAndSaveBtn}
                  onClick={onSaveAndFinish}
                  htmlType="button"
                >
                  <CheckOutlined style={{ marginRight: "0.2rem" }} />
                  {<FormattedMessage id="setup.save.and.finish" />}
                </Button>
                <Button
                  style={styles.clearBtn}
                  htmlType="button"
                  onClick={onReset}
                  danger
                >
                  {<FormattedMessage id="button.clear" />}
                </Button>
              </Col>
              <Col xs={24} md={24} lg={6} xl={6}>
                <Button
                  style={styles.finishAndNextBtn}
                  type="primary"
                  htmlType="submit"
                >
                  {<FormattedMessage id="setup.save.and.next" />}{" "}
                  <RightOutlined />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
};

export default TalentFormView;

import React, { useEffect } from "react";
import { PageHeader, Steps } from "antd";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import AppLayout from "../appLayout/AppLayout";
import {
  Welcome,
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm,
  PersonalGrowthForm,
  QualificationsForm,
  DoneSetup,
} from "../../profileForms";

const { Step } = Steps;

/**
 *  CreateProfileLayoutView(props)
 *  Render the layout for the create profile forms
 */
const CreateProfileLayoutView = ({ formStep, highestStep }) => {
  const history = useHistory();

  // get current language code
  const { locale } = useSelector((state) => state.settings);

  /* Component Styles */
  const styles = {
    stepList: {
      paddingLeft: "0px",
      listStyle: "none",
      marginBottom: "0px",
    },
  };

  /*
   * On change
   *
   * action to take if sidebar steps are clicked
   */
  const onChange = (current) => {
    const url = `/secured/profile/create/step/${current + 1}`;
    history.push(url);
  };

  /*
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a step in the sidebar
   */

  const handleKeyPress = (e, current) => {
    if (e.charCode === 32 || e.charCode === 13) {
      e.preventDefault();
      const url = `/secured/profile/create/step/${current + 2}`;
      history.push(url);
    }
  };

  /*
   * Profile Form Select
   *
   * Generate the correct form based on the step
   */
  const profileFormSelect = (step) => {
    const stepInt = parseInt(step, 10);
    switch (stepInt) {
      case 1:
        return <Welcome />;
      case 2:
        return <PrimaryInfoForm formType="create" />;
      case 3:
        return <EmploymentDataForm formType="create" />;
      case 4:
        return <LangProficiencyForm formType="create" />;
      case 5:
        return <TalentForm formType="create" />;
      case 6:
        return <PersonalGrowthForm formType="create" />;
      case 7:
        return <QualificationsForm formType="create" />;
      case 8:
        return <DoneSetup formType="create" />;
      default:
        return <div>Hello</div>;
    }
  };

  /*
   * Get Side Bar Content
   *
   * Generate the sidebar steps for create profile
   */
  const getSideBarContent = (step) => {
    const stepInt = parseInt(step, 10) - 1;
    return (
      <div style={{ margin: "20px 25px" }}>
        <Steps
          direction="vertical"
          size="small"
          current={stepInt}
          onChange={onChange}
          onKeyPress={(e) => handleKeyPress(e, stepInt)}
        >
          <Step title={<FormattedMessage id="setup.welcome" />} />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="setup.primary.information" />}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.step.2.description" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="setup.employment" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.step.3.description" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="setup.language.proficiency" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.step.4.description" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="setup.talent" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.competencies" />
                </li>
                <li>
                  - <FormattedMessage id="setup.skills" />
                </li>
                <li>
                  - <FormattedMessage id="profile.mentorship.skills" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="profile.employee.growth.interests" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="profile.developmental.goals" />
                </li>
                <li>
                  - <FormattedMessage id="profile.career.interests" />
                </li>
                <li>
                  - <FormattedMessage id="profile.talent.management" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="profile.employee.qualifications" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.education" />
                </li>
                <li>
                  - <FormattedMessage id="setup.experience" />
                </li>
                <li>
                  - <FormattedMessage id="setup.projects" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex="0"
            title={<FormattedMessage id="setup.done" />}
            disabled={highestStep < 3}
          />
        </Steps>
      </div>
    );
  };

  // Get Sidebar Content
  const sideBarContent = getSideBarContent(formStep);
  // Get correct form for current step
  const form = profileFormSelect(formStep);

  return (
    <AppLayout sideBarContent={sideBarContent} displaySideBar>
      <h1 className="hidden">
        <FormattedMessage id="create.profile" />
      </h1>
      <PageHeader
        style={{
          padding: "0 0 15px 7px",
          textTransform: locale === "en" ? "capitalize" : "",
        }}
        title={<FormattedMessage id="create.profile" />}
      />
      {form}
    </AppLayout>
  );
};

CreateProfileLayoutView.propTypes = {
  formStep: PropTypes.string,
  highestStep: PropTypes.string,
};

CreateProfileLayoutView.defaultProps = {
  formStep: "1",
  highestStep: "1",
};

export default CreateProfileLayoutView;

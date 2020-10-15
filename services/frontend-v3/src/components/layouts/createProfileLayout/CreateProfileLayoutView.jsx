import React from "react";
import { Steps } from "antd";
import { FormattedMessage } from "react-intl";
import { useHistory, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
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
import Header from "../../header/Header";

const { Step } = Steps;

/**
 *  CreateProfileLayoutView(props)
 *  Render the layout for the create profile forms
 */
const CreateProfileLayoutView = ({ formStep, highestStep }) => {
  const history = useHistory();

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
    const url = `/profile/create/step/${current + 1}`;
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
      const url = `/profile/create/step/${current + 2}`;
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
        return <QualificationsForm formType="create" />;
      case 7:
        return <PersonalGrowthForm formType="create" />;
      case 8:
        return <DoneSetup formType="create" />;
      default:
        return <Redirect to={`/profile/create/step/${highestStep}`} />;
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
            tabIndex={0}
            title={<FormattedMessage id="setup.primary.information" />}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.step.2.description" />
                </li>
                <li>
                  - <FormattedMessage id="profile.employment.equity.groups" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex={0}
            title={<FormattedMessage id="profile.employee.status" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.step.3.description" />
                </li>
                <li>
                  - <FormattedMessage id="profile.description" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex={0}
            title={<FormattedMessage id="setup.language.proficiency" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.first.language" />
                </li>
                <li>
                  - <FormattedMessage id="setup.second.language" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex={0}
            title={<FormattedMessage id="setup.talent" />}
            disabled={highestStep < 3}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.skills" />
                </li>
                <li>
                  - <FormattedMessage id="profile.mentorship.skills" />
                </li>
                <li>
                  - <FormattedMessage id="setup.competencies" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex={0}
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
              </ul>
            }
          />
          <Step
            tabIndex={0}
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
                <li>
                  - <FormattedMessage id="profile.ex.feeder.title" />
                </li>
              </ul>
            }
          />
          <Step
            tabIndex={0}
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
    <AppLayout
      sideBarContent={sideBarContent}
      displaySideBar
      displaySearch={false}
    >
      <Header title={<FormattedMessage id="create.profile" />} />
      {form}
    </AppLayout>
  );
};

CreateProfileLayoutView.propTypes = {
  formStep: PropTypes.string,
  highestStep: PropTypes.number,
};

CreateProfileLayoutView.defaultProps = {
  formStep: "1",
  highestStep: 1,
};

export default CreateProfileLayoutView;

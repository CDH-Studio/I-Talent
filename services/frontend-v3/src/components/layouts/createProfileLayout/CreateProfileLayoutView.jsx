import React, { useEffect, useState } from "react";
import { PageHeader, Steps } from "antd";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import AppLayout from "../appLayout/AppLayout";
import config from "../../../config";
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

const { backendAddress } = config;
const { Step } = Steps;

/**
 *  CreateProfileLayoutView(props)
 *  Render the layout for the create profile forms
 */
const CreateProfileLayoutView = (props) => {
  const { formStep } = props;
  const history = useHistory();
  const [profileExists, setProfileExists] = useState(false);

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
   * Check For Profile
   *
   * Check if profile exists
   */
  const checkForProfile = async () => {
    try {
      const url = `${backendAddress}api/profile/private/status/${localStorage.getItem(
        "userId"
      )}`;
      const response = await axios.get(url);
      const { exists } = response.data.profile;
      if (exists) setProfileExists(exists);
      else setProfileExists(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
   * Handle Key Press
   *
   * handle how to process when enter key is hit when focusing on a step in the sidebar
   */

  const handleKeyPress = (e, current) => {
    if (e.charCode === 32 || e.charCode === 13) {
      console.log("current= " + current);
      e.preventDefault();
      // const url = `/secured/profile/create/step/${current + 2}`;
      // history.push(url);
      onChange();
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
        {console.log("step:" + stepInt)}
        <Steps
          direction="vertical"
          size="small"
          current={stepInt}
          onChange={onChange}
          onKeyPress={(e) => handleKeyPress(e)}
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
            disabled={!profileExists}
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
            disabled={!profileExists}
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
            disabled={!profileExists}
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
            disabled={!profileExists}
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
            disabled={!profileExists}
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
            disabled={!profileExists}
          />
        </Steps>
      </div>
    );
  };

  /*
   * UseEffect
   *
   * Run every time props are changed
   */
  useEffect(() => {
    checkForProfile();
  }, [props]);

  // Get Sidebar Content
  const sideBarContent = getSideBarContent(formStep);
  // Get correct form for current step
  const form = profileFormSelect(formStep);

  // get current language code
  const { locale } = useSelector((state) => state.settings);

  return (
    <AppLayout sideBarContent={sideBarContent} displaySideBar>
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
};

CreateProfileLayoutView.defaultProps = {
  formStep: "1",
};

export default CreateProfileLayoutView;

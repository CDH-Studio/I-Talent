import React, { useEffect, useState } from "react";
import { PageHeader, Steps } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import axios from "axios";
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
      const url = `${backendAddress}api/private/profile/status/${localStorage.getItem(
        "userId"
      )}`;
      const response = await axios.get(url);
      const { exists } = response.data.profile;
      if (exists) setProfileExists(exists);
      else setProfileExists(false);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * Profile Form Select
   *
   * Generate the correct form based on the step
   */
  const profileFormSelect = (step) => {
    const stepInt = parseInt(step);
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
    const stepInt = parseInt(step) - 1;
    return (
      <div style={{ margin: "20px 25px" }}>
        <Steps
          direction="vertical"
          size="small"
          current={stepInt}
          onChange={onChange}
        >
          <Step title={props.intl.formatMessage({ id: "setup.welcome" })} />
          <Step
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
            title={<FormattedMessage id="setup.talent" />}
            disabled={!profileExists}
            description={
              <ul style={styles.stepList}>
                <li>
                  - <FormattedMessage id="setup.skills" />
                </li>
                <li>
                  - <FormattedMessage id="setup.competencies" />
                </li>
                <li>
                  - <FormattedMessage id="profile.mentorship.skills" />
                </li>
              </ul>
            }
          />
          <Step
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
  const sideBarContent = getSideBarContent(props.formStep);
  // Get correct form for current step
  const form = profileFormSelect(props.formStep);

  // get current language code
  const locale = props.intl.formatMessage({
    id: "language.code",
    defaultMessage: "en",
  });

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar
      sideBarContent={sideBarContent}
    >
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

export default injectIntl(CreateProfileLayoutView);

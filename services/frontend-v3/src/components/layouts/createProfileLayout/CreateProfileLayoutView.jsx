import React from "react";
import { PageHeader, Steps } from "antd";
import { FormattedMessage } from "react-intl";
import AppLayout from "../appLayout/AppLayout";
import {
  Welcome,
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm,
  PersonalGrowthForm,
  QualificationsForm,
} from "../../profileForms";

const { Step } = Steps;

/**
 *  CreateProfileLayoutView(props)
 *  Render the layout for the create profile forms
 */
function CreateProfileLayoutView(props) {
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
        return <PrimaryInfoForm formType={"create"} />;
      case 3:
        return <EmploymentDataForm formType={"create"} />;
      case 4:
        return <LangProficiencyForm formType={"create"} />;
      case 5:
        return <TalentForm formType={"create"} />;
      case 6:
        return <PersonalGrowthForm formType={"create"} />;
      case 7:
        return <QualificationsForm formType={"create"} />;
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
      <div style={{ margin: "20px 30px" }}>
        <Steps direction="vertical" size="small" current={stepInt}>
          <Step title="Welcome" />
          <Step
            title={<FormattedMessage id="setup.primary.information" />}
            description={"General Profile Info"}
          />
          <Step
            title={<FormattedMessage id="setup.employment" />}
            description={"Current Position"}
          />
          <Step
            title={<FormattedMessage id="setup.language.proficiency" />}
            description={"First & Second Lang."}
          />
          <Step
            title={<FormattedMessage id="setup.talent" />}
            description={"Skills & Competencies"}
          />
          <Step
            title={<FormattedMessage id="profile.employee.growth.interests" />}
            description={
              "Developmental Goals, Career Interests, & Talent Management"
            }
          />
          <Step
            title={
              <FormattedMessage
                id="profile.employee.qualifications"
                description={"Education, Experience, & Projects"}
              />
            }
          />
        </Steps>
      </div>
    );
  };

  // Get Sidebar Content
  let sideBarContent = getSideBarContent(props.formStep);
  // Get correct form for current step
  let form = profileFormSelect(props.formStep);

  return (
    <AppLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={true}
      sideBarContent={sideBarContent}
    >
      <PageHeader
        style={{
          padding: "0 0 15px 7px",
          textTransform: "capitalize",
        }}
        title={<FormattedMessage id="create.profile" />}
      />
      {form}
    </AppLayout>
  );
}

export default CreateProfileLayoutView;

import React from "react";
import { Steps } from "antd";
import { FormattedMessage } from "react-intl";
import CreateProfileLayoutView from "./CreateProfileLayoutView";
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

export default class CreateProfileLayout extends React.Component {
  // Get correct form for current step
  profileFormSelect(step) {
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
  }

  // return side bar contents
  getSideBarContent(step) {
    const stepInt = parseInt(step) - 1;
    return (
      <div style={{ margin: "20px 30px" }}>
        <Steps direction="vertical" size="small" current={stepInt}>
          <Step title="Welcome" />
          <Step title={<FormattedMessage id="setup.primary.information" />} />
          <Step title={<FormattedMessage id="setup.employment" />} />
          <Step title={<FormattedMessage id="setup.language.proficiency" />} />
          <Step title={<FormattedMessage id="setup.talent" />} />
          <Step
            title={<FormattedMessage id="profile.employee.growth.interests" />}
          />
          <Step
            title={<FormattedMessage id="profile.employee.qualifications" />}
          />
        </Steps>
      </div>
    );
  }

  render() {
    // Get Sidebar Content
    let sideBarContent = this.getSideBarContent(this.props.step);
    // Get correct form for current step
    let form = this.profileFormSelect(this.props.step);
    return (
      <CreateProfileLayoutView
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={this.props.displaySideBar}
        sideBarContent={sideBarContent}
        form={form}
      ></CreateProfileLayoutView>
    );
  }
}

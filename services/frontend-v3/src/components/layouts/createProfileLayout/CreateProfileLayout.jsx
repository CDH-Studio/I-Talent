import React from "react";
import { Steps } from "antd";
import { FormattedMessage } from "react-intl";
import CreateProfileLayoutView from "./CreateProfileLayoutView";
import Welcome from "../../../components/profileForms/Welcome";
import {
  EmploymentDataForm,
  LangProficiencyForm,
  PrimaryInfoForm,
  TalentForm
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
        return <PrimaryInfoForm />;
      case 3:
        return <EmploymentDataForm />;
      case 4:
        return <LangProficiencyForm />;
      case 5:
        return <TalentForm />;
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
          <Step title={<FormattedMessage id="setup.skills" />} />
          <Step title={<FormattedMessage id="setup.competencies" />} />
          <Step title={<FormattedMessage id="setup.developmental.goals" />} />
          <Step title={<FormattedMessage id="setup.education" />} />
          <Step title={<FormattedMessage id="setup.experience" />} />
          <Step title={<FormattedMessage id="setup.projects" />} />
          <Step title={<FormattedMessage id="setup.career.interests" />} />
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

import React from "react";
import { Steps } from "antd";
import { FormattedMessage } from "react-intl";
import CreateProfileLayoutView from "./CreateProfileLayoutView";
import Welcome from "../../../components/profileForms/Welcome";

const { Step } = Steps;

export default class CreateProfileLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  profileFormSelect(step) {
    const stepInt = parseInt(step);
    switch (stepInt) {
      case 1:
        return <Welcome />;
      case 2:
        return <div>hello2</div>;
      default:
        return <div>hello3</div>;
    }
  }

  // return side bar contents
  getSideBarContent(step) {
    return (
      <div style={{ margin: "20px 30px" }}>
        <Steps direction="vertical" size="small" current={step}>
          <Step title="Welcome" />
          <Step title={<FormattedMessage id="setup.primary.information" />} />
          <Step title={<FormattedMessage id="setup.manager" />} />
          <Step title={<FormattedMessage id="setup.language.proficiency" />} />
          <Step title={<FormattedMessage id="setup.talent.management" />} />
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
    //console.log(this.props.step);
    //console.log(this.props.match.params.step);
    let form = this.profileFormSelect(this.props.step);
    let sideBarContent = this.getSideBarContent();
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

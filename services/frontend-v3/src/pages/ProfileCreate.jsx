import React from "react";
import { Typography, Steps } from "antd";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import Welcome from "../components/profileForms/Welcome";
import { FormattedMessage } from "react-intl";

const { Step } = Steps;
const { Title } = Typography;

class ProfileCreate extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Create Profile | UpSkill";

    this.state = {
      current: 0
    };
  }

  onChange = current => {
    console.log("onChange:", current);
    this.setState({ current });
  };

  profileFormSelect = step => {
    //const step = props.selectedStep;
    switch (step) {
      case 1:
        return <Welcome />;
      case 2:
        return <div>hello2</div>;
      default:
        return <div>hello3</div>;
    }
  };

  render() {
    const { current } = this.state;
    let form = this.profileFormSelect(1);
    let stepz = this.props.match.params.step;
    console.log(stepz);
    const sideBarContent = (
      <div style={{ margin: "20px 30px" }}>
        <Steps
          direction="vertical"
          size="small"
          current={current}
          onChange={this.onChange}
        >
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

    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        sideBarContent={sideBarContent}
      >
        {form}
      </AppLayout>
    );
  }
}

//Needed when using this,props.intl
export default ProfileCreate;

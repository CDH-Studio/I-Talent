import React from "react";
import { Typography, Steps } from "antd";
import AppLayout from "../components/layouts/appLayout/AppLayout";
import { FormattedMessage } from "react-intl";

const { Step } = Steps;
const { Title } = Typography;

class ProfileCreate extends React.Component {
  goto = link => this.props.history.push(link);

  constructor(props) {
    super(props);

    document.title = "Create Profile | UpSkill";
  }

  render() {
    const sideBarContent = (
      <div style={{ margin: "20px 25px" }}>
        <Title level={3} style={{ fontSize: "1rem", margin: "10px 0px" }}>
          Steps
        </Title>
        <Steps direction="vertical" size="small" current={1}>
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
      ></AppLayout>
    );
  }
}

//Needed when using this,props.intl
export default ProfileCreate;

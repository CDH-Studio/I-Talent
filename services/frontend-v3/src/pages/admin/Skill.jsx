import React from "react";
import AppLayout from "../../components/layouts/appLayout/AppLayout";
import SkillTable from "../../components/skillTable/SkillTable";
import { injectIntl } from "react-intl";

class AdminSkill extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
      >
        <SkillTable type="skill" />
      </AppLayout>
    );
  }
}

export default injectIntl(AdminSkill);

import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SkillTable from "../../components/skillTable/SkillTable";
import { injectIntl } from "react-intl";

class AdminSkill extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <AdminLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        type="skill"
      >
        <SkillTable type="skill" />
      </AdminLayout>
    );
  }
}

export default injectIntl(AdminSkill);

import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import { injectIntl } from "react-intl";

class AdminCompetency extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <AdminLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        type="competency"
      >
        {" "}
      </AdminLayout>
    );
  }
}

export default injectIntl(AdminCompetency);

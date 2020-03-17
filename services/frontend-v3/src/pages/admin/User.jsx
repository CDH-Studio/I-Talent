import React from "react";
import AppLayout from "../../components/layouts/appLayout/AppLayout";
import UserTable from "../../components/userTable/UserTable";
import { injectIntl } from "react-intl";

class AdminUser extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <AppLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
      >
        <UserTable type="user" />
      </AppLayout>
    );
  }
}

export default injectIntl(AdminUser);

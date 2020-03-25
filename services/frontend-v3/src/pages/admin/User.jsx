import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/userTable/UserTable";
import { injectIntl } from "react-intl";

class AdminUser extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <AdminLayout
        changeLanguage={this.props.changeLanguage}
        displaySideBar={true}
        type="user"
      >
        <UserTable type="user" />
      </AdminLayout>
    );
  }
}

export default injectIntl(AdminUser);

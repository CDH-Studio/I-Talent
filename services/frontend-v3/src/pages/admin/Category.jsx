import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import { injectIntl } from "react-intl";

class AdminCategory extends React.Component {
  goto = link => this.props.history.push(link);

  render() {
    return (
      <AdminLayout
        changeLanguage={this.props.changeLanguage}
        keycloak={this.props.keycloak}
        history={this.props.history}
        displaySideBar={true}
        type="category"
      >
        {" "}
      </AdminLayout>
    );
  }
}

export default injectIntl(AdminCategory);

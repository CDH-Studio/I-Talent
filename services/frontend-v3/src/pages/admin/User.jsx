import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/userTable/UserTable";
import { injectIntl } from "react-intl";

function AdminUser(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="user"
    >
      <UserTable type="user" />
    </AdminLayout>
  );
}

export default injectIntl(AdminUser);

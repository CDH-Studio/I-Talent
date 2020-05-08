import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/admin/userTable/UserTable";

function AdminUser(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar
      type="user"
    >
      <UserTable type="user" />
    </AdminLayout>
  );
}

export default AdminUser;

import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/admin/userTable/UserTable";

const AdminUser = ({ history }) => {
  return (
    <AdminLayout displaySideBar type="user">
      <UserTable type="user" history={history} />
    </AdminLayout>
  );
};

export default AdminUser;

import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/admin/userTable/UserTable";

const AdminUser = () => {
  return (
    <AdminLayout displaySideBar type="user">
      <UserTable type="user" />
    </AdminLayout>
  );
};

export default AdminUser;

import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/admin/userTable/UserTable";

const AdminUser = ({ changeLanguage }) => {
  return (
    <AdminLayout changeLanguage={changeLanguage} displaySideBar type="user">
      <UserTable type="user" />
    </AdminLayout>
  );
};

AdminUser.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default AdminUser;

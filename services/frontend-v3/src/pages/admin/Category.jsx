import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CategoryTable from "../../components/admin/categoryTable/CategoryTable";

const AdminCategory = ({ changeLanguage }) => {
  return (
    <AdminLayout changeLanguage={changeLanguage} displaySideBar type="category">
      <CategoryTable type="category" />
    </AdminLayout>
  );
};

AdminCategory.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default AdminCategory;

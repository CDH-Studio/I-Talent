import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import DiplomaTable from "../../components/admin/diplomaTable/DiplomaTable";

const AdminDiploma = ({ changeLanguage }) => {
  return (
    <AdminLayout changeLanguage={changeLanguage} displaySideBar type="diploma">
      <DiplomaTable type="diploma" />
    </AdminLayout>
  );
};

AdminDiploma.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default AdminDiploma;

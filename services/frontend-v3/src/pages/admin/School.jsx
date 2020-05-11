import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SchoolTable from "../../components/admin/schoolTable/SchoolTable";

const AdminSchool = ({ changeLanguage }) => {
  return (
    <AdminLayout changeLanguage={changeLanguage} displaySideBar type="school">
      <SchoolTable type="school" />
    </AdminLayout>
  );
};

AdminSchool.propTypes = {
  changeLanguage: PropTypes.func.isRequired
}

export default AdminSchool;

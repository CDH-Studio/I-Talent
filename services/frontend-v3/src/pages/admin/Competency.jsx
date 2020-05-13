import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CompetencyTable from "../../components/admin/competencyTable/CompetencyTable";

const AdminCompetency = ({ changeLanguage }) => {
  return (
    <AdminLayout
      changeLanguage={changeLanguage}
      displaySideBar
      type="competency"
    >
      <CompetencyTable type="competency" />
    </AdminLayout>
  );
};

AdminCompetency.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default AdminCompetency;

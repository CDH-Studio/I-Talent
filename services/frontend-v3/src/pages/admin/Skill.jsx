import React from "react";
import PropTypes from "prop-types";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SkillTable from "../../components/admin/skillTable/SkillTable";

const AdminSkill = ({ changeLanguage }) => {
  return (
    <AdminLayout changeLanguage={changeLanguage} displaySideBar type="skill">
      <SkillTable type="skill" />
    </AdminLayout>
  );
};

AdminSkill.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
};

export default AdminSkill;

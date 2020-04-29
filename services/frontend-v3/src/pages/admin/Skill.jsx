import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SkillTable from "../../components/admin/skillTable/SkillTable";

function AdminSkill(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="skill"
    >
      <SkillTable type="skill" />
    </AdminLayout>
  );
}

export default AdminSkill;

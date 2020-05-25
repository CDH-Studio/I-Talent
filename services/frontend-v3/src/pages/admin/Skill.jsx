import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SkillTable from "../../components/admin/skillTable/SkillTable";

const AdminSkill = ({ history }) => {
  return (
    <AdminLayout displaySideBar type="skill">
      <SkillTable type="skill" history={history} />
    </AdminLayout>
  );
};

export default AdminSkill;

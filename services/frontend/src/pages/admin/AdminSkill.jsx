import SkillTable from "../../components/admin/skillTable/SkillTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminSkill = () => (
  <AdminLayout displaySideBar type="skills">
    <SkillTable />
  </AdminLayout>
);

export default AdminSkill;

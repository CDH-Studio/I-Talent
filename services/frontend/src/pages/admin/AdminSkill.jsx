import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SkillTable from "../../components/admin/skillTable/SkillTable";

const AdminSkill = () => (
  <AdminLayout displaySideBar type="skills">
    <SkillTable />
  </AdminLayout>
);

export default AdminSkill;

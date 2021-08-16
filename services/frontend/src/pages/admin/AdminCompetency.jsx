import CompetencyTable from "../../components/admin/competencyTable/CompetencyTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminCompetency = () => (
  <AdminLayout displaySideBar type="competencies">
    <CompetencyTable />
  </AdminLayout>
);

export default AdminCompetency;

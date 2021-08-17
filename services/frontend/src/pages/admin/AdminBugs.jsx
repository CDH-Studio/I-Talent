import BugsTable from "../../components/admin/bugsTable/BugsTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminBugs = () => (
  <AdminLayout displaySideBar type="bugs">
    <BugsTable />
  </AdminLayout>
);

export default AdminBugs;

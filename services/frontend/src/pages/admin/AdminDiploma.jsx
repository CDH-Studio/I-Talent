import DiplomaTable from "../../components/admin/diplomaTable/DiplomaTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminDiploma = () => (
  <AdminLayout displaySideBar type="diplomas">
    <DiplomaTable />
  </AdminLayout>
);

export default AdminDiploma;

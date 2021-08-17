import SchoolTable from "../../components/admin/schoolTable/SchoolTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminSchool = () => (
  <AdminLayout displaySideBar type="schools">
    <SchoolTable />
  </AdminLayout>
);

export default AdminSchool;

import UserTable from "../../components/admin/userTable/UserTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminUser = () => (
  <AdminLayout displaySideBar type="users">
    <UserTable />
  </AdminLayout>
);

export default AdminUser;

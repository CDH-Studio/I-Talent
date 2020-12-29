import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import UserTable from "../../components/admin/userTable/UserTable";

const AdminUser = () => (
    <AdminLayout displaySideBar type="users">
      <UserTable />
    </AdminLayout>
  );

export default AdminUser;

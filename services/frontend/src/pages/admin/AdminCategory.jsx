import CategoryTable from "../../components/admin/categoryTable/CategoryTable";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

const AdminCategory = () => (
  <AdminLayout displaySideBar type="categories">
    <CategoryTable />
  </AdminLayout>
);

export default AdminCategory;

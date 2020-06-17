import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CategoryTable from "../../components/admin/categoryTable/CategoryTable";

const AdminCategory = () => {
  return (
    <AdminLayout displaySideBar type="category">
      <CategoryTable />
    </AdminLayout>
  );
};

export default AdminCategory;

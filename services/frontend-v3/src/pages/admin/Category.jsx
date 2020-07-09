import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CategoryTable from "../../components/admin/categoryTable/CategoryTable";

const AdminCategory = () => {
  return (
    <AdminLayout displaySideBar type="categories">
      <CategoryTable />
    </AdminLayout>
  );
};

export default AdminCategory;

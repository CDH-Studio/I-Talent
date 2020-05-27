import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CategoryTable from "../../components/admin/categoryTable/CategoryTable";

const AdminCategory = () => {
  return (
    <AdminLayout displaySideBar type="category">
      <CategoryTable type="category" />
    </AdminLayout>
  );
};

export default AdminCategory;

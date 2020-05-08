import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CategoryTable from "../../components/admin/categoryTable/CategoryTable";

function AdminCategory(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar
      type="category"
    >
      <CategoryTable type="category" />
    </AdminLayout>
  );
}
export default AdminCategory;

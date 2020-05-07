import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CategoryTable from "../../components/categoryTable/CategoryTable";
import { injectIntl } from "react-intl";

function AdminCategory(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="category"
    >
      <CategoryTable type="category" />
    </AdminLayout>
  );
}
export default injectIntl(AdminCategory);

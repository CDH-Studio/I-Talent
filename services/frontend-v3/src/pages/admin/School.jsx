import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SchoolTable from "../../components/admin/schoolTable/SchoolTable";

function AdminSchool(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar
      type="school"
    >
      <SchoolTable type="school" />
    </AdminLayout>
  );
}

export default AdminSchool;

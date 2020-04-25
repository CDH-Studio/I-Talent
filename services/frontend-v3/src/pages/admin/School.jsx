import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SchoolTable from "../../components/schoolTable/SchoolTable";

function AdminSchool(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="school"
    >
      <SchoolTable type="school" />
    </AdminLayout>
  );
}

export default AdminSchool;

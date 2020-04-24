import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import DiplomaTable from "../../components/diplomaTable/DiplomaTable";

function AdminDiploma(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="diploma"
    >
      <DiplomaTable type="diploma" />
    </AdminLayout>
  );
}

export default AdminDiploma;

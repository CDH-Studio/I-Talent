import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";

function AdminCompetency(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="competency"
    >
      {" "}
    </AdminLayout>
  );
}

export default AdminCompetency;

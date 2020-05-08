import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CompetencyTable from "../../components/admin/competencyTable/CompetencyTable";

function AdminCompetency(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar
      type="competency"
    >
      <CompetencyTable type="competency" />
    </AdminLayout>
  );
}

export default AdminCompetency;

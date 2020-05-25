import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import CompetencyTable from "../../components/admin/competencyTable/CompetencyTable";

const AdminCompetency = ({}) => {
  return (
    <AdminLayout displaySideBar type="competency">
      <CompetencyTable type="competency" />
    </AdminLayout>
  );
};

export default AdminCompetency;

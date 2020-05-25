import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import DiplomaTable from "../../components/admin/diplomaTable/DiplomaTable";

const AdminDiploma = ({}) => {
  return (
    <AdminLayout displaySideBar type="diploma">
      <DiplomaTable type="diploma" />
    </AdminLayout>
  );
};

export default AdminDiploma;

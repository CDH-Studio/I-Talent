import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import DiplomaTable from "../../components/admin/diplomaTable/DiplomaTable";

const AdminDiploma = ({ history }) => {
  return (
    <AdminLayout displaySideBar type="diploma">
      <DiplomaTable type="diploma" history={history} />
    </AdminLayout>
  );
};

export default AdminDiploma;

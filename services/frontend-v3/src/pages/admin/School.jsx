import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import SchoolTable from "../../components/admin/schoolTable/SchoolTable";

const AdminSchool = () => {
  return (
    <AdminLayout displaySideBar type="school">
      <SchoolTable />
    </AdminLayout>
  );
};

export default AdminSchool;

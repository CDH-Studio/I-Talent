import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import BugsTable from "../../components/admin/bugsTable/BugsTable";

const AdminBugs = () => {
  return (
    <AdminLayout displaySideBar type="bugs">
      <BugsTable />
    </AdminLayout>
  );
};

export default AdminBugs;
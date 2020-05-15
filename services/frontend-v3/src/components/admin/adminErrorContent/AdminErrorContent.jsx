import React from "react";
import AdminErrorContentView from "./AdminErrorContentView";

const AdminErrorContent = ({ networkError }) => {
  return <AdminErrorContentView networkError={networkError} />;
};

export default AdminErrorContent;

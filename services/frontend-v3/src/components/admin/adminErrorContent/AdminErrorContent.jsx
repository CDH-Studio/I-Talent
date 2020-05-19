import React from "react";
import AdminErrorContentView from "./AdminErrorContentView";
import { NetworkErrorsPropType } from "../../../customPropTypes";

const AdminErrorContent = ({ networkErrors }) => {
  return <AdminErrorContentView networkErrors={networkErrors} />;
};

AdminErrorContent.propTypes = {
  networkErrors: NetworkErrorsPropType.isRequired,
};

export default AdminErrorContent;

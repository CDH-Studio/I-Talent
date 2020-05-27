import React from "react";
import PropTypes from "prop-types";
import AdminLayoutView from "./AdminLayoutView";

/**
 *  AdminLayout(props)
 *  Controller for the Admin Layout.
 */
const AdminLayout = ({ displaySideBar, type, children }) => {
  return (
    <AdminLayoutView displaySideBar={displaySideBar} type={type}>
      {children}
    </AdminLayoutView>
  );
};

AdminLayout.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    "dashboard",
    "user",
    "category",
    "skill",
    "competency",
    "diploma",
    "school",
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

export default AdminLayout;

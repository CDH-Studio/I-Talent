import React from "react";
import PropTypes from "prop-types";
import AdminLayoutView from "./AdminLayoutView";

/**
 *  AdminLayout(props)
 *  Controller for the Admin Layout.
 */
const AdminLayout = (props) => {
  const { changeLanguage, displaySideBar, type, children } = props;

  return (
    <AdminLayoutView
      changeLanguage={changeLanguage}
      displaySideBar={displaySideBar}
      type={type}
    >
      {children}
    </AdminLayoutView>
  );
};

AdminLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
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

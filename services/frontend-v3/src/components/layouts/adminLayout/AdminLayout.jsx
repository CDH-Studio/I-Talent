import React from "react";
import AdminLayoutView from "./AdminLayoutView";

function AdminLayout(props) {
  return (
    <AdminLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      history={props.history}
      displaySideBar={props.displaySideBar}
      sideBarContent={props.sideBarContent}
      type={props.type}
    >
      {props.children}
    </AdminLayoutView>
  );
}
export default AdminLayout;

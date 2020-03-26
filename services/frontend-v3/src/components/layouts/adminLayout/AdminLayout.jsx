import React from "react";
import AdminLayoutView from "./AdminLayoutView";

function AdminLayout(props) {
  return (
    <AdminLayoutView
      changeLanguage={props.changeLanguage}
      displaySideBar={props.displaySideBar}
      type={props.type}
    >
      {props.children}
    </AdminLayoutView>
  );
}
export default AdminLayout;

import React from "react";
import AdminLayout from "../../components/layouts/adminLayout/AdminLayout";
import { injectIntl } from "react-intl";

function AdminCompetency(props) {
  return (
    <AdminLayout
      changeLanguage={props.changeLanguage}
      displaySideBar={true}
      type="competency"
    >
      {" "}
    </AdminLayout>
  );
}

export default injectIntl(AdminCompetency);

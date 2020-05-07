import React from "react";
import { injectIntl } from "react-intl";
import EditProfileLayout from "../components/layouts/editProfileLayout/EditProfileLayout";

const ProfileEdit = (props) => {
  document.title =
    props.intl.formatMessage({ id: "edit.profile" }) + " | I-Talent";

  return (
    <EditProfileLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={true}
      step={props.match.params.step}
    ></EditProfileLayout>
  );
};

export default injectIntl(ProfileEdit);

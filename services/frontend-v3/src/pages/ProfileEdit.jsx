import React from "react";
import EditProfileLayout from "../components/layouts/editProfileLayout/EditProfileLayout";

const ProfileCreate = (props) => {
  document.title = "Edit Profile | I-Talent";

  return (
    <EditProfileLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      displaySideBar={true}
      step={props.match.params.step}
    ></EditProfileLayout>
  );
};

export default ProfileCreate;

import React from "react";
import CreateProfileLayout from "../components/layouts/createProfileLayout/CreateProfileLayout";

const ProfileCreate = (props) => {
  document.title = "Create Profile | I-Talent";

  return (
    <CreateProfileLayout
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      step={props.match.params.step}
    ></CreateProfileLayout>
  );
};

export default ProfileCreate;

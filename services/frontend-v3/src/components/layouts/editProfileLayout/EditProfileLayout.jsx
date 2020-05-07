import React from "react";
import EditProfileLayoutView from "./EditProfileLayoutView";

/*
 *  EditProfileLayout(props)
 *  Controller for the Edit Profile Layout.
 */
const EditProfileLayout = (props) => {
  return (
    <EditProfileLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      formStep={props.step}
    />
  );
};

export default EditProfileLayout;

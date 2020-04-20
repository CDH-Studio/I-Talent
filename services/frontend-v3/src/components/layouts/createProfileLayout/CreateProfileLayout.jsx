import React from "react";
import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
function CreateProfileLayout(props) {
  return (
    <CreateProfileLayoutView
      changeLanguage={props.changeLanguage}
      keycloak={props.keycloak}
      formStep={props.step}
    ></CreateProfileLayoutView>
  );
}

export default CreateProfileLayout;

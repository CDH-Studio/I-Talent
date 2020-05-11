import React from "react";
import PropTypes from "prop-types";
import Keycloak from "keycloak-js";
import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
const CreateProfileLayout = (props) => {
  const { keycloak, changeLanguage, step } = props;

  return (
    <CreateProfileLayoutView
      changeLanguage={changeLanguage}
      keycloak={keycloak}
      formStep={step}
    />
  );
};

CreateProfileLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  keycloak: PropTypes.instanceOf(Keycloak).isRequired,
  step: PropTypes.isRequired,
};

export default CreateProfileLayout;

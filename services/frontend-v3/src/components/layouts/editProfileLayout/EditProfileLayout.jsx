import React from "react";
import PropTypes from "prop-types";
import EditProfileLayoutView from "./EditProfileLayoutView";

/**
 *  EditProfileLayout(props)
 *  Controller for the Edit Profile Layout.
 */
const EditProfileLayout = ({ changeLanguage, step }) => {
  return (
    <EditProfileLayoutView changeLanguage={changeLanguage} formStep={step} />
  );
};

EditProfileLayout.propTypes = {
  changeLanguage: PropTypes.isRequired,
  step: PropTypes.isRequired,
};

export default EditProfileLayout;

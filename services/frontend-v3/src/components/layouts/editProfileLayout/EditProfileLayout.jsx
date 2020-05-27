import React from "react";
import PropTypes from "prop-types";
import EditProfileLayoutView from "./EditProfileLayoutView";

/**
 *  EditProfileLayout(props)
 *  Controller for the Edit Profile Layout.
 */
const EditProfileLayout = ({ step }) => {
  return (
    <EditProfileLayoutView formStep={step} />
  );
};

EditProfileLayout.propTypes = {
  step: PropTypes.string.isRequired,
};

export default EditProfileLayout;

import React from "react";
import PropTypes from "prop-types";
import EditProfileLayoutView from "./EditProfileLayoutView";

/**
 *  EditProfileLayout(props)
 *  Controller for the Edit Profile Layout.
 */
const EditProfileLayout = ({ step, history }) => {
  return <EditProfileLayoutView formStep={step} history={history} />;
};

EditProfileLayout.propTypes = {
  step: PropTypes.string.isRequired,
};

export default EditProfileLayout;

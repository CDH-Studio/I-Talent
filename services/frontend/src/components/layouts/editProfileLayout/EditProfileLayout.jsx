import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import EditProfileLayoutView from "./EditProfileLayoutView";

/**
 *  EditProfileLayout(props)
 *  Controller for the Edit Profile Layout.
 */
const EditProfileLayout = ({ step }) => {
  const history = useHistory();
  return <EditProfileLayoutView formStep={step} history={history} />;
};

EditProfileLayout.propTypes = {
  step: PropTypes.string.isRequired,
};

export default EditProfileLayout;

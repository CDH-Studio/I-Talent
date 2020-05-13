import React from "react";
import PropTypes from "prop-types";
import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
const CreateProfileLayout = ({ changeLanguage, step }) => {
  return (
    <CreateProfileLayoutView changeLanguage={changeLanguage} formStep={step} />
  );
};

CreateProfileLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  step: PropTypes.string,
};

CreateProfileLayout.defaultProps = {
  step: null,
};

export default CreateProfileLayout;

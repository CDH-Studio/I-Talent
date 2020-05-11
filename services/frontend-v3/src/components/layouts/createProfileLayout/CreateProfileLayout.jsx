import React from "react";
import PropTypes from "prop-types";
import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
const CreateProfileLayout = (props) => {
  const { changeLanguage, step } = props;

  return (
    <CreateProfileLayoutView
      changeLanguage={changeLanguage}
      formStep={step}
    />
  );
};

CreateProfileLayout.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  step: PropTypes.isRequired,
};

export default CreateProfileLayout;

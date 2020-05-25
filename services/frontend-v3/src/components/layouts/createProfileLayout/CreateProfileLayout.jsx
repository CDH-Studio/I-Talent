import React from "react";
import PropTypes from "prop-types";
import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
const CreateProfileLayout = ({ step, history }) => {
  return <CreateProfileLayoutView formStep={step} history={history} />;
};

CreateProfileLayout.propTypes = {
  step: PropTypes.string,
};

CreateProfileLayout.defaultProps = {
  step: null,
};

export default CreateProfileLayout;

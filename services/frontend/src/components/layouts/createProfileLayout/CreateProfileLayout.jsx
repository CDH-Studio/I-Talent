import PropTypes from "prop-types";

import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
const CreateProfileLayout = ({ step, highestStep }) => (
  <CreateProfileLayoutView formStep={step} highestStep={highestStep} />
);

CreateProfileLayout.propTypes = {
  highestStep: PropTypes.number,
  step: PropTypes.string,
};

CreateProfileLayout.defaultProps = {
  highestStep: null,
  step: null,
};

export default CreateProfileLayout;

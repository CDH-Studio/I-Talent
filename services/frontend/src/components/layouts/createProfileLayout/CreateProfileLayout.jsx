import PropTypes from "prop-types";
import CreateProfileLayoutView from "./CreateProfileLayoutView";

/**
 *  CreateProfileLayout(props)
 *  Controller for the Create Profile Layout.
 */
const CreateProfileLayout = ({ step, highestStep }) => {
  return <CreateProfileLayoutView formStep={step} highestStep={highestStep} />;
};

CreateProfileLayout.propTypes = {
  step: PropTypes.string,
  highestStep: PropTypes.number,
};

CreateProfileLayout.defaultProps = {
  step: null,
  highestStep: null,
};

export default CreateProfileLayout;

import PropTypes from "prop-types";
import DescriptionTextView from "./DescriptionTextView";

const DescriptionText = ({ text }) => {
  return <DescriptionTextView text={text} />;
};

DescriptionText.propTypes = {
  text: PropTypes.string,
};

DescriptionText.defaultProps = {
  text: null,
};

export default DescriptionText;

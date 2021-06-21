import PropTypes from "prop-types";
import SkipToContentView from "./SkipToContentView";

const SkipToContent = ({ contentId }) => (
  <SkipToContentView contentId={contentId} />
);

SkipToContent.propTypes = {
  contentId: PropTypes.string.isRequired,
};

export default SkipToContent;

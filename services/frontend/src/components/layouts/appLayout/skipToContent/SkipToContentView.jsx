import { Button } from "antd";
import PropTypes from "prop-types";
import "./SkipToContentView.less";

const SkipToContentView = ({ contentId }) => (
  <Button className="skip-to-content-link" href={contentId} tabIndex="0">
    Skip to content
  </Button>
);

SkipToContentView.propTypes = {
  contentId: PropTypes.string.isRequired,
};

export default SkipToContentView;

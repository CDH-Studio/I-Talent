import { Button } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./SkipToContentView.less";

const SkipToContentView = ({ contentId }) => (
  <Button className="skip-to-content-link" href={contentId} tabIndex="0">
    <FormattedMessage id="skip.to.content" />
  </Button>
);

SkipToContentView.propTypes = {
  contentId: PropTypes.string.isRequired,
};

export default SkipToContentView;

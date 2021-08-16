import PropTypes from "prop-types";

import FormSubTitleView from "./FormSubTitleView";

const FormSubTitle = ({ title, popoverMessage, extra }) => (
  <FormSubTitleView
    extra={extra}
    popoverMessage={popoverMessage}
    title={title}
  />
);

FormSubTitle.propTypes = {
  extra: PropTypes.node,
  popoverMessage: PropTypes.node,
  title: PropTypes.node.isRequired,
};

FormSubTitle.defaultProps = {
  extra: null,
  popoverMessage: null,
};

export default FormSubTitle;

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
  title: PropTypes.node.isRequired,
  popoverMessage: PropTypes.node,
  extra: PropTypes.node,
};

FormSubTitle.defaultProps = {
  popoverMessage: null,
  extra: null,
};

export default FormSubTitle;

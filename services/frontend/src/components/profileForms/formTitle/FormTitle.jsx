import PropTypes from "prop-types";

import FormTitleView from "./FormTitleView";

const FormTitle = ({ title, formType, stepNumber, fieldsChanged, extra }) => (
  <FormTitleView
    extra={extra}
    fieldsChanged={fieldsChanged}
    formType={formType}
    stepNumber={stepNumber}
    title={title}
  />
);

FormTitle.propTypes = {
  extra: PropTypes.node,
  fieldsChanged: PropTypes.bool,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  stepNumber: PropTypes.number,
  title: PropTypes.node.isRequired,
};

FormTitle.defaultProps = {
  extra: null,
  fieldsChanged: false,
  stepNumber: null,
};

export default FormTitle;

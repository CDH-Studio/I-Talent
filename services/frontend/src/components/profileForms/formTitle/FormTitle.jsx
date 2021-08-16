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
  title: PropTypes.node.isRequired,
  formType: PropTypes.oneOf(["create", "edit"]).isRequired,
  stepNumber: PropTypes.number,
  fieldsChanged: PropTypes.bool,
  extra: PropTypes.node,
};

FormTitle.defaultProps = {
  stepNumber: null,
  fieldsChanged: false,
  extra: null,
};

export default FormTitle;

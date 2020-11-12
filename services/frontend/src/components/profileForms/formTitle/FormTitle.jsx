import React from "react";
import PropTypes from "prop-types";
import FormTitleView from "./FormTitleView";

const FormTitle = ({ title, formType, stepNumber, fieldsChanged, extra }) => (
  <FormTitleView
    title={title}
    formType={formType}
    stepNumber={stepNumber}
    fieldsChanged={fieldsChanged}
    extra={extra}
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
